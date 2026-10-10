"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useDotsQuality } from "./use-dots-quality";
import type { DotExpression } from "./config";

const Scene = dynamic(() => import("./dots-scene"), { ssr: false });
const sections = ["top", "work", "about", "services", "contact"] as const;
const expressions: DotExpression[] = ["welcome", "focused", "curious", "confident", "happy"];

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function DotsHero() {
  const root = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [expression, setExpression] = useState<DotExpression>("welcome");
  const { mobile, reducedMotion } = useDotsQuality();

  useEffect(() => {
    let frame: number;
    let last = 0;
    let currentSection = -1;
    let lastCollisionCheck = 0;
    const readable = Array.from(document.querySelectorAll("h1, h2, .hero-intro, .button, .project-card h3, .project-card > p, .about-details, .service-row h3, .service-row p"));
    let current: { x: number; y: number; scale: number; rotation: number } | undefined;
    let stops: number[] = [];
    let disposed = false;
    const measure = () => {
      stops = sections.map((id, i) => {
        const element = document.getElementById(id);
        return i === 0 ? 0 : Math.max(0, (element?.getBoundingClientRect().top ?? 0) + window.scrollY - window.innerHeight * .25);
      });
      // Layout/font changes and history restoration must start at the new pose.
      current = undefined;
    };
    const visibility = () => setActive(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setMounted(true); });
    // The mascot stays fixed on screen even when its hero anchor is offscreen.
    // Watching the anchor left deep-page reloads permanently on the CSS fallback.
    if (root.current) observer.observe(root.current);
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    document.addEventListener("visibilitychange", visibility);

    const tick = (time: number) => {
      const element = root.current;
      if (!element) return;
      const w = window.innerWidth, h = window.innerHeight;
      const size = element.offsetWidth;
      const gutter = document.querySelector(".container")?.getBoundingClientRect().left ?? 24;
      const title = document.getElementById("hero-title")?.getBoundingClientRect();
      const heroY = mobile
        ? (anchor.current?.getBoundingClientRect().top ?? 650) + window.scrollY
        : Math.max(125, Math.min(h - size - 36, (title?.top ?? 160) + window.scrollY - 20));
      const heroX = mobile ? w - size - 12 : w - gutter - size;
      const poses = mobile ? [
        { x: heroX, y: heroY, scale: 1, rotation: 0 },
        { x: w - size * .62 - 8, y: h - size * .62 - 20, scale: .62, rotation: -9 },
        { x: 6, y: h - size * .6 - 18, scale: .6, rotation: 8 },
        { x: w - size * .6 - 8, y: h - size * .6 - 20, scale: .6, rotation: -7 },
        { x: w - size * .75 - 12, y: h - size * .75 - 24, scale: .75, rotation: 5 },
      ] : [
        { x: heroX, y: heroY, scale: 1, rotation: 0 },
        { x: 8, y: h - size * .55 - 28, scale: .55, rotation: -10 },
        { x: w - size * .58 - 10, y: h - size * .58 - 28, scale: .58, rotation: 8 },
        { x: 10, y: 130, scale: .5, rotation: -6 },
        { x: w - gutter - size * .78, y: h - size * .78 - 28, scale: .78, rotation: 6 },
      ];
      let index = 0;
      while (index < stops.length - 1 && window.scrollY >= stops[index + 1]) index++;
      const next = Math.min(index + 1, poses.length - 1);
      const progress = next === index ? 0 : Math.min(1, Math.max(0, (window.scrollY - stops[index]) / Math.max(1, stops[next] - stops[index])));
      const eased = progress * progress * (3 - 2 * progress);
      const pose = poses[index], destination = poses[next];
      const target = {
        x: pose.x + (destination.x - pose.x) * eased,
        y: pose.y + (destination.y - pose.y) * eased,
        scale: pose.scale + (destination.scale - pose.scale) * eased,
        rotation: pose.rotation + (destination.rotation - pose.rotation) * eased,
      };
      const section = index;
      if (section !== currentSection) { currentSection = section; setExpression(expressions[section]); }
      const damping = 1 - Math.exp(-8 * Math.min((time - last) / 1000, .05));
      last = time;
      if (!current || reducedMotion) current = target;
      else for (const key of ["x", "y", "scale", "rotation"] as const) current[key] += (target[key] - current[key]) * damping;
      if (reducedMotion) {
        element.style.transform = "none";
        element.style.position = "absolute";
      } else {
        element.style.position = "fixed";
        element.style.transform = `translate3d(${current.x}px,${current.y}px,0) scale(${current.scale}) rotate(${current.rotation}deg)`;
      }
      element.dataset.positioned = "true";
      // Keep copy and links readable when the mascot passes across content.
      if (time - lastCollisionCheck > 100) {
        lastCollisionCheck = time;
        const bounds = element.getBoundingClientRect();
        const face = { left: bounds.left + bounds.width * .2, right: bounds.right - bounds.width * .2,
          top: bounds.top + bounds.height * .15, bottom: bounds.bottom - bounds.height * .15 };
        const overlaps = readable.some(node => {
          const range = document.createRange();
          range.selectNodeContents(node);
          const rects = node.classList.contains("button") ? [node.getBoundingClientRect()] : Array.from(range.getClientRects());
          return rects.some(rect => rect.width > 0 && rect.top < face.bottom && rect.bottom > face.top && rect.left < face.right && rect.right > face.left);
        });
        element.style.opacity = overlaps && !reducedMotion ? ".18" : "1";
        const canvas = element.querySelector("canvas");
        if (canvas) canvas.style.pointerEvents = overlaps ? "none" : "auto";
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener("resize", measure); window.removeEventListener("pageshow", measure); document.removeEventListener("visibilitychange", visibility); };
  }, [mobile, reducedMotion]);

  return <div ref={anchor} className="dot-anchor">
    <div ref={root} className="traveling-dot" data-expression={expression} aria-hidden="true">
      {failed && <div className="dot-static-face">
        <i /><i /><span />
      </div>}
      {mounted && !failed && <SceneBoundary onFailure={() => setFailed(true)}>
        <div className="dot-scene-reveal" data-ready={ready}>
        <Scene active={active} expression={expression} onReady={() => setReady(true)} onFailure={() => setFailed(true)} />
        </div>
      </SceneBoundary>}
    </div>
  </div>;
}
