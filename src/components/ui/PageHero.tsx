import type { CSSProperties } from 'react';

interface PageHeroProps {
  title: string;
  image: string;
  /** Височина на банера на компютър, напр. "42vh" */
  height?: string;
  /** Височина на банера на телефон */
  mobileHeight?: string;
}

/** Банер със снимка и голямо заглавие в горната част на вътрешните страници. */
export function PageHero({ title, image, height = '42vh', mobileHeight = '35vh' }: PageHeroProps) {
  const style = {
    '--hero-image': `url('${image}')`,
    '--hero-height': height,
    '--hero-height-mobile': mobileHeight,
  } as CSSProperties;

  return (
    <section className="page-hero" style={style}>
      <h1>{title}</h1>
    </section>
  );
}
