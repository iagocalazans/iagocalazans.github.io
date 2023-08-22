// gitprofile.config.js

const config = {
  github: {
    username: 'iagocalazans', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 4, // How many projects to display.
    exclude: {
      forks: true, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'iago-calazans',
    twitter: 'iago_calazans',
    mastodon: '',
    facebook: '',
    instagram: 'iagocalazans_',
    youtube: '', // example: 'pewdiepie'
    dribbble: '',
    behance: '',
    medium: 'iago.calazans',
    dev: 'iagocalazans',
    stackoverflow: '10481975/iago-calazans', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: 'https://iagocalazans.dev',
    phone: '+55 31 99565-7984',
    email: 'iago.calazans@gmail.com',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Node.js',
    'JavaScript',
    'React.js',
    'NestJS',
    'MySQL',
    'PostgreSQL',
    'Git',
    'Docker',
    'C++',
    'C',
  ],
  experiences: [
    {
      company: 'Stone Payments',
      position: 'Senior Node.js Engineer',
      from: 'Feb 2022',
      to: 'Present',
      companyLink: 'https://stone.com.br',
    },
    {
      company: 'Kognita Lab.',
      position: 'Tech Lead',
      from: 'Sep 2020',
      to: 'Feb 2022',
      companyLink: 'https://kognita.ai',
    },
  ],
  /* certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com'
    },
  ], */
  education: [
    {
      institution: 'Ampli',
      degree: 'Software Engineering',
      from: '2023',
      to: '2026',
    },
    // {
    //   institution: 'Institution Name',
    //   degree: 'Degree',
    //   from: '2012',
    //   to: '2014',
    // },
  ],

  // To hide the `My Projects` section, keep it empty.
  externalProjects: [
    // {
    //   title: 'GeoEdge',
    //   description:
    //     'Plataforma pioneira de geomarketing somado a inteligência artificial para otimizar a performance de pontos de venda.',
    //   imageUrl:
    //     'https://kognita.com.br/wp-content/themes/kognita/images/logo-kognita-negativo.svg',
    //   link: 'https://kognita.com.br/solucoes/geoedge/',
    // },
    {
      title: 'twilio-functions-utils',
      description:
        'Created for simplifying the use of Twilio serverless (Twilio Functions).',
      imageUrl: 'https://avatars.githubusercontent.com/u/109142?s=200&v=4',
      link: 'https://www.npmjs.com/package/twilio-functions-utils',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'iagocalazans', // to hide blog section, keep it empty
    limit: 2, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lemonade',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `‴I eat and breathe JavaScript ♥ TypeScript, Node.js runtime and backend development.‷`,
};

export default config;
