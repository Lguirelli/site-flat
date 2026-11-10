"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/data/site-config";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { WhatsAppIcon } from "./Icon";

type Errors = Partial<Record<"checkIn" | "checkOut" | "guests", string>>;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.round((new Date(`${b}T12:00:00`).getTime() - new Date(`${a}T12:00:00`).getTime()) / 86400000);
}

/**
 * Consulta de datas. Não verifica disponibilidade: monta a mensagem e abre o
 * WhatsApp com os dados preenchidos.
 */
export function BookingForm({
  defaultFlat = "",
  title = "Consultar datas",
  headingLevel = "h2",
  onSent,
}: {
  defaultFlat?: string;
  title?: string;
  headingLevel?: "h2" | "h3";
  onSent?: () => void;
}) {
  const id = useId();
  const Heading = headingLevel;
  const today = useMemo(todayISO, []);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [flat, setFlat] = useState(defaultFlat);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => setFlat(defaultFlat), [defaultFlat]);

  const nights = nightsBetween(checkIn, checkOut);

  function validate(): Errors {
    const e: Errors = {};
    if (!checkIn) e.checkIn = "Escolha a data de entrada.";
    else if (checkIn < today) e.checkIn = "A entrada não pode ser no passado.";
    if (!checkOut) e.checkOut = "Escolha a data de saída.";
    else if (checkIn && checkOut <= checkIn) e.checkOut = "A saída precisa ser depois da entrada.";
    const g = Number(guests);
    if (!g || g < 1 || g > siteConfig.stay.maxGuests) e.guests = `Cada flat recebe até ${siteConfig.stay.maxGuests} adultos.`;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    track("booking_submit", { flat: flat || "qualquer", nights });
    window.open(whatsappLink(bookingMessage({ checkIn, checkOut, guests: Number(guests), flat })), "_blank", "noopener,noreferrer");
    onSent?.();
  }

  return (
    <form className="booking" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className="booking__title">
        {title}
      </Heading>
      <div className="booking__grid">
        <div className="field" data-invalid={!!errors.checkIn}>
          <label htmlFor={`${id}-in`}>Entrada</label>
          <input
            id={`${id}-in`}
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setErrors(({ checkIn: _a, checkOut: _b, ...rest }) => rest);
              if (e.target.value && (!checkOut || checkOut <= e.target.value)) setCheckOut(addDays(e.target.value, 1));
            }}
            aria-invalid={!!errors.checkIn}
            aria-describedby={errors.checkIn ? `${id}-in-err` : undefined}
            required
          />
          {errors.checkIn && (
            <span id={`${id}-in-err`} className="field__error">
              {errors.checkIn}
            </span>
          )}
        </div>
        <div className="field" data-invalid={!!errors.checkOut}>
          <label htmlFor={`${id}-out`}>Saída</label>
          <input
            id={`${id}-out`}
            type="date"
            min={checkIn ? addDays(checkIn, 1) : today}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setErrors(({ checkOut: _b, ...rest }) => rest);
            }}
            aria-invalid={!!errors.checkOut}
            aria-describedby={errors.checkOut ? `${id}-out-err` : undefined}
            required
          />
          {errors.checkOut && (
            <span id={`${id}-out-err`} className="field__error">
              {errors.checkOut}
            </span>
          )}
        </div>
        <div className="field" data-invalid={!!errors.guests}>
          <label htmlFor={`${id}-guests`}>Hóspedes</label>
          <select id={`${id}-guests`} value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1 adulto</option>
            <option value="2">2 adultos</option>
          </select>
          {errors.guests && <span className="field__error">{errors.guests}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-flat`}>Flat</label>
          <select id={`${id}-flat`} value={flat} onChange={(e) => setFlat(e.target.value)}>
            <option value="">Qualquer flat livre</option>
            {accommodations.map((a) => (
              <option key={a.slug} value={a.name}>
                {a.name} · {a.highlight}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="booking__nights" aria-live="polite">
        {nights > 0 ? `${nights} ${nights === 1 ? "noite" : "noites"}, check-in a partir das ${siteConfig.stay.checkInStart}` : " "}
      </p>
      <button type="submit" className="btn btn--accent btn--block">
        <WhatsAppIcon className="btn__icon" />
        <span>Enviar pelo WhatsApp</span>
      </button>
      <p className="booking__note">
        A disponibilidade e o valor chegam na conversa. Pix com {siteConfig.payment.pixDiscount}% de desconto ou cartão em
        até {siteConfig.payment.cardInstallments}x sem juros; a reserva é garantida após o pagamento.
      </p>
    </form>
  );
}
