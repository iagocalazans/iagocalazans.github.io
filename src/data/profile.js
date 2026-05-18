/**
 * Static profile content rendered in the hero, about, stack, experience, and contact sections.
 * Dynamic sections (GitHub repos, dev.to posts) are fetched at runtime via dedicated hooks.
 */

export const STACK = [
  ['TypeScript', 3],
  ['Node.js', 3],
  ['NestJS', 3],
  ['JavaScript', 3],
  ['React.js', 2],
  ['Angular', 2],
  ['PostgreSQL', 2],
  ['MySQL', 2],
  ['Docker', 2],
  ['Git', 3],
  ['C++', 1],
];

export const EXPERIENCE = [
  {
    from: 'May 2024',
    to: 'Mar 2026',
    role: 'Senior Software Engineer',
    co: 'Edvisor.io · remote from BR',
    note: 'Recruiting platform for international education — connecting agencies and partner schools. Redesigned the notification system into an event-driven architecture (AWS SQS · Lambda · NestJS), shipped a reusable Transfermate payments integration library, and built LLM-powered internal tooling via MCP servers and the Claude API.',
  },
  {
    from: 'Feb 2022',
    to: 'May 2024',
    role: 'Senior Node.js Engineer',
    co: 'Stone · remote',
    note: 'Built and scaled the internal telephony stack in TypeScript/NestJS on top of Twilio Voice and Twilio Flex, automating contact-center queue routing with RabbitMQ and Twilio Functions. Authored twilio-functions-utils, an open-source helper library that became the team’s default scaffold for Twilio Functions. Mentored 5+ engineers and lifted core test coverage from 40% to 85%+.',
  },
  {
    from: 'Sep 2020',
    to: 'Feb 2022',
    role: 'Tech Lead',
    co: 'Kognita Lab · remote',
    note: 'Designed and built shallot-framework, an in-house Node.js chatbot framework integrating Microsoft LUIS for NLU and a partner omnichannel communication platform — adopted across 10+ enterprise clients and cutting per-deployment setup time by 60%. Led a 6-engineer team shipping production services in NestJS, Node.js and PHP.',
  },
  {
    from: 'Dec 2019',
    to: 'Aug 2020',
    role: 'Head of Product Development',
    co: 'Grupo Artha · Belo Horizonte',
    note: 'Headed product development across two parallel launches: a Node.js video-streaming platform that took the company’s personal-finance course to market, and a C# gamified credit-scoring engine designed to feed a behavioural credit-analysis system based on individual performance. Owned roadmap, architecture and delivery across both tracks; the streaming product shipped to public users.',
  },
  {
    from: '2010',
    to: '2019',
    role: 'Earlier career',
    co: 'onBI · HQdo · Carbono14 · Teknisa',
    note: 'Progressive engineering roles across e-commerce, web and BI: Magento, PHP and full-stack JavaScript. Where the database design and API architecture muscle was built.',
  },
];

export const CONTACT_ROWS = [
  { lbl: 'Email', val: 'iago.calazans@gmail.com', href: 'mailto:iago.calazans@gmail.com', copy: true },
  { lbl: 'Phone', val: '+55 31 99565-7984', href: 'tel:+5531995657984', copy: true },
  { lbl: 'GitHub', val: 'github.com/iagocalazans', href: 'https://github.com/iagocalazans' },
  { lbl: 'LinkedIn', val: 'linkedin.com/in/iago-calazans', href: 'https://www.linkedin.com/in/iago-calazans' },
  { lbl: 'Stack Overflow', val: 'stackoverflow.com/users/iago-calazans', href: 'https://stackoverflow.com/users/iago-calazans' },
  { lbl: 'Overflow', val: 'overflow.guru', href: 'https://overflow.guru' },
];

/**
 * Lookup of GitHub language colors used to render the colored dot in the archive list.
 * Source: github/linguist (subset of languages relevant to the listed repos).
 */
export const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Ruby: '#701516',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};
