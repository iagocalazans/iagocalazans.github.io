import { STACK } from '../data/profile.js';

/**
 * Skills/stack section. Pill opacity encodes self-rated proficiency level (1-3).
 */
export default function Stack() {
  return (
    <section className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">04 / stack</div>
          <h2 className="section-title">Tools I reach for.</h2>
        </div>
        <p className="section-desc">Filled dots mean I’d be happy to lead a team using it.</p>
      </div>
      <div className="stack">
        {STACK.map(([name, lvl]) => (
          <span key={name} className={`stack-pill lvl-${lvl}`}>
            <span className="level" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
