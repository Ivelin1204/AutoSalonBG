import type { CSSProperties } from 'react';
import { Reveal } from '../../components/ui/Reveal';
import { Reviews } from '../../components/Reviews';
import { StatCard } from '../../components/StatCard';
import { ABOUT_TEXT, STATS } from '../../data/about';
import { IMAGES } from '../../data/images';
import './AboutPage.css';

export default function AboutPage() {
  const heroStyle = { '--hero-image': `url('${IMAGES.aboutHero}')` } as CSSProperties;

  return (
    <main className="page">
      <section className="about-hero" style={heroStyle}>
        <div className="about-hero__content">
          <p className="eyebrow">Кои сме ние</p>
          <h1>За нас</h1>
          <div className="divider divider--spaced" />
          <p className="about-hero__text">{ABOUT_TEXT}</p>
        </div>
      </section>

      <section className="stats">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 150} threshold={0.2}>
            <StatCard stat={stat} />
          </Reveal>
        ))}
      </section>

      <Reviews />
    </main>
  );
}
