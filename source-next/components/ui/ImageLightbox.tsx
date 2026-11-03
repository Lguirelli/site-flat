"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { Icon } from "./Icon";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
  hrefLabel?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Visualizador em tela cheia: teclado (← → Esc), toque (deslizar) e foco preso no diálogo. */
export function ImageLightbox({ items, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null && items[index] !== undefined;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open, go, onChange]);

  // Pré-carrega a próxima imagem
  useEffect(() => {
    if (index === null || items.length < 2) return;
    const next = new window.Image();
    next.src = items[(index + 1) % items.length].src;
  }, [index, items]);

  if (!open) return null;
  const item = items[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <div className="lightbox__bar">
        <span aria-live="polite">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={() => onChange(null)} aria-label="Fechar galeria">
          <Icon name="close" />
        </button>
      </div>

      <div
        className="lightbox__stage"
        onClick={(e) => {
          if (e.target === e.currentTarget) onChange(null);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {/* Imagem original (já em resolução de tela), sem reprocessamento */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={item.src} src={item.src} alt={item.alt} />
        {items.length > 1 && (
          <>
            <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Foto anterior">
              <Icon name="arrowLeft" />
            </button>
            <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Próxima foto">
              <Icon name="arrowRight" />
            </button>
          </>
        )}
      </div>

      <div className="lightbox__foot">
        <span>{item.caption ?? item.alt}</span>
        {item.href && (
          <Link href={item.href} onClick={() => onChange(null)}>
            {item.hrefLabel ?? "Ver acomodação"}
          </Link>
        )}
      </div>
    </div>
  );
}
