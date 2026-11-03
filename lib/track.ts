/**
 * Eventos de conversão. Envia para o dataLayer (Google Tag Manager / GA4) e,
 * se existir, para o gtag. Sem nenhuma ferramenta instalada, não faz nada.
 *
 * Eventos emitidos pelo site:
 * - cta_click        clique em qualquer elemento com data-cta (rótulo em `cta`)
 * - booking_open     abertura do formulário de datas (`source`, `flat`)
 * - booking_submit   envio do formulário para o WhatsApp (`flat`, `nights`)
 * - flat_filter      uso do seletor de comodidades (`filters`, `matches`)
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);
}

/** Abre o formulário de datas (BookingDialog) de qualquer lugar da página. */
export function openBooking(detail: { flat?: string; source?: string } = {}) {
  window.dispatchEvent(new CustomEvent("booking:open", { detail }));
}
