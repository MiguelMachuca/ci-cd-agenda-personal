import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { contactService } from '../services/api';

const ContactContext = createContext();

const initialState = {
  contacts: [],
  currentContact: null,
  loading: false,
  error: null,
  categories: [],
  stats: null,
  filters: {
    searchTerm: '',
    category: '',
    favorites: false,
  },
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
};

function contactReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CONTACTS':
      return { 
        ...state, 
        contacts: action.payload.content,
        pagination: {
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        },
        loading: false 
      };
    case 'SET_CURRENT_CONTACT':
      return { ...state, currentContact: action.payload, loading: false };
    case 'ADD_CONTACT':
      return { 
        ...state, 
        contacts: [action.payload, ...state.contacts],
        loading: false 
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
        loading: false,
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
    case 'ADD_CATEGORY':
      return { 
        ...state, 
        categories: [action.payload, ...state.categories],
        loading: false 
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
        loading: false,
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const actions = {
    // Cargar contactos
    loadContacts: useCallback(async (page = 0, size = 10) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.getContacts(page, size);
        dispatch({ type: 'SET_CONTACTS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }, []),

    // Cargar contacto por ID
    loadContact: useCallback(async (id) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.getContact(id);
        dispatch({ type: 'SET_CURRENT_CONTACT', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }, []),

    // Crear contacto
    createContact: useCallback(async (contactData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.createContact(contactData);
        dispatch({ type: 'ADD_CONTACT', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Actualizar contacto
    updateContact: useCallback(async (id, contactData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.updateContact(id, contactData);
        dispatch({ type: 'UPDATE_CONTACT', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Eliminar contacto
    deleteContact: useCallback(async (id) => {
      try {
        await contactService.deleteContact(id);
        dispatch({ type: 'DELETE_CONTACT', payload: id });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Buscar contactos
    searchContacts: useCallback(async (term) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.searchContacts(term);
        dispatch({ type: 'SET_CONTACTS', payload: { 
          content: response.data, 
          page: 0, 
          size: 10, 
          totalElements: response.data.length, 
          totalPages: 1 
        }});
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }, []),

    // Cargar favoritos
    loadFavorites: useCallback(async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.getFavorites();
        dispatch({ type: 'SET_CONTACTS', payload: { 
          content: response.data, 
          page: 0, 
          size: 10, 
          totalElements: response.data.length, 
          totalPages: 1 
        }});
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Cambiar estado de favorito
    toggleFavorite: useCallback(async (id, favorite) => {
      try {
        const response = await contactService.toggleFavorite(id, favorite);
        dispatch({ type: 'UPDATE_CONTACT', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Cargar categorías
    loadCategories: useCallback(async () => {
      try {
        const response = await contactService.getCategories();
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }, []),

    // Crear categoría
    createCategory: useCallback(async (categoryData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.createCategory(categoryData);
        dispatch({ type: 'ADD_CATEGORY', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Actualizar categoría
    updateCategory: useCallback(async (id, categoryData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await contactService.updateCategory(id, categoryData);
        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Eliminar categoría
    deleteCategory: useCallback(async (id) => {
      try {
        await contactService.deleteCategory(id);
        dispatch({ type: 'DELETE_CATEGORY', payload: id });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }, []),

    // Cargar estadísticas
    loadStats: useCallback(async () => {
      try {
        const response = await contactService.getStats();
        dispatch({ type: 'SET_STATS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }, []),

    // Cambiar filtros
    setFilters: useCallback((filters) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    }, []),

    // Limpiar error
    clearError: useCallback(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, []),
  };

  return (
    <ContactContext.Provider value={{ state, actions }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
}