// Validadores para formularios de contactos

// Validar email
export const validateEmail = (email) => {
  if (!email) return null; // Email es opcional
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'El formato del email no es válido';
  }
  
  return null;
};

// Validar teléfono
export const validatePhone = (phone) => {
  if (!phone) return 'El teléfono es requerido';
  
  // Remover espacios, guiones y paréntesis
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Verificar que solo contenga números
  if (!/^\d+$/.test(cleanPhone)) {
    return 'El teléfono solo debe contener números';
  }
  
  // Verificar longitud (7-15 dígitos)
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return 'El teléfono debe tener entre 7 y 15 dígitos';
  }
  
  return null;
};

// Validar nombre
export const validateName = (name) => {
  if (!name) return 'El nombre es requerido';
  
  if (name.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (name.length > 50) {
    return 'El nombre no puede exceder 50 caracteres';
  }
  
  // Verificar que solo contenga letras, espacios y algunos caracteres especiales
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']+$/.test(name)) {
    return 'El nombre solo puede contener letras, espacios y guiones';
  }
  
  return null;
};

// Validar apellido
export const validateLastName = (lastName) => {
  if (!lastName) return null; // Apellido es opcional
  
  if (lastName.length < 2) {
    return 'El apellido debe tener al menos 2 caracteres';
  }
  
  if (lastName.length > 50) {
    return 'El apellido no puede exceder 50 caracteres';
  }
  
  // Verificar que solo contenga letras, espacios y algunos caracteres especiales
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']+$/.test(lastName)) {
    return 'El apellido solo puede contener letras, espacios y guiones';
  }
  
  return null;
};

// Validar dirección
export const validateAddress = (address) => {
  if (!address) return null; // Dirección es opcional
  
  if (address.length > 200) {
    return 'La dirección no puede exceder 200 caracteres';
  }
  
  return null;
};

// Validar notas
export const validateNotes = (notes) => {
  if (!notes) return null; // Notas son opcionales
  
  if (notes.length > 500) {
    return 'Las notas no pueden exceder 500 caracteres';
  }
  
  return null;
};

// Validar fecha de nacimiento
export const validateBirthDate = (birthDate) => {
  if (!birthDate) return null; // Fecha de nacimiento es opcional
  
  const date = new Date(birthDate);
  const today = new Date();
  
  // Verificar que sea una fecha válida
  if (isNaN(date.getTime())) {
    return 'La fecha de nacimiento no es válida';
  }
  
  // Verificar que no sea en el futuro
  if (date > today) {
    return 'La fecha de nacimiento no puede ser en el futuro';
  }
  
  // Verificar que no sea hace más de 150 años
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 150);
  
  if (date < minDate) {
    return 'La fecha de nacimiento no puede ser hace más de 150 años';
  }
  
  return null;
};

// Validar categoría
export const validateCategory = (categoryId) => {
  if (!categoryId) return null; // Categoría es opcional
  
  if (isNaN(categoryId) || categoryId < 1) {
    return 'La categoría seleccionada no es válida';
  }
  
  return null;
};

// Validar contacto completo
export const validateContact = (contact) => {
  const errors = {};
  
  // Validar campos requeridos
  const nameError = validateName(contact.nombre);
  if (nameError) errors.nombre = nameError;
  
  const phoneError = validatePhone(contact.telefono);
  if (phoneError) errors.telefono = phoneError;
  
  // Validar campos opcionales
  const lastNameError = validateLastName(contact.apellido);
  if (lastNameError) errors.apellido = lastNameError;
  
  const emailError = validateEmail(contact.email);
  if (emailError) errors.email = emailError;
  
  const addressError = validateAddress(contact.direccion);
  if (addressError) errors.direccion = addressError;
  
  const notesError = validateNotes(contact.notas);
  if (notesError) errors.notas = notesError;
  
  const birthDateError = validateBirthDate(contact.fechaNacimiento);
  if (birthDateError) errors.fechaNacimiento = birthDateError;
  
  const categoryError = validateCategory(contact.categoriaId);
  if (categoryError) errors.categoriaId = categoryError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validar nombre de categoría
export const validateCategoryName = (name) => {
  if (!name) return 'El nombre de la categoría es requerido';
  
  if (name.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (name.length > 50) {
    return 'El nombre no puede exceder 50 caracteres';
  }
  
  // Verificar que solo contenga letras, espacios y algunos caracteres especiales
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']+$/.test(name)) {
    return 'El nombre solo puede contener letras, espacios y guiones';
  }
  
  return null;
};

// Validar descripción de categoría
export const validateCategoryDescription = (description) => {
  if (!description) return null; // Descripción es opcional
  
  if (description.length > 200) {
    return 'La descripción no puede exceder 200 caracteres';
  }
  
  return null;
};

// Validar color de categoría
export const validateCategoryColor = (color) => {
  if (!color) return null; // Color es opcional
  
  // Verificar formato hexadecimal
  const colorRegex = /^#[0-9A-F]{6}$/i;
  if (!colorRegex.test(color)) {
    return 'El color debe estar en formato hexadecimal (#XXXXXX)';
  }
  
  return null;
};

// Validar categoría completa
export const validateCategoryData = (category) => {
  const errors = {};
  
  const nameError = validateCategoryName(category.nombre);
  if (nameError) errors.nombre = nameError;
  
  const descriptionError = validateCategoryDescription(category.descripcion);
  if (descriptionError) errors.descripcion = descriptionError;
  
  const colorError = validateCategoryColor(category.color);
  if (colorError) errors.color = colorError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Función para obtener el primer error de validación
export const getFirstError = (validationResult) => {
  if (validationResult.isValid) return null;
  
  const firstErrorKey = Object.keys(validationResult.errors)[0];
  return validationResult.errors[firstErrorKey];
};

// Función para limpiar errores de validación
export const clearValidationErrors = (setErrors) => {
  setErrors({});
};

// Función para mostrar errores de validación
export const showValidationErrors = (errors, setErrors) => {
  setErrors(errors);
  
  // Limpiar errores después de 5 segundos
  setTimeout(() => {
    setErrors({});
  }, 5000);
};
