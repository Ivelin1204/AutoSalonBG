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
