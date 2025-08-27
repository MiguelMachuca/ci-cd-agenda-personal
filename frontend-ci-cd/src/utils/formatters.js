// Utilidades de formateo para la aplicación

// Formatear número de teléfono
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remover todos los caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Formatear según la longitud
  if (cleanPhone.length === 7) {
    return cleanPhone.replace(/(\d{3})(\d{4})/, '$1-$2');
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  // Si no coincide con ningún patrón, devolver el original
  return phone;
};

// Formatear fecha
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('es-ES', defaultOptions);
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return dateString;
  }
};

// Formatear fecha y hora
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formateando fecha y hora:', error);
    return dateString;
  }
};

// Formatear fecha relativa (hace X tiempo)
export const formatRelativeDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Hace un momento';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) !== 1 ? 's' : ''}`;
    if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} mes${Math.floor(diffInDays / 30) !== 1 ? 'es' : ''}`;
    
    return `Hace ${Math.floor(diffInDays / 365)} año${Math.floor(diffInDays / 365) !== 1 ? 's' : ''}`;
  } catch (error) {
    console.error('Error formateando fecha relativa:', error);
    return formatDate(dateString);
  }
};

// Capitalizar primera letra
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Capitalizar todas las palabras
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Formatear nombre completo
export const formatFullName = (firstName, lastName) => {
  const first = capitalize(firstName || '');
  const last = capitalize(lastName || '');
  
  if (first && last) {
    return `${first} ${last}`;
  } else if (first) {
    return first;
  } else if (last) {
    return last;
  }
  
  return '';
};

// Formatear iniciales
export const formatInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  
  if (first && last) {
    return `${first}${last}`;
  } else if (first) {
    return first;
  } else if (last) {
    return last;
  }
  
  return '?';
};

// Formatear email (ocultar parte del dominio)
export const formatEmail = (email) => {
  if (!email) return '';
  
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  if (domain.length <= 3) {
    return email;
  }
  
  const hiddenDomain = domain.charAt(0) + '*'.repeat(domain.length - 2) + domain.charAt(domain.length - 1);
  return `${localPart}@${hiddenDomain}`;
};

// Formatear número con separadores de miles
export const formatNumber = (number, locale = 'es-ES') => {
  if (number === null || number === undefined) return '';
  
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    console.error('Error formateando número:', error);
    return number.toString();
  }
};

// Formatear porcentaje
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '';
  
  try {
    return `${(value * 100).toFixed(decimals)}%`;
  } catch (error) {
    console.error('Error formateando porcentaje:', error);
    return `${value}%`;
  }
};

// Formatear tamaño de archivo
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Formatear duración en segundos
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

// Formatear texto largo (truncar)
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

// Formatear texto con saltos de línea
export const formatTextWithLineBreaks = (text) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br />');
};

// Formatear URL
export const formatUrl = (url) => {
  if (!url) return '';
  
  // Agregar protocolo si no existe
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  return url;
};

// Formatear precio
export const formatPrice = (amount, currency = 'USD', locale = 'es-ES') => {
  if (amount === null || amount === undefined) return '';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  } catch (error) {
    console.error('Error formateando precio:', error);
    return `${amount} ${currency}`;
  }
};

// Formatear número de teléfono para mostrar
export const formatPhoneForDisplay = (phone) => {
  if (!phone) return '';
  
  // Formatear para mejor legibilidad
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  } else if (cleanPhone.length === 7) {
    return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3)}`;
  }
  
  return phone;
};

// Formatear dirección
export const formatAddress = (address) => {
  if (!address) return '';
  
  // Capitalizar cada palabra de la dirección
  return capitalizeWords(address);
};

// Formatear notas
export const formatNotes = (notes) => {
  if (!notes) return '';
  
  // Limpiar espacios extra y capitalizar primera letra
  return capitalize(notes.trim().replace(/\s+/g, ' '));
};