export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: number;
  publicationYear: number;
  publisher: string;
  numberOfPages: number;
  description: string;
  numberOfExamples: number;
  section: string;
  stand: string;
  shelf: string;
  availableCopies: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  category: number;
  publicationYear: number;
  publisher: string;
  numberOfPages: number;
  description: string;
  numberOfExamples: number;
  section: string;
  stand: string;
  shelf: string;
}

export type UpdateBookRequest = Partial<CreateBookRequest>;