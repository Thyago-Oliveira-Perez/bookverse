import api from './index';
import { CreateBookRequest, Book } from '../../types/book';

export const createBook = async (book: CreateBookRequest): Promise<Book> => {
  try {
    const response = await api.post('/Books/Create', book);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const listBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/Books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};