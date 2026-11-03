import { assetPath } from "@/lib/asset-path";
import Link from "next/link";
import { accommodations } from "@/data/accommodations";
import { mapsLink, navLinks, siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const { address, contact } = siteConfig;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetPath("/assets/logo/logo-horizontal.svg")} alt="Flat Jardim Serrano" width={150} height={76} />
            <p>
              {siteConfig.name}: sete flats privativos para casais no bairro {siteConfig.neighborhood}, em{" "}
              {siteConfig.city} ({siteConfig.state}).
            </p>
          </div>

          <div>
            <h3>Navegação</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/politicas">Regras e cancelamento</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Flats</h3>
            <ul>
              {accommodations.map((a) => (
                <li key={a.slug}>
                  <Link href={`/acomodacoes/${a.slug}`}>{a.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram {contact.instagramHandle}
                </a>
              </li>
              <li>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                  {address.street} · {address.neighborhood}
                  <br />
                  {address.city}/{address.state} · CEP {address.zip}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </span>
          <span>Consultas pelo WhatsApp não confirmam reserva.</span>
        </div>
      </div>
    </footer>
  );
}
