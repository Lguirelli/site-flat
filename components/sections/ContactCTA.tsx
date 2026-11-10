import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { BookingButton } from "@/components/ui/BookingButton";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

/** Última fotografia: a cama do Flat 1 à esquerda, o convite na metade calma da direita. */
export function ContactCTA() {
  const { payment } = siteConfig;
  return (
    <Reveal as="section" id="consulta" className="last" aria-labelledby="consulta-title">
      <figure className="last__photo">
        <Image
          src="/assets/flats/flat-1/01.jpg"
          alt="Cama king do Flat 1 com luz quente, espumante e chocolates na mesa de cabeceira"
          fill
          sizes="100vw"
          style={{ objectPosition: "30% 50%" }}
        />
      </figure>
      <div className="frame last__frame">
        <div className="last__copy">
          <Lines id="consulta-title" lines={["Conte as datas."]} />
          <p data-r>
            Respondemos pelo WhatsApp com os flats livres e o valor do período. Pix com {payment.pixDiscount}% de desconto
            ou cartão em até {payment.cardInstallments}x sem juros, e reembolso integral se desistir em até 7 dias da compra,
            antes do check-in.
          </p>
          <div data-r>
            <BookingButton source="final" variant="paper" icon="whatsapp" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
