import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { BookingButton } from "@/components/ui/BookingButton";

/** Fechamento enxuto: reserva, endereço, horários, contato e o nome. */
export function Footer() {
  const { address, contact, stay } = siteConfig;
  return (
    <footer className="footer">
      <div className="frame footer__top">
        <div className="footer__intro">
          <p className="footer__lead">Sete flats para dois em {address.city}, a menos de 1&nbsp;km do centro.</p>
          <BookingButton source="footer" variant="paper" icon="calendar" />
        </div>

        <div className="footer__cols">
          <section aria-labelledby="ft-visite">
            <h2 id="ft-visite" className="footer__h">
              Onde fica
            </h2>
            <address>
              {address.street}, {address.neighborhood}
              <br />
              {address.city}/{address.state}
            </address>
          </section>

          <section aria-labelledby="ft-horarios">
            <h2 id="ft-horarios" className="footer__h">
              Horários
            </h2>
            <dl className="footer__hours">
              <div>
                <dt>Entrada</dt>
                <dd>{stay.checkIn}</dd>
              </div>
              <div>
                <dt>Saída</dt>
                <dd>{stay.checkOut}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="ft-contato">
            <h2 id="ft-contato" className="footer__h">
              Contato
            </h2>
            <ul>
              <li>{contact.whatsappDisplay}</li>
              <li>{contact.instagramHandle}</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="frame footer__mark">
        <svg viewBox="0 0 1000 118" role="img" aria-label={siteConfig.name}>
          <text x="500" y="108" textAnchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs">
            JARDIM SERRANO
          </text>
        </svg>
        <div className="footer__legal">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ·{" "}
            <Link href="/politicas" className="link">
              Regras e cancelamento
            </Link>
          </p>
          <a href="#conteudo" className="link">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
