# Zain portfolio

A custom Next.js App Router portfolio with TypeScript, Tailwind CSS, GSAP / ScrollTrigger, and Lenis. Uses Bricolage Grotesque, Instrument Sans, and DM Mono through next/font.

## Run

```sh
bun install
bun run dev
```

Production and quality checks:

```sh
bun run build
bun run lint
bun run start
```

## Owner assets

The supplied owner portrait is converted to transparent WebP; its original PNG is preserved. Project screenshot placeholders remain until real screenshots exist. Add these files and rebuild; the page detects them at build time and renders them through next/image.

- `public/portrait.webp`: transparent 900 × 1300 owner cutout.
- `public/projects/intervue-ai.webp`
- `public/projects/velocity.webp`
- `public/projects/ravintola-amazona.webp`
- `public/projects/home-services-marketplace.webp`

Project screenshots use a 1200 × 700 image slot. Project copy and the contact email live in `app/portfolio.ts`. Case study links open accessible dialogs with the supplied summary; full case study content is pending owner input.

## Motion

`app/components/portfolio-motion.tsx` owns the single fixed portrait in the root layout. The outer transform follows a whole-page timeline at 0 / 20 / 45 / 70 / 100 percent, while nested layers isolate entrance, float, row tracking, wave, and silhouette effects. A mount signal prevents headline splitting from racing Next.js hydration. Mobile motion uses a smaller path. The portrait dims when it overlaps visible copy or CTAs at any screen size. Reduced motion disables Lenis, the portrait path, marquee and text reveals, with a static hero portrait.

Design reference: the supplied Zain Portfolio Design PDF. Behavior and verbatim portfolio copy follow the handoff brief, with the supplied real email replacing its placeholder.
