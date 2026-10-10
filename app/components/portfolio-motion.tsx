"use client";

import { useEffect } from "react";
import type { SplitText } from "gsap/SplitText";
import type gsap from "gsap";

export default function PortfolioMotion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let observer: IntersectionObserver | undefined;
    const splits: SplitText[] = [];
    const animations = new Set<gsap.core.Tween>();
    const completed = new WeakSet<HTMLElement>();
    const targets = new Map<Element, { content: Element; order: number; parent: HTMLElement }>();
    const originalStyles = new Map<HTMLElement, string | null>();
    let elements: HTMLElement[] = [];

    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.kill());
      animations.clear();
      splits.splice(0).forEach(split => split.revert());
      targets.clear();
      originalStyles.forEach((style, element) => {
        if (style === null) element.removeAttribute("style");
        else element.setAttribute("style", style);
      });
      originalStyles.clear();
      elements.forEach(element => { delete element.dataset.revealState; });
    };

    const setup = async () => {
      const version = ++generation;
      reset();
      if (preference.matches) return;
      const [{ gsap }, { SplitText }] = await Promise.all([import("gsap"), import("gsap/SplitText"), document.fonts.ready]);
      if (disposed || version !== generation) return;
      gsap.registerPlugin(SplitText);
      elements = Array.from(document.querySelectorAll<HTMLElement>(
        ".hero-line-content, main h2, main h3, main h4, main p, footer p, main dt, main dd, main th, main td, .project-meta span, .service-number",
      ));
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.intersectionRatio < .2) return;
          const target = targets.get(entry.target);
          if (!target) return;
          observer?.unobserve(entry.target);
          (entry.target as HTMLElement).dataset.revealState = "visible";
          const animation = gsap.to(target.content, {
            yPercent: 0, y: 0, opacity: 1, duration: 1.05,
            delay: Math.min(target.order * .09, .36), ease: "power4.out",
            onComplete: () => {
              animations.delete(animation);
              const pending = Array.from(targets).some(([node, value]) => value.parent === target.parent && (node as HTMLElement).dataset.revealState === "pending");
              if (!pending) completed.add(target.parent);
            },
          });
          animations.add(animation);
        });
      }, { threshold: .2, rootMargin: "0px 0px -4% 0px" });

      elements.forEach(element => {
        const multiline = element.matches(".hero-line-content, h2, h3, h4, p");
        if (!multiline) {
          if (completed.has(element)) return;
          originalStyles.set(element, element.getAttribute("style"));
          element.dataset.revealState = "pending";
          gsap.set(element, { y: 14, opacity: 0 });
          targets.set(element, { content: element, order: 0, parent: element });
          observer?.observe(element);
          return;
        }
        const split = SplitText.create(element, {
          type: "lines", mask: "lines", linesClass: "text-reveal-line", autoSplit: true,
          onSplit: instance => {
            // Rebuild masks on responsive reflow; completed text stays visible.
            for (const [node, target] of targets) {
              if (target.parent === element) { observer?.unobserve(node); targets.delete(node); }
            }
            if (completed.has(element)) return;
            instance.lines.forEach((line, index) => {
              const mask = instance.masks[index] as HTMLElement;
              mask.dataset.revealState = "pending";
              gsap.set(line, { yPercent: 105, opacity: 0 });
              targets.set(mask, { content: line, order: index, parent: element });
              observer?.observe(mask);
            });
          },
        });
        splits.push(split);
      });
    };

    const start = () => { void setup(); };
    if (document.documentElement.dataset.portfolioReady === "true") start();
    else window.addEventListener("portfolio:ready", start, { once: true });
    preference.addEventListener("change", start);
    return () => {
      disposed = true;
      generation++;
      window.removeEventListener("portfolio:ready", start);
      preference.removeEventListener("change", start);
      reset();
    };
  }, []);
  return null;
}
