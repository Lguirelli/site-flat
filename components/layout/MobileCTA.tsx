"use client";

import { useEffect, useState } from "react";
import { BookingButton } from "@/components/ui/BookingButton";

/** Barra fixa no celular: aparece depois da primeira dobra e some perto do rodapé. */
export function MobileCTA({ flat }: { flat?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - window.innerHeight * 1.2;
        setVisible(window.scrollY > window.innerHeight * 0.7 && !nearEnd);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <BookingButton source="mobile-bar" flat={flat} icon="calendar" block>
        {flat ? `Consultar o ${flat}` : "Consultar datas"}
      </BookingButton>
    </div>
  );
}
