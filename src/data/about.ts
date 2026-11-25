import type { Stat } from '../types';

export const ABOUT_TEXT =
  'Auto Salon Bulgaria е най-доброто автомобилно съоръжение в София, Пловдив и Плевен. ' +
  'В ASB вярваме, че всяко превозно средство е уникално и работим в тясно сътрудничество ' +
  'с нуждите и идеите на нашите клиенти, за да постигнем максимални резултати.';

export const STATS: Stat[] = [
  { icon: 'fa-map-marker-alt', value: '3', label: 'Града', description: 'София, Пловдив и Плевен' },
  { icon: 'fa-star', value: '500+', label: 'Клиенти', description: 'Доволни и върнали се клиенти' },
  { icon: 'fa-wrench', value: '5', label: 'Услуги', description: 'Измиване, вакса, полиране' },
];
