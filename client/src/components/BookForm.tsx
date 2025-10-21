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
    category: book?.category || 0,
    publicationYear: book?.publicationYear || new Date().getFullYear(),
    publisher: book?.publisher || '',
    numberOfPages: book?.numberOfPages || 0,
    description: book?.description || '',
    numberOfExamples: book?.numberOfExamples || 0,
    section: book?.section || '',
    stand: book?.stand || '',
    shelf: book?.shelf || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: [
        'publicationYear',
        'category',
        'numberOfPages',
        'numberOfExamples',
      ].includes(name)
        ? parseInt(value) || 0
        : value,
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
              <label
                htmlFor="publicationYear"
                className="block text-sm font-medium mb-1"
              >
                Publication Year *
              </label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                required
                min="1000"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="numberOfPages"
                className="block text-sm font-medium mb-1"
              >
                Number of Pages *
              </label>
              <input
                type="number"
                id="numberOfPages"
                name="numberOfPages"
                value={formData.numberOfPages}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                Category *
              </label>
              <input
                type="number"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="numberOfExamples"
                className="block text-sm font-medium mb-1"
              >
                Number of Examples *
              </label>
              <input
                type="number"
                id="numberOfExamples"
                name="numberOfExamples"
                value={formData.numberOfExamples}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="publisher"
              className="block text-sm font-medium mb-1"
            >
              Publisher *
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium mb-1"
              >
                Section *
              </label>
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="stand" className="block text-sm font-medium mb-1">
                Stand *
              </label>
              <input
                type="text"
                id="stand"
                name="stand"
                value={formData.stand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="shelf" className="block text-sm font-medium mb-1">
                Shelf *
              </label>
              <input
                type="text"
                id="shelf"
                name="shelf"
                value={formData.shelf}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
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
              {isSubmitting ? 'Saving...' : book ? 'Update' : 'Add'} Book
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};