import type { Service } from '../types';
import { formatPrice } from '../utils/format';

interface ServiceCardProps {
  service: Service;
  /** При клик — отваря записването с тази услуга */
  onSelect?: (service: Service) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const content = (
    <>
      <h3 className="service-card__title">{service.title}</h3>
      <ul className="service-card__prices">
        {service.prices.map(({ vehicle, price }) => (
          <li key={vehicle}>
            {formatPrice(price, service.unit)} — {vehicle}
          </li>
        ))}
      </ul>
      <p className="service-card__duration">⏱ {service.duration}</p>
      {service.includes && <p className="service-card__includes">✦ {service.includes}</p>}
    </>
  );

  if (!onSelect) return <article className="service-card">{content}</article>;

  return (
    <button
      type="button"
      className="service-card service-card--clickable"
      onClick={() => onSelect(service)}
      aria-label={`Запиши час за ${service.title}`}
    >
      {content}
    </button>
  );
}
