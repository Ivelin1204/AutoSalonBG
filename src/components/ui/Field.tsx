import type { ReactNode } from 'react';
import { cx } from '../../utils/format';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

/** Обвивка за поле във форма: етикет, самото поле и съобщение за грешка. */
export function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div className={cx('field', error && 'field--error')}>
      <label htmlFor={id}>
        {label}
        {required && ' *'}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
