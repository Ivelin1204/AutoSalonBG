# Auto Salon BG

Сайт на автокозметичен център **Auto Salon BG** — React + TypeScript, изграден с Vite.

## Стартиране

```bash
npm install      # веднъж — инсталира зависимостите
npm run dev      # локален сървър с автоматично презареждане
npm run build    # готов сайт в папка dist/
npm run preview  # преглед на готовия build
```

`npm run build` създава **един самостоятелен файл** `dist/index.html` (+ `favicon.jpg`), който работи
и при отваряне с двоен клик, и качен на GitHub Pages.

## Структура

```
src/
├── main.tsx                  входна точка
├── App.tsx                   маршрути (Начало, За нас, Галерия, Запиши час, Контакти)
├── components/
│   ├── layout/               Navbar, Footer, ScrollToTop
│   ├── chat/                 ChatWidget (виртуален асистент)
│   ├── ui/                   Reveal, FillButton, SectionHeading, PageHero, Field, MultiSelect
│   ├── ServiceDetail.tsx     голяма секция за една процедура (снимка + информация)
│   ├── Reviews.tsx           секция с отзиви
│   ├── ReviewModal.tsx       прозорец за оставяне на отзив
│   ├── StatCard.tsx
│   └── Slideshow.tsx
├── pages/                    всяка страница със собствен .css файл
│   ├── HomePage/
│   ├── AboutPage/
│   ├── GalleryPage/
│   ├── BookingPage/
│   └── ContactPage/
├── data/                     цялото съдържание на сайта
│   ├── site.ts               име, телефон, email, адрес, валута, меню, социални мрежи
│   ├── services.ts           услуги и цени
│   ├── about.ts              текст „За нас“ и статистики
│   ├── gallery.ts            снимки в галерията
│   └── images.ts             фонови снимки на страниците
├── hooks/                    useInView (анимации при скрол), useCountUp (броене на числа), useForm (форми), useBooking
├── utils/                    форматиране на цени, валидация на форми, chatBot (отговори на асистента)
├── types/                    TypeScript типове
└── styles/                   глобални стилове: токени (цветове, шрифтове), база, анимации, компоненти
```

## Как да променя…

| Какво | Къде |
| --- | --- |
| Цени, услуги, описания, „какво включва“ и снимки на процедурите | `src/data/services.ts` |
| Валута (лв. → €) | `currency` в `src/data/site.ts` |
| Телефон, email, адрес, карта | `src/data/site.ts` |
| Статистики в „За нас“ (числа, текст, етикети) | `src/data/about.ts` |
| Отзиви от клиенти | `src/data/reviews.ts` — реалните в `REVIEWS`; докато е празен, се показват примерните с надпис |
| Снимки | `src/data/gallery.ts`, `src/data/images.ts` (локални снимки се слагат в `public/images/`) |
| Цветове и шрифтове | `src/styles/tokens.css` |
| Отговори на чатбота | `src/utils/chatBot.ts` |

## Публикуване в GitHub Pages

В репото има готов workflow (`.github/workflows/deploy.yml`). След push към `main`:
**Settings → Pages → Source: GitHub Actions** — сайтът се публикува автоматично.
