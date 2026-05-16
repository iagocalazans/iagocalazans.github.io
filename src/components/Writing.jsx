import { useDevPosts } from '../hooks/useDevPosts.js';

const SKELETON_COUNT = 3;

/**
 * Formats an ISO date string as e.g. "May 2026".
 *
 * @param {string} iso - ISO 8601 date string.
 */
function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Renders the latest dev.to articles authored by the configured user.
 *
 * @param props
 * @param props.username - dev.to login whose articles should be listed.
 */
export default function Writing({ username }) {
  const { posts, loading, error } = useDevPosts({ username, limit: 6 });

  return (
    <section id="writing" className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">06 / writing</div>
          <h2 className="section-title">Recent posts.</h2>
        </div>
        <p className="section-desc">Mostly notes on patterns I keep reaching for. Long-form, no SEO bait.</p>
      </div>
      <div className="posts">
        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => <div key={i} className="skeleton-card" />)}

        {!loading && error && <div className="error-note">{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-note">No posts published yet.</div>
        )}

        {!loading &&
          !error &&
          posts.map((post) => (
            <a className="post" key={post.id} href={post.url} target="_blank" rel="noopener noreferrer">
              <div className="post-meta">
                <span>{formatDate(post.published_at)}</span>
                <span>{post.reading_time_minutes ? `${post.reading_time_minutes} min read` : '·'}</span>
              </div>
              <div className="post-title">{post.title}</div>
              <p className="post-excerpt">{post.description}</p>
              <div className="post-tags">
                {(post.tag_list || []).slice(0, 4).map((tag) => (
                  <span className="post-tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
      </div>
    </section>
  );
}
