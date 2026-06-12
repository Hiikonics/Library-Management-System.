import React, { useState, useEffect } from 'react';
import { bookService } from '../services';
import { Book, Genre } from '../types';
import { useAuth } from '../services/auth';

export const BooksListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [availability, setAvailability] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await bookService.getBooks({
        genre_id: selectedGenre || undefined,
        availability: availability || undefined,
        page,
        limit: 20,
      });
      setBooks(response.books);
      setTotal(response.total);
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const data = await bookService.getGenres();
      setGenres(data);
    } catch (err) {
      console.error('Failed to load genres:', err);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    loadBooks();
  }, [selectedGenre, availability, page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await bookService.deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  const isLibrarian = user?.role === 'librarian' || user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Catalog</h1>
          {isLibrarian && (
            <a
              href="/books/add"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              + Add Book
            </a>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Books</option>
                <option value="in_stock">In Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ISBN</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Available</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Condition</th>
                    {isLibrarian && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        <a href={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                          {book.title}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{book.isbn}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {book.available_copies}/{book.total_copies}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          book.condition === 'good' ? 'bg-green-100 text-green-800' :
                          book.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {book.condition}
                        </span>
                      </td>
                      {isLibrarian && (
                        <td className="px-6 py-4 text-sm space-x-2">
                          <a
                            href={`/books/${book.id}/edit`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {Math.ceil(total / 20)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / 20)}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
