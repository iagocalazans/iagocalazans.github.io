/**
 * Static profile content rendered in the hero, about, stack, experience, and contact sections.
 * Dynamic sections (GitHub repos, dev.to posts) are fetched at runtime via dedicated hooks.
 */

export const STACK = [
  ["TypeScript", 3],
  ["Node.js", 3],
  ["NestJS", 3],
  ["JavaScript", 3],
  ["Git", 3],
  ["MySQL", 3],
  ["PostgreSQL", 3],
  ["React.js", 2],
  ["Elixir", 1],
  ["Go", 1],
  ["Rust", 1],
  ["Docker", 2],
  ["Angular", 1],
];

export const EXPERIENCE = [
  {
    from: "May 2026",
    to: "Present",
    current: true,
    role: "Software/Product Engineer",
    co: "HG Insights · remote from BR",
    logo: "hg_insights.png",
    note: "AI-powered revenue growth intelligence platform unifying market, account, IT-spend, intent and competitor data into GTM strategy and activation workflows. Recently joined. More detail as the work takes shape.",
  },
  {
    from: "May 2024",
    to: "Mar 2026",
    role: "Senior Software Engineer",
    co: "Edvisor.io · remote from BR",
    logo: "edvisor-io.png",
    note: "Recruiting platform for international education - connecting agencies and partner schools. Owned the Wallet service that manages payments under the main platform via the Transfermate API, shipping a reusable integration library around it. Redesigned the notification system into an event-driven architecture (AWS SQS · Lambda · NestJS), and built LLM-powered internal tooling via MCP servers and the Claude API.",
  },
  {
    from: "Feb 2022",
    to: "May 2024",
    role: "Senior Node.js Engineer",
    co: "Stone · remote",
    logo: "stone.png",
    note: "Built and scaled the internal contact-center platform in TypeScript/NestJS on top of Twilio Voice and Twilio Flex, automating customer-support queue routing with RabbitMQ and Twilio Functions. Authored twilio-functions-utils, an open-source helper library that became the team’s default scaffold for Twilio Functions. Mentored 5+ engineers and lifted core test coverage from 40% to 85%+.",
  },
  {
    from: "Sep 2020",
    to: "Feb 2022",
    role: "Tech Lead",
    co: "Kognita Lab · remote",
    logo: "kognita_lab.png",
    note: "Designed and built shallot-framework, an in-house Node.js chatbot framework integrating Microsoft LUIS for NLU and a partner omnichannel communication platform, adopted across 10+ enterprise clients and cutting per-deployment setup time by 60%. Led a 6-engineer team shipping production services in NestJS, Node.js and PHP.",
  },
  {
    from: "Dec 2019",
    to: "Aug 2020",
    role: "Head of Product Development",
    co: "Grupo Artha · Belo Horizonte",
    note: "Headed product development across two parallel launches: a Node.js video-streaming platform that took the company’s personal-finance course to market, and a C# gamified credit-scoring engine designed to feed a behavioural credit-analysis system based on individual performance. Owned roadmap, architecture and delivery across both tracks; the streaming product shipped to public users.",
  },
  {
    from: "2010",
    to: "2019",
    role: "Earlier career",
    co: "onBI · HQdo · Carbono14 · Teknisa",
    note: "Progressive engineering roles across e-commerce, web and BI: Magento, PHP and full-stack JavaScript. Where the database design and API architecture muscle was built.",
  },
];

/**
 * Whether any experience entry is still ongoing, detected by an end date of
 * "Present". Drives the header status indicator: an ongoing role flips the
 * marker from "available" (green) to "engaged" (red), with no manual edit.
 */
export const HAS_CURRENT_ROLE = EXPERIENCE.some(
  (entry) => entry.to === "Present",
);

export const CONTACT_ROWS = [
  {
    lbl: "Email",
    val: "iago.calazans@gmail.com",
    href: "mailto:iago.calazans@gmail.com",
    copy: true,
  },
  {
    lbl: "Phone",
    val: "+55 31 99565-7984",
    href: "tel:+5531995657984",
    copy: true,
  },
  {
    lbl: "GitHub",
    val: "github.com/iagocalazans",
    href: "https://github.com/iagocalazans",
  },
  {
    lbl: "LinkedIn",
    val: "linkedin.com/in/iago-calazans",
    href: "https://www.linkedin.com/in/iago-calazans",
  },
  {
    lbl: "Stack Overflow",
    val: "stackoverflow.com/users/iago-calazans",
    href: "https://stackoverflow.com/users/10481975/iago-calazans",
  },
  { lbl: "Overflow", val: "overflow.guru", href: "https://overflow.guru" },
];

/**
 * Lookup of GitHub language colors used to render the colored dot in the archive list.
 * Source: github/linguist (subset of languages relevant to the listed repos).
 */
export const LANG_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

/**
 * Brand color per stack item, used to tint each pill's dot.
 * Languages also present in {@link LANG_COLORS} reuse those exact values so the
 * stack stays consistent with the archive; tools and frameworks use their own brand hues.
 */
export const STACK_COLORS = {
  TypeScript: LANG_COLORS.TypeScript,
  "Node.js": "#5fa04e",
  NestJS: "#e0234e",
  JavaScript: LANG_COLORS.JavaScript,
  Git: "#f05032",
  PostgreSQL: "#336791",
  "React.js": "#61dafb",
  MySQL: "#4479a1",
  Docker: "#2496ed",
  Angular: "#dd0031",
  "C++": LANG_COLORS["C++"],
};
