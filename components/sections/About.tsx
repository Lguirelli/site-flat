import { assetPath } from "@/lib/asset-path";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: "lock",
    title: "Privacidade",
    text: "Cada flat é independente, com banheiro próprio e self check-in por cofre de chaves.",
  },
  {
    icon: "coffee",
    title: "Praticidade",
    text: "Mini cozinha equipada, Wi-Fi e estacionamento gratuitos. Café da manhã do seu jeito, na hora que quiser.",
  },
  {
    icon: "pin",
    title: "Localização",
    text: "Bairro Estância Suíça, residencial e silencioso, a menos de 1 km do centro de Serra Negra.",
  },
];

export function About() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="container about__grid">
        <Reveal className="about__media">
          <figure>
            <Image
              src={assetPath("/assets/flats/flat-8/02.jpg")}
              alt="Quarto do Flat 8 com cama king e mesa de jantar"
              fill
              sizes="(max-width: 900px) 55vw, 320px"
            />
            <figcaption>Flat 8</figcaption>
          </figure>
          <figure>
            <Image
              src={assetPath("/assets/flats/flat-8/04.jpg")}
              alt="Varanda do Flat 8 com cadeiras ao entardecer"
              fill
              sizes="(max-width: 900px) 45vw, 280px"
            />
            <figcaption>Varanda · Flat 8</figcaption>
          </figure>
        </Reveal>

        <Reveal className="about__content" delay={100}>
          <span className="eyebrow">O Flat Jardim Serrano</span>
          <h2 id="sobre-title">Chegar, deixar as malas e aproveitar a cidade.</h2>
          <p>
            São sete flats independentes na Rua Brasil, pensados para duas pessoas. Todos têm quarto com cama king,
            enxoval completo, banheiro privativo e mini cozinha. Os Flats 5 a 8 têm varanda com vista panorâmica.
          </p>
          <p>
            O check-in é feito por conta própria, das 14h às 20h, com as chaves em cofre. Daqui, o centro de Serra Negra
            fica a menos de 1&nbsp;km.
          </p>
          <ul className="pillars">
            {pillars.map((p) => (
              <li key={p.title}>
                <Icon name={p.icon} />
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
