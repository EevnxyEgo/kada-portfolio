// The three projects, in chronological "build log" order.
// One object per project — Projects.jsx maps over this array.
//
// repoUrl: null  -> render the "Code" link disabled ("repo link coming soon")
// liveUrl: null  -> no live demo (e.g. a local dev project)

export const projects = [
  {
    id: 'hangman',
    tag: 'WEEK 1 · PRE-REACT',
    title: 'Hangman Game',
    status: 'shipped',
    description:
      'A polished browser Hangman built in vanilla HTML, CSS, and JavaScript — no framework, no build step — to lock in DOM manipulation, manual state, and event-driven thinking before touching React. Hint system, Easy/Medium/Hard difficulty, six word categories from an offline word bank, score and streak saved to localStorage, Web Audio sound effects, win/lose animations, and full keyboard + responsive support.',
    techTags: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'Web Audio API'],
    liveUrl: 'https://hangman-game-beige-six.vercel.app',
    repoUrl: 'https://github.com/EevnxyEgo/Hangman-Game',
  },
  {
    id: 'todo',
    tag: 'WEEK 2 · FIRST REACT APP',
    title: 'TODO List',
    status: 'shipped',
    description:
      "My first React app, built while learning the fundamentals — components, props, state, and the \"data flows down, events flow up\" pattern. Add tasks, check them off with a strikethrough, delete them, and watch a live done/total counter. Under the hood: useState for memory, lifting state up so sibling components share data, list rendering with .map() and stable keys, and controlled form submission.",
    techTags: ['React', 'JavaScript', 'CSS'],
    liveUrl: 'https://my-todolist-hazel.vercel.app/',
    repoUrl: 'https://github.com/EevnxyEgo/my-todolist',
  },
  {
    id: 'reel',
    tag: 'BONUS · STRETCH PROJECT',
    title: 'REEL — Cinematic Movie Booking',
    status: 'shipped',
    description:
      'A "how far can the fundamentals take me" challenge, built right after the sprint. A full movie-booking flow — browse now-playing, open a film, pick a showtime, choose seats on a real floor-plan, then get a scannable QR e-ticket — styled like a 1970s film-festival programme with editorial typography and light/dark themes.',
    techTags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    liveUrl: 'https://cinebook-advanced.vercel.app',
    repoUrl: 'https://github.com/EevnxyEgo/-REEL-Cinematic-Editorial-Movie-Booking-Experience',
  },
]
