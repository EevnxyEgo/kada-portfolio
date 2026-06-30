import { ExternalLink, Github } from 'lucide-react'
import './ProjectCard.css'

// One log-entry-styled card. Receives a single project object plus its index
// (used to stagger the reveal animation down the list).
export default function ProjectCard({ project, index }) {
  const { tag, title, status, description, techTags, liveUrl, repoUrl } = project

  return (
    <article
      className="card reveal"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="card__meta">
        <p className="mono-label card__tag">{tag}</p>
        {status === 'shipped' && (
          <p className="card__status">
            <span className="card__check" aria-hidden="true">
              ✓
            </span>
            shipped
          </p>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{description}</p>

        <ul className="card__tech">
          {techTags.map((tech) => (
            <li key={tech} className="card__tech-item">
              {tech}
            </li>
          ))}
        </ul>

        <div className="card__links">
          {liveUrl ? (
            <a
              href={liveUrl}
              className="link-underline card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="card__note">runs locally</span>
          )}

          {repoUrl ? (
            <a
              href={repoUrl}
              className="link-underline card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
              <Github size={14} aria-hidden="true" />
            </a>
          ) : (
            // repoUrl is null on purpose — render a muted, non-interactive note
            // instead of a link that goes nowhere. (Real URLs get filled in later.)
            <span className="card__note card__note--disabled">
              <Github size={14} aria-hidden="true" />
              repo link coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
