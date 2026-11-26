import { useNavigate } from 'react-router-dom';
import { REVIEWS, SAMPLE_REVIEWS } from '../data/reviews';
import type { Review } from '../types';
import { FillButton } from './ui/FillButton';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

function Stars({ rating, label }: { rating: number; label?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars" role="img" aria-label={label ?? `${rating} от 5 звезди`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={`${n <= rounded ? 'fas' : 'far'} fa-star`} aria-hidden="true" />
      ))}
    </span>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review-card">
      <div className="review-card__top">
        <Stars rating={review.rating} />
        <i className="fas fa-quote-right review-card__quote" aria-hidden="true" />
      </div>
      <blockquote className="review-card__text">{review.text}</blockquote>
      {review.service && <p className="review-card__service">{review.service}</p>}
      <figcaption className="review-card__author">
        <span className="review-card__avatar" aria-hidden="true">
          {initials(review.name)}
        </span>
        <span>
          <strong>{review.name}</strong>
          {(review.date || review.source) && (
            <small>{[review.date, review.source && `от ${review.source}`].filter(Boolean).join(' · ')}</small>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Секция с отзиви от src/data/reviews.ts.
 * Докато няма реални отзиви, показва примерните — винаги с надпис „Примерни отзиви“.
 */
export function Reviews() {
  const navigate = useNavigate();
  const isSample = REVIEWS.length === 0;
  const reviews = isSample ? SAMPLE_REVIEWS : REVIEWS;
  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  const leaveReview = () => navigate('/contact');

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <Reveal threshold={0.2}>
        <SectionHeading title="Отзиви" subtitle="Какво казват нашите клиенти" />
      </Reveal>

      {isSample && (
        <p className="reviews__sample-note">
          <i className="fas fa-info-circle" aria-hidden="true" /> Примерни отзиви — показват как ще изглежда секцията
        </p>
      )}

      {count > 0 && (
        <>
          <Reveal delay={100}>
            <div className="reviews__summary">
              <span className="reviews__average">{average.toFixed(1)}</span>
              <div>
                <Stars rating={average} label={`Средна оценка ${average.toFixed(1)} от 5`} />
                {!isSample && (
                  <p>
                    от {count} {count === 1 ? 'отзив' : 'отзива'}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="reviews__grid">
            {reviews.map((review, i) => (
              <Reveal key={`${review.name}-${i}`} delay={(i % 3) * 120}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="reviews__cta">
              <FillButton onClick={leaveReview}>Оставете отзив</FillButton>
            </div>
          </Reveal>
        </>
      )}
    </section>
  );
}
