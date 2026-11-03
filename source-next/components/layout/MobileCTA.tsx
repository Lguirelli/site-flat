"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

/** Barra fixa discreta no celular; aparece depois da primeira dobra e some perto do rodapé. */
export function MobileCTA({ message }: { message?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 520;
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <Button href="/#acomodacoes" variant="outline" size="sm">
        Ver flats
      </Button>
      <Button href={whatsappLink(message)} variant="whatsapp" size="sm" icon="whatsapp">
        Consultar datas
      </Button>
    </div>
  );
}
