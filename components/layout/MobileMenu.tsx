"use client";

import Link from "next/link";
import { useEffect } from "react";
import { navLinks, siteConfig } from "@/data/site-config";
import { BookingButton } from "@/components/ui/BookingButton";
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
      <div className="frame mobile-menu__top">
        <Brand />
        <button type="button" className="menu-toggle" aria-label="Fechar menu" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <nav className="frame mobile-menu__nav" aria-label="Menu do celular">
        {navLinks.map((l, i) => (
          <Link key={l.href} href={l.href} onClick={onClose} style={{ "--i": i } as React.CSSProperties}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="frame mobile-menu__foot" onClick={onClose}>
        <BookingButton source="menu" block />
        <p>
          {siteConfig.address.street} · {siteConfig.address.neighborhood}, {siteConfig.address.city}
        </p>
      </div>
    </div>
  );
}
