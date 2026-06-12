import pool from '../database';
import { Book, BookInput, BookFilter, BookCondition, Genre } from '../models/Book';

export class BookService {
  /**
   * Create a new book
   */
  static async createBook(input: BookInput, createdBy: string): Promise<Book> {
    // Validate ISBN
    this.validateISBN(input.isbn);

    // Check if ISBN already exists
    const existing = await pool.query(
      'SELECT id FROM books WHERE isbn = $1',
      [input.isbn]
    );
    if (existing.rows.length > 0) {
      throw new Error('Book with this ISBN already exists');
    }

    // Validate required fields
    if (!input.title || !input.author) {
      throw new Error('Title and author are required');
    }

    const result = await pool.query(
      `INSERT INTO books (isbn, title, author, genre_id, publication_date, description, cover_url, total_copies, available_copies, condition, location_shelf, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        input.isbn,
        input.title,
        input.author,
        input.genre_id || null,
        input.publication_date ? new Date(input.publication_date) : null,
        input.description || null,
        input.cover_url || null,
        input.total_copies || 1,
        input.total_copies || 1, // available_copies starts equal to total_copies
        input.condition || BookCondition.GOOD,
        input.location_shelf || null,
        createdBy,
      ]
    );

    // Log to audit
    await this.logAudit('book', result.rows[0].id, 'created', createdBy, null, result.rows[0]);

    return result.rows[0] as Book;
  }

  /**
   * Get book by ID
   */
  static async getBookById(id: string): Promise<Book | null> {
    const result = await pool.query(
      'SELECT * FROM books WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Get all books with filters and pagination
   */
  static async getBooks(filters?: BookFilter): Promise<{ books: Book[]; total: number }> {
    let query = 'SELECT * FROM books WHERE deleted_at IS NULL';
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.genre_id) {
      query += ` AND genre_id = $${paramCount}`;
      params.push(filters.genre_id);
      paramCount++;
    }

    if (filters?.condition) {
      query += ` AND condition = $${paramCount}`;
      params.push(filters.condition);
      paramCount++;
    }

    if (filters?.availability === 'in_stock') {
      query += ` AND available_copies > 0`;
    }

    if (filters?.year_from) {
      query += ` AND EXTRACT(YEAR FROM publication_date) >= $${paramCount}`;
      params.push(filters.year_from);
      paramCount++;
    }

    if (filters?.year_to) {
      query += ` AND EXTRACT(YEAR FROM publication_date) <= $${paramCount}`;
      params.push(filters.year_to);
      paramCount++;
    }

    // Get total count
    const countResult = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*) as count'),
      params
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // Add pagination
    const limit = filters?.limit || 20;
    const page = filters?.page || 1;
    const offset = (page - 1) * limit;

    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return { books: result.rows as Book[], total };
  }

  /**
   * Search books by title, author, ISBN, genre
   */
  static async searchBooks(query: string, filters?: BookFilter): Promise<{ books: Book[]; total: number }> {
    const searchQuery = `%${query}%`;
    let sql = `
      SELECT * FROM books 
      WHERE deleted_at IS NULL AND (
        title ILIKE $1 OR 
        author ILIKE $1 OR 
        isbn ILIKE $1
      )
    `;
    const params: any[] = [searchQuery];
    let paramCount = 2;

    if (filters?.genre_id) {
      sql += ` AND genre_id = $${paramCount}`;
      params.push(filters.genre_id);
      paramCount++;
    }

    if (filters?.availability === 'in_stock') {
      sql += ` AND available_copies > 0`;
    }

    // Get total count
    const countResult = await pool.query(
      sql.replace('SELECT *', 'SELECT COUNT(*) as count'),
      params
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // Add pagination and sorting
    const limit = filters?.limit || 20;
    const page = filters?.page || 1;
    const offset = (page - 1) * limit;

    sql += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(sql, params);
    return { books: result.rows as Book[], total };
  }

  /**
   * Update book
   */
  static async updateBook(id: string, input: Partial<BookInput>, updatedBy: string): Promise<Book> {
    const book = await this.getBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    const fields: string[] = [];
    const params: any[] = [];
    let paramCount = 1;

    if (input.title !== undefined) {
      fields.push(`title = $${paramCount}`);
      params.push(input.title);
      paramCount++;
    }
    if (input.author !== undefined) {
      fields.push(`author = $${paramCount}`);
      params.push(input.author);
      paramCount++;
    }
    if (input.description !== undefined) {
      fields.push(`description = $${paramCount}`);
      params.push(input.description);
      paramCount++;
    }
    if (input.cover_url !== undefined) {
      fields.push(`cover_url = $${paramCount}`);
      params.push(input.cover_url);
      paramCount++;
    }
    if (input.total_copies !== undefined) {
      fields.push(`total_copies = $${paramCount}`);
      params.push(input.total_copies);
      paramCount++;
    }
    if (input.condition !== undefined) {
      fields.push(`condition = $${paramCount}`);
      params.push(input.condition);
      paramCount++;
    }
    if (input.location_shelf !== undefined) {
      fields.push(`location_shelf = $${paramCount}`);
      params.push(input.location_shelf);
      paramCount++;
    }
    if (input.genre_id !== undefined) {
      fields.push(`genre_id = $${paramCount}`);
      params.push(input.genre_id);
      paramCount++;
    }

    if (fields.length === 0) {
      return book;
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const result = await pool.query(
      `UPDATE books SET ${fields.join(', ')} WHERE id = $${paramCount} AND deleted_at IS NULL RETURNING *`,
      params
    );

    if (result.rows.length === 0) {
      throw new Error('Book not found');
    }

    // Log to audit
    await this.logAudit('book', id, 'updated', updatedBy, book, result.rows[0]);

    return result.rows[0] as Book;
  }

  /**
   * Delete (soft delete) book
   */
  static async deleteBook(id: string, deletedBy: string): Promise<void> {
    const book = await this.getBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    await pool.query(
      'UPDATE books SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1',
      [id]
    );

    // Log to audit
    await this.logAudit('book', id, 'deleted', deletedBy, book, null);
  }

  /**
   * Validate ISBN format (10 or 13 digits)
   */
  private static validateISBN(isbn: string): void {
    const cleanISBN = isbn.replace(/-/g, '');
    if (!/^\d{10}(\d{3})?$/.test(cleanISBN)) {
      throw new Error('Invalid ISBN format. Must be 10 or 13 digits.');
    }
  }

  /**
   * Log changes to audit table
   */
  private static async logAudit(
    entityType: string,
    entityId: string,
    action: string,
    changedBy: string,
    oldValues: any,
    newValues: any
  ): Promise<void> {
    await pool.query(
      `INSERT INTO audit_log (entity_type, entity_id, action, changed_by, old_values, new_values)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [entityType, entityId, action, changedBy, JSON.stringify(oldValues), JSON.stringify(newValues)]
    );
  }

  /**
   * Get all genres
   */
  static async getGenres(): Promise<Genre[]> {
    const result = await pool.query('SELECT * FROM genres ORDER BY name');
    return result.rows as Genre[];
  }

  /**
   * Create genre
   */
  static async createGenre(name: string, description?: string): Promise<Genre> {
    const result = await pool.query(
      `INSERT INTO genres (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description || null]
    );
    return result.rows[0] as Genre;
  }
}
