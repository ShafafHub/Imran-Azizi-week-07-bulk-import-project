import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAllProducts: () => api.get('/products'),
  bulkImport: (formData) => api.post('/products/bulk-import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteAllProducts: () => api.delete('/products/all'),
};

export default api;