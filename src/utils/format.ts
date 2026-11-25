import { SITE } from '../data/site';

/** Форматира цена с валутата на сайта, напр. 28 → "28 лв.", с единица → "35 лв./бр." */
export function formatPrice(price: number, unit = ''): string {
  return `${price} ${SITE.currency}${unit}`;
}

/** Обединява CSS класове, като пропуска празните/false стойности. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
