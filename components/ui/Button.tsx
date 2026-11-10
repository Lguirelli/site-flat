import { Icon } from "./Icon";

/**
 * accent  — a ação de reserva (único uso da cor de destaque)
 * paper   — botão claro sobre fotografia ou campo escuro
 * ghost   — ação secundária, só contorno de tom
 * link    — texto sublinhado com seta
 */
export type ButtonVariant = "accent" | "paper" | "ghost" | "link";

type Props = {
  icon?: "calendar" | "arrow" | "pin";
};

export function buttonClass(variant: ButtonVariant, block?: boolean, className = "") {
  return ["btn", `btn--${variant}`, block && "btn--block", className].filter(Boolean).join(" ");
}

export function ButtonContent({ icon, children }: { icon?: Props["icon"]; children: React.ReactNode }) {
  return (
    <>
      {icon === "calendar" && <Icon name="calendar" className="icon btn__icon" />}
      {icon === "pin" && <Icon name="pin" className="icon btn__icon" />}
      <span>{children}</span>
      {icon === "arrow" && <Icon name="arrowRight" className="icon btn__arrow" />}
    </>
  );
}
