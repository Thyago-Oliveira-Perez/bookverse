import React from 'react';
import { Book, CreateBookRequest } from '../types/book';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BookFormProps {
  book?: Book;
  onSubmit: (data: CreateBookRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = React.useState<CreateBookRequest>({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    publishedYear: book?.publishedYear || new Date().getFullYear(),
    genre: book?.genre || '',
    totalCopies: book?.totalCopies || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publishedYear' || name === 'totalCopies' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book ? 'Edit Book' : 'Add New Book'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-medium mb-1">
              ISBN *
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium mb-1">
                Published Year *
              </label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                min="1000"
                max="2030"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="totalCopies" className="block text-sm font-medium mb-1">
                Total Copies *
              </label>
              <input
                type="number"
                id="totalCopies"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium mb-1">
              Genre *
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (book ? 'Update' : 'Add')} Book
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};