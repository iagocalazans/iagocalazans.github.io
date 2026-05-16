/**
 * About section: short editorial copy paired with a portrait card.
 */
export default function About() {
  return (
    <section id="about" className="reveal">
      <div className="section-head">
        <div>
          <div className="section-num">03 / about</div>
          <h2 className="section-title">Hello, I’m Iago.</h2>
        </div>
        <p className="section-desc">A short note about how I work and what I’m good at.</p>
      </div>

      <div className="grid-2">
        <div className="about-copy">
          <p>
            I’ve spent the last decade writing backends: a chatbot framework at <strong>Kognita Lab</strong>, payments
            at <strong>Stone</strong> (with a Twilio Functions library shipped to npm in that stretch), and most
            recently the international-education platform at <strong>Edvisor</strong>. My day-to-day is{' '}
            <strong>Node, TypeScript, and NestJS</strong>, but I read a lot of C++ and I have opinions about it.
          </p>
          <p>
            The libraries I publish are all attempts to remove ceremony from things I do every week: typed try/catch,
            declarative pipelines, Twilio scaffolding. If a tool needs more than three concepts to explain, I’d rather
            rewrite it.
          </p>
          <p>
            On the side I design and ship small consumer tools. <strong>Overflow.guru</strong> is the current one: a
            budget app for people who have never managed to use a budget app.
          </p>
        </div>
        <div>
          <div className="portrait portrait-photo">
            <img src="/assets/profile.jpg" alt="Iago Calazans" />
            <div className="portrait-cap">belo horizonte · 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
