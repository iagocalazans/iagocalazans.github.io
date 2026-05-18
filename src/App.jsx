import { useEffect, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import Hero from './components/Hero.jsx';
import Feature from './components/Feature.jsx';
import Archive from './components/Archive.jsx';
import About from './components/About.jsx';
import Stack from './components/Stack.jsx';
import Experience from './components/Experience.jsx';
import Writing from './components/Writing.jsx';
import Contact from './components/Contact.jsx';
import ViewToggle from './components/ViewToggle.jsx';
import AtsView from './components/AtsView.jsx';

const SCROLL_SPY_IDS = ['work', 'about', 'writing', 'contact'];

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'iagocalazans';
const devtoUsername = import.meta.env.VITE_DEVTO_USERNAME || 'iagocalazans';
const githubToken = import.meta.env.VITE_GITHUB_TOKEN || '';

/**
 * Page shell: owns theme + view-mode state, the scroll-spy / reveal observers,
 * and assembles the editorial layout (or the ATS markdown render).
 */
export default function App() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const [active, setActive] = useState('work');
  const [view, setView] = useState('human');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setTheme(event.matches ? 'dark' : 'light');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-view', view);
  }, [view]);

  useEffect(() => {
    if (view !== 'human') return undefined;
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (view !== 'human') return undefined;
    const nodes = SCROLL_SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [view]);

  return (
    <>
      <ViewToggle view={view} setView={setView} />
      {view === 'human' ? (
        <div className="page">
          <TopBar theme={theme} setTheme={setTheme} active={active} />
          <Hero />
          <Feature />
          <Archive username={githubUsername} token={githubToken} />
          <About />
          <Stack />
          <Experience />
          <Writing username={devtoUsername} />
          <Contact />
        </div>
      ) : (
        <AtsView
          githubUsername={githubUsername}
          githubToken={githubToken}
          devtoUsername={devtoUsername}
        />
      )}
    </>
  );
}
