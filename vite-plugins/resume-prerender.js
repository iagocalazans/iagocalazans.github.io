import { loadEnv } from 'vite';
import { buildMarkdown, buildMetaTags, buildPersonJsonLd } from '../src/data/resume.js';

const FETCH_TIMEOUT_MS = 8000;
const GITHUB_API = 'https://api.github.com';
const DEVTO_API = 'https://dev.to/api';

/**
 * Vite plugin that bakes a machine-readable payload into the static `index.html`.
 *
 * GitHub Pages serves a client-rendered SPA, so the shipped HTML body is empty
 * until React mounts — agents and crawlers that do not execute JavaScript only
 * ever see the `<title>`. This plugin injects, at build time:
 *
 * - rich `<meta>` / Open Graph / Twitter tags and a canonical link;
 * - a Schema.org `Person` JSON-LD graph (the format LLMs and search engines
 *   parse most reliably);
 * - a `<noscript>` block containing the full résumé as plaintext markdown;
 * - a `window.__RESUME__` seed so the client ATS view can render the exact same
 *   snapshot instantly.
 *
 * Live GitHub repos and dev.to posts are fetched once during the build (with a
 * graceful fallback to the static-only content if either API is unavailable).
 *
 * @returns {import('vite').Plugin} The configured plugin.
 */
export function resumePrerender() {
  let isBuild = false;
  let env = {};

  return {
    name: 'resume-prerender',
    config(_config, { command, mode }) {
      isBuild = command === 'build';
      env = loadEnv(mode, process.cwd());
    },
    async transformIndexHtml(html) {
      const snapshot = isBuild
        ? await fetchSnapshot({
            githubUsername: env.VITE_GITHUB_USERNAME || 'iagocalazans',
            githubToken: env.VITE_GITHUB_TOKEN || '',
            devtoUsername: env.VITE_DEVTO_USERNAME || 'iagocalazans',
          })
        : { repos: [], posts: [] };

      const markdown = buildMarkdown(snapshot);
      const jsonLd = buildPersonJsonLd({ repos: snapshot.repos });

      const headInjection = [
        ...buildMetaTags().map(renderTag),
        `<script type="application/ld+json">${safeJson(jsonLd)}</script>`,
      ].join('\n    ');

      const bodyInjection = [
        '<noscript>',
        `      <pre>${escapeHtml(markdown)}</pre>`,
        '    </noscript>',
        `    <script>window.__RESUME__=${safeJson(snapshot)}</script>`,
      ].join('\n    ');

      return html
        .replace('</head>', `  ${headInjection}\n  </head>`)
        .replace('</body>', `  ${bodyInjection}\n  </body>`);
    },
  };
}

/**
 * Fetches a live snapshot of repos and posts, slimmed to the fields the résumé
 * renders. Either source failing degrades gracefully to an empty list.
 *
 * @param {object} options
 * @param {string} options.githubUsername - GitHub login to list repos for.
 * @param {string} options.githubToken - Optional GitHub PAT (raises rate limit).
 * @param {string} options.devtoUsername - dev.to login to list posts for.
 * @returns {Promise<{ repos: Array<object>, posts: Array<object> }>}
 */
async function fetchSnapshot({ githubUsername, githubToken, devtoUsername }) {
  const [repos, posts] = await Promise.all([
    fetchRepos(githubUsername, githubToken).catch(() => []),
    fetchPosts(devtoUsername).catch(() => []),
  ]);
  return { repos, posts };
}

async function fetchRepos(username, token) {
  if (!username) return [];
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'iagocalazans.dev-prerender',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const query = encodeURIComponent(`user:${username} fork:false`);
  const data = await fetchJson(
    `${GITHUB_API}/search/repositories?q=${query}&sort=stars&order=desc&per_page=8`,
    headers,
  );
  return (Array.isArray(data.items) ? data.items : []).map(slimRepo);
}

async function fetchPosts(username) {
  if (!username) return [];
  const data = await fetchJson(
    `${DEVTO_API}/articles?username=${encodeURIComponent(username)}&per_page=6`,
  );
  return (Array.isArray(data) ? data : []).map(slimPost);
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
  return response.json();
}

function slimRepo(repo) {
  return {
    name: repo.name,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    description: repo.description,
  };
}

function slimPost(post) {
  return {
    title: post.title,
    published_at: post.published_at,
    reading_time_minutes: post.reading_time_minutes,
    url: post.url,
    description: post.description,
    tag_list: post.tag_list,
  };
}

/**
 * Serializes a value to JSON safe for inlining inside an HTML element, by
 * escaping the `<` that could otherwise close the surrounding tag.
 *
 * @param {unknown} value - The value to serialize.
 * @returns {string} The escaped JSON string.
 */
function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Renders a tag descriptor from {@link buildMetaTags} into an HTML string.
 *
 * @param {{ tag: string, attrs: Record<string, string> }} descriptor - The tag.
 * @returns {string} The serialized self-closing tag.
 */
function renderTag({ tag, attrs }) {
  const serialized = Object.entries(attrs)
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(' ');
  return `<${tag} ${serialized} />`;
}
