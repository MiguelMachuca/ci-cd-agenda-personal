import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://74.163.99.83:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contactService = {
  getContacts: (page = 0, size = 10) => 
    api.get(`/contactos?page=${page}&size=${size}`),
  
  getContact: (id) => 
    api.get(`/contactos/${id}`),
  
  createContact: (contactData) => 
    api.post('/contactos', contactData),
  
  updateContact: (id, contactData) => 
    api.put(`/contactos/${id}`, contactData),
  
  deleteContact: (id) => 
    api.delete(`/contactos/${id}`),
  
  searchContacts: (term) => 
    api.get(`/contactos/buscar?termino=${term}`),
  
  getContactsByCategory: (category) => 
    api.get(`/contactos/categoria/${category}`),
  
  getFavorites: () => 
    api.get('/contactos/favoritos'),
  
  toggleFavorite: (id, favorite) => 
    api.patch(`/contactos/${id}/favorito`, { favorito: favorite }),
  
  getStats: () => 
    api.get('/contactos/estadisticas'),
  
  getCategories: () => 
    api.get('/categorias'),
  
  createCategory: (categoryData) => 
    api.post('/categorias', categoryData),
  
  updateCategory: (id, categoryData) => 
    api.put(`/categorias/${id}`, categoryData),
  
  deleteCategory: (id) => 
    api.delete(`/categorias/${id}`),
};

export default api;