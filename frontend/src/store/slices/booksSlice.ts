import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: any;
  ratings: {
    average: number;
    count: number;
  };
  downloads: number;
  views: number;
}

interface BooksState {
  books: Book[];
  currentBook: Book | null;
  featuredBooks: Book[];
  loading: boolean;
  error: string | null;
  total: number;
  pages: number;
  currentPage: number;
}

const initialState: BooksState = {
  books: [],
  currentBook: null,
  featuredBooks: [],
  loading: false,
  error: null,
  total: 0,
  pages: 0,
  currentPage: 1,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBooksError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setBooks: (state, action: PayloadAction<any>) => {
      state.books = action.payload.data;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
      state.error = null;
    },
    setCurrentBook: (state, action: PayloadAction<Book | null>) => {
      state.currentBook = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFeaturedBooks: (state, action: PayloadAction<Book[]>) => {
      state.featuredBooks = action.payload;
    },
    clearBooks: (state) => {
      state.books = [];
      state.currentBook = null;
      state.error = null;
    },
  },
});

export const {
  setBooksLoading,
  setBooksError,
  setBooks,
  setCurrentBook,
  setFeaturedBooks,
  clearBooks,
} = booksSlice.actions;

export default booksSlice.reducer;
