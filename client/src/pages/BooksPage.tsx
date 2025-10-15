import React, { useState, useEffect } from 'react';
import { Book, CreateBookRequest } from '../types/book';
import { BookList } from '../components/BookList';
import { BookForm } from '../components/BookForm';
import { Button } from '../components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

// Mock data for demonstration
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    publishedYear: 1925,
    genre: 'Classic',
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    publishedYear: 1960,
    genre: 'Fiction',
    totalCopies: 3,
    availableCopies: 1,
  },
];

export const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call with delay
    const loadBooks = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBooks(mockBooks);
    };
    loadBooks();
  }, []);

  const handleCreateBook = async (data: CreateBookRequest) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBook: Book = {
      ...data,
      id: Date.now().toString(),
      availableCopies: data.totalCopies,
    };
    
    setBooks(prev => [...prev, newBook]);
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const handleUpdateBook = async (data: CreateBookRequest) => {
    if (!editingBook) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedBook: Book = {
      ...editingBook,
      ...data,
      availableCopies: data.totalCopies - (editingBook.totalCopies - editingBook.availableCopies),
    };
    
    setBooks(prev => prev.map(book => book.id === editingBook.id ? updatedBook : book));
    setIsSubmitting(false);
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingBook(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Library Books</h1>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>Add New Book</Button>
          </DialogTrigger>
          <DialogContent onClose={() => handleDialogOpenChange(false)}>
            <DialogHeader>
              <DialogTitle>
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </DialogTitle>
            </DialogHeader>
            <BookForm
              book={editingBook || undefined}
              onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
              onCancel={() => handleDialogOpenChange(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};