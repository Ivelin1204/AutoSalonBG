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
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
  description: string;
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
