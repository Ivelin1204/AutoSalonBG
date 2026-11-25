import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { FormErrors } from '../utils/validation';

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type FormValue = string | string[];

/** Малък хук за контролирани форми: стойности, грешки, onChange и onSubmit. */
export function useForm<T extends Record<string, FormValue>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleChange = (event: ChangeEvent<FieldElement>) => {
    setValue(event.target.name as keyof T, event.target.value as T[keyof T]);
  };

  const handleSubmit = (onValid: (values: T) => void) => (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onValid(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValue, handleChange, handleSubmit, reset };
}
