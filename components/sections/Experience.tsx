import Image from "next/image";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

/** O relógio de uma estadia, das 14h ao meio-dia seguinte, em fotografias que descem na diagonal. */
const stages = [
  {
    when: "Às 14h,",
    text: "a chave já está no cofre. O self check-in vai até as 20h, sem hora marcada com ninguém, e o carro fica na vaga em frente à porta.",
    img: "/assets/areas-externas/fachada-flats-5-a-8.jpg",
    alt: "Fachada dos Flats 5 a 8, com as portas numeradas e as vagas em frente",
    position: "62% 60%",
  },
  {
    when: "No fim da tarde,",
    text: "a varanda. Nos Flats 5 a 8 há cadeiras do lado de fora e vista para as árvores e a montanha.",
    img: "/assets/flats/flat-6/11.jpg",
    alt: "Varanda do Flat 6 com duas cadeiras e vista para as árvores",
    position: "50% 50%",
  },
  {
    when: "Na manhã seguinte,",
    text: "café do seu jeito na mini cozinha, sem horário de buffet. O check-out é só ao meio-dia.",
    img: "/assets/flats/flat-6/07.jpg",
    alt: "Cafeteira e duas xícaras na bancada da mini cozinha do Flat 6",
    position: "45% 50%",
  },
];

export function Experience() {
  return (
    <section id="estadia" className="stay" aria-labelledby="estadia-title">
      <div className="frame stay__grid">
        <Reveal className="stay__head">
          <Lines id="estadia-title" lines={["Um dia aqui"]} />
        </Reveal>
        {stages.map((s, i) => (
          <Reveal key={s.when} className={`stay__stage stay__stage--${i + 1}`}>
            <figure className="stay__img shutter" data-r="img">
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 760px) 90vw, 40vw" style={{ objectPosition: s.position }} />
            </figure>
            <p className="stay__text" data-r>
              <strong>{s.when}</strong> {s.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
