/**
 * Editorial hero block: oversized serif headline plus a monospace meta grid.
 */
export default function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 0, borderTop: 0 }}>
      <div>
        <div className="hero-eyebrow">Portfolio</div>
        <h1 className="display">
          Software engineer<br />
          shipping <span className="italic">calm,</span><br />
          opinionated tools.
        </h1>
        <p className="hero-tag">
          Senior engineer based in Belo Horizonte, MG, BR. I write Node.js, TypeScript and NestJS for a living, and design my own
          little tools on the side.
        </p>
      </div>
      <dl className="hero-meta">
        <dt>Based</dt>
        <dd>Belo Horizonte, MG, BR</dd>
        <dt>Role</dt>
        <dd>Senior Software Engineer</dd>
        <dt>Focus</dt>
        <dd>Node · TypeScript · NestJS · LLMs</dd>
        <dt>Open to</dt>
        <dd>Not currently looking</dd>
        <dt>GitHub</dt>
        <dd>
          <a href="https://github.com/iagocalazans" target="_blank" rel="noopener noreferrer">
            @iagocalazans ↗
          </a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <a href="https://www.linkedin.com/in/iago-calazans" target="_blank" rel="noopener noreferrer">
            @iago-calazans ↗
          </a>
        </dd>
      </dl>
    </section>
  );
}
