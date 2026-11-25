import type { ContactItem, NavItem, SocialLink } from '../types';

export const SITE = {
  name: 'Auto Salon Bulgaria',
  currency: 'лв.',
  phone: '+359 87 631 9542',
  email: 'auto_salon@website.com',
  address: 'Център, Пловдив, България',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23667.04548570294!2d24.725344283606777!3d42.14213982131602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1b09a7b7321%3A0xcea683bb97f2a9a1!2z0J_Qu9C-0LLQtNC40LjQsg!5e0!3m2!1sbg!2sbg!4v1713960368851!5m2!1sbg!2sbg',
  videoEmbedUrl: 'https://www.youtube.com/embed/FWcr6TgLPFA',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Начало', path: '/' },
  { label: 'За нас', path: '/about' },
  { label: 'Галерия', path: '/gallery' },
  { label: 'Контакти', path: '/contact' },
];

export const CONTACT_ITEMS: ContactItem[] = [
  { icon: 'fa-map-marker-alt', label: 'Адрес', value: SITE.address },
  { icon: 'fa-phone', label: 'Телефон', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { icon: 'fa-envelope', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: 'fa-facebook-f', label: 'Facebook', href: '#' },
  { icon: 'fa-youtube', label: 'YouTube', href: '#' },
  { icon: 'fa-twitter', label: 'Twitter', href: '#' },
  { icon: 'fa-google', label: 'Google', href: '#' },
];
