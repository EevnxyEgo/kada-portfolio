import { skills } from '../data/skills'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head">
          <span className="mono-label section-head__eyebrow">// skills</span>
          <h2 id="skills-title" className="section-head__title">
            What&rsquo;s in the kit
          </h2>
        </header>

        <p className="skills__note reveal">
          The stack I reached for across the three builds.
        </p>

        <ul className="skills__list reveal">
          {skills.map((skill) => (
            <li key={skill} className="skills__item">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
