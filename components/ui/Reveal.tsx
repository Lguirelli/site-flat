"use client";

import { useEffect, useRef } from "react";

/**
 * Entrada ao rolar, uma única vez. As partes marcadas com `data-r` dentro do
 * bloco chegam em ordem de leitura (título, texto, imagem), 80 ms entre elas;
 * `data-r="img"` abre a imagem por máscara. O índice é definido aqui, pela
 * ordem no DOM. Sem JS ou com movimento reduzido, tudo já aparece pronto.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  id,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  id?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-r]").forEach((part, i) => part.style.setProperty("--i", String(Math.min(i, 4))));
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
