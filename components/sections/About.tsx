import Image from "next/image";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

/** Título que atravessa para dentro da fotografia; uma segunda foto entra pela borda de baixo. */
export function About() {
  return (
    <Reveal as="section" id="sobre" className="intro" aria-labelledby="sobre-title">
      <div className="frame intro__grid">
        <Lines id="sobre-title" lines={["Sem recepção,", "sem pressa."]} className="intro__title" />
        <figure className="intro__tall shutter" data-r="img">
          <Image
            src="/assets/flats/flat-6/02.jpg"
            alt="Jantar para dois servido na mesa do Flat 6, com a porta de vidro aberta para a varanda"
            fill
            sizes="(max-width: 760px) 75vw, 46vw"
          />
        </figure>
        <p className="intro__text" data-r>
          Cada flat é independente, com banheiro próprio. A chave espera no cofre das 14h às 20h, e a vaga fica em frente à
          porta.
        </p>
        <figure className="intro__small shutter" data-r="img">
          <Image
            src="/assets/flats/flat-8/03.jpg"
            alt="Mesa de jantar posta no Flat 8"
            fill
            sizes="(max-width: 760px) 50vw, 25vw"
          />
        </figure>
      </div>
    </Reveal>
  );
}
