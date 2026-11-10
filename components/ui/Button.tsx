import Link from "next/link";
import { Icon, WhatsAppIcon } from "./Icon";

/**
 * accent  — a ação de reserva (único uso da cor de destaque)
 * paper   — botão claro sobre fotografia ou campo escuro
 * ghost   — ação secundária, só contorno de tom
 * link    — texto sublinhado com seta
 */
export type ButtonVariant = "accent" | "paper" | "ghost" | "link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  block?: boolean;
  icon?: "whatsapp" | "arrow" | "pin";
  className?: string;
  ariaLabel?: string;
  cta?: string;
};

export function buttonClass(variant: ButtonVariant, block?: boolean, className = "") {
  return ["btn", `btn--${variant}`, block && "btn--block", className].filter(Boolean).join(" ");
}

export function ButtonContent({ icon, children }: { icon?: Props["icon"]; children: React.ReactNode }) {
  return (
    <>
      {icon === "whatsapp" && <WhatsAppIcon className="btn__icon" />}
      {icon === "pin" && <Icon name="pin" className="icon btn__icon" />}
      <span>{children}</span>
      {icon === "arrow" && <Icon name="arrowRight" className="icon btn__arrow" />}
    </>
  );
}

export function Button({ href, children, variant = "accent", block, icon, className = "", ariaLabel, cta }: Props) {
  const cls = buttonClass(variant, block, className);
  const content = <ButtonContent icon={icon}>{children}</ButtonContent>;
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} data-cta={cta}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel} data-cta={cta}>
      {content}
    </Link>
  );
}
