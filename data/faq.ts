/**
 * Perguntas frequentes. Todas as respostas vêm das políticas publicadas
 * no site original (/polices e FAQ), consultadas em 03/11/2026.
 */
export type FaqItem = { q: string; a: string[]; list?: string[] };

export const faq: FaqItem[] = [
  {
    q: "Quantas pessoas cada flat acomoda?",
    a: ["Cada flat acomoda até 2 hóspedes, a partir de 18 anos, em cama king."],
  },
  {
    q: "Como funcionam o check-in e o check-out?",
    a: [
      "A entrada é das 14h às 20h, com self check-in: as chaves ficam em um cofre. A saída é até as 12h, devolvendo as chaves no mesmo cofre.",
      "Se precisar chegar antes ou sair mais tarde, fale com a gente para verificar a possibilidade e eventuais custos.",
    ],
  },
  {
    q: "O café da manhã está incluso?",
    a: ["Não. Todos os flats têm mini cozinha equipada com frigobar, cafeteira e utensílios para você preparar suas refeições."],
  },
  {
    q: "Tem estacionamento?",
    a: ["Sim, o estacionamento é gratuito para hóspedes."],
  },
  {
    q: "Posso levar meu animal de estimação?",
    a: ["Não são permitidos animais de estimação nos flats."],
  },
  {
    q: "Quais são as formas de pagamento?",
    a: [
      "Pix, com 10% de desconto à vista, ou cartão de crédito em até 3x sem juros. A reserva é confirmada após o pagamento do valor total.",
    ],
  },
  {
    q: "Qual é a política de cancelamento?",
    a: ["Resumo das regras de cancelamento e troca:"],
    list: [
      "Até 7 dias após a compra, e antes do check-in: reembolso integral (art. 49 do CDC).",
      "Até 5 dias antes da entrada: taxa de 1% do valor da reserva.",
      "Com menos de 5 dias da entrada: retenção de 50% do valor.",
      "Não comparecimento (no-show): retenção de 100%.",
    ],
  },
  {
    q: "Quais são as regras da casa?",
    a: ["Para manter o ambiente tranquilo para todos:"],
    list: [
      "Proibido fumar dentro dos flats.",
      "Não são permitidas festas ou eventos.",
      "Horário de silêncio das 22h às 7h.",
    ],
  },
];
