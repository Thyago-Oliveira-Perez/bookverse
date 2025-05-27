import axios from "axios";
import type { Author, Book, ApiResponse } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authorService = {
  async list(): Promise<ApiResponse<Author[]>> {
    const response = await api.get("/authors");
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<Author>> {
    const response = await api.get(`/authors/${id}`);
    return response.data;
  },

  async create(author: Omit<Author, "id">): Promise<ApiResponse<Author>> {
    const response = await api.post("/authors", author);
    return response.data;
  },

  async searchByName(name: string): Promise<ApiResponse<Author[]>> {
    const response = await api.get(
      `/authors/search?name=${encodeURIComponent(name)}`
    );
    return response.data;
  },
};

export const bookService = {
  async list(): Promise<ApiResponse<Book[]>> {
    const response = await api.get("/books");
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<Book>> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  async create(
    book: Omit<Book, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Book>> {
    const response = await api.post("/books", book);
    return response.data;
  },

  async search(params: Record<string, string>): Promise<ApiResponse<Book[]>> {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/books/search?${queryString}`);
    return response.data;
  },
};
