import React, { useState, useEffect } from "react";
import { Book, CreateBookRequest } from "../types/book";
import { BookList } from "../components/BookList";
import { BookForm } from "../components/BookForm";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useAuth } from "../hooks/useAuth";
import { createBook, listBooks } from "../lib/api/book";

export const BooksPage: React.FC = () => {
  const { logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      const books = await listBooks();
      setBooks(books);
    };
    loadBooks();
  }, []);

  const handleCreateBook = async (data: CreateBookRequest) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newBook = await createBook(data);
      setBooks((prev) => [...prev, newBook]);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to create book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBook = async (data: CreateBookRequest) => {
    if (!editingBook) return;

    setIsSubmitting(true);
    // TODO: Implement API call to update a book
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedBook: Book = {
      ...editingBook,
      ...data,
      availableCopies: editingBook.availableCopies,
    };

    setBooks((prev) =>
      prev.map((book) => (book.id === editingBook.id ? updatedBook : book))
    );
    setIsSubmitting(false);
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    // TODO: Implement API call to delete a book
    await new Promise((resolve) => setTimeout(resolve, 500));
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
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
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button>Add New Book</Button>
            </DialogTrigger>
            <DialogContent onClose={() => handleDialogOpenChange(false)}>
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? "Edit Book" : "Add New Book"}
                </DialogTitle>
              </DialogHeader>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <BookForm
                book={editingBook || undefined}
                onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
                onCancel={() => handleDialogOpenChange(false)}
                isSubmitting={isSubmitting}
              />
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>

      <BookList books={books} onEdit={handleEdit} onDelete={handleDeleteBook} />
    </div>
  );
};
