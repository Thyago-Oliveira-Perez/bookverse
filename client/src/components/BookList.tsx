import React from 'react';
import { Book } from '../types/book';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No books found. Add your first book to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <Card key={book.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{book.title}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Author:</span>
                <p>{book.author}</p>
              </div>
              <div>
                <span className="font-medium">ISBN:</span>
                <p>{book.isbn}</p>
              </div>
              <div>
                <span className="font-medium">Published:</span>
                <p>{book.publishedYear}</p>
              </div>
              <div>
                <span className="font-medium">Genre:</span>
                <p>{book.genre}</p>
              </div>
              <div>
                <span className="font-medium">Copies:</span>
                <p>
                  {book.availableCopies} of {book.totalCopies} available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};