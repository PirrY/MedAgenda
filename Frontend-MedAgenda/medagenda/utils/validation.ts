/**
 * Utilidades de validación y sanitización para inputs
 */

// Límites de caracteres para diferentes tipos de campos
export const INPUT_LIMITS = {
  NAME: 100,
  EMAIL: 254, // RFC 5321
  PHONE: 20,
  ADDRESS: 200,
  DESCRIPTION: 1000,
  SEARCH: 100,
  PASSWORD: 128,
  GENERAL_TEXT: 500,
};

/**
 * Sanitiza un string eliminando caracteres peligrosos
 */
export function sanitizeString(input: string): string {
  if (!input) return '';

  // Eliminar caracteres de control excepto espacios, tabs y saltos de línea
  let sanitized = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Eliminar scripts potencialmente peligrosos
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');

  return sanitized.trim();
}

/**
 * Valida que un string no exceda el límite de caracteres
 */
export function validateLength(
  input: string,
  maxLength: number,
  minLength: number = 0
): { valid: boolean; error?: string } {
  if (!input || input.length < minLength) {
    return {
      valid: false,
      error: `Debe tener al menos ${minLength} caracteres`,
    };
  }

  if (input.length > maxLength) {
    return {
      valid: false,
      error: `No puede exceder ${maxLength} caracteres`,
    };
  }

  return { valid: true };
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const sanitized = sanitizeString(email);

  if (!sanitized) {
    return { valid: false, error: 'El email es requerido' };
  }

  const lengthCheck = validateLength(sanitized, INPUT_LIMITS.EMAIL);
  if (!lengthCheck.valid) return lengthCheck;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return { valid: false, error: 'Formato de email inválido' };
  }

  return { valid: true };
}

/**
 * Valida formato de teléfono
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const sanitized = sanitizeString(phone);

  if (!sanitized) {
    return { valid: false, error: 'El teléfono es requerido' };
  }

  const lengthCheck = validateLength(sanitized, INPUT_LIMITS.PHONE);
  if (!lengthCheck.valid) return lengthCheck;

  // Permitir números, espacios, guiones, paréntesis y el símbolo +
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(sanitized)) {
    return { valid: false, error: 'Formato de teléfono inválido' };
  }

  return { valid: true };
}

/**
 * Valida que un nombre solo contenga caracteres válidos
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  const sanitized = sanitizeString(name);

  if (!sanitized) {
    return { valid: false, error: 'El nombre es requerido' };
  }

  const lengthCheck = validateLength(sanitized, INPUT_LIMITS.NAME, 1);
  if (!lengthCheck.valid) return lengthCheck;

  // Permitir letras (incluyendo acentos), espacios, guiones y apóstrofes
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;
  if (!nameRegex.test(sanitized)) {
    return { valid: false, error: 'Solo se permiten letras, espacios y guiones' };
  }

  return { valid: true };
}

/**
 * Trunca un string al límite especificado
 */
export function truncateString(input: string, maxLength: number): string {
  if (!input) return '';
  const sanitized = sanitizeString(input);
  return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

/**
 * Valida contraseña
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: 'La contraseña es requerida' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'La contraseña debe tener al menos 8 caracteres' };
  }

  if (password.length > INPUT_LIMITS.PASSWORD) {
    return { valid: false, error: `La contraseña no puede exceder ${INPUT_LIMITS.PASSWORD} caracteres` };
  }

  // Verificar que contenga al menos una letra y un número
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    return { valid: false, error: 'La contraseña debe contener al menos una letra y un número' };
  }

  return { valid: true };
}
