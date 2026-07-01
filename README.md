# Build Log — Arsen's Portfolio

A single-page React portfolio, framed as a developer's running **build log** from a
14-day sprint learning HTML, CSS, JavaScript, and React. Three projects shipped;
the receipts are on the page.

Live: _(add your deployed URL here)_

---

## Table of contents

1. [Tech stack (and why)](#tech-stack-and-why)
2. [Quick start](#quick-start)
3. [Folder structure](#folder-structure)
4. [How it all connects](#how-it-all-connects)
5. [React concepts used in this code](#react-concepts-used-in-this-code)
6. [The two IntersectionObservers explained](#the-two-intersectionobservers-explained)
7. [Styling system](#styling-system)
8. [File-by-file walkthrough](#file-by-file-walkthrough)
9. [Data files](#data-files)
10. [Accessibility](#accessibility)
11. [Build & deploy](#build--deploy)

---

## Tech stack (and why)

| Tool | Why it's here |
| --- | --- |
| **Vite + React** (plain JavaScript, `.jsx`) | Fast dev server + a component model. No TypeScript — kept simple on purpose. |
| **Plain CSS + custom properties** | One place (`index.css`) defines every color/size as a variable. No Tailwind, no CSS-in-JS. |
| **lucide-react** | Small SVG icons only (menu, github, mail, etc.), not big decorative blocks. |
| **Native browser APIs** | `IntersectionObserver` does scroll-spy and scroll-reveal — no animation library. |

There is **no router**. It's one page; navigation is in-page anchor links
(`href="#projects"`) with CSS smooth scrolling.

---

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

---

## Folder structure

```
.
├── index.html                 # the single HTML page; loads fonts + mounts React
├── vite.config.js             # Vite config (just the React plugin)
├── public/
│   ├── favicon.svg            # site icon
│   ├── resume.pdf             # the downloadable CV
│   └── images/avatar.png      # hero portrait
└── src/
    ├── main.jsx               # entry point — mounts <App /> into #root
    ├── index.css              # design tokens + global styles + shared classes
    ├── App.jsx                # the "brain": owns scroll state, renders every section
    ├── data/
    │   ├── projects.js        # array of the 3 project objects
    │   └── skills.js           # flat array of skill names
    └── components/            # one file (+ its .css) per piece of UI
        ├── Navbar.jsx / .css
        ├── Hero.jsx / .css
        ├── About.jsx / .css
        ├── Skills.jsx / .css
        ├── Projects.jsx / .css
        ├── ProjectCard.jsx / .css
        ├── Resume.jsx / .css
        ├── Contact.jsx / .css
        └── Footer.jsx / .css
```

Every component is a plain function that returns JSX. Each imports its own `.css`
file so styles stay next to the markup that uses them.

---

## How it all connects

### The startup chain

```
index.html
   └─ loads /src/main.jsx
        └─ createRoot(#root).render(<App />)
             └─ App renders <Navbar /> + <main> sections + <Footer />
```

1. The browser loads **`index.html`**. It contains an empty `<div id="root">` and
   a `<script src="/src/main.jsx">`.
2. **`main.jsx`** grabs that `#root` div and tells React to render `<App />` inside it.
3. **`App.jsx`** renders the whole page: the navbar, every `<section>` in order, and
   the footer.

### The component tree

```
App                         (owns: activeSection state)
├── Navbar                   (props: navLinks, activeSection)
├── main
│   ├── Hero
│   ├── About
│   ├── Skills               (reads: data/skills.js)
│   ├── Projects             (reads: data/projects.js)
│   │   └── ProjectCard × 3  (props: project, index)
│   ├── Resume
│   └── Contact
└── Footer
```

### How data and state flow

There are two different kinds of "data" in this app, and they move in two directions:

- **Content data flows down via imports.** Static content (the project list, the
  skill list) lives in `src/data/`. The component that displays it imports it
  directly — `Skills.jsx` imports `skills`, `Projects.jsx` imports `projects`.
- **App state flows down via props.** The only value that changes while you use the
  page is **which section is currently on screen**. `App` owns that (`activeSection`)
  and passes it *down* to `Navbar` as a prop so the nav can highlight the right link.

This is React's core rule: **data flows down** (parent → child through props), and
children never reach "up" to change a parent directly. `Projects` passes each
project object down to a `ProjectCard`; `App` passes `activeSection` down to `Navbar`.

---

## React concepts used in this code

This section maps each fundamental to the exact place it appears.

### 1. Components & JSX

Every file in `components/` exports one function that returns JSX (HTML-like syntax).
Example — the smallest one, `Projects.jsx`, returns a `<section>` and builds the
cards from data.

### 2. Props (passing data into a component)

A parent hands values to a child as attributes; the child receives them as one
`props` object (here destructured in the function signature).

```jsx
// App.jsx passes two props down:
<Navbar navLinks={navLinks} activeSection={activeSection} />

// Navbar.jsx receives them:
export default function Navbar({ navLinks, activeSection }) { ... }
```

Same pattern for the cards: `Projects.jsx` sends `project` and `index` into each
`ProjectCard`.

### 3. `useState` — a component's memory

`useState` gives a component a value that survives re-renders, plus a function to
change it. Changing it re-renders the component so the screen updates. Two places use it:

```jsx
// App.jsx — which section is in view (starts at 'hero')
const [activeSection, setActiveSection] = useState('hero')

// Navbar.jsx — is the mobile menu open? (starts closed)
const [isOpen, setIsOpen] = useState(false)
```

When `setActiveSection('projects')` runs, `App` re-renders, passes the new value to
`Navbar`, and the matching link lights up. When the hamburger button calls
`setIsOpen(open => !open)`, the menu flips open/closed.

### 4. `useEffect` — running code after render (side effects)

`useEffect(fn, [])` runs `fn` once, right after the component first appears on screen.
The empty array `[]` means "no dependencies, so don't run it again." If `fn` returns
another function, React runs that on cleanup (when the component is removed). Both
effects live in `App.jsx` and set up an `IntersectionObserver` (explained next),
returning `() => observer.disconnect()` so the observer is torn down cleanly.

### 5. Rendering lists with `.map()` + `key`

To turn an array into JSX elements, call `.map()` and give each item a stable `key`
so React can track them efficiently.

```jsx
// Projects.jsx
{projects.map((project, index) => (
  <ProjectCard key={project.id} project={project} index={index} />
))}

// Skills.jsx and Navbar.jsx use the same pattern.
```

### 6. Conditional rendering & derived values

The UI reacts to state without extra state variables:

```jsx
// Navbar.jsx — a value computed from a prop each render
const solid = activeSection !== 'hero'   // true once you scroll past the hero

// className switches based on that value
<header className={`navbar ${solid ? 'is-solid' : ''}`}>

// the toggle button swaps its icon based on isOpen
{isOpen ? <X /> : <Menu />}
```

### 7. Event handling

Plain function props on elements: `onClick={() => setIsOpen(open => !open)}` on the
hamburger, and `onClick={closeMenu}` on every nav link (so tapping a link on mobile
closes the menu).

---

## The two IntersectionObservers explained

`IntersectionObserver` is a browser API that tells you when an element enters or
leaves the viewport, without you having to listen to every scroll event. `App.jsx`
sets up two of them, each in its own `useEffect`.

### Observer #1 — scroll-spy (highlighting the active nav link)

```jsx
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id)
    })
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
)
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s))
```

The trick is `rootMargin: '-50% 0px -50% 0px'`. It shrinks the observer's
"trigger zone" to a **1-pixel-tall line across the vertical middle of the screen**.
A section only counts as `isIntersecting` while it crosses that centre line — so
whichever section is in the middle of the viewport becomes the active one, and its id
is saved into `activeSection`. No manual scroll maths required.

### Observer #2 — scroll-reveal (fade-in on scroll)

```jsx
const revealer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 },
)
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el))
```

Any element with the class `reveal` starts invisible and nudged down (see the
`.reveal` rule in `index.css`). When 15% of it scrolls into view (`threshold: 0.15`),
the observer adds `is-visible`, which animates it to full opacity. Then
`observer.unobserve(...)` stops watching that element, so it animates in **once** and
stays put.

Both effects `return () => observer.disconnect()` so nothing keeps running if the
component unmounts.

---

## Styling system

### Design tokens (`index.css`)

All colors, fonts, type sizes, and spacing are defined once as CSS custom properties
on `:root`, then referenced everywhere with `var(...)`:

```css
:root {
  --color-paper: #f6f2ea;      /* warm background */
  --color-ink: #1f1b16;        /* text */
  --color-accent: #c2542c;     /* terracotta highlight */
  --color-line: #ddd4c5;       /* hairline borders */
  --font-display: 'Space Grotesk', ...;
  --font-mono: 'JetBrains Mono', ...;
  --space-2: 1rem; --space-4: 2rem; /* an 8px spacing scale */
}
```

Change one variable and the whole site updates. Depth comes from 1px hairline
borders (`--color-line`), not drop shadows.

### Two fonts, two jobs

- **Space Grotesk** — headings and body text.
- **JetBrains Mono** — all the "log metadata": eyebrows (`// about`), tags, the
  day counter, nav labels. The monospace font is what gives the build-log feel.

Both are loaded from Google Fonts in `index.html`.

### Shared utility classes (in `index.css`)

- `.container` — centres content and caps its width.
- `.section` / `.section--raised` — vertical padding + the alternating background tint.
- `.mono-label`, `.section-head` — the monospace eyebrow + heading pattern.
- `.link-underline`, `.btn` — the underline-on-hover link and the outline button.
- `.reveal` / `.reveal.is-visible` — the scroll-reveal animation states.
- `.skip-link`, `.sr-only`, `:focus-visible` — accessibility helpers.

### Reduced motion

A `@media (prefers-reduced-motion: reduce)` block turns off the reveal animation and
smooth scrolling for users who ask their OS for less motion.

---

## File-by-file walkthrough

### `index.html`
The one and only HTML page. Sets the title, meta description, Open Graph tags, and
favicon; preconnects and loads the two Google Fonts; provides `<div id="root">` and
loads `main.jsx`.

### `src/main.jsx`
Three lines of real work: import `App`, import global `index.css`, and
`createRoot(#root).render(<App />)` wrapped in `<StrictMode>` (a dev-only helper that
surfaces bugs).

### `src/App.jsx`
The brain. It:
- defines `navLinks` (the four nav items, each id matching a section id),
- holds the `activeSection` state,
- runs the **two IntersectionObservers** in `useEffect`,
- renders the skip link, `<Navbar>`, the `<main>` with every section, and `<Footer>`.

### `src/components/Navbar.jsx`
Sticky top bar. Local `isOpen` state drives the mobile menu. `solid` is derived from
`activeSection` (the bar gains a hairline once you leave the hero). Maps `navLinks`
into anchor links, marking the active one with `is-active` and `aria-current`. Every
link's `onClick` calls `closeMenu` so the mobile menu closes after a tap. The
hamburger toggles between the `Menu` and `X` icons.

### `src/components/Hero.jsx`
First screen. Left column: the `// 14-day sprint` log line, the name, the role, a
short hook, and two underline CTAs ("View Projects", "Contact"). Right column: a
framed portrait (`avatar.png`). It's a two-column asymmetric grid on wide screens,
stacked on mobile.

### `src/components/About.jsx`
Asymmetric layout: a narrow heading column (sticky on desktop, like a margin note)
beside a wider prose column with three short paragraphs.

### `src/components/Skills.jsx`
Imports `skills` and `.map()`s them into a plain inline list. Middle-dot separators
between items are drawn with a CSS `::after` pseudo-element, so the data stays a clean
array of strings.

### `src/components/Projects.jsx`
Imports `projects` and `.map()`s them into `<ProjectCard>`s, passing each one its
`project` object and its `index` (for the staggered reveal).

### `src/components/ProjectCard.jsx`
Presentational. Destructures a project into `{ tag, title, status, description,
techTags, liveUrl, repoUrl }`. Renders a metadata rail (tag + "✓ shipped") beside the
write-up (title, description, tech tags, and the Live demo / Code links). The inline
`style={{ transitionDelay: index * 80ms }}` staggers each card's fade-in.

### `src/components/Resume.jsx`
A heading plus a download button. The `<a href="/resume.pdf" download>` uses the
native `download` attribute, so the browser saves the PDF instead of navigating to it.

### `src/components/Contact.jsx`
Builds a pre-filled `mailto:` URL (with subject and body) at the top of the function,
then shows a terminal-style `<dl>` with two rows: email (the mailto link) and WhatsApp
(a `wa.me` link). No backend, no form library.

### `src/components/Footer.jsx`
A closing log entry (`// end of log · day 14 · still building`), the name, primary
social links (GitHub, LinkedIn) with icons, quieter email/WhatsApp links, and a
copyright line.

---

## Data files

### `src/data/projects.js`
Exports `projects`, an array of objects. Each object is one card:

```js
{
  id: 'hangman',                 // unique key for React's list rendering
  tag: 'WEEK 1 · PRE-REACT',     // the mono label on the card
  title: 'Hangman Game',
  status: 'shipped',             // shown as "✓ shipped"
  description: '...',
  techTags: ['HTML', 'CSS', ...],// rendered as a mono dot-list
  liveUrl: 'https://...',        // the "Live demo" link
  repoUrl: 'https://...',        // the "Code" link
}
```

To add a project, add another object — no JSX changes needed.

### `src/data/skills.js`
Exports `skills`, a flat array of strings (`'HTML'`, `'CSS'`, …) rendered as the
inline tag list.

---

## Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`s, `<footer>`.
- One `<h1>` (hero), an `<h2>` per section, `<h3>` per card.
- A "Skip to content" link is the first focusable element.
- Every interactive element has a visible focus ring (`:focus-visible`).
- Icons are `aria-hidden`; the active nav link uses `aria-current`; the mobile toggle
  uses `aria-expanded` / `aria-controls`.
- Motion respects `prefers-reduced-motion`.

---

## Build & deploy

`npm run build` outputs a static site to `/dist`. It's plain static files, so it
deploys to any static host (Vercel, Netlify, GitHub Pages). Put `resume.pdf` and any
images in `public/` — Vite copies that folder to the site root as-is.
