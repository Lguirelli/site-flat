"use client";

import { useId, useMemo, useState } from "react";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/data/site-config";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "./Icon";

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

/**
 * Formulário compacto de consulta. Não verifica disponibilidade:
 * monta a mensagem e abre o WhatsApp com os dados preenchidos.
 */
export function BookingForm({
  defaultFlat = "",
  title = "Consultar disponibilidade",
  compact = false,
}: {
  defaultFlat?: string;
  title?: string;
  compact?: boolean;
}) {
  const id = useId();
  const today = useMemo(todayISO, []);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [flat, setFlat] = useState(defaultFlat);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const e: Errors = {};
    if (!checkIn) e.checkIn = "Informe a data de entrada.";
    else if (checkIn < today) e.checkIn = "A entrada não pode ser no passado.";
    if (!checkOut) e.checkOut = "Informe a data de saída.";
    else if (checkIn && checkOut <= checkIn) e.checkOut = "A saída deve ser depois da entrada.";
    const g = Number(guests);
    if (!g || g < 1 || g > siteConfig.stay.maxGuests) e.guests = `Cada flat acomoda até ${siteConfig.stay.maxGuests} hóspedes.`;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const url = whatsappLink(bookingMessage({ checkIn, checkOut, guests: Number(guests), flat }));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="booking" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>{title}</h3>
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
            onChange={(e) => setCheckOut(e.target.value)}
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
        <div className={`field ${compact ? "field--full" : ""}`} data-invalid={!!errors.guests}>
          <label htmlFor={`${id}-guests`}>Hóspedes</label>
          <select id={`${id}-guests`} value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1 adulto</option>
            <option value="2">2 adultos</option>
          </select>
          {errors.guests && <span className="field__error">{errors.guests}</span>}
        </div>
        <div className={`field ${compact ? "field--full" : ""}`}>
          <label htmlFor={`${id}-flat`}>Flat de interesse</label>
          <select id={`${id}-flat`} value={flat} onChange={(e) => setFlat(e.target.value)}>
            <option value="">Qualquer flat disponível</option>
            {accommodations.map((a) => (
              <option key={a.slug} value={a.name}>
                {a.name} · {a.highlight}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn--whatsapp btn--block">
        <WhatsAppIcon />
        <span>Enviar consulta pelo WhatsApp</span>
      </button>
      <p className="booking__note">
        <Icon name="info" />
        <span>
          Esta é uma consulta: a disponibilidade e o valor são confirmados na conversa. A reserva só é garantida após o
          pagamento.
        </span>
      </p>
    </form>
  );
}
