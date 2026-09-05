export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface LoginErrors {
  readonly email?: string;
  readonly password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

/**
 * Pure validation for the login form. Returns a map of field -> message;
 * an empty map means the input format is valid, not that the user is authenticated. Designed to be unit-tested
 * without rendering.
 */
export function validateLogin(credentials: LoginCredentials): LoginErrors {
  const errors: { email?: string; password?: string } = {};

  const email = credentials.email.trim();
  if (email.length === 0) {
    errors.email = "L'adresse e-mail est requise.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "L'adresse e-mail n'est pas valide.";
  }

  if (credentials.password.length === 0) {
    errors.password = "Le mot de passe est requis.";
  } else if (credentials.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`;
  }

  return errors;
}

export function isValidLogin(credentials: LoginCredentials): boolean {
  return Object.keys(validateLogin(credentials)).length === 0;
}
