import { useMemo, useState } from 'react';
import Icon from './Icon.jsx';
import { useGithubRepos } from '../hooks/useGithubRepos.js';
import { LANG_COLORS } from '../data/profile.js';

const SKELETON_COUNT = 3;
const FETCH_LIMIT = 3

/**
 * Open-source archive section: pulls the user's most-starred GitHub repos at runtime
 * and renders them in the magazine-style row layout. Includes a language filter chip row.
 *
 * @param props
 * @param props.username - GitHub login.
 * @param props.token - Optional GitHub PAT (raises rate limit).
 */
export default function Archive({ username, token }) {
  const { repos, loading, error } = useGithubRepos({ username, token, limit: FETCH_LIMIT });
  const [filter, setFilter] = useState('All');

  const langs = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [repos]);

  const list = filter === 'All' ? repos : repos.filter((r) => r.language === filter);

  return (
    <section className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">02 / open source</div>
          <h2 className="section-title">A small archive of libraries.</h2>
        </div>
        <div className="filters">
          {langs.map((lang) => (
            <button
              key={lang}
              className={`chip ${filter === lang ? 'active' : ''}`}
              onClick={() => setFilter(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="archive">
        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => <div key={i} className="skeleton-row" />)}

        {!loading && error && <div className="error-note">{error}</div>}

        {!loading && !error && list.length === 0 && (
          <div className="empty-note">No repositories to show yet.</div>
        )}

        {!loading &&
          !error &&
          list.map((repo, i) => (
            <a
              key={repo.id}
              className="archive-row"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="archive-idx">{String(i + 1).padStart(2, '0')}</div>
              <div className="archive-name">
                <span
                  className="lang-dot"
                  style={{ background: LANG_COLORS[repo.language] || 'var(--muted)' }}
                />
                {repo.name}
              </div>
              <div className="archive-desc">{repo.description || 'No description provided.'}</div>
              <div className="archive-stats">
                <span>
                  <Icon name="star" size={12} />
                  {repo.stargazers_count}
                </span>
                <span>
                  <Icon name="fork" size={12} />
                  {repo.forks_count}
                </span>
                <span>{repo.language || '·'}</span>
              </div>
              <div className="arr">view ↗</div>
            </a>
          ))}
      </div>
    </section>
  );
}
