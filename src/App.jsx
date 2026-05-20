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

const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|outbrain|pinterest|slackbot|telegrambot|whatsapp|linkedinbot|gptbot|oai-searchbot|chatgpt|claudebot|claude-web|anthropic|perplexity|ccbot|google-extended|cohere|bytespider|amazonbot|applebot|petalbot/i;

/**
 * Resolves the view mode for the first render.
 *
 * An explicit `?view=` query (or `#ats` hash) always wins, so the ATS document
 * is shareable via a deep link. Otherwise a known crawler / LLM user-agent is
 * routed straight to the machine-readable view; everyone else gets the editorial
 * layout. This complements the build-time pre-render: JS-capable agents land on
 * the ATS view, JS-less ones still read the baked `<noscript>` / JSON-LD payload.
 *
 * @returns {'human' | 'ats'} The view to mount first.
 */
function resolveInitialView() {
  if (typeof window === 'undefined') return 'human';
  const requested = new URLSearchParams(window.location.search).get('view');
  if (requested === 'ats' || requested === 'human') return requested;
  if (window.location.hash === '#ats') return 'ats';
  if (BOT_UA_PATTERN.test(window.navigator.userAgent)) return 'ats';
  return 'human';
}

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
  const [view, setView] = useState(resolveInitialView);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (view === 'ats') {
      url.searchParams.set('view', 'ats');
    } else {
      url.searchParams.delete('view');
    }
    window.history.replaceState(null, '', url);
  }, [view]);

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
    if (!nodes.length) return undefined;

    const HEADER_OFFSET = 100;

    const syncActive = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (reachedBottom) {
        setActive(nodes[nodes.length - 1].id);
        return;
      }
      let current = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top > HEADER_OFFSET) break;
        current = node.id;
      }
      setActive(current);
    };

    syncActive();
    window.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive, { passive: true });
    return () => {
      window.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', syncActive);
    };
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
