"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { BookingButton } from "@/components/ui/BookingButton";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { asset } from "@/lib/asset";

const headerLinks = [
  { href: "/#acomodacoes", label: "Flats" },
  { href: "/#estadia", label: "A estadia" },
  { href: "/#localizacao", label: "Onde fica" },
] as const;

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${siteConfig.name}, página inicial`}>
      {/* Uma versão do logo para cada tema; o CSS mostra a certa */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/assets/logo/logo-claro.svg")} alt="" width={118} height={60} className="logo logo--on-dark" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/assets/logo/logo-escuro.svg")} alt="" width={118} height={60} className="logo logo--on-light" />
    </Link>
  );
}

/** Barra simples: links à esquerda, marca ao centro, a ação à direita. Some ao descer e volta ao subir. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 320);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header ${hidden && !open ? "is-hidden" : ""}`}>
        <div className="frame header__inner">
          <nav className="header__nav" aria-label="Principal">
            {headerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="link">
                {l.label}
              </Link>
            ))}
          </nav>
          <Brand />
          <div className="header__actions">
            <ThemeToggle />
            <BookingButton source="header" className="header__cta" />
            <button
              type="button"
              className="menu-toggle"
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
