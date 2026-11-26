export interface NavItem {
  label: string;
  path: string;
}

export interface ServicePrice {
  vehicle: string;
  price: number;
}

export interface Service {
  id: string;
  title: string;
  prices: ServicePrice[];
  /** Мерна единица след цената, напр. "/бр." */
  unit?: string;
  duration: string;
  includes?: string;
  /** Подробно описание за секцията на процедурата */
  description: string;
  /** Какво включва процедурата */
  features: string[];
  image: string;
  imageAlt: string;
  /** Допълнителен ценоразпис, напр. за кожен салон */
  altPrices?: { label: string; prices: ServicePrice[] };
}

export interface Stat {
  icon: string;
  /** Числото, до което брои анимацията */
  value: number;
  /** Знак след числото, напр. "+" */
  suffix?: string;
  label: string;
  description: string;
  /** Кратки етикети под описанието, напр. градовете */
  tags: string[];
  /** Маркира картата с червена линия отдолу */
  highlight?: boolean;
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Review {
  /** Име на клиента, както е съгласен да се покаже */
  name: string;
  /** Оценка от 1 до 5 */
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Коя услуга е ползвал, напр. "Твърда вакса" */
  service?: string;
  /** Кога е написан, напр. "Октомври 2026" */
  date?: string;
  /** Откъде е отзивът, напр. "Google" или "Facebook" */
  source?: string;
}
