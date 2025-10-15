export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  totalCopies: number;
  availableCopies: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  totalCopies: number;
}

export type UpdateBookRequest = Partial<CreateBookRequest>;