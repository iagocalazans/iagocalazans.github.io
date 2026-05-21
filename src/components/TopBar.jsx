import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

const NAV_ITEMS = [
  { id: 'work', label: 'work' },
  { id: 'about', label: 'about' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
];

const SCROLL_THRESHOLD = 12;

/**
 * Sticky top bar with availability marker, in-page navigation, and theme toggle.
 *
 * Pins to the top of the viewport while navigating and slims into a thinner,
 * divider-backed bar once the page scrolls past {@link SCROLL_THRESHOLD}.
 *
 * @param props
 * @param props.theme - Active theme, "light" or "dark".
 * @param props.setTheme - Setter that flips the active theme.
 * @param props.active - Section id currently in view (drives the active nav pill).
 */
export default function TopBar({ theme, setTheme, active }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <div className="mark">
        <span className="dot" />
        <span>
          <strong>iago calazans</strong> · available for select work, Q2 ’26
        </span>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}>
            {item.label}
          </a>
        ))}
        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={14} />
        </button>
      </nav>
    </header>
  );
}
