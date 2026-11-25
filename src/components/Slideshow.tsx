import { useEffect, useState } from 'react';
import type { GalleryImage } from '../types';
import { cx } from '../utils/format';
import { Reveal } from './ui/Reveal';

interface SlideshowProps {
  images: GalleryImage[];
  /** Интервал на автоматичното превъртане в ms */
  interval?: number;
}

export function Slideshow({ images, interval = 4000 }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const goTo = (next: number) => setIndex((next + count) % count);

  // Таймерът се рестартира при всяка смяна, така ръчното превъртане не "прескача" веднага.
  useEffect(() => {
    if (count < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [index, count, interval]);

  if (count === 0) return null;
  const current = images[index];

  return (
    <div className="slideshow">
      <Reveal delay={100}>
        <div className="slideshow__main">
          <img key={current.src} src={current.src} alt={current.alt} />
          <button type="button" className="slideshow__arrow slideshow__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Предишна снимка">
            &#8249;
          </button>
          <button type="button" className="slideshow__arrow slideshow__arrow--next" onClick={() => goTo(index + 1)} aria-label="Следваща снимка">
            &#8250;
          </button>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="slideshow__thumbs">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={cx('slideshow__thumb', i === index && 'is-active')}
              onClick={() => goTo(i)}
              aria-label={`Снимка ${i + 1}`}
              aria-current={i === index}
            >
              <img src={image.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
