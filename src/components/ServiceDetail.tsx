import type { Service, ServicePrice } from '../types';
import { cx, formatPrice } from '../utils/format';
import { FillButton } from './ui/FillButton';
import { Reveal } from './ui/Reveal';

interface ServiceDetailProps {
  service: Service;
  index: number;
  total: number;
  onBook: (service: Service) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

function PriceTable({ prices, unit, label }: { prices: ServicePrice[]; unit?: string; label?: string }) {
  return (
    <div className="procedure__prices">
      {label && <p className="procedure__prices-label">{label}</p>}
      {prices.map(({ vehicle, price }) => (
        <div className="procedure__price-row" key={vehicle}>
          <span>{vehicle}</span>
          <strong>{formatPrice(price, unit)}</strong>
        </div>
      ))}
    </div>
  );
}

/** Секция за една процедура — снимка от едната страна, информация от другата. Четните са огледални. */
export function ServiceDetail({ service, index, total, onBook }: ServiceDetailProps) {
  const isReversed = index % 2 === 1;
  const number = pad(index + 1);

  return (
    <article id={`service-${service.id}`} className={cx('procedure', isReversed && 'procedure--reverse')}>
      <div className="procedure__inner">
        <Reveal direction={isReversed ? 'right' : 'left'} className="procedure__media">
          <div className="procedure__image">
            <img src={service.image} alt={service.imageAlt} loading="lazy" />
            <span className="procedure__number" aria-hidden="true">
              {number}
            </span>
          </div>
        </Reveal>

        <Reveal direction={isReversed ? 'left' : 'right'} delay={150} className="procedure__body">
          <p className="eyebrow">
            Процедура {number} / {pad(total)}
          </p>
          <h3 className="procedure__title">{service.title}</h3>
          <div className="divider divider--left" />
          <p className="procedure__desc">{service.description}</p>

          <h4 className="procedure__subtitle">Какво включва</h4>
          <ul className="procedure__features">
            {service.features.map((feature) => (
              <li key={feature}>
                <i className="fas fa-check" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="procedure__subtitle">Цени</h4>
          <div className={cx('procedure__price-tables', service.altPrices && 'procedure__price-tables--split')}>
            <PriceTable prices={service.prices} unit={service.unit} label={service.altPrices ? 'Текстилен салон' : undefined} />
            {service.altPrices && (
              <PriceTable prices={service.altPrices.prices} unit={service.unit} label={service.altPrices.label} />
            )}
          </div>

          <p className="procedure__duration">
            <i className="far fa-clock" aria-hidden="true" />
            {service.duration}
            <span>в зависимост от състоянието на автомобила</span>
          </p>

          <FillButton onClick={() => onBook(service)}>Запиши час</FillButton>
        </Reveal>
      </div>
    </article>
  );
}
