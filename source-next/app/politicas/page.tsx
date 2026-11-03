import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Regras e cancelamento",
  description: "Horários, regras da casa, pagamento e política de cancelamento do Flat Jardim Serrano, em Serra Negra (SP).",
  alternates: { canonical: "/politicas" },
};

export default function PoliticasPage() {
  const { stay } = siteConfig;
  return (
    <section className="section">
      <div className="container prose">
        <span className="eyebrow">Políticas</span>
        <h1>Regras e cancelamento</h1>
        <p>
          Ao reservar um flat, o hóspede declara estar de acordo com as condições abaixo. Em caso de dúvida, fale com a
          gente pelo WhatsApp {siteConfig.contact.whatsappDisplay}.
        </p>

        <h2>Chegada e saída</h2>
        <ul>
          <li>Check-in das {stay.checkIn}, com self check-in por cofre de chaves.</li>
          <li>Check-out {stay.checkOut}.</li>
          <li>Na saída: recolha as toalhas usadas, leve o lixo para fora, desligue luzes e TV, tranque o flat, devolva as chaves ao cofre e embaralhe a senha.</li>
        </ul>

        <h2>Ocupação e convivência</h2>
        <ul>
          <li>Cada flat acomoda até {stay.maxGuests} hóspedes (a partir de {stay.minAge} anos) em cama king.</li>
          <li>Café da manhã não incluso. Os flats têm cozinha equipada.</li>
          <li>Não são permitidos animais de estimação.</li>
          <li>É proibido fumar dentro dos flats. Não são permitidas festas ou eventos.</li>
          <li>Horário de silêncio: das {stay.quietHours}.</li>
          <li>Danos ao flat, ao enxoval ou aos equipamentos são cobrados do responsável pela reserva.</li>
        </ul>

        <h2>Pagamento</h2>
        <ul>
          <li>Pix com 10% de desconto à vista ou cartão de crédito em até 3x sem juros.</li>
          <li>A reserva é confirmada após o pagamento do valor total.</li>
        </ul>

        <h2>Cancelamento e troca</h2>
        <ul>
          <li>Desistência em até 7 dias após a compra, desde que antes do check-in: reembolso integral (art. 49 do CDC).</li>
          <li>Cancelamento ou troca até 5 dias antes da entrada: cobrança de 1% do valor total.</li>
          <li>Com menos de 5 dias da entrada: retenção de 50% do valor da reserva.</li>
          <li>Não comparecimento (no-show): retenção de 100%.</li>
        </ul>

        <div style={{ marginTop: 16 }}>
          <Button href={whatsappLink("Olá! Tenho uma dúvida sobre as políticas do Flat Jardim Serrano.")} variant="whatsapp" icon="whatsapp">
            Falar pelo WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
