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
    note: 'EdTech SaaS connecting international education agencies and schools. Redesigned the notification system into an event-driven architecture (AWS SQS · Lambda · NestJS), shipped a reusable Transfermate payments integration library, and built LLM-powered internal tooling via MCP servers and the Claude API.',
  },
  {
    from: 'Feb 2022',
    to: 'May 2024',
    role: 'Senior Node.js Engineer',
    co: 'Stone · remote',
    note: 'High-throughput payment services in TypeScript/NestJS processing 10M+ daily transactions. Designed event-driven microservices on Redis pub/sub and RabbitMQ with DLQ/retry, applying hexagonal architecture and DDD. Lifted core coverage from 40% to 85%+ and mentored 5+ engineers.',
  },
  {
    from: 'Sep 2020',
    to: 'Feb 2022',
    role: 'Tech Lead',
    co: 'Kognita Lab · remote',
    note: 'Built a chatbot framework from scratch that cut enterprise deployment time by 60% across 10+ clients. Led a 6+ engineer team across TypeScript, JavaScript and PHP, and pioneered C++ + Node.js modules with sub-1ms response times in production.',
  },
  {
    from: 'Dec 2019',
    to: 'Aug 2020',
    role: 'Head of Product Development',
    co: 'Grupo Artha · Belo Horizonte',
    note: 'Led product strategy and full lifecycle development for a business intelligence platform. Established agile processes that shortened release cycles by 40%.',
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
