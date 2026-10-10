import ProjectVisual from "./project-visual";
import type { Project } from "../portfolio";
import CaseStudyLink from "./case-study-link";

export default function ProjectCard({ project, index, hasScreenshot }: { project: Project; index: number; hasScreenshot: boolean }) {
  return <article className="project-card">
    <div className="tile-frame"><ProjectVisual project={project} hasScreenshot={hasScreenshot} /></div>
    <div className="project-meta"><span>0{index}</span><span>{project.tags}</span></div>
    <h3>{project.title}</h3><p>{project.description}</p>
    <div className="project-actions"><CaseStudyLink project={project} index={index} hasScreenshot={hasScreenshot} />
      {project.github && <a className="project-source-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>GitHub <span aria-hidden="true">↗</span></a>}
    </div>
  </article>;
}
