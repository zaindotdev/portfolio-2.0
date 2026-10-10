"use client";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../portfolio";
import ProjectVisual from "./project-visual";

export default function CaseStudyLink({ project, index, hasScreenshot }: { project: Project; index: number; hasScreenshot: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = `case-${project.slug}`;
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (element && !element.open) element.showModal();
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  return <>
    <a className="case-link" href={`#${titleId}`} aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); setOpen(true); }}>View case study</a>
    <dialog ref={dialog} className="case-dialog" aria-labelledby={titleId} data-lenis-prevent onClose={() => setOpen(false)} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
    }}>
      {open && <>
        <div className="dialog-header">
          <span className="eyebrow">{String(index).padStart(2, "0")} / {project.category}</span>
          <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close case study" autoFocus>×</button>
        </div>
        <div className="case-content">
          <h2 id={titleId}>{project.title}</h2>
          <p className="case-summary">{project.description}</p>
          <div className="case-links">
            {project.live && <a className="button button-yellow" href={project.live} target="_blank" rel="noopener noreferrer">Visit live site ↗</a>}
            {project.github && <a className="button button-outline" href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>}
          </div>
          <ProjectVisual project={project} hasScreenshot={hasScreenshot} detail />
          <section className="case-section" aria-label="Project overview"><h3>The project</h3><p>{project.overview}</p></section>
          <section className="case-section" aria-label="Project features"><h3>What it does</h3>
            <dl className="case-features">{project.features.map(([title, description], featureIndex) => <div key={title}>
              <span aria-hidden="true">{String(featureIndex + 1).padStart(2, "0")}</span>
              <div><dt>{title}</dt><dd>{description}</dd></div>
            </div>)}</dl>
          </section>
          <section className="case-section" aria-label="Technology stack"><h3>Built with</h3><ul className="case-stack">{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul></section>
          <div className="case-takeaway"><p>{project.outcome}</p></div>
        </div>
      </>}
    </dialog>
  </>;
}
