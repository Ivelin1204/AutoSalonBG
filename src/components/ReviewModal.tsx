import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/services';
import { useForm } from '../hooks/useForm';
import { cx } from '../utils/format';
import { validateReview, type ReviewValues } from '../utils/validation';
import { Field } from './ui/Field';

const INITIAL_VALUES: ReviewValues = { name: '', rating: '', service: '', text: '' };
const RATING_LABELS = ['', 'Лошо', 'Слабо', 'Добре', 'Много добре', 'Отлично'];

interface ReviewModalProps {
  onClose: () => void;
}

/** Прозорец за оставяне на отзив — отваря се от секцията „Отзиви“. */
export function ReviewModal({ onClose }: ReviewModalProps) {
  const [isSent, setIsSent] = useState(false);
  const [hover, setHover] = useState(0);
  const { values, errors, setValue, handleChange, handleSubmit } = useForm(INITIAL_VALUES, validateReview);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Escape затваря, страницата отдолу не се скролва, фокусът отива в първото поле
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const rating = Number(values.rating);
  const shown = hover || rating;

  // TODO: изпращане на отзива към сървър / email услуга за одобрение преди публикуване
  const onValid = () => setIsSent(true);

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Затвори">
          ✕
        </button>

        {isSent ? (
          <div className="booking__success">
            <div className="booking__check" aria-hidden="true">✓</div>
            <h2 id="review-modal-title">Благодарим ви!</h2>
            <p>Отзивът ви е получен и ще бъде публикуван след преглед.</p>
            <button type="button" className="btn-submit" onClick={onClose}>
              Затвори
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onValid)} noValidate>
            <h2 id="review-modal-title" className="modal__title">
              Оставете отзив
            </h2>
            <p className="modal__subtitle">Разкажете ни как сте доволни от услугата.</p>

            <Field id="review-rating" label="Оценка" required error={errors.rating}>
              <div className="star-input" role="radiogroup" aria-label="Оценка" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    id={n === 1 ? 'review-rating' : undefined}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} от 5 — ${RATING_LABELS[n]}`}
                    className={cx('star-input__star', n <= shown && 'is-on')}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => setValue('rating', String(n))}
                  >
                    <i className={`${n <= shown ? 'fas' : 'far'} fa-star`} aria-hidden="true" />
                  </button>
                ))}
                <span className="star-input__label">{RATING_LABELS[shown]}</span>
              </div>
            </Field>

            <div className="form-grid">
              <Field id="review-name" label="Име" required error={errors.name}>
                <input
                  ref={firstFieldRef}
                  id="review-name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Иван П."
                  autoComplete="name"
                />
              </Field>
              <Field id="review-service" label="Услуга">
                <select id="review-service" name="service" value={values.service} onChange={handleChange}>
                  <option value="">Изберете...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="review-text" label="Вашият отзив" required error={errors.text}>
              <textarea
                id="review-text"
                name="text"
                rows={4}
                value={values.text}
                onChange={handleChange}
                placeholder="Какво ви хареса?"
                maxLength={600}
              />
            </Field>

            <button type="submit" className="btn-submit">
              Изпрати отзива
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
