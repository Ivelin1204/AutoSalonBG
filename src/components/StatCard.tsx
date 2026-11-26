import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import type { Stat } from '../types';
import { cx } from '../utils/format';

export function StatCard({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const count = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className={cx('stat-card', stat.highlight && 'stat-card--highlight')}>
      <div className="stat-card__head">
        <span className="stat-card__icon" aria-hidden="true">
          <i className={`fas ${stat.icon}`} />
        </span>
        <div>
          <div className="stat-card__value" aria-label={`${stat.value}${stat.suffix ?? ''}`}>
            {count}
            {stat.suffix && <span>{stat.suffix}</span>}
          </div>
          <div className="stat-card__label">{stat.label}</div>
        </div>
      </div>

      <p className="stat-card__desc">{stat.description}</p>

      <ul className="stat-card__tags">
        {stat.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
