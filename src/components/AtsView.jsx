import { useMemo, useState } from 'react';
import { buildMarkdown } from '../data/resume.js';
import { useGithubRepos } from '../hooks/useGithubRepos.js';
import { useDevPosts } from '../hooks/useDevPosts.js';

/**
 * Reads the build-time snapshot the pre-render plugin embeds on `window`, so the
 * ATS view can render the exact payload baked into the static HTML instantly,
 * before the live GitHub/dev.to requests resolve.
 *
 * @returns {{ repos: Array<object>, posts: Array<object> }} The seeded snapshot.
 */
function readSeed() {
  if (typeof window === 'undefined' || !window.__RESUME__) return { repos: [], posts: [] };
  const { repos = [], posts = [] } = window.__RESUME__;
  return { repos, posts };
}

/**
 * Renders the same portfolio content as a flat, plaintext/markdown document,
 * the kind of structured payload an ATS (Applicant Tracking System) or LLM agent
 * can parse without hitting the visual layout.
 *
 * It is seeded with the build-time snapshot embedded in the HTML, then upgrades
 * to live GitHub/dev.to data once those requests resolve, so what the toggle
 * shows always matches (or extends) what crawlers read from the static markup.
 *
 * @param props
 * @param props.githubUsername - GitHub login used to fetch live repos.
 * @param props.githubToken - Optional GitHub PAT (raises rate limit).
 * @param props.devtoUsername - dev.to login used to fetch live posts.
 */
export default function AtsView({ githubUsername, githubToken, devtoUsername }) {
  const [seed] = useState(readSeed);
  const { repos: liveRepos } = useGithubRepos({ username: githubUsername, token: githubToken, limit: 8 });
  const { posts: livePosts } = useDevPosts({ username: devtoUsername, limit: 6 });
  const [copied, setCopied] = useState(false);

  const repos = liveRepos.length ? liveRepos : seed.repos;
  const posts = livePosts.length ? livePosts : seed.posts;

  const markdown = useMemo(() => buildMarkdown({ repos, posts }), [repos, posts]);

  const copyAll = () => {
    navigator.clipboard?.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iago-calazans.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="ats">
      <header className="ats-head">
        <div className="ats-eyebrow">
          <span className="ats-status" />
          ATS / AGENT VIEW · MACHINE-READABLE
        </div>
        <h1 className="ats-title">iago-calazans.md</h1>
        <p className="ats-sub">
          Same content as the human view, rendered as plain markdown so an Applicant Tracking System or
          LLM agent can parse it without scraping a styled layout.
        </p>
        <div className="ats-actions">
          <button type="button" className="ats-btn" onClick={copyAll}>
            {copied ? 'copied ✓' : 'copy markdown'}
          </button>
          <button type="button" className="ats-btn" onClick={download}>
            download .md
          </button>
        </div>
      </header>

      <pre className="ats-doc" aria-label="Resume in markdown">
        <code>{markdown}</code>
      </pre>
    </main>
  );
}
