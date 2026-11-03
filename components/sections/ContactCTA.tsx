import { siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { BookingForm } from "@/components/ui/BookingForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCTA() {
  return (
    <section id="consulta" className="section section--green cta" aria-labelledby="consulta-title">
      <div className="container cta__grid">
        <Reveal className="cta__content">
          <span className="eyebrow">Consulta de disponibilidade</span>
          <h2 id="consulta-title">Conte as datas. A gente responde pelo WhatsApp.</h2>
          <p>
            Preencha ao lado ou chame direto. Confirmamos se o flat está livre e o valor do período antes de qualquer
            pagamento.
          </p>
          <ol className="cta__steps">
            <li>Você envia as datas e o flat de interesse.</li>
            <li>Respondemos com a disponibilidade e o valor.</li>
            <li>A reserva é confirmada após o pagamento.</li>
          </ol>
          <div>
            <Button href={whatsappLink()} variant="ghost-light" icon="whatsapp">
              {siteConfig.contact.whatsappDisplay}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
