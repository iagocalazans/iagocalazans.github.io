import Icon from './Icon.jsx';

const NAV_ITEMS = [
  { id: 'work', label: 'work' },
  { id: 'about', label: 'about' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
];

/**
 * Sticky-feeling top bar with availability marker, in-page navigation, and theme toggle.
 *
 * @param props
 * @param props.theme - Active theme, "light" or "dark".
 * @param props.setTheme - Setter that flips the active theme.
 * @param props.active - Section id currently in view (drives the active nav pill).
 */
export default function TopBar({ theme, setTheme, active }) {
  return (
    <header className="topbar">
      <div className="mark">
        <span className="dot" />
        <span>
          <strong>iago calazans</strong> · available for select work, Q3 ’26
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
