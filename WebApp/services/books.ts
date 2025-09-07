import apiClient from "./apiClient";

export const getBooks = async () => {
  const response = await apiClient.get("/books");
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await apiClient.post("/books/create", bookData);
  return response.data;
};
