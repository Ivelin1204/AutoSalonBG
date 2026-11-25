import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { GalleryImage } from '../types';
import { cx } from '../utils/format';
import { Reveal } from './ui/Reveal';

interface SlideshowProps {
  images: GalleryImage[];
  /** Интервал на автоматичното превъртане в ms */
  interval?: number;
}

const SWIPE_THRESHOLD = 40;

/**
 * Карусел: активната снимка е в центъра, а съседните се виждат отстрани — по-малки и потъмнени.
 * Върти се безкрайно, сменя се автоматично, с клик върху съседна снимка, стрелки, точки или плъзгане.
 */
export function Slideshow({ images, interval = 4000 }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);
  // След плъзгане с мишка браузърът праща и click — той не трябва да връща снимката обратно
  const didSwipe = useRef(false);
  const count = images.length;

  const goTo = (next: number, dir: 1 | -1 = next > index ? 1 : -1) => {
    setDirection(dir);
    setIndex(((next % count) + count) % count);
  };
  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  // Таймерът се рестартира при всяка смяна, за да не "прескача" веднага след ръчно превъртане
  useEffect(() => {
    if (count < 2 || isPaused) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [index, count, interval, isPaused]);

  if (count === 0) return null;

  /** Позиция спрямо активната снимка: 0 = център, ±1 = съседни, останалите са скрити отстрани */
  const offsetOf = (i: number) => {
    let d = (((i - index) % count) + count) % count;
    if (d > count / 2) d -= count;
    // При четен брой снимки противоположната е "по средата" — слагаме я откъм посоката на движение
    if (count % 2 === 0 && Math.abs(d) === count / 2) d = direction * (count / 2);
    return d;
  };

  const onPointerDown = (e: PointerEvent) => {
    didSwipe.current = false;
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    didSwipe.current = true;
    if (delta < 0) next();
    else prev();
  };

  return (
    <Reveal delay={100}>
      <div
        className="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Галерия"
      >
        <div
          className="carousel__stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {images.map((image, i) => {
            const d = offsetOf(i);
            const isActive = d === 0;
            const isVisible = Math.abs(d) <= 1;
            return (
              <button
                key={image.src}
                type="button"
                className={cx('carousel__slide', isActive && 'is-active', !isVisible && 'is-hidden')}
                style={{ '--offset': d } as CSSProperties}
                onClick={() => {
                  if (didSwipe.current) {
                    didSwipe.current = false;
                    return;
                  }
                  if (!isActive) goTo(i, d > 0 ? 1 : -1);
                }}
                tabIndex={isActive || !isVisible ? -1 : 0}
                aria-hidden={!isVisible}
                aria-label={isActive ? image.alt : `Покажи: ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} draggable={false} loading={isVisible ? 'eager' : 'lazy'} />
              </button>
            );
          })}

          <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={prev} aria-label="Предишна снимка">
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button type="button" className="carousel__arrow carousel__arrow--next" onClick={next} aria-label="Следваща снимка">
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>

        <div className="carousel__footer">
          <span className="carousel__counter">
            {String(index + 1).padStart(2, '0')}
            <span> / {String(count).padStart(2, '0')}</span>
          </span>
          <div className="carousel__dots">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className={cx('carousel__dot', i === index && 'is-active')}
                onClick={() => goTo(i)}
                aria-label={`Снимка ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
