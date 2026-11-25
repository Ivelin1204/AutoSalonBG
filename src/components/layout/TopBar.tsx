import { CONTACT_ITEMS, SITE, SOCIAL_LINKS } from '../../data/site';

const phoneHref = CONTACT_ITEMS.find((item) => item.label === 'Телефон')?.href;

/** Червената лента над менюто — телефон, адрес и социални мрежи. */
export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__info">
        <a href={phoneHref} className="topbar__item">
          <i className="fas fa-phone" aria-hidden="true" />
          {SITE.phone}
        </a>
        <span className="topbar__item topbar__item--address">
          <i className="fas fa-map-marker-alt" aria-hidden="true" />
          {SITE.address}
        </span>
      </div>

      <div className="topbar__socials">
        {SOCIAL_LINKS.map((social) => (
          <a key={social.label} href={social.href} aria-label={social.label}>
            <i className={`fab ${social.icon}`} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
