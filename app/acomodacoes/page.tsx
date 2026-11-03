import type { Metadata } from "next";
import { Accommodations } from "@/components/sections/Accommodations";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MobileCTA } from "@/components/layout/MobileCTA";

export const metadata: Metadata = {
  title: "Acomodações",
  description:
    "Conheça os sete flats do Flat Jardim Serrano em Serra Negra (SP): cama king, mini cozinha, Wi-Fi e estacionamento gratuito. Compare varanda, vista e cozinha de cada unidade.",
  alternates: { canonical: "/acomodacoes" },
};

export default function AcomodacoesPage() {
  return (
    <>
      <Accommodations headingLevel="h1" />
      <ContactCTA />
      <MobileCTA />
    </>
  );
}
