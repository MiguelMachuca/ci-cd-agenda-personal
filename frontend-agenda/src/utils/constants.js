// Constantes de la aplicación

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://74.163.99.83:8080/api',
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Configuración de búsqueda
export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DELAY: 300, // 300ms para debounce
  MAX_SEARCH_RESULTS: 100,
};

// Estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Tipos de notificaciones
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Configuración de validación
export const VALIDATION_CONFIG = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_MIN_LENGTH: 7,
  PHONE_MAX_LENGTH: 15,
  EMAIL_MAX_LENGTH: 100,
  ADDRESS_MAX_LENGTH: 200,
  NOTES_MAX_LENGTH: 500,
  CATEGORY_NAME_MIN_LENGTH: 2,
  CATEGORY_NAME_MAX_LENGTH: 50,
  CATEGORY_DESCRIPTION_MAX_LENGTH: 200,
};

// Configuración de categorías
export const CATEGORY_CONFIG = {
  DEFAULT_COLORS: [
    '#3498db', // Azul
    '#e74c3c', // Rojo
    '#2ecc71', // Verde
    '#f39c12', // Naranja
    '#9b59b6', // Púrpura
    '#1abc9c', // Turquesa
    '#e67e22', // Naranja oscuro
    '#34495e', // Gris oscuro
    '#f1c40f', // Amarillo
    '#e91e63', // Rosa
  ],
  DEFAULT_COLOR: '#3498db',
};

// Configuración de contactos
export const CONTACT_CONFIG = {
  FAVORITE_ICON: '⭐',
  DEFAULT_AVATAR_SIZE: 40,
  MAX_RECENT_CONTACTS: 5,
  SORT_OPTIONS: [
    { value: 'nombre', label: 'Nombre' },
    { value: 'apellido', label: 'Apellido' },
    { value: 'fechaCreacion', label: 'Fecha de Creación' },
    { value: 'fechaActualizacion', label: 'Última Actualización' },
  ],
};

// Configuración de estadísticas
export const STATS_CONFIG = {
  CHART_COLORS: [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
    '#f1c40f', '#e91e63', '#00bcd4', '#ff9800',
  ],
  MAX_CATEGORIES_DISPLAY: 8,
  RECENT_CONTACTS_LIMIT: 5,
};

// Configuración de formularios
export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 5000, // 5 segundos
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
};

// Configuración de localización
export const LOCALE_CONFIG = {
  DEFAULT_LOCALE: 'es-ES',
  SUPPORTED_LOCALES: ['es-ES', 'en-US'],
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
};

// Configuración de almacenamiento local
export const STORAGE_CONFIG = {
  PREFIX: 'agenda_personal_',
  KEYS: {
    THEME: 'theme',
    LANGUAGE: 'language',
    SORT_PREFERENCE: 'sort_preference',
    FILTER_PREFERENCES: 'filter_preferences',
    RECENT_SEARCHES: 'recent_searches',
    USER_PREFERENCES: 'user_preferences',
  },
  EXPIRATION: {
    RECENT_SEARCHES: 7 * 24 * 60 * 60 * 1000, // 7 días
    USER_PREFERENCES: 30 * 24 * 60 * 60 * 1000, // 30 días
  },
};

// Configuración de temas
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
  COLORS: {
    light: {
      primary: '#3498db',
      secondary: '#95a5a6',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#17a2b8',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#2c3e50',
      textSecondary: '#7f8c8d',
      border: '#e1e8ed',
    },
    dark: {
      primary: '#3498db',
      secondary: '#95a5a6',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#17a2b8',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#404040',
    },
  },
};

// Configuración de accesibilidad
export const ACCESSIBILITY_CONFIG = {
  KEYBOARD_NAVIGATION: true,
  SCREEN_READER_SUPPORT: true,
  HIGH_CONTRAST_MODE: false,
  REDUCED_MOTION: false,
  FONT_SIZE_OPTIONS: [12, 14, 16, 18, 20, 24],
  DEFAULT_FONT_SIZE: 16,
};

// Configuración de rendimiento
export const PERFORMANCE_CONFIG = {
  LAZY_LOADING: true,
  VIRTUAL_SCROLLING: false,
  IMAGE_OPTIMIZATION: true,
  CACHE_STRATEGY: 'stale-while-revalidate',
  DEBOUNCE_DELAYS: {
    SEARCH: 300,
    SCROLL: 100,
    RESIZE: 250,
  },
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  SERVER_ERROR: 'Error del servidor. Intenta nuevamente más tarde.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  FORBIDDEN: 'Acceso denegado.',
  TIMEOUT: 'La operación tardó demasiado. Intenta nuevamente.',
  UNKNOWN: 'Ocurrió un error inesperado.',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  CONTACT_CREATED: 'Contacto creado exitosamente.',
  CONTACT_UPDATED: 'Contacto actualizado exitosamente.',
  CONTACT_DELETED: 'Contacto eliminado exitosamente.',
  CATEGORY_CREATED: 'Categoría creada exitosamente.',
  CATEGORY_UPDATED: 'Categoría actualizada exitosamente.',
  CATEGORY_DELETED: 'Categoría eliminada exitosamente.',
  FAVORITE_TOGGLED: 'Estado de favorito actualizado.',
  SEARCH_CLEARED: 'Búsqueda limpiada.',
  FILTERS_RESET: 'Filtros restablecidos.',
  PREFERENCES_SAVED: 'Preferencias guardadas.',
};

// Configuración de pruebas
export const TEST_CONFIG = {
  ENABLED: process.env.NODE_ENV === 'test',
  MOCK_API_DELAY: 1000,
  MOCK_ERROR_RATE: 0.1, // 10% de probabilidad de error
  TEST_TIMEOUT: 10000,
};

// Configuración de desarrollo
export const DEV_CONFIG = {
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
  ENABLE_DEBUG_PANEL: process.env.NODE_ENV === 'development',
  ENABLE_PERFORMANCE_MONITORING: process.env.NODE_ENV === 'development',
  LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
};
