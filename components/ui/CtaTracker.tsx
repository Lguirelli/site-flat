"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Um único ouvinte de cliques para todos os elementos marcados com data-cta. */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      track("cta_click", { cta: el.dataset.cta, href: el.getAttribute("href") ?? undefined });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
