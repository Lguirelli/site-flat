import { assetPath } from "@/lib/asset-path";
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "./MobileMenu";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${siteConfig.name}, página inicial`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assetPath("/assets/logo/logo-horizontal.svg")} alt="" width={104} height={53} />
      <span className="brand__place">Serra Negra · SP</span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header__inner">
          <Brand />
          <nav className="nav" aria-label="Principal">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <Button href={whatsappLink()} variant="whatsapp" size="sm" icon="whatsapp" className="header__cta">
              Consultar disponibilidade
            </Button>
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
