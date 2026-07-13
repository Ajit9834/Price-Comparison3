import axios from 'axios';

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: 'https://price-comparison-of-amazon-and-flipkart.onrender.com/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (username, email, password) => api.post('/auth/signup', { username, email, password });
export const searchProducts = (query) => api.get(`/products/search?query=${query}`);
export const getBookmarks = () => api.get('/bookmarks');
export const addBookmark = (productId) => api.post('/bookmarks', { productId });
export const deleteBookmark = (bookmarkId) => api.delete(`/bookmarks/${bookmarkId}`);
