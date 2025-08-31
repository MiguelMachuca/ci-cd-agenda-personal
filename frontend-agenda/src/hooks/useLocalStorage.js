import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtener del localStorage por key
      const item = window.localStorage.getItem(key);
      // Parsear el item guardado o retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error, retornar initialValue
      console.error(`Error leyendo localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para establecer el valor en localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Guardar en el estado
      setStoredValue(valueToStore);
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error guardando localStorage key "${key}":`, error);
    }
  };

  // Función para limpiar el valor del localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removiendo localStorage key "${key}":`, error);
    }
  };

  // Función para obtener el valor actual del localStorage
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error obteniendo localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // Función para verificar si existe la key
  const hasValue = () => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error verificando localStorage key "${key}":`, error);
      return false;
    }
  };

  // Función para limpiar todo el localStorage
  const clearAll = () => {
    try {
      window.localStorage.clear();
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
    }
  };

  // Sincronizar con cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error sincronizando localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    getValue,
    hasValue,
    clearAll
  };
}

export default useLocalStorage;
