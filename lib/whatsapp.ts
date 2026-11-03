import { siteConfig } from "@/data/site-config";

export function whatsappLink(message: string = siteConfig.defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function flatWhatsAppMessage(flatName: string) {
  return `Olá! Gostaria de consultar disponibilidade para o ${flatName} no Flat Jardim Serrano.`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function bookingMessage(input: {
  checkIn: string;
  checkOut: string;
  guests: number;
  flat: string;
}) {
  const lines = [
    "Olá! Gostaria de consultar disponibilidade no Flat Jardim Serrano.",
    "",
    `• Entrada: ${formatDate(input.checkIn)}`,
    `• Saída: ${formatDate(input.checkOut)}`,
    `• Hóspedes: ${input.guests}`,
    `• Flat de interesse: ${input.flat || "Qualquer flat disponível"}`,
  ];
  return lines.join("\n");
}
