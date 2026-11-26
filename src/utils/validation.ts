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

export type ReviewValues = {
  name: string;
  /** "1"–"5", или "" докато не е избрана оценка */
  rating: string;
  service: string;
  text: string;
};

const MIN_REVIEW_LENGTH = 10;

export function validateReview(values: ReviewValues): FormErrors<ReviewValues> {
  const errors: FormErrors<ReviewValues> = {};
  if (isBlank(values.name)) errors.name = 'Въведете име.';
  if (!values.rating) errors.rating = 'Изберете оценка.';
  if (values.text.trim().length < MIN_REVIEW_LENGTH) errors.text = `Напишете поне ${MIN_REVIEW_LENGTH} символа.`;
  return errors;
}
