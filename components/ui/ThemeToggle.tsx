"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "dark" | "light";

/**
 * Alterna entre modo escuro e claro. A escolha fica salva no navegador; sem
 * escolha, vale a preferência do sistema (definida antes da pintura, no layout).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove("theme-switching"), 300);
    try {
      localStorage.setItem("tema", next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f1efe8" : "#161c1a");
    setTheme(next);
  }

  const toLight = theme !== "light";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={toLight ? "Ativar modo claro" : "Ativar modo escuro"}
      title={toLight ? "Modo claro" : "Modo escuro"}
    >
      <Icon name={toLight ? "sun" : "moon"} />
    </button>
  );
}
