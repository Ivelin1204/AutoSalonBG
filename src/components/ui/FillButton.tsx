import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface FillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Прозрачен бутон, в който при hover отляво се плъзга червен фон. */
export function FillButton({ children, type = 'button', ...rest }: FillButtonProps) {
  return (
    <button type={type} className="btn-fill" {...rest}>
      <span className="btn-fill__bg" aria-hidden="true" />
      <span className="btn-fill__text">{children}</span>
    </button>
  );
}
