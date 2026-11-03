"use client";

import Link from "next/link";
import { useEffect } from "react";
import { navLinks, siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Brand } from "./Header";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`mobile-menu ${open ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mobile-menu__top">
        <Brand />
        <button
          type="button"
          className="menu-toggle"
          style={{ display: "inline-flex" }}
          aria-label="Fechar menu"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <nav aria-label="Menu mobile">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="mobile-menu__foot">
        <Button href={whatsappLink()} variant="whatsapp" icon="whatsapp" block>
          Falar pelo WhatsApp
        </Button>
        <p>
          {siteConfig.address.street} · {siteConfig.address.neighborhood}
          <br />
          {siteConfig.address.city}, {siteConfig.address.state}
        </p>
      </div>
    </div>
  );
}
