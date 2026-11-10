"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import { BookingForm } from "./BookingForm";
import { Icon } from "./Icon";

/**
 * Formulário de datas em um <dialog> nativo (foco preso, Esc e fundo inerte de
 * graça). No celular vira uma folha que sobe da borda de baixo.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [flat, setFlat] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ flat?: string; source?: string }>).detail ?? {};
      setFlat(detail.flat ?? "");
      track("booking_open", { source: detail.source, flat: detail.flat });
      ref.current?.showModal();
    };
    window.addEventListener("booking:open", onOpen);
    return () => window.removeEventListener("booking:open", onOpen);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="sheet sheet--wide"
      aria-label="Consultar datas"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="sheet__body">
        <button type="button" className="sheet__close" onClick={close} aria-label="Fechar">
          <Icon name="close" />
        </button>
        <BookingForm defaultFlat={flat} title={flat ? `Datas para o ${flat}` : "Escolha as datas"} onSent={close} onBack={close} />
      </div>
    </dialog>
  );
}
