import { SITE } from '../../data/site';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} <span>{SITE.name}</span>. Всички права запазени.
      </p>
    </footer>
  );
}
