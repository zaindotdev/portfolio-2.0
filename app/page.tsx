import { existsSync } from "node:fs";
import path from "node:path";
import PortfolioPage from "./components/portfolio-page";
import { projects } from "./portfolio";

export default function HomePage() {
  const screenshots = projects.map((project) => existsSync(path.join(process.cwd(), "public", "projects", `${project.slug}.webp`)));
  return <PortfolioPage screenshots={screenshots} />;

}
