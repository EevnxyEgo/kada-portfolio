import { Download } from 'lucide-react'
import './Resume.css'

export default function Resume() {
  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="container resume__inner reveal">
        <div className="resume__text">
          <span className="mono-label section-head__eyebrow">// resume</span>
          <h2 id="resume-title" className="resume__title">
            Want the long version?
          </h2>
          <p className="resume__note">
            The one-page CV — background, tooling, and how to reach me.
          </p>
        </div>

        {/* `download` makes the browser save the file rather than navigate to
            it. The PDF lives in /public and is served from the site root. */}
        <a href="/resume.pdf" download className="btn resume__btn">
          Download résumé
          <Download size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
