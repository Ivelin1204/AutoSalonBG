import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/site';
import { cx } from '../../utils/format';

const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'is-active' : undefined);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <header className="navbar">
        <Link to="/" className="navbar__logo" aria-label="Auto Salon BG – начало">
          AUTO <span>SALON</span> BG
        </Link>

        <nav aria-label="Основна навигация">
          <ul className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'} className={activeClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Отвори менюто"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <aside id="mobile-menu" className={cx('mobile-menu', isOpen && 'is-open')} aria-hidden={!isOpen}>
        <button type="button" className="mobile-menu__close" onClick={() => setIsOpen(false)} aria-label="Затвори менюто">
          ✕
        </button>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
            {item.label}
          </NavLink>
        ))}
      </aside>
    </>
  );
}
