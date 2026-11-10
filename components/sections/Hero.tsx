import Image from "next/image";
import Link from "next/link";
import { BookingButton } from "@/components/ui/BookingButton";
import { Lines } from "@/components/ui/Lines";

/**
 * Título em degrau com duas fotografias: a vista da varanda do Flat 6 pendurada
 * no alto, à direita, e o quarto em madeira cortado pela borda de baixo.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="frame hero__grid">
        <figure className="hero__view">
          <Image
            src="/assets/flats/flat-6/12.jpg"
            alt="Vista de árvores e montanhas a partir da varanda do Flat 6"
            fill
            priority
            sizes="(max-width: 760px) 46vw, 26vw"
          />
        </figure>

        <Lines as="h1" id="hero-title" lines={["A serra,", "a dois."]} load className="hero__title" />

        <figure className="hero__room">
          <Image
            src="/assets/flats/flat-6/01.jpg"
            alt="Quarto do Flat 6 com cama king, parede de madeira, luz quente e mesa para dois"
            fill
            priority
            sizes="(max-width: 760px) 72vw, 34vw"
            style={{ objectPosition: "38% 50%" }}
          />
        </figure>

        <div className="hero__copy">
          <p className="hero__lead">
            Sete flats privativos para casais em Serra Negra (SP), com cama king e mini cozinha. A menos de 1&nbsp;km do
            centro.
          </p>
          <div className="hero__actions">
            <BookingButton source="hero" icon="whatsapp" />
            <Link href="#acomodacoes" className="link link--arrow" data-cta="hero-flats">
              Ver os sete flats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
