import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { cx } from '../../utils/format';

interface MultiSelectProps {
  id: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

/** Падащо меню с отметки — избраните опции се показват като "чипове". */
export function MultiSelect({ id, options, selected, onChange, placeholder = 'Избери...' }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Затваряне при клик извън менюто или при Escape
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option]);

  const remove = (option: string, event: MouseEvent) => {
    event.stopPropagation();
    onChange(selected.filter((s) => s !== option));
  };

  return (
    <div ref={rootRef} className={cx('multiselect', isOpen && 'is-open')}>
      <button
        id={id}
        type="button"
        className="multiselect__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected.length === 0 ? (
          <span className="multiselect__placeholder">{placeholder}</span>
        ) : (
          <span className="multiselect__chips">
            {selected.map((option) => (
              <span className="chip" key={option}>
                {option}
                <span className="chip__remove" role="button" aria-label={`Премахни ${option}`} onClick={(e) => remove(option, e)}>
                  <i className="fas fa-times" aria-hidden="true" />
                </span>
              </span>
            ))}
          </span>
        )}
        <i className="fas fa-chevron-down multiselect__arrow" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="multiselect__panel" role="listbox" aria-multiselectable="true">
          {options.map((option, i) => {
            const checked = selected.includes(option);
            return (
              <label
                key={option}
                className={cx('multiselect__option', checked && 'is-checked')}
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className="checkbox">
                  <input type="checkbox" checked={checked} onChange={() => toggle(option)} />
                  <i className="fas fa-check" aria-hidden="true" />
                </span>
                <span className="multiselect__label">{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
