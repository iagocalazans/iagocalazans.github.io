/**
 * Framework-agnostic résumé content: the single source of truth shared by the
 * client ATS view ({@link ../components/AtsView.jsx}) and the build-time
 * pre-render ({@link ../../vite.config.js}).
 *
 * Keeping this module free of React/JSX lets the Vite config import it directly
 * to bake a machine-readable payload (JSON-LD, meta tags, plaintext fallback)
 * into the static HTML, so AI agents and crawlers that do not execute JavaScript
 * still receive the full profile.
 */

import { CONTACT_ROWS, EXPERIENCE, STACK } from './profile.js';

const PROFICIENCY_LABEL = { 3: 'expert', 2: 'proficient', 1: 'familiar' };

/**
 * Canonical site origin, used for absolute URLs in structured data.
 */
export const SITE_URL = 'https://iagocalazans.dev';

/**
 * Top-of-document identity block shared across every render target.
 */
export const HEADER = {
  name: 'Iago Calazans',
  title: 'Senior Software Engineer',
  location: 'Belo Horizonte, BR',
  focus: 'Node · TypeScript · NestJS · LLMs',
  openTo: 'Not currently looking',
  availability: 'Not available',
  image: `${SITE_URL}/assets/profile.jpg`,
};

/**
 * One-paragraph professional summary, in plain prose for both humans and machines.
 */
export const SUMMARY = [
  'Backend engineer with a decade of production experience building B2B SaaS, telephony and conversational platforms.',
  'Day-to-day: Node, TypeScript, NestJS, with strong opinions about hexagonal architecture, event-driven',
  'systems and DDD.',
  '',
  'Recently focused on LLM tooling: MCP servers, Claude API integrations and developer-facing internal apps.',
];

/**
 * Personal side project highlighted at the foot of the résumé.
 */
export const SIDE_PROJECTS = [
  {
    name: 'overflow.guru',
    url: 'https://overflow.guru',
    note: [
      'A guided personal-finance app for people who never managed to use a budget app.',
      'Conversational onboarding, Brazilian-real first (multi-currency next), local-first, no bank scraping.',
      'PWA, mobile-shaped. Public beta.',
    ],
  },
];

/**
 * Assembles the full markdown document from profile data and live integrations.
 *
 * @param {object} [args]
 * @param {Array<object>} [args.repos] - Live GitHub repos (newest snapshot).
 * @param {Array<object>} [args.posts] - Live dev.to posts.
 * @returns {string} The résumé rendered as a single markdown string.
 *
 * @example
 * ```javascript
 * const md = buildMarkdown({ repos, posts });
 * ```
 */
export function buildMarkdown({ repos, posts } = {}) {
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

/**
 * Builds a Schema.org `Person` object describing the profile, suitable for
 * embedding as JSON-LD. This is the format search engines and LLM agents parse
 * most reliably.
 *
 * @param {object} [args]
 * @param {Array<object>} [args.repos] - Live GitHub repos, surfaced as related links.
 * @returns {object} A JSON-LD `Person` graph node.
 */
export function buildPersonJsonLd({ repos } = {}) {
  const email = findContact('Email');
  const phone = findContact('Phone');
  const knowsAbout = [
    ...STACK.map(([name]) => name),
    'Hexagonal Architecture',
    'Event-Driven Systems',
    'Domain-Driven Design',
    'Large Language Models',
    'Model Context Protocol',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: HEADER.name,
    jobTitle: HEADER.title,
    description: SUMMARY.filter(Boolean).join(' '),
    url: SITE_URL,
    image: HEADER.image,
    email: email ? `mailto:${email.val}` : undefined,
    telephone: phone ? phone.val : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
    sameAs: CONTACT_ROWS.filter((row) => row.href && /^https?:/.test(row.href)).map(
      (row) => row.href,
    ),
    knowsAbout,
    hasOccupation: EXPERIENCE.map((entry) => ({
      '@type': 'Occupation',
      name: entry.role,
      occupationLocation: { '@type': 'Place', name: entry.co },
      description: entry.note,
      startDate: entry.from,
      endDate: entry.to,
    })),
    subjectOf: (repos || [])
      .filter((repo) => repo && repo.html_url)
      .slice(0, 6)
      .map((repo) => ({
        '@type': 'SoftwareSourceCode',
        name: repo.name,
        codeRepository: repo.html_url,
        ...(repo.language ? { programmingLanguage: repo.language } : {}),
        ...(repo.description ? { description: repo.description } : {}),
      })),
  };
}

/**
 * Builds the set of `<meta>` / `<link>` tags that describe the page for crawlers
 * and social-share unfurlers, derived from the same profile data.
 *
 * @returns {Array<{ tag: string, attrs: Record<string, string> }>} Tag descriptors.
 */
export function buildMetaTags() {
  const description = `${HEADER.name} — ${HEADER.title} (${HEADER.location}). ${SUMMARY[0]}`;
  const keywords = STACK.map(([name]) => name).join(', ');

  return [
    { tag: 'meta', attrs: { name: 'description', content: description } },
    { tag: 'meta', attrs: { name: 'author', content: HEADER.name } },
    { tag: 'meta', attrs: { name: 'keywords', content: keywords } },
    { tag: 'meta', attrs: { name: 'robots', content: 'index, follow' } },
    { tag: 'link', attrs: { rel: 'canonical', href: `${SITE_URL}/` } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'profile' } },
    { tag: 'meta', attrs: { property: 'og:title', content: `${HEADER.name} · ${HEADER.title}` } },
    { tag: 'meta', attrs: { property: 'og:description', content: description } },
    { tag: 'meta', attrs: { property: 'og:url', content: `${SITE_URL}/` } },
    { tag: 'meta', attrs: { property: 'og:image', content: HEADER.image } },
    { tag: 'meta', attrs: { property: 'profile:first_name', content: 'Iago' } },
    { tag: 'meta', attrs: { property: 'profile:last_name', content: 'Calazans' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: `${HEADER.name} · ${HEADER.title}` } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: HEADER.image } },
  ];
}

/**
 * Looks up a contact row by its label.
 *
 * @param {string} label - The `lbl` to match (e.g. "Email").
 * @returns {object|undefined} The matching contact row, if any.
 */
function findContact(label) {
  return CONTACT_ROWS.find((row) => row.lbl === label);
}

function headerSection() {
  return [
    `# ${HEADER.name}`,
    `${HEADER.title} · ${HEADER.location}`,
    '',
    `Focus: ${HEADER.focus}`,
    `Open to: ${HEADER.openTo}`,
    `Availability: ${HEADER.availability}`,
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
  return ['## Summary', '', ...SUMMARY].join('\n');
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
    lines.push(`### ${entry.role} · ${entry.co}`);
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
  const lines = ['## Side Projects'];
  SIDE_PROJECTS.forEach((project) => {
    lines.push('');
    lines.push(`### ${project.name}`);
    lines.push(project.url);
    lines.push('');
    lines.push(...project.note);
  });
  return lines.join('\n');
}
