import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Intro">
      <div className="container hero__inner">
        <div className="hero__intro reveal">
          <p className="mono-label hero__log">
            // 14-day sprint · 3 projects shipped
          </p>

          <h1 className="hero__name">Arsen</h1>
          <p className="hero__role">React Developer</p>

          <p className="hero__hook">
            Computer Engineering background, recently went all-in on the
            frontend. Fourteen days, three real projects — vanilla JavaScript
            through React fundamentals, with the receipts to prove it.
          </p>

          <div className="hero__cta">
            <a href="#projects" className="link-underline">
              View Projects <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="link-underline">
              Contact
            </a>
          </div>
        </div>

        <aside className="hero__portrait reveal" aria-label="Portrait">
          <img className="avatar" src="/images/avatar.jpg" alt="Portrait of Arsen" />
        </aside>
      </div>
    </section>
  )
}
