export interface Author {
  id: number;
  name: string;
  birthDate?: string;
  nationality?: string;
  biography?: string;
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
  author?: Author;
  publishedYear: number;
  isbn: string;
  description?: string;
  genre?: string;
  coverUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
