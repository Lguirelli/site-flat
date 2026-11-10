import type { Metadata, Viewport } from "next";
import { Albert_Sans, Imbue } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingDialog } from "@/components/ui/BookingDialog";
import { CtaTracker } from "@/components/ui/CtaTracker";
import { siteConfig } from "@/data/site-config";
import "@/styles/globals.css";
import { asset } from "@/lib/asset";

const imbue = Imbue({
  subsets: ["latin"],
  variable: "--font-imbue",
  display: "swap",
  axes: ["opsz"],
});

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: asset(siteConfig.seo.ogImage), width: 1262, height: 768, alt: "Quarto do Flat 6, Flat Jardim Serrano" }],
  },
  icons: { icon: asset("/assets/logo/logo.svg") },
};

const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('tema')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#161c1a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.seo.ogImage}`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  checkinTime: "14:00",
  checkoutTime: "12:00",
  petsAllowed: false,
  paymentAccepted: "Pix, cartão de crédito",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.address.lat, longitude: siteConfig.address.lng },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${imbue.variable} ${albert.variable}`} suppressHydrationWarning>
      <head>
        {/* Antes da pintura: liga as animações (só com JS) e aplica o tema salvo ou o do sistema */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <BookingDialog />
        <CtaTracker />
      </body>
    </html>
  );
}
