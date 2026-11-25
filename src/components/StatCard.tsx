import type { Stat } from '../types';

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="stat-card">
      <i className={`fas ${stat.icon} stat-card__icon`} aria-hidden="true" />
      <div className="stat-card__value">{stat.value}</div>
      <div className="stat-card__label">{stat.label}</div>
      <p className="stat-card__desc">{stat.description}</p>
    </div>
  );
}
