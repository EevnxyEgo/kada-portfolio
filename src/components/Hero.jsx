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

        {/* signature element: the sprint as a literal changelog */}
        <aside className="hero__log-card reveal" aria-label="Sprint changelog">
          <p className="mono-label hero__log-card-title">build.log</p>
          <ul className="hero__entries">
            <li>
              <span className="hero__day">day 01</span>
              <span className="hero__what">vanilla js — dom + events</span>
            </li>
            <li>
              <span className="hero__day">day 05</span>
              <span className="hero__what">hangman shipped</span>
              <span className="hero__check" aria-hidden="true">✓</span>
            </li>
            <li>
              <span className="hero__day">day 08</span>
              <span className="hero__what">react — state + props</span>
            </li>
            <li>
              <span className="hero__day">day 12</span>
              <span className="hero__what">todo list shipped</span>
              <span className="hero__check" aria-hidden="true">✓</span>
            </li>
            <li>
              <span className="hero__day">day 14</span>
              <span className="hero__what">sprint complete</span>
            </li>
            <li>
              <span className="hero__day hero__day--bonus">+ bonus</span>
              <span className="hero__what">reel — stretch build</span>
              <span className="hero__check" aria-hidden="true">✓</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
