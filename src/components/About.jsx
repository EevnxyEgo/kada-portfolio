import './About.css'

export default function About() {
  return (
    <section
      id="about"
      className="section section--raised"
      aria-labelledby="about-title"
    >
      <div className="container about__inner">
        <header className="about__aside">
          <span className="mono-label about__eyebrow">// about</span>
          <h2 id="about-title" className="about__title">
            Who&rsquo;s writing this log
          </h2>
        </header>

        <div className="about__body reveal">
          <p>
            I studied Computer Engineering at ITS (Institut Teknologi Sepuluh
            Nopember), and I&rsquo;ve spent time around software and automation
            work since.
          </p>
          <p>
            This sprint was a deliberate narrowing: two focused weeks on the
            fundamentals of HTML, CSS, JavaScript, and React — building real,
            finished projects instead of collecting half-done tutorials.
          </p>
          <p>
            I learn by shipping. A concept doesn&rsquo;t really stick until
            I&rsquo;ve used it to chase down my own bug at 1am, so everything in
            this log earned its place by surviving an actual build.
          </p>
        </div>
      </div>
    </section>
  )
}
