# Build Log — Arsen's Portfolio

A single-page React portfolio, framed as a developer's running build log from a
14-day sprint learning HTML, CSS, JavaScript, and React. Three projects shipped;
the receipts are on the page.

## Stack

- **Vite + React** (plain JavaScript, `.jsx`)
- **Plain CSS** with custom properties for the design tokens
- **lucide-react** for small functional icons
- Native browser APIs only — `IntersectionObserver` for scroll-spy and
  scroll-reveal, no animation or state libraries

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
├── main.jsx          # mounts <App />
├── index.css         # design tokens + global styles
├── App.jsx           # renders every section, owns scroll-spy state
├── data/             # projects + skills content
└── components/       # one file per section
```

It's a single page — navigation is in-page anchor links with smooth scrolling,
no router.
