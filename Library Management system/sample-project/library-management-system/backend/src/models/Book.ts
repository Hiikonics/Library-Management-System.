// Book model and types
export enum BookCondition {
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  LOST = 'lost',
  DAMAGED = 'damaged',
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  genre_id?: string;
  publication_date?: Date;
  description?: string;
  cover_url?: string;
  total_copies: number;
  available_copies: number;
  condition: BookCondition;
  location_shelf?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface BookInput {
  isbn: string;
  title: string;
  author: string;
  genre_id?: string;
  publication_date?: string;
  description?: string;
  cover_url?: string;
  total_copies?: number;
  condition?: BookCondition;
  location_shelf?: string;
}

export interface BookFilter {
  genre_id?: string;
  condition?: BookCondition;
  availability?: 'in_stock' | 'all';
  year_from?: number;
  year_to?: number;
  page?: number;
  limit?: number;
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
}
