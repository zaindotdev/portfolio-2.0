"use client";
import { useEffect } from "react";

export default function PortfolioReady({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.portfolioReady = "true";
    window.dispatchEvent(new Event("portfolio:ready"));
    return () => { delete document.documentElement.dataset.portfolioReady; };
  }, []);
  return children;
}
