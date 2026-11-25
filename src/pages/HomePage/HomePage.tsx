import { useRef, type CSSProperties } from 'react';
import { FillButton } from '../../components/ui/FillButton';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ServiceCard } from '../../components/ServiceCard';
import { useBooking } from '../../hooks/useBooking';
import { IMAGES } from '../../data/images';
import { SERVICES } from '../../data/services';
import './HomePage.css';

export default function HomePage() {
  const goBook = useBooking();
  const servicesRef = useRef<HTMLElement>(null);

  const heroStyle = { '--hero-image': `url('${IMAGES.homeHero}')` } as CSSProperties;

  return (
    <main className="page">
      <section className="hero" style={heroStyle}>
        <div className="hero__content">
          <h1 className="hero__title">
            Автокозметичен Център
            <br />
            <span>Auto Salon BG</span>
          </h1>
          <p className="hero__subtitle">Специално внимание на вашия автомобил</p>
          <FillButton onClick={() => goBook()}>Запиши час сега</FillButton>
        </div>

        <button
          type="button"
          className="scroll-indicator"
          onClick={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Към услугите"
        >
          <span>Scroll</span>
          <span className="scroll-indicator__arrow" aria-hidden="true" />
        </button>
      </section>

      <section className="services" ref={servicesRef}>
        <Reveal threshold={0.2}>
          <SectionHeading title="Услуги" subtitle="Видове измиване и обработка" />
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 120}>
              <ServiceCard service={service} onSelect={(s) => goBook(s.title)} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
