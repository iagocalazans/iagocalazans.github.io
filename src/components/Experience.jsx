import { EXPERIENCE } from '../data/profile.js';

/**
 * Vertical experience timeline. Roles are rendered in reverse-chronological order.
 */
export default function Experience() {
  return (
    <section className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">05 / experience</div>
          <h2 className="section-title">Where I’ve been.</h2>
        </div>
        <p className="section-desc">Roles in chronological order. Earlier work archived for brevity.</p>
      </div>
      <div className="timeline">
        {EXPERIENCE.map((entry, i) => (
          <div key={`${entry.co}-${i}`} className={`tl-row ${entry.current ? 'current' : ''}`}>
            <div className="tl-date">
              {entry.from}
              <br />{entry.to}
            </div>
            <div className="tl-body">
              <div className="tl-role">{entry.role}</div>
              <div className="tl-co">{entry.co}</div>
              <div className="tl-note">{entry.note}</div>
            </div>
            {entry.logo && (
              <div className="tl-logo">
                <img
                  src={`/assets/logos/${entry.logo}`}
                  alt={`${entry.co.split('·')[0].trim()} logo`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
