import { Router, Response } from 'express';
import { BookService } from '../services/BookService';
import { AuthenticatedRequest, roleMiddleware, authMiddleware } from '../middleware/authMiddleware';
import { UserRole } from '../models/User';

const router = Router();

/**
 * POST /api/books - Create a new book (Librarian+)
 */
router.post('/', authMiddleware, roleMiddleware(UserRole.LIBRARIAN, UserRole.ADMIN), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { isbn, title, author, genre_id, publication_date, description, cover_url, total_copies, condition, location_shelf } = req.body;

    const book = await BookService.createBook(
      {
        isbn,
        title,
        author,
        genre_id,
        publication_date,
        description,
        cover_url,
        total_copies,
        condition,
        location_shelf,
      },
      req.user.id
    );

    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/books - Get all books with filters
 */
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { genre_id, condition, availability, year_from, year_to, page, limit } = req.query;

    const { books, total } = await BookService.getBooks({
      genre_id: genre_id as string,
      condition: condition as any,
      availability: availability as any,
      year_from: year_from ? parseInt(year_from as string) : undefined,
      year_to: year_to ? parseInt(year_to as string) : undefined,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });

    res.json({ books, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/books/search - Search books
 */
router.get('/search', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { q, genre_id, availability, page, limit } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const { books, total } = await BookService.searchBooks(q as string, {
      genre_id: genre_id as string,
      availability: availability as any,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });

    res.json({ books, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/books/:id - Get book by ID
 */
router.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const book = await BookService.getBookById(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/books/:id - Update book (Librarian+)
 */
router.put('/:id', authMiddleware, roleMiddleware(UserRole.LIBRARIAN, UserRole.ADMIN), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, genre_id, publication_date, description, cover_url, total_copies, condition, location_shelf } = req.body;

    const book = await BookService.updateBook(
      id,
      {
        title,
        author,
        genre_id,
        publication_date,
        description,
        cover_url,
        total_copies,
        condition,
        location_shelf,
      },
      req.user.id
    );

    res.json(book);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/books/:id - Delete book (Librarian+)
 */
router.delete('/:id', authMiddleware, roleMiddleware(UserRole.LIBRARIAN, UserRole.ADMIN), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await BookService.deleteBook(id, req.user.id);

    res.json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/genres - Get all genres
 */
router.get('/genres/list', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const genres = await BookService.getGenres();
    res.json(genres);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
