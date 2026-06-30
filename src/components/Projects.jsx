import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Projects.css'

export default function Projects() {
  return (
    <section
      id="projects"
      className="section section--raised"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <header className="section-head">
          <span className="mono-label section-head__eyebrow">// projects</span>
          <h2 id="projects-title" className="section-head__title">
            Three things I shipped
          </h2>
        </header>

        <div className="projects__list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
