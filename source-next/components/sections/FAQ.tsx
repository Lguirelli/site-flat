import Link from "next/link";
import { faq } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section id="duvidas" className="section" aria-labelledby="duvidas-title">
      <div className="container faq__grid">
        <Reveal className="faq__aside">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 id="duvidas-title">Antes de reservar.</h2>
          <p>
            Respostas rápidas sobre chegada, pagamento e regras. As condições completas estão em{" "}
            <Link href="/politicas" className="link-arrow">
              Regras e cancelamento
            </Link>
            .
          </p>
          <div>
            <Button href={whatsappLink("Olá! Tenho uma dúvida sobre a hospedagem no Flat Jardim Serrano.")} variant="outline" icon="whatsapp">
              Tirar outra dúvida
            </Button>
          </div>
        </Reveal>

        <Reveal className="faq-list" delay={100}>
          {faq.map((item, i) => (
            <details key={item.q} className="faq-item" open={i === 0}>
              <summary>
                {item.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="faq-item__body">
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
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
