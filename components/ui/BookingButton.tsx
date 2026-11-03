"use client";

import { flatWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import { openBooking } from "@/lib/track";
import { ButtonContent, buttonClass, type ButtonVariant } from "./Button";

/**
 * A ação principal do site. É um link real para o WhatsApp (funciona sem JS e
 * com Ctrl+clique); com JS, abre antes o formulário de datas, que monta a
 * mensagem completa.
 */
export function BookingButton({
  children = "Consultar datas",
  flat,
  source,
  variant = "accent",
  block,
  className,
  icon,
}: {
  children?: React.ReactNode;
  flat?: string;
  source: string;
  variant?: ButtonVariant;
  block?: boolean;
  className?: string;
  icon?: "whatsapp" | "arrow";
}) {
  const href = whatsappLink(flat ? flatWhatsAppMessage(flat) : undefined);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, block, className)}
      data-cta={source}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openBooking({ flat, source });
      }}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </a>
  );
}
