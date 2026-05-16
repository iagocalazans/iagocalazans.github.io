import { useEffect, useState } from 'react';

/**
 * Shape returned by {@link useGithubRepos}.
 *
 * @typedef {object} RepoListState
 * @property {Array<object>} repos - Repos sorted by star count (descending).
 * @property {boolean} loading - True while the request is in flight.
 * @property {string|null} error - Human-readable error message, or null when healthy.
 */

const GITHUB_API = 'https://api.github.com';

/**
 * Fetches the user's public repositories sorted by star count.
 *
 * Uses the GitHub Search API so we can sort server-side by stars while excluding forks.
 * The token is optional but bumps the rate limit from 60/hr to 5000/hr.
 *
 * @param {object} options
 * @param {string} options.username - GitHub login whose repos should be listed.
 * @param {string} [options.token] - Optional GitHub personal access token (read-only).
 * @param {number} [options.limit] - Maximum number of repos to display.
 * @returns {RepoListState}
 *
 * @example
 * const { repos, loading, error } = useGithubRepos({ username: 'iagocalazans', token, limit: 8 });
 */
export function useGithubRepos({ username, token, limit = 8 }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setError('GitHub username not configured.');
      return;
    }

    const controller = new AbortController();
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const query = encodeURIComponent(`user:${username} fork:false`);
    const url = `${GITHUB_API}/search/repositories?q=${query}&sort=stars&order=desc&per_page=${limit}`;

    setLoading(true);
    setError(null);

    fetch(url, { headers, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const reason = response.status === 403 ? 'rate limit hit: set VITE_GITHUB_TOKEN' : `HTTP ${response.status}`;
          throw new Error(`GitHub: ${reason}`);
        }
        return response.json();
      })
      .then((payload) => {
        setRepos(Array.isArray(payload.items) ? payload.items : []);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, token, limit]);

  return { repos, loading, error };
}
