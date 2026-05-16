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

const SCROLL_SPY_IDS = ['work', 'about', 'writing', 'contact'];

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'iagocalazans';
const devtoUsername = import.meta.env.VITE_DEVTO_USERNAME || 'iagocalazans';
const githubToken = import.meta.env.VITE_GITHUB_TOKEN || '';

/**
 * Page shell: owns theme state, the scroll-spy / reveal observers,
 * and assembles the editorial layout.
 */
export default function App() {
  const [theme, setTheme] = useState('light');
  const [active, setActive] = useState('work');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, []);

  return (
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
  );
}
