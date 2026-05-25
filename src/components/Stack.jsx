import { STACK, STACK_COLORS } from '../data/profile.js';

/**
 * Skills/stack section. Each pill encodes self-rated proficiency through its dot
 * and border, both tinted with the item's brand color:
 * lvl-3 = filled dot + colored border, lvl-2 = ring dot + colored border,
 * lvl-1 = ring dot + neutral border.
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
      <ul className="stack-legend">
        <li className="lvl-3"><span className="level" />Expert</li>
        <li className="lvl-2"><span className="level" />Advanced</li>
        <li className="lvl-1"><span className="level" />Learning</li>
      </ul>
    </section>
  );
}
