import pool from './index';

export const migrate = async () => {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'librarian', 'admin')),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');

    // Create genres table
    await client.query(`
      CREATE TABLE IF NOT EXISTS genres (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Genres table created');

    // Create books table
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        isbn VARCHAR(20) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre_id UUID REFERENCES genres(id),
        publication_date DATE,
        description TEXT,
        cover_url VARCHAR(500),
        total_copies INTEGER NOT NULL DEFAULT 1,
        available_copies INTEGER NOT NULL DEFAULT 1,
        condition VARCHAR(50) NOT NULL DEFAULT 'good' CHECK (condition IN ('good', 'fair', 'poor', 'lost', 'damaged')),
        location_shelf VARCHAR(100),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      )
    `);
    console.log('✓ Books table created');

    // Create audit_log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        entity_type VARCHAR(50) NOT NULL,
        entity_id UUID NOT NULL,
        action VARCHAR(50) NOT NULL,
        changed_by UUID REFERENCES users(id),
        old_values JSONB,
        new_values JSONB,
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Audit log table created');

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_books_title ON books(title)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_books_author ON books(author)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_books_genre_id ON books(genre_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_books_created_by ON books(created_by)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    console.log('✓ Indexes created');

    console.log('✓ All migrations completed successfully');
  } catch (err) {
    console.error('Migration error:', err);
    throw err;
  } finally {
    client.release();
  }
};

if (require.main === module) {
  migrate().then(() => {
    console.log('Migrations finished');
    process.exit(0);
  }).catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}
