export type FormErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isBlank = (value: string): boolean => value.trim().length === 0;
export const isEmail = (value: string): boolean => EMAIL_PATTERN.test(value.trim());

/** Номер на автомобил — винаги с главни букви */
export const normalizePlate = (value: string): string => value.toUpperCase();
/** Телефон — само цифри, +, -, интервали и скоби */
export const normalizePhone = (value: string): string => value.replace(/[^\d+\-\s()]/g, '');

export type BookingValues = {
  firstName: string;
  lastName: string;
  plate: string;
  email: string;
  phone: string;
  services: string[];
};

export type ContactValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function validateEmail(email: string): string | undefined {
  if (isBlank(email)) return 'Въведете email.';
  if (!isEmail(email)) return 'Невалиден email адрес.';
  return undefined;
}

export function validateBooking(values: BookingValues): FormErrors<BookingValues> {
  const errors: FormErrors<BookingValues> = {};
  if (isBlank(values.firstName)) errors.firstName = 'Въведете име.';
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  if (values.services.length === 0) errors.services = 'Изберете поне една услуга.';
  return errors;
}

export function validateContact(values: ContactValues): FormErrors<ContactValues> {
  const errors: FormErrors<ContactValues> = {};
  if (isBlank(values.name)) errors.name = 'Въведете име и фамилия.';
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  return errors;
}
