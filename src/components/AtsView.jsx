import { useMemo, useState } from 'react';
import { CONTACT_ROWS, EXPERIENCE, STACK } from '../data/profile.js';
import { useGithubRepos } from '../hooks/useGithubRepos.js';
import { useDevPosts } from '../hooks/useDevPosts.js';

const PROFICIENCY_LABEL = { 3: 'expert', 2: 'proficient', 1: 'familiar' };

/**
 * Renders the same portfolio content as a flat, plaintext/markdown document —
 * the kind of structured payload an ATS (Applicant Tracking System) or LLM agent
 * can parse without hitting the visual layout.
 *
 * @param props
 * @param props.githubUsername - GitHub login used to fetch live repos.
 * @param props.githubToken - Optional GitHub PAT (raises rate limit).
 * @param props.devtoUsername - dev.to login used to fetch live posts.
 */
export default function AtsView({ githubUsername, githubToken, devtoUsername }) {
  const { repos } = useGithubRepos({ username: githubUsername, token: githubToken, limit: 8 });
  const { posts } = useDevPosts({ username: devtoUsername, limit: 6 });
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(
    () => buildMarkdown({ repos, posts }),
    [repos, posts],
  );

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

/**
 * Assembles the full markdown document from profile data and live integrations.
 *
 * @param {object} args
 * @param {Array<object>} args.repos - Live GitHub repos.
 * @param {Array<object>} args.posts - Live dev.to posts.
 * @returns {string}
 */
function buildMarkdown({ repos, posts }) {
  const sections = [
    headerSection(),
    contactSection(),
    summarySection(),
    stackSection(),
    experienceSection(),
    reposSection(repos),
    writingSection(posts),
    sideProjectsSection(),
  ];
  return sections.filter(Boolean).join('\n\n');
}

function headerSection() {
  return [
    '# Iago Calazans',
    'Senior Software Engineer · Belo Horizonte, BR',
    '',
    'Focus: Node · TypeScript · NestJS · LLMs',
    'Open to: Full-time',
    'Availability: Q3 2026',
  ].join('\n');
}

function contactSection() {
  const lines = ['## Contact'];
  CONTACT_ROWS.forEach((row) => {
    const href = row.href || '';
    lines.push(`- ${row.lbl}: ${row.val}${href ? ` <${href}>` : ''}`);
  });
  return lines.join('\n');
}

function summarySection() {
  return [
    '## Summary',
    '',
    'Backend engineer with a decade of production experience building B2B SaaS, telephony and conversational platforms.',
    'Day-to-day: Node, TypeScript, NestJS — with strong opinions about hexagonal architecture, event-driven',
    'systems and DDD.',
    '',
    'Recently focused on LLM tooling: MCP servers, Claude API integrations and developer-facing internal apps.',
  ].join('\n');
}

function stackSection() {
  const lines = ['## Stack'];
  STACK.forEach(([name, lvl]) => {
    lines.push(`- ${name} (${PROFICIENCY_LABEL[lvl] || 'familiar'})`);
  });
  return lines.join('\n');
}

function experienceSection() {
  const lines = ['## Experience'];
  EXPERIENCE.forEach((entry) => {
    lines.push('');
    lines.push(`### ${entry.role} — ${entry.co}`);
    lines.push(`${entry.from} – ${entry.to}`);
    lines.push('');
    lines.push(entry.note);
  });
  return lines.join('\n');
}

function reposSection(repos) {
  const lines = ['## Open Source'];
  if (!repos || repos.length === 0) {
    lines.push('');
    lines.push('_Loading from github.com/iagocalazans …_');
    return lines.join('\n');
  }
  repos.forEach((repo) => {
    lines.push('');
    lines.push(`### ${repo.name}`);
    lines.push(`${repo.html_url}`);
    const meta = [
      repo.language ? `lang: ${repo.language}` : null,
      `stars: ${repo.stargazers_count ?? 0}`,
      `forks: ${repo.forks_count ?? 0}`,
    ]
      .filter(Boolean)
      .join(' · ');
    lines.push(meta);
    if (repo.description) {
      lines.push('');
      lines.push(repo.description);
    }
  });
  return lines.join('\n');
}

function writingSection(posts) {
  const lines = ['## Writing'];
  if (!posts || posts.length === 0) {
    lines.push('');
    lines.push('_Loading from dev.to/iagocalazans …_');
    return lines.join('\n');
  }
  posts.forEach((post) => {
    lines.push('');
    lines.push(`### ${post.title}`);
    const meta = [
      post.published_at ? new Date(post.published_at).toISOString().slice(0, 10) : null,
      post.reading_time_minutes ? `${post.reading_time_minutes} min read` : null,
      post.url,
    ]
      .filter(Boolean)
      .join(' · ');
    lines.push(meta);
    if (post.description) {
      lines.push('');
      lines.push(post.description);
    }
    if (post.tag_list && post.tag_list.length) {
      lines.push('');
      lines.push(`tags: ${post.tag_list.map((t) => `#${t}`).join(' ')}`);
    }
  });
  return lines.join('\n');
}

function sideProjectsSection() {
  return [
    '## Side Projects',
    '',
    '### overflow.guru',
    'https://overflow.guru',
    '',
    'A guided personal-finance app for people who never managed to use a budget app.',
    'Conversational onboarding, Brazilian-real first (multi-currency next), local-first, no bank scraping.',
    'PWA, mobile-shaped. Public beta.',
  ].join('\n');
}
