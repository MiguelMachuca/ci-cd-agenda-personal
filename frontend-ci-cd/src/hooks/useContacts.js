import { useContext } from 'react';
import { ContactContext } from '../context/ContactContext';

export function useContacts() {
  const context = useContext(ContactContext);
  
  if (!context) {
    throw new Error('useContacts debe ser usado dentro de un ContactProvider');
  }
  
  return context;
}

export default useContacts;
