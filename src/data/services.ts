import type { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'standard-wash',
    title: 'Стандартно комплексно измиване',
    prices: [
      { vehicle: 'Лек автомобил', price: 28 },
      { vehicle: 'SUV / Миниван', price: 32 },
      { vehicle: 'Джип', price: 35 },
      { vehicle: 'X7 / GLS / XC90', price: 40 },
    ],
    duration: '50 – 70 мин.',
  },
  {
    id: 'vip-wash',
    title: 'ВИП комплексно измиване',
    prices: [
      { vehicle: 'Лек автомобил', price: 33 },
      { vehicle: 'SUV / Миниван', price: 36 },
      { vehicle: 'Джип', price: 40 },
      { vehicle: 'X7 / GLS / XC90', price: 45 },
    ],
    duration: '60 – 75 мин.',
  },
  {
    id: 'hard-wax',
    title: 'Твърда вакса',
    prices: [
      { vehicle: 'Лек автомобил', price: 80 },
      { vehicle: 'SUV / Миниван', price: 85 },
      { vehicle: 'Джип', price: 90 },
    ],
    duration: '80 – 90 мин.',
    includes: 'Включва ВИП измиване + нанасяне на твърда вакса',
  },
  {
    id: 'upholstery',
    title: 'Пране на тапицерия / кожен салон',
    prices: [
      { vehicle: 'Лек автомобил', price: 160 },
      { vehicle: 'SUV / Миниван', price: 170 },
      { vehicle: 'Джип', price: 180 },
    ],
    duration: '120 – 180 мин.',
    includes: 'Включва ВИП измиване + пране',
  },
  {
    id: 'headlights',
    title: 'Полиране на фарове',
    prices: [
      { vehicle: 'Лек автомобил', price: 35 },
      { vehicle: 'SUV / Миниван', price: 40 },
      { vehicle: 'Джип', price: 45 },
    ],
    unit: '/бр.',
    duration: '60 – 80 мин.',
  },
];
