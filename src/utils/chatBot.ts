import { SERVICES } from '../data/services';
import { SITE } from '../data/site';
import type { Service } from '../types';
import { formatPrice } from './format';

export interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  /** Показва бутон "Към записване" под съобщението */
  action?: 'book';
  actionService?: string;
}

export const QUICK_REPLIES = ['Услуги и цени', 'Запази час', 'Контакти'];

export const WELCOME_MESSAGE: ChatMessage = {
  from: 'bot',
  text: 'Здравейте! Аз съм виртуалният асистент на Auto Salon BG 🚗 Мога да помогна с информация за услуги, цени и записване на час. Как мога да помогна?',
};

const SERVICE_KEYWORDS: Record<string, string[]> = {
  'standard-wash': ['стандарт'],
  'vip-wash': ['вип', 'vip'],
  'hard-wax': ['вакса'],
  upholstery: ['тапицер', 'кожен салон', 'пране'],
  headlights: ['фар', 'полиране'],
};

function matchService(text: string): Service | undefined {
  return (
    SERVICES.find((s) => text.includes(s.title.toLowerCase())) ??
    SERVICES.find((s) => (SERVICE_KEYWORDS[s.id] ?? []).some((k) => text.includes(k)))
  );
}

function describeService(service: Service): string {
  const prices = service.prices.map((p) => `${formatPrice(p.price, service.unit)} — ${p.vehicle}`).join('\n');
  return `${service.title}:\n${prices}\n⏱ ${service.duration}${service.includes ? `\n✦ ${service.includes}` : ''}`;
}

const bot = (text: string, extra: Partial<ChatMessage> = {}): ChatMessage => ({ from: 'bot', text, ...extra });

/** Прост чатбот по ключови думи — без външни услуги. */
export function getBotReply(input: string): ChatMessage {
  const text = input.toLowerCase();

  if (/(здрав|здрасти|hi|hello|добър ден|добро утро)/.test(text)) {
    return bot('Здравейте! С какво мога да помогна? Питайте ме за услуги, цени, запазване на час или контакти.');
  }
  if (/(запиш|запаз|резерв|час за)/.test(text)) {
    return bot('Разбира се! Можете да запишете час направо оттук.', { action: 'book' });
  }

  const service = matchService(text);
  if (service) return bot(describeService(service), { action: 'book', actionService: service.title });

  if (/(цена|цени|колко струва|тарифа)/.test(text)) {
    const list = SERVICES.map((s) => `• ${s.title} — от ${formatPrice(s.prices[0].price, s.unit)}`).join('\n');
    return bot(`Ето нашите услуги и стартови цени:\n${list}`);
  }
  if (/(контакт)/.test(text)) {
    return bot(`Адрес: ${SITE.address}\nТелефон: ${SITE.phone}\nEmail: ${SITE.email}`);
  }
  if (/(адрес|къде се намирате|локация)/.test(text)) return bot(`Намираме се на: ${SITE.address}`);
  if (/(телефон|позвън|обадете)/.test(text)) return bot(`Можете да ни се обадите на ${SITE.phone}`);
  if (/(имейл|email|поща)/.test(text)) return bot(`Пишете ни на ${SITE.email}`);
  if (/(работно време|отворени|часове на работа)/.test(text)) {
    return bot(`За точното работно време, моля свържете се с нас на ${SITE.phone}.`);
  }

  return bot(
    `Не съм сигурен, че разбрах напълно. Опитайте да попитате за услуги, цени, запазване на час или контакти, или се обадете на ${SITE.phone}.`,
  );
}
