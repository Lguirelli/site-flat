import { assetPath } from "@/lib/asset-path";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow">
            {siteConfig.city}, {siteConfig.state} · {siteConfig.neighborhood}
          </span>
          <h1 id="hero-title">
            Serra Negra a dois, <em>no seu ritmo.</em>
          </h1>
          <p className="hero__lead">
            Flats privativos com cama king, mini cozinha equipada, Wi-Fi e vaga gratuita, num bairro tranquilo a menos de
            1&nbsp;km do centro.
          </p>
          <div className="hero__actions">
            <Button href={whatsappLink()} variant="whatsapp" icon="whatsapp">
              Consultar disponibilidade
            </Button>
            <Button href="#acomodacoes" variant="outline" icon="arrow">
              Conhecer os flats
            </Button>
          </div>
          <ul className="hero__facts">
            <li>
              <Icon name="bed" /> 7 flats com cama king
            </li>
            <li>
              <Icon name="users" /> Até 2 adultos
            </li>
            <li>
              <Icon name="key" /> Self check-in a partir das 14h
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <div className="hero__main">
            <span className="hero__tag">Flat 6</span>
            <Image
              src={assetPath("/assets/flats/flat-6/01.jpg")}
              alt="Quarto do Flat 6 com cama king, parede de madeira, mesa para refeições e arara para roupas"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 640px"
              style={{ objectPosition: "40% 50%" }}
            />
          </div>
          <div className="hero__inset">
            <Image
              src={assetPath("/assets/flats/flat-6/12.jpg")}
              alt="Vista panorâmica de árvores e montanhas a partir da varanda do Flat 6"
              fill
              sizes="(max-width: 900px) 45vw, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
