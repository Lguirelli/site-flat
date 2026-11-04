import Image from "next/image";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

/** O que vem com todos os flats, em linhas presas a um eixo, cada uma com sua fotografia na margem. */
const rows = [
  {
    title: "Cama king",
    text: "Em todos os flats, com roupa de cama e banho incluídas. Cortinas blackout nos Flats 1, 2, 3 e 7.",
    img: "/assets/flats/flat-5/01.jpg",
    alt: "Cama king do Flat 5 com cabeceira estofada",
    shape: "portrait",
  },
  {
    title: "Mini cozinha",
    text: "Frigobar, cafeteira e utensílios em todos; micro-ondas na maioria e fogão nos Flats 1 a 3. O café da manhã não está incluso: fica por sua conta, na hora que quiser.",
    img: "/assets/flats/flat-6/06.jpg",
    alt: "Bancada e pia da mini cozinha do Flat 6",
    shape: "landscape",
  },
  {
    title: "Banheiro privativo",
    text: "Só seu, dentro do flat, com box de vidro e toalhas.",
    img: "/assets/flats/flat-6/09.jpg",
    alt: "Banheiro privativo do Flat 6 com box de vidro",
    shape: "square",
  },
  {
    title: "Wi-Fi e vaga",
    text: "Internet e estacionamento gratuitos, com as vagas logo em frente aos flats.",
    img: "/assets/areas-externas/fachada-flats-1-a-3.jpg",
    alt: "Fachada do prédio dos Flats 1 a 3 com estacionamento na frente",
    shape: "landscape",
  },
  {
    title: "Smart TV",
    text: "Na maioria dos flats; nos Flats 1 e 3, com Netflix.",
    img: "/assets/flats/flat-3/03.jpg",
    alt: "Smart TV na parede de blocos aparentes do Flat 3",
    shape: "portrait",
  },
] as const;

export function Amenities() {
  return (
    <section id="comodidades" className="incl" aria-labelledby="comodidades-title">
      <div className="frame">
        <Reveal className="incl__head">
          <Lines id="comodidades-title" lines={["Incluso em", "todos os flats"]} />
        </Reveal>
        <ul className="incl__rows">
          {rows.map((r) => (
            <Reveal as="li" key={r.title} className={`incl__row incl__row--${r.shape}`}>
              <h3 data-r>{r.title}</h3>
              <p data-r>{r.text}</p>
              <figure className="incl__img shutter" data-r="img">
                <Image src={r.img} alt={r.alt} fill sizes="(max-width: 760px) 92vw, 46vw" />
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
