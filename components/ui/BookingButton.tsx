"use client";

import { openBooking } from "@/lib/track";
import { ButtonContent, buttonClass, type ButtonVariant } from "./Button";

/** A ação principal do site: abre o formulário de datas. */
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
  icon?: "calendar" | "arrow";
}) {
  return (
    <button
      type="button"
      className={buttonClass(variant, block, className)}
      data-cta={source}
      aria-haspopup="dialog"
      onClick={() => openBooking({ flat, source })}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}
