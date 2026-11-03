import Image from "next/image";
import Link from "next/link";
import { faq } from "@/data/faq";
import { siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { stay } = siteConfig;
  return (
    <section id="duvidas" className="faq" aria-labelledby="duvidas-title">
      <div className="frame faq__grid">
        <Reveal className="faq__col">
          <Lines id="duvidas-title" lines={["Antes de reservar"]} />
          <ul className="faq__facts" data-r>
            <li>Até {stay.maxGuests} adultos por flat, a partir de {stay.minAge} anos</li>
            <li>Entrada das {stay.checkIn}, saída {stay.checkOut}</li>
            <li>Sem animais; proibido fumar nos flats</li>
          </ul>
          <div className="faq__list" data-r>
            {faq.map((item) => (
              <details key={item.q} className="acc" name="faq">
                <summary>
                  {item.q}
                  <span className="acc__chev" aria-hidden="true" />
                </summary>
                <div className="acc__panel">
                  <div>
                    {item.a.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {item.list && (
                      <ul>
                        {item.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className="faq__actions" data-r>
            <Button
              href={whatsappLink("Olá! Tenho uma dúvida sobre a hospedagem no Flat Jardim Serrano.")}
              variant="ghost"
              icon="whatsapp"
              cta="faq-whatsapp"
            >
              Perguntar no WhatsApp
            </Button>
            <Link href="/politicas" className="link link--arrow">
              Regras e cancelamento
            </Link>
          </div>
        </Reveal>

        <Reveal className="faq__media" aria-hidden="true">
          <figure className="faq__tall shutter" data-r="img">
            <Image src="/assets/flats/flat-7/08.jpg" alt="" fill sizes="(max-width: 960px) 90vw, 44vw" />
          </figure>
          <figure className="faq__square shutter" data-r="img">
            <Image src="/assets/flats/flat-5/05.jpg" alt="" fill sizes="(max-width: 960px) 38vw, 15vw" />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
