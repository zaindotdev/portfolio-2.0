import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import PortfolioMotion from "./components/portfolio-motion";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: "800", display: "swap" });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const mono = DM_Mono({ variable: "--font-label", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Zain — Full-stack engineer",
  description: "Backend by trade. Full-stack by habit. Zain builds production systems with Node.js, Next.js, and AI where it earns its place. Based in Bahawalpur, Pakistan.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}<PortfolioMotion /></body></html>;
}
