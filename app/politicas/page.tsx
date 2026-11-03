import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Regras e cancelamento",
  description: "Horários, regras da casa, pagamento e política de cancelamento do Flat Jardim Serrano, em Serra Negra (SP).",
  alternates: { canonical: "/politicas" },
};

/** O caminho da estadia em fotos: a chegada, a chave, a cozinha, a varanda. */
const photos = [
  { src: "/assets/areas-externas/entrada-flats-1-a-3.jpg", alt: "Entrada e vagas de estacionamento dos Flats 1 a 3" },
  { src: "/assets/flats/flat-7/09.jpg", alt: "Porta de entrada do Flat 7" },
  { src: "/assets/flats/flat-6/05.jpg", alt: "Mini cozinha do Flat 6 com micro-ondas, frigobar e pia" },
  { src: "/assets/flats/flat-8/04.jpg", alt: "Varanda do Flat 8 com cadeiras ao entardecer" },
];

export default function PoliticasPage() {
  const { stay, payment } = siteConfig;
  return (
    <section className="page">
      <div className="frame policies">
        <div className="policies__head">
          <Lines as="h1" lines={["Regras e", "cancelamento"]} load />
          <p className="policies__lead">
            Horários, convivência, pagamento e cancelamento dos sete flats do {siteConfig.name}. Ao reservar, o hóspede
            declara estar de acordo com estas condições.
          </p>
        </div>

        <Reveal className="policies__photos">
          {photos.map((p) => (
            <figure key={p.src} className="policies__photo shutter" data-r="img">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 960px) 50vw, 26vw" />
            </figure>
          ))}
        </Reveal>

        <div className="prose">
          <Reveal as="section" aria-labelledby="pol-chegada">
            <h2 id="pol-chegada" data-r>
              Chegada e saída
            </h2>
            <ul data-r>
              <li>Check-in das {stay.checkIn}, com self check-in por cofre de chaves.</li>
              <li>Check-out {stay.checkOut}.</li>
              <li>
                Na saída: recolha as toalhas usadas, leve o lixo para fora, desligue luzes e TV, tranque o flat, devolva as
                chaves ao cofre e embaralhe a senha.
              </li>
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="pol-convivencia">
            <h2 id="pol-convivencia" data-r>
              Ocupação e convivência
            </h2>
            <ul data-r>
              <li>
                Cada flat acomoda até {stay.maxGuests} hóspedes (a partir de {stay.minAge} anos) em cama king.
              </li>
              <li>Café da manhã não incluso. Os flats têm cozinha equipada.</li>
              <li>Não são permitidos animais de estimação.</li>
              <li>É proibido fumar dentro dos flats. Não são permitidas festas ou eventos.</li>
              <li>Horário de silêncio: das {stay.quietHours}.</li>
              <li>Danos ao flat, ao enxoval ou aos equipamentos são cobrados do responsável pela reserva.</li>
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="pol-pagamento">
            <h2 id="pol-pagamento" data-r>
              Pagamento
            </h2>
            <ul data-r>
              <li>
                Pix com {payment.pixDiscount}% de desconto à vista ou cartão de crédito em até {payment.cardInstallments}x
                sem juros.
              </li>
              <li>A reserva é confirmada após o pagamento do valor total.</li>
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="pol-cancelamento">
            <h2 id="pol-cancelamento" data-r>
              Cancelamento e troca
            </h2>
            <ul data-r>
              <li>
                Desistência em até 7 dias após a compra, desde que antes do check-in: reembolso integral (art. 49 do CDC).
              </li>
              <li>Cancelamento ou troca até 5 dias antes da entrada: cobrança de 1% do valor total.</li>
              <li>Com menos de 5 dias da entrada: retenção de 50% do valor da reserva.</li>
              <li>Não comparecimento (no-show): retenção de 100%.</li>
            </ul>
          </Reveal>

          <div className="prose__actions">
            <Button
              href={whatsappLink("Olá! Tenho uma dúvida sobre as políticas do Flat Jardim Serrano.")}
              variant="accent"
              icon="whatsapp"
              cta="policies-whatsapp"
            >
              Tirar dúvida no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
