import { ExternalLink, Github } from 'lucide-react'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  const { tag, title, status, description, techTags, liveUrl, repoUrl } = project

  return (
    <article
      className="card reveal"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="card__meta">
        <p className="mono-label card__tag">{tag}</p>
        <p className="card__status">
          <span className="card__check" aria-hidden="true">
            ✓
          </span>
          {status}
        </p>
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
          <a
            href={liveUrl}
            className="link-underline card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a
            href={repoUrl}
            className="link-underline card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
            <Github size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
