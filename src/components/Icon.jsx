const PATHS = {
  sun: 'M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  arrow: 'M5 12h14M13 5l7 7-7 7',
  link: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1',
  star: 'M12 2l3 7 7 .6-5.3 4.7L18 22l-6-4-6 4 1.3-7.7L2 9.6 9 9z',
  fork: 'M6 3v6m0 0a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v3M6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 3v.01',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  copy: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3',
};

/**
 * Inline SVG icon set shared across the page.
 *
 * @param props
 * @param props.name - Icon key from {@link PATHS}.
 * @param props.size - Square icon size in pixels.
 */
export default function Icon({ name, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
