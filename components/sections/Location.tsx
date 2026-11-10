import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { BookingButton } from "@/components/ui/BookingButton";
import { Reveal } from "@/components/ui/Reveal";

/** A vista do lugar em tela cheia, com um único cartão de visita preso ao canto calmo. */
export function Location() {
  const { address, stay, contact } = siteConfig;
  return (
    <section id="localizacao" className="visit" aria-labelledby="localizacao-title">
      <figure className="visit__photo">
        <Image
          src="/assets/flats/flat-6/12.jpg"
          alt="Vista panorâmica de árvores e montanhas de Serra Negra a partir da varanda do Flat 6"
          fill
          sizes="100vw"
        />
      </figure>
      <div className="frame visit__frame">
        <Reveal className="visit__card">
          <h2 id="localizacao-title" data-r>
            Rua Brasil, 677
          </h2>
          <p data-r>
            {address.neighborhood}, bairro residencial e silencioso, a menos de 1&nbsp;km do centro de {address.city}.
            <br />
            {address.city}/{address.state} · CEP {address.zip}
          </p>
          <dl className="visit__hours" data-r>
            <div>
              <dt>Entrada</dt>
              <dd>{stay.checkIn}</dd>
            </div>
            <div>
              <dt>Saída</dt>
              <dd>{stay.checkOut}</dd>
            </div>
            <div>
              <dt>Silêncio</dt>
              <dd>{stay.quietHours}</dd>
            </div>
          </dl>
          <p className="visit__links" data-r>
            <span>{contact.whatsappDisplay}</span>
          </p>
          <BookingButton source="visit-card" block className="visit__btn" />
        </Reveal>
      </div>
    </section>
  );
}
