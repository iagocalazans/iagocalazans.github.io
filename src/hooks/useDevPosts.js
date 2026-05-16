import { useEffect, useState } from 'react';

/**
 * Shape returned by {@link useDevPosts}.
 *
 * @typedef {object} PostListState
 * @property {Array<object>} posts - Articles published by the user, newest first.
 * @property {boolean} loading - True while the request is in flight.
 * @property {string|null} error - Human-readable error message, or null when healthy.
 */

const DEVTO_API = 'https://dev.to/api';

/**
 * Fetches the user's published articles from dev.to.
 *
 * The dev.to public Articles endpoint requires no authentication for read access, so the GitHub token
 * is not forwarded here: it is intentionally scoped to GitHub only.
 *
 * @param {object} options
 * @param {string} options.username - dev.to username whose articles should be listed.
 * @param {number} [options.limit] - Maximum number of articles to display.
 * @returns {PostListState}
 */
export function useDevPosts({ username, limit = 6 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setError('dev.to username not configured.');
      return;
    }

    const controller = new AbortController();
    const url = `${DEVTO_API}/articles?username=${encodeURIComponent(username)}&per_page=${limit}`;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`dev.to: HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        setPosts(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, limit]);

  return { posts, loading, error };
}
