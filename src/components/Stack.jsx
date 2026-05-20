import { STACK, STACK_COLORS } from '../data/profile.js';

/**
 * Skills/stack section. Each pill's dot is tinted with the item's brand color;
 * the dot fill style encodes self-rated proficiency (solid = lead-ready, ring otherwise).
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
          <span
            key={name}
            className={`stack-pill lvl-${lvl}`}
            style={{ '--dot': STACK_COLORS[name] || 'var(--accent)' }}
          >
            <span className="level" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
