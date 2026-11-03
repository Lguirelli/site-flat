import Link from "next/link";
import { Icon, WhatsAppIcon } from "./Icon";

type Variant = "primary" | "whatsapp" | "outline" | "light" | "ghost-light";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  block?: boolean;
  icon?: "whatsapp" | "arrow" | "camera" | "pin";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function Button({ href, children, variant = "primary", size = "md", block, icon, external, className = "", ariaLabel }: Props) {
  const cls = ["btn", `btn--${variant}`, size === "sm" && "btn--sm", block && "btn--block", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {icon === "whatsapp" && <WhatsAppIcon />}
      {icon === "camera" && <Icon name="camera" className="icon" />}
      {icon === "pin" && <Icon name="pin" className="icon" />}
      <span>{children}</span>
      {icon === "arrow" && <Icon name="arrowRight" className="icon" />}
    </>
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
