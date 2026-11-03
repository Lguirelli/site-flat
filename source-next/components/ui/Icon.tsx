/** Ícones de linha, desenhados para o projeto (sem dependência externa). */
const paths: Record<string, React.ReactNode> = {
  bed: (
    <>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18M3 21v-3M21 21v-3" />
      <path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M8 10V8.5h3V10M13 10V8.5h3V10" />
    </>
  ),
  linen: (
    <>
      <rect x="4" y="5" width="16" height="5" rx="1.5" />
      <rect x="4" y="12" width="16" height="7" rx="1.5" />
      <path d="M8 15.5h8" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M6 12V6a2 2 0 0 1 3.5-1.3" />
      <path d="M8 19l-1 2M16 19l1 2" />
    </>
  ),
  fridge: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M6 10h12M9 6v2M9 13v3" />
    </>
  ),
  microwave: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <rect x="6" y="9" width="9" height="6" rx="1" />
      <path d="M18 10v.01M18 13v.01" />
    </>
  ),
  stove: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <circle cx="15" cy="9" r="2" />
      <circle cx="9" cy="15" r="2" />
      <circle cx="15" cy="15" r="2" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 10h11v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-4Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 4c0 1 1 1 1 2s-1 1-1 2M12 4c0 1 1 1 1 2s-1 1-1 2" />
    </>
  ),
  kettle: (
    <>
      <path d="M6 20h11l-1-9H7l-1 9Z" />
      <path d="M8 11V8a3.5 3.5 0 0 1 7 0v3" />
      <path d="M16.5 13 20 10" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5a2 2 0 0 0 2 2M11 3v5a2 2 0 0 1-2 2" />
      <path d="M17 21V3c-2 1.5-3 4-3 7v4h3" />
    </>
  ),
  table: (
    <>
      <path d="M3 9h18M5 9v11M19 9v11M3 9l2-4h14l2 4" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  curtain: (
    <>
      <path d="M3 4h18" />
      <path d="M5 4c0 6 1 10 4 16H5V4ZM19 4c0 6-1 10-4 16h4V4Z" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="11" r="1.5" />
      <path d="M12 9.5C12 6 13 4 15 4s2.5 3-3 5.5ZM13.3 11.8c3 1.7 4.2 3.6 3.2 5.3s-4 .4-3.2-5.3ZM10.7 11.8c-3 1.7-5.2 1.6-6.2-.1s1.4-4 6.2.1Z" />
      <path d="M12 12.5V20M9 20h6" />
    </>
  ),
  balcony: (
    <>
      <path d="M4 12h16M4 20h16M6 12v8M10 12v8M14 12v8M18 12v8" />
      <path d="M7 12V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7" />
    </>
  ),
  mountain: (
    <>
      <path d="m3 19 6-9 4 5 3-4 5 8H3Z" />
      <circle cx="17" cy="6" r="2" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <path d="M12 19.5v.01" />
    </>
  ),
  car: (
    <>
      <path d="M5 16V11l2-5h10l2 5v5" />
      <path d="M3 16h18v3h-3v-1.5M3 16v3h3v-1.5M5 11h14" />
      <path d="M7.5 13.5h.01M16.5 13.5h.01" />
    </>
  ),
  grill: (
    <>
      <path d="M4 9h16a8 8 0 0 1-16 0Z" />
      <path d="M8 17l-2 4M16 17l2 4M12 17v4" />
      <path d="M9 3c0 1.5 1 1.5 1 3M13 3c0 1.5 1 1.5 1 3" />
    </>
  ),
  door: (
    <>
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16" />
      <path d="M14.5 12v.01" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 8a2 2 0 1 1 2-2c0 1-2 1.5-2 3v1" />
      <path d="M12 10 3 17h18l-9-7Z" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M12 3v18M10 11v2M14 11v2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9M17 6l2 2M15 8l2 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17.5 14.5A5 5 0 0 1 21.5 20" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "icon", label }: { name: string; className?: string; label?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {paths[name] ?? paths.check}
    </svg>
  );
}

/** Ícone oficial simplificado do WhatsApp (preenchido) */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.13 1.59 5.93L0 24l6.3-1.64A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.06-1.38l-.36-.21-3.74.98.99-3.56-.23-.37A9.93 9.93 0 1 1 12 22Zm5.27-7.02c-.29-.14-1.72-.85-1.98-.94-.27-.1-.46-.14-.65.14-.2.27-.75.93-.92 1.1-.17.2-.34.22-.63.08-.3-.15-1.27-.47-2.41-1.51-.89-.8-1.48-1.8-1.65-2.1-.17-.3-.02-.47.13-.64.13-.13.3-.35.45-.52.13-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.65-1.57-.89-2.15-.23-.57-.48-.49-.65-.5h-.55c-.2 0-.52.07-.8.37-.27.27-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.17.22 2.08 3.18 5.02 4.45.7.3 1.25.47 1.65.6.7.22 1.34.2 1.85.12.57-.1 1.76-.72 2.02-1.42.27-.7.27-1.3.2-1.43-.06-.14-.25-.2-.53-.35Z" />
    </svg>
  );
}

import type { AmenityId } from "@/data/accommodations";

export const amenityIcon: Record<AmenityId | "selfcheckin", string> = {
  king: "bed",
  enxoval: "linen",
  banheiro: "bath",
  frigobar: "fridge",
  microondas: "microwave",
  fogao: "stove",
  cafeteira: "coffee",
  chaleira: "kettle",
  utensilios: "utensils",
  mesa: "table",
  tv: "tv",
  smarttv: "tv",
  streaming: "play",
  blackout: "curtain",
  ventilador: "fan",
  varanda: "balcony",
  vista: "mountain",
  wifi: "wifi",
  estacionamento: "car",
  churrasqueira: "grill",
  entrada: "door",
  arara: "hanger",
  armario: "wardrobe",
  selfcheckin: "key",
};
