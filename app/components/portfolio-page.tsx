
import PortfolioReady from "./portfolio-ready";
import DotsHero from "./dots/dots-hero";

import ProjectCard from "./project-card";
import { projects, services, email } from "../portfolio";


function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="reveal-heading">
      {children}
    </h2>
  );
}

export default function PortfolioPage({
  screenshots,
}: {
  screenshots: boolean[];
}) {
  return (
    <PortfolioReady>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="container nav" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Zain, back to top">
            zain<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
          </div>
          <a className="button button-gold nav-cta" href="#contact">
            Let&apos;s talk
          </a>
        </nav>
      </header>
      <main id="main">
        <section
          id="top"
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span aria-hidden="true" />
              Backend by trade. Full-stack by habit.
            </p>
            <h1 id="hero-title" aria-label="Fast to ship. Hard to break.">
              <span className="hero-line">
                <span className="hero-line-content">
                  Fast to <em className="gold">ship.</em>
                </span>
              </span>
              <span className="hero-line">
                <span className="hero-line-content">
                  Hard to <em className="red">break.</em>
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              I&apos;m Zain, a full-stack engineer who turns messy ideas into
              production systems. AI wired in only where it earns its place.
            </p>
            <div className="button-group">
              <a className="button button-gold" href="#work">
                See the work
              </a>
              <a
                className="button button-outline"
               
                href="#contact"
              >
                Hire me
              </a>
            </div>
            <dl className="stats">
              <div>
                <dt>11+ mo</dt>
                <dd>Python at Enigmatix</dd>
              </div>
              <div>
                <dt>6</dt>
                <dd>AI APIs integrated</dd>
              </div>
              <div>
                <dt>3.65</dt>
                <dd>BS Software Eng.</dd>
              </div>
            </dl>
          </div>
          <DotsHero />
        </section>
        <div
          className="marquee" role="img"
          aria-label="Node.js, Next.js, React, TypeScript, Django, PostgreSQL, MongoDB, Redis, Docker, Bun"
        >
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="marquee-copy" key={copy}>
                {[
                  "Node.js",
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Django",
                  "PostgreSQL",
                  "MongoDB",
                  "Redis",
                  "Docker",
                  "Bun",
                ].map((tech) => (
                  <span key={tech}>
                    {tech}
                    <b>/</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <section
          id="work"
          className="section container work"
          aria-labelledby="work-title"
        >
          <p className="eyebrow">01 / Selected work.</p>
          <Heading id="work-title">Things I&apos;ve shipped.</Heading>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index + 1}
                hasScreenshot={screenshots[index]}
              />
            ))}
          </div>
        </section>
        <section
          id="about"
          className="section about light"
          aria-labelledby="about-title"
        >
          <div className="container">
            <p className="eyebrow">02 / About</p>
            <div className="about-grid">
              <Heading id="about-title">
                I like the unglamorous work. Schemas. Queues. Deploys that never
                page anyone at 3am.
              </Heading>
              <div className="about-details">
                <p>
                  Backend is where I started and where I&apos;m sharpest:
                  Django, Postgres, Redis, Docker. Then I carry it to the
                  finish line in Next.js and React, so you get one person who
                  can own the whole thing.
                </p>
                <dl className="facts">
                  <div>
                    <dt>Now</dt>
                    <dd>Django Backend Developer, Enigmatix.</dd>
                  </div>
                  <div>
                    <dt>Before</dt>
                    <dd>Full Stack intern, EnlivenAI Solutions.</dd>
                  </div>
                  <div>
                    <dt>Degree</dt>
                    <dd>BS Software Engineering, IUB (3.65 / 4.00).</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section
          id="services"
          className="section container services"
          aria-labelledby="services-title"
        >
          <p className="eyebrow">03 / Services.</p>
          <Heading id="services-title">How I can help.</Heading>
          <ol className="service-list">
            {services.map((service, index) => (
              <li className="service-row" key={service.title}>
                <span className="service-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="contact"
          className="section contact light"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <p className="eyebrow">04 / Contact</p>
            <Heading id="contact-title">
              Got something that needs to ship?
            </Heading>
            <div className="button-group">
              <a
                className="button button-ink"
               
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <a
                className="button button-outline"
               
                href="https://github.com/zaindotdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="button button-outline"
               
                href="https://linkedin.com/in/zaindotdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="container footer">
        <p>2026 Zain. Bahawalpur, Pakistan.</p>
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </PortfolioReady>
  );
}




