import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth APIs
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Books APIs
export const booksAPI = {
  getBooks: (params?: any) => api.get('/books', { params }),
  getBook: (id: string) => api.get(`/books/${id}`),
  createBook: (data: any) => api.post('/books', data),
  updateBook: (id: string, data: any) => api.put(`/books/${id}`, data),
  deleteBook: (id: string) => api.delete(`/books/${id}`),
  addReview: (id: string, data: any) => api.post(`/books/${id}/reviews`, data),
  downloadBook: (id: string) => api.get(`/books/${id}/download`),
  getRelatedBooks: (id: string) => api.get(`/books/${id}/related`),
};

// Categories APIs
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
  getCategory: (id: string) => api.get(`/categories/${id}`),
  createCategory: (data: any) => api.post('/categories', data),
  updateCategory: (id: string, data: any) => api.put(`/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};

// Users APIs
export const usersAPI = {
  getUsers: (params?: any) => api.get('/users', { params }),
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  addToFavorites: (bookId: string) => api.post(`/users/favorites/${bookId}`),
  removeFromFavorites: (bookId: string) => api.delete(`/users/favorites/${bookId}`),
  updateReadingProgress: (bookId: string, data: any) => api.put(`/users/reading-history/${bookId}`, data),
};
