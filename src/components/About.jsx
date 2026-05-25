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

      <div className="about-layout">
        <div className="about-figure">
          <div className="portrait portrait-photo">
            <img src="/assets/profile.jpg" alt="Iago Calazans" />
            <div className="portrait-cap">Belo Horizonte · 2026</div>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I’m a <strong>Senior Software Engineer</strong> based in Belo Horizonte, MG, BR, with more than a decade of
            production experience building B2B SaaS, telephony systems, and conversational platforms. My day-to-day is{' '}
            <strong>Node, TypeScript, and NestJS</strong>, and I hold strong opinions about hexagonal architecture,
            event-driven systems, and DDD.
          </p>
          <p>
            Lately my focus has shifted toward LLM tooling: MCP servers, integrations with Anthropic’s Claude API, and
            internal developer-facing applications. I’m drawn to systems that pair solid infrastructure with a layer of
            intelligence, and I’d rather understand what sits beneath the abstractions than accept magic.
          </p>
          <p>
            My path runs through a range of domains and real-sized codebases. I started in e-commerce and BI, from 2010
            to 2019, working full-stack across Magento, PHP, and JavaScript, where I built the database-design and
            API-architecture muscle that everything since has rested on.
          </p>
          <p>
            In late 2019 I took over as <strong>Head of Product Development at Grupo Artha</strong>, running two launches
            in parallel: a Node.js video-streaming platform that took a personal-finance course to market, and a
            gamified credit-scoring engine in C# meant to feed a behavioral credit-analysis system. The streaming
            product shipped to public users.
          </p>
          <p>
            From 2020 to 2022 I was <strong>Tech Lead at Kognita Lab</strong>, where I designed and built
            shallot-framework, an in-house Node.js chatbot framework wiring Microsoft LUIS for NLU into a partner
            omnichannel platform. It reached more than ten enterprise clients and cut per-deployment setup time by 60
            percent, and I led a team of six engineers shipping production services in NestJS, Node.js, and PHP.
          </p>
          <p>
            From 2022 to 2024 I worked as a <strong>Senior Node.js Engineer at Stone</strong>, building and scaling the
            internal contact-center platform in TypeScript and NestJS on top of Twilio Voice and Twilio Flex, and
            automating queue routing with RabbitMQ and Twilio Functions. I also authored twilio-functions-utils, the
            open-source library that became the team’s default scaffold, mentored more than five engineers, and took
            core test coverage from 40 percent to over 85 percent.
          </p>
          <p>
            From 2024 to 2026 I was a <strong>Senior Software Engineer at Edvisor.io</strong>, an international
            education-recruitment platform connecting agencies and partner schools. I owned the Wallet service that
            handles payments under the platform via the Transfermate API, shipping a reusable integration library around
            it, redesigned the notification system into an event-driven architecture on AWS SQS, Lambda, and NestJS, and
            built the first internal LLM tooling there via MCP servers and the Claude API.
          </p>
          <p>
            In May 2026 I joined <strong>HG Insights</strong> as a Product/Software Engineer, working on an AI-driven
            revenue-growth-intelligence platform that unifies market, account, IT-spend, intent, and competitor data
            into go-to-market strategy and activation workflows.
          </p>
          <p>
            On the side I design and ship small consumer tools. <a
            href="https://overflow.guru"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--fg)', fontWeight: 500, borderBottom: '1px solid var(--accent)' }}
          >
            Overflow.Guru
          </a> is the current one: a
            budget app for people who have never managed to use a budget app. It’s currently in private beta, used
            personally and opened to a small group of testers on request, with no public launch planned.
          </p>
        </div>
      </div>
    </section>
  );
}
