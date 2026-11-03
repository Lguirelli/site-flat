/**
 * Informações institucionais centralizadas.
 * Tudo que for contato, endereço ou link deve ser alterado aqui.
 * Fonte: site original (flatjardimserrano.com.br), consultado em 03/11/2026.
 */
export const siteConfig = {
  name: "Flat Jardim Serrano",
  shortName: "Jardim Serrano",
  url: "https://flatjardimserrano.com.br",
  city: "Serra Negra",
  state: "SP",
  neighborhood: "Estância Suíça",

  address: {
    street: "Rua Brasil, 677",
    neighborhood: "Estância Suíça",
    city: "Serra Negra",
    state: "SP",
    zip: "13930-250",
    lat: -22.6156853,
    lng: -46.7075403,
  },

  contact: {
    /** Somente dígitos, com DDI. Usado nos links wa.me */
    whatsapp: "5519997636911",
    whatsappDisplay: "(19) 99763-6911",
    phone: "+5519997636911",
    email: "janstainer@gmail.com",
    instagram: "https://www.instagram.com/flat.jardimserrano/",
    instagramHandle: "@flat.jardimserrano",
  },

  stay: {
    checkIn: "14h às 20h",
    checkInStart: "14h",
    checkOut: "até 12h",
    maxGuests: 2,
    minAge: 18,
    quietHours: "22h às 7h",
  },

  defaultWhatsAppMessage:
    "Olá! Gostaria de consultar disponibilidade para uma hospedagem no Flat Jardim Serrano.",

  seo: {
    title: "Flat Jardim Serrano | Flats para casais em Serra Negra, SP",
    description:
      "Sete flats privativos com cama king, mini cozinha equipada, Wi-Fi e estacionamento gratuito, no bairro Estância Suíça, a menos de 1 km do centro de Serra Negra (SP).",
    ogImage: "/assets/flats/flat-6/01.jpg",
  },
} as const;

export const mapsLink = `https://www.google.com/maps?q=${siteConfig.address.lat},${siteConfig.address.lng}`;
export const mapsEmbed = `https://www.google.com/maps?q=${siteConfig.address.lat},${siteConfig.address.lng}&z=16&output=embed`;

export const navLinks = [
  { href: "/#sobre", label: "O flat" },
  { href: "/#acomodacoes", label: "Acomodações" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#duvidas", label: "Dúvidas" },
] as const;
