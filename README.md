# iagocalazans.dev

Personal page for Iago Calazans — Vite + React rewrite of the editorial design exported from Claude Design.

The page is a faithful port of `Personal Page.html` from the design bundle, with two sections wired
to live data instead of static lists:

| Section            | Source                                    | Endpoint                                                         |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------- |
| `02 / open source` | Public GitHub repos sorted by star count  | `GET https://api.github.com/search/repositories?q=user:<name>+fork:false&sort=stars` |
| `06 / writing`     | Published dev.to articles                 | `GET https://dev.to/api/articles?username=<name>`                |

Everything else — hero, Overflow.guru feature, about, stack, experience, contact — stays as
authored content in `src/data/profile.js` and the static components.

## Stack

- Vite 5 + React 18
- Plain CSS (the design's `styles.css` ported verbatim, plus tiny shimmer/empty-state additions)
- Native `fetch` (no client libraries) inside two custom hooks

## Setup

```bash
npm install
cp .env.example .env
# fill VITE_GITHUB_TOKEN to lift the GitHub rate limit (60/hr → 5000/hr)
npm run dev
```

`VITE_GITHUB_TOKEN` is **optional** — without it, the GitHub API is hit anonymously and may rate-limit
during local development. A read-only fine-grained token with the `public_repo` scope is enough.

## Environment variables

| Variable               | Default        | Purpose                                                |
| ---------------------- | -------------- | ------------------------------------------------------ |
| `VITE_GITHUB_TOKEN`    | _(unset)_      | Forwarded as `Authorization: Bearer …` to GitHub only. |
| `VITE_GITHUB_USERNAME` | `iagocalazans` | GitHub login whose public repos are listed.            |
| `VITE_DEVTO_USERNAME`  | `iagocalazans` | dev.to login whose articles are listed.                |

dev.to's public read endpoint requires no auth, so the token is intentionally scoped to GitHub only.

## Layout

```
src/
├── App.jsx                    # page shell, theme/scroll-spy, env wiring
├── main.jsx                   # React entry
├── styles.css                 # design tokens + components (verbatim from the design bundle)
├── data/profile.js            # static content (stack, experience, contact, language colors)
├── components/
│   ├── TopBar.jsx             # nav + theme toggle
│   ├── Hero.jsx
│   ├── Feature.jsx            # Overflow.guru "cover story"
│   ├── Archive.jsx            # → useGithubRepos
│   ├── About.jsx
│   ├── Stack.jsx
│   ├── Experience.jsx
│   ├── Writing.jsx            # → useDevPosts
│   ├── Contact.jsx
│   └── Icon.jsx
└── hooks/
    ├── useGithubRepos.js      # GitHub Search API, sorted by stars, optional token
    └── useDevPosts.js         # dev.to public Articles API
```

## Scripts

```bash
npm run dev       # vite dev server on :5173
npm run build     # production bundle into dist/
npm run preview   # serve the production bundle locally
```
