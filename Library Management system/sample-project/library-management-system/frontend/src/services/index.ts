import apiClient from './api';
import { User, AuthResponse, Book, BooksResponse, Genre } from '../types';

export const authService = {
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', { email, password, name });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

export const bookService = {
  createBook: async (book: any): Promise<Book> => {
    const response = await apiClient.post('/books', book);
    return response.data;
  },

  getBooks: async (filters?: any): Promise<BooksResponse> => {
    const response = await apiClient.get('/books', { params: filters });
    return response.data;
  },

  getBook: async (id: string): Promise<Book> => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  updateBook: async (id: string, book: any): Promise<Book> => {
    const response = await apiClient.put(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: string): Promise<any> => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },

  searchBooks: async (query: string, filters?: any): Promise<BooksResponse> => {
    const response = await apiClient.get('/books/search', { params: { q: query, ...filters } });
    return response.data;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await apiClient.get('/books/genres/list');
    return response.data;
  },
};
