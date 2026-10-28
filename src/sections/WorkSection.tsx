import { ProjectVisual } from '../components/ProjectVisual'
import { SectionHeading } from '../components/SectionHeading'
import { ArrowUpRight } from '../components/Icons'
import { projects } from '../data/projects'

export function WorkSection() {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-heading">
      <SectionHeading id="work-heading" eyebrow="01 — SELECTED WORK" title="Things I’ve been building." note="A few projects, still in motion." />
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project-card project-${project.visual}`} key={project.number} data-reveal>
            <div className="project-visual-wrap">
              <ProjectVisual type={project.visual} />
              <span className="project-number">{project.number}</span>
            </div>
            <div className="project-info">
              <div className="project-label-row">
                <p className="eyebrow">{project.label}</p>
                <span className="project-status"><i />{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <div className="tag-list">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                {project.repositoryUrl || project.demoUrl
                  ? <a className="project-link" href={project.repositoryUrl ?? project.demoUrl} target="_blank" rel="noreferrer">View project <ArrowUpRight /></a>
                  : <span className="project-link project-link-pending">Links to add <ArrowUpRight /></span>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="section-footnote" data-reveal>
        Project visuals are illustrative. Repository links, live demos and verified technology details are ready to add when supplied.
      </p>
    </section>
  )
}
