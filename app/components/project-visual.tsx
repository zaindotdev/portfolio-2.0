import Image from "next/image";
import type { Project } from "../portfolio";

export default function ProjectVisual({ project, hasScreenshot, detail = false }: { project: Project; hasScreenshot: boolean; detail?: boolean }) {
  const source = project.image ?? (hasScreenshot ? `/projects/${project.slug}.webp` : undefined);
  return <div className={`project-visual tile-${project.color} ${detail ? "project-visual-detail" : ""}`}>
    {source ? <Image src={source} width={1448} height={1086}
      sizes={detail ? "(max-width: 767px) 90vw, 850px" : "(max-width: 767px) 90vw, 43vw"}
      alt={project.imageAlt ?? `${project.title} project preview`} /> :
      <div className="project-cover" aria-label={`${project.title} project cover`}>
        <span className="project-cover-category">{project.category}</span>
        <strong>{project.cover}</strong>
        <span className="project-cover-stack">{project.stack.slice(0, 3).join(" / ")}</span>
      </div>}
  </div>;
}
