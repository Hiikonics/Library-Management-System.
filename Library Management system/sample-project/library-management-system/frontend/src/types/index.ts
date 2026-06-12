export interface User {
  id: string;
  email: string;
  name: string;
  role: 'member' | 'librarian' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  genre_id?: string;
  publication_date?: string;
  description?: string;
  cover_url?: string;
  total_copies: number;
  available_copies: number;
  condition: 'good' | 'fair' | 'poor' | 'lost' | 'damaged';
  location_shelf?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}
