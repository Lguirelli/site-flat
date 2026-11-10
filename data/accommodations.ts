/**
 * Dados centralizados das acomodações.
 * Todas as comodidades abaixo foram listadas no site original para cada flat
 * (página /rooms/flat-N, consultada em 03/11/2026). Não adicionar itens sem confirmação.
 */

export type AmenityId =
  | "king"
  | "enxoval"
  | "banheiro"
  | "frigobar"
  | "microondas"
  | "fogao"
  | "cafeteira"
  | "chaleira"
  | "utensilios"
  | "mesa"
  | "tv"
  | "smarttv"
  | "streaming"
  | "blackout"
  | "ventilador"
  | "varanda"
  | "vista"
  | "wifi"
  | "estacionamento"
  | "churrasqueira"
  | "entrada"
  | "arara"
  | "armario";

export const amenityLabels: Record<AmenityId, string> = {
  king: "Cama king-size",
  enxoval: "Roupa de cama e banho",
  banheiro: "Banheiro privativo",
  frigobar: "Frigobar",
  microondas: "Micro-ondas",
  fogao: "Fogão",
  cafeteira: "Cafeteira",
  chaleira: "Chaleira elétrica",
  utensilios: "Utensílios de cozinha",
  mesa: "Mesa para refeições",
  tv: "TV de 40”",
  smarttv: "Smart TV",
  streaming: "Netflix / streaming",
  blackout: "Cortinas blackout",
  ventilador: "Ventilador",
  varanda: "Varanda",
  vista: "Vista",
  wifi: "Wi-Fi gratuito",
  estacionamento: "Estacionamento gratuito",
  churrasqueira: "Churrasqueira",
  entrada: "Entrada privativa",
  arara: "Arara para roupas",
  armario: "Guarda-roupa",
};

export type Photo = {
  src: string;
  alt: string;
  /** Proporção aproximada, para o layout da galeria */
  orientation: "landscape" | "portrait" | "square";
};

export type Accommodation = {
  slug: string;
  name: string;
  number: number;
  /** Frase curta que diferencia o flat dos demais */
  highlight: string;
  /** Título editorial do card e da página */
  title: string;
  summary: string;
  description: string[];
  capacity: string;
  /** Até 4 diferenciais exibidos no card */
  keyFeatures: string[];
  amenities: AmenityId[];
  /** Texto específico para "vista", quando o flat tiver */
  viewLabel?: string;
  cover: Photo;
  photos: Photo[];
};

const p = (slug: string, file: string, alt: string, orientation: Photo["orientation"] = "portrait"): Photo => ({
  src: `/assets/flats/${slug}/${file}`,
  alt,
  orientation,
});

const capacity = "Até 2 hóspedes adultos";

export const accommodations: Accommodation[] = [
  {
    slug: "flat-1",
    name: "Flat 1",
    number: 1,
    highlight: "Smart TV 40” com Netflix",
    title: "Luz quente e noites de filme",
    summary:
      "Cama king, cortinas blackout e Smart TV de 40” com Netflix. A mini cozinha tem fogão elétrico, frigobar e cafeteira.",
    description: [
      "O Flat 1 tem iluminação quente, cama king com enxoval completo e cortinas blackout para dormir sem a claridade da manhã. A Smart TV de 40” vem com Netflix.",
      "Na mini cozinha ficam o frigobar, o fogão elétrico, a cafeteira e os utensílios para preparar um café ou uma refeição leve sem depender de horários.",
    ],
    capacity,
    keyFeatures: ["Cama king", "Smart TV com Netflix", "Cortinas blackout", "Fogão elétrico"],
    amenities: ["king", "enxoval", "banheiro", "smarttv", "streaming", "blackout", "frigobar", "fogao", "cafeteira", "utensilios", "varanda", "wifi", "estacionamento"],
    cover: p("flat-1", "02.jpg", "Quarto do Flat 1 com cama king, toalhas dobradas e arara para roupas", "landscape"),
    photos: [
      p("flat-1", "02.jpg", "Quarto do Flat 1 com cama king, toalhas dobradas e arara para roupas", "landscape"),
      p("flat-1", "01.jpg", "Cama king do Flat 1 com iluminação quente e mesa de cabeceira", "landscape"),
      p("flat-1", "03.jpg", "Mini cozinha do Flat 1 com pia, frigobar e TV"),
      p("flat-1", "04.jpg", "Banheiro privativo do Flat 1 com box de vidro"),
      p("flat-1", "05.jpg", "Escada de acesso com floreira de gerânios vermelhos", "landscape"),
    ],
  },
  {
    slug: "flat-2",
    name: "Flat 2",
    number: 2,
    highlight: "Com churrasqueira",
    title: "Moderno, com churrasqueira",
    summary:
      "Decoração moderna, cama king e cozinha compacta com fogão elétrico, micro-ondas e chaleira. Churrasqueira entre as comodidades.",
    description: [
      "O Flat 2 tem decoração moderna, cama king, cortinas blackout, TV de 40” e ventilador. O banheiro é privativo.",
      "A cozinha compacta reúne frigobar, fogão elétrico, micro-ondas e chaleira elétrica, com mesa para as refeições. A churrasqueira está entre as comodidades do flat, que fica a cerca de 900 m do centro.",
    ],
    capacity,
    keyFeatures: ["Cama king", "Churrasqueira", "Fogão e micro-ondas", "Cortinas blackout"],
    amenities: ["king", "enxoval", "banheiro", "tv", "blackout", "ventilador", "frigobar", "fogao", "microondas", "chaleira", "mesa", "churrasqueira", "arara", "wifi", "estacionamento"],
    cover: p("flat-2", "01.jpg", "Quarto do Flat 2 com cama king, luminárias pendentes e cortinas", "square"),
    photos: [
      p("flat-2", "01.jpg", "Quarto do Flat 2 com cama king, luminárias pendentes e cortinas", "square"),
      p("flat-2", "02.jpg", "Vista do quarto do Flat 2 até a porta de entrada"),
      p("flat-2", "03.jpg", "Cama king do Flat 2 com criado-mudo e planta"),
      p("flat-2", "04.jpg", "Quarto do Flat 2 com acesso ao banheiro e à cozinha"),
      p("flat-2", "05.jpg", "Cozinha compacta do Flat 2 com armário e frigobar"),
      p("flat-2", "06.jpg", "Banheiro privativo do Flat 2 com box de vidro"),
      p("flat-2", "07.jpg", "Área externa do Flat 2 com cadeiras e plantas"),
    ],
  },
  {
    slug: "flat-3",
    name: "Flat 3",
    number: 3,
    highlight: "Entrada privativa e vista para o verde",
    title: "Entrada privativa e vista para o verde",
    summary:
      "Cama king, Smart TV com Netflix e cozinha compacta com fogão, micro-ondas e mesa de jantar. Acesso por entrada privativa.",
    description: [
      "O Flat 3 tem cama king com roupa de cama e banho, cortinas blackout, ventilador e Smart TV com Netflix. Da janela, a vista é para a área verde.",
      "A cozinha compacta tem frigobar, fogão, micro-ondas, cafeteira e mesa de jantar. O acesso é por entrada privativa, e há guarda-roupa para organizar a bagagem.",
    ],
    capacity,
    keyFeatures: ["Entrada privativa", "Smart TV com Netflix", "Fogão e micro-ondas", "Vista para área verde"],
    viewLabel: "Vista para área verde",
    amenities: ["king", "enxoval", "banheiro", "smarttv", "streaming", "blackout", "ventilador", "frigobar", "fogao", "microondas", "cafeteira", "utensilios", "mesa", "entrada", "armario", "vista", "wifi", "estacionamento"],
    cover: p("flat-3", "01.jpg", "Quarto do Flat 3 com cama king, colcha coral e luminárias pendentes", "landscape"),
    photos: [
      p("flat-3", "01.jpg", "Quarto do Flat 3 com cama king, colcha coral e luminárias pendentes", "landscape"),
      p("flat-3", "02.jpg", "Quarto do Flat 3 com acesso à cozinha e ao banheiro", "landscape"),
      p("flat-3", "03.jpg", "Smart TV na parede de blocos aparentes do Flat 3", "landscape"),
      p("flat-3", "04.jpg", "Quarto do Flat 3 visto da cozinha até a porta"),
      p("flat-3", "05.jpg", "Cama king do Flat 3 com planta no criado-mudo"),
      p("flat-3", "06.jpg", "Cozinha compacta do Flat 3 com frigobar e armário"),
      p("flat-3", "07.jpg", "Banheiro privativo do Flat 3 com box de vidro"),
    ],
  },
  {
    slug: "flat-5",
    name: "Flat 5",
    number: 5,
    highlight: "Varanda com vista panorâmica",
    title: "Varanda com vista panorâmica",
    summary:
      "Varanda com vista panorâmica, cama king e Smart TV. Mini cozinha com frigobar, micro-ondas e cafeteira.",
    description: [
      "No Flat 5, a porta de vidro do quarto abre para a varanda, com cadeiras e vista panorâmica. O quarto tem cama king com enxoval completo, Smart TV e ventilador.",
      "A mini cozinha tem frigobar, micro-ondas e cafeteira, o bastante para preparar o café da manhã do seu jeito. O banheiro é privativo.",
    ],
    capacity,
    keyFeatures: ["Varanda", "Vista panorâmica", "Cama king", "Smart TV"],
    viewLabel: "Vista panorâmica",
    amenities: ["king", "enxoval", "banheiro", "smarttv", "ventilador", "frigobar", "microondas", "cafeteira", "varanda", "vista", "wifi", "estacionamento"],
    cover: p("flat-5", "01.jpg", "Quarto do Flat 5 com cama king e cabeceira estofada", "landscape"),
    photos: [
      p("flat-5", "01.jpg", "Quarto do Flat 5 com cama king e cabeceira estofada", "landscape"),
      p("flat-5", "02.jpg", "Quarto do Flat 5 com TV e porta de vidro para a varanda"),
      p("flat-5", "03.jpg", "Varanda do Flat 5 com cadeiras e vista para as árvores"),
      p("flat-5", "04.jpg", "Mini cozinha do Flat 5 com frigobar, pia e cafeteira"),
      p("flat-5", "05.jpg", "Detalhe da cafeteira e das xícaras no Flat 5"),
      p("flat-5", "06.jpg", "Banheiro privativo do Flat 5 com box"),
    ],
  },
  {
    slug: "flat-6",
    name: "Flat 6",
    number: 6,
    highlight: "Varanda exclusiva e vista panorâmica",
    title: "Madeira, luz quente e varanda com vista",
    summary:
      "Parede em madeira, cama king e arara para roupas. Varanda exclusiva com vista panorâmica e mini cozinha completa.",
    description: [
      "O Flat 6 combina parede em madeira, iluminação quente e cama king com enxoval completo. Tem Smart TV, ventilador e arara para organizar as roupas.",
      "A mini cozinha tem frigobar, micro-ondas, cafeteira e utensílios. A varanda exclusiva tem cadeiras e vista para a serra, boa para o fim da tarde.",
    ],
    capacity,
    keyFeatures: ["Varanda exclusiva", "Vista panorâmica", "Cama king", "Mini cozinha equipada"],
    viewLabel: "Vista panorâmica",
    amenities: ["king", "enxoval", "banheiro", "smarttv", "ventilador", "frigobar", "microondas", "cafeteira", "utensilios", "arara", "varanda", "vista", "wifi", "estacionamento"],
    cover: p("flat-6", "03.jpg", "Quarto do Flat 6 com colcha vermelha, mesa e cadeiras"),
    photos: [
      p("flat-6", "01.jpg", "Quarto do Flat 6 com cama king, parede de madeira e arara para roupas", "landscape"),
      p("flat-6", "02.jpg", "Mesa posta com massa e vinho em frente à cama do Flat 6"),
      p("flat-6", "03.jpg", "Quarto do Flat 6 com colcha vermelha, mesa e cadeiras"),
      p("flat-6", "04.jpg", "Cama king e TV do Flat 6"),
      p("flat-6", "05.jpg", "Mini cozinha do Flat 6 com micro-ondas, frigobar e pia"),
      p("flat-6", "06.jpg", "Bancada e pia da mini cozinha do Flat 6", "landscape"),
      p("flat-6", "07.jpg", "Cafeteira e xícaras na bancada do Flat 6", "landscape"),
      p("flat-6", "08.jpg", "Frigobar com bandeja de taças no Flat 6", "landscape"),
      p("flat-6", "09.jpg", "Banheiro privativo do Flat 6 com box de vidro"),
      p("flat-6", "10.jpg", "Varanda do Flat 6 com cadeiras e mesa"),
      p("flat-6", "11.jpg", "Varanda do Flat 6 com vista para as árvores", "landscape"),
      p("flat-6", "12.jpg", "Vista panorâmica a partir da varanda do Flat 6", "landscape"),
    ],
  },
  {
    slug: "flat-7",
    name: "Flat 7",
    number: 7,
    highlight: "Varanda mobiliada e cortinas blackout",
    title: "Varanda mobiliada e cortinas blackout",
    summary:
      "Cama king, cortinas blackout e Smart TV. Varanda com mesinha e cadeiras e vista panorâmica.",
    description: [
      "O Flat 7 tem cama king com enxoval completo, cortinas blackout para dormir até mais tarde, Smart TV e ventilador.",
      "A varanda, com mesinha e cadeiras, tem vista panorâmica. A mini cozinha tem frigobar, micro-ondas e cafeteira, e há arara para as roupas.",
    ],
    capacity,
    keyFeatures: ["Varanda com mesinha", "Cortinas blackout", "Vista panorâmica", "Cama king"],
    viewLabel: "Vista panorâmica",
    amenities: ["king", "enxoval", "banheiro", "smarttv", "blackout", "ventilador", "frigobar", "microondas", "cafeteira", "arara", "varanda", "vista", "wifi", "estacionamento"],
    cover: p("flat-7", "01.jpg", "Quarto do Flat 7 com cama king e porta para a varanda"),
    photos: [
      p("flat-7", "01.jpg", "Quarto do Flat 7 com cama king e porta para a varanda"),
      p("flat-7", "02.jpg", "Cama king do Flat 7 com cabeceira estofada"),
      p("flat-7", "03.jpg", "Quarto do Flat 7 com mesa, cadeira e TV"),
      p("flat-7", "04.jpg", "Cama do Flat 7 e porta de vidro para a varanda"),
      p("flat-7", "05.jpg", "Cortinas e porta de vidro do Flat 7 abertas para a varanda"),
      p("flat-7", "06.jpg", "Mini cozinha do Flat 7 com micro-ondas, frigobar e cafeteira"),
      p("flat-7", "07.jpg", "Banheiro privativo do Flat 7"),
      p("flat-7", "08.jpg", "Varanda do Flat 7 com cadeiras e vista para as árvores"),
      p("flat-7", "09.jpg", "Entrada do Flat 7"),
    ],
  },
  {
    slug: "flat-8",
    name: "Flat 8",
    number: 8,
    highlight: "Vista para a montanha",
    title: "Vista para a montanha",
    summary:
      "Varanda exclusiva com vista para a montanha, cama king e mesa de jantar dentro do flat.",
    description: [
      "O Flat 8 tem cama king com enxoval completo, Smart TV, ventilador e mesa de jantar para fazer as refeições sem sair do flat.",
      "A varanda exclusiva, com mesinha e cadeiras, tem vista para a montanha. A mini cozinha tem frigobar, micro-ondas, cafeteira e utensílios.",
    ],
    capacity,
    keyFeatures: ["Vista para a montanha", "Varanda exclusiva", "Mesa de jantar", "Cama king"],
    viewLabel: "Vista para a montanha",
    amenities: ["king", "enxoval", "banheiro", "smarttv", "ventilador", "frigobar", "microondas", "cafeteira", "utensilios", "mesa", "varanda", "vista", "wifi", "estacionamento"],
    cover: p("flat-8", "02.jpg", "Quarto do Flat 8 com cama king e mesa de jantar"),
    photos: [
      p("flat-8", "01.jpg", "Quarto do Flat 8 com cama king e parede de madeira"),
      p("flat-8", "02.jpg", "Quarto do Flat 8 com cama king e mesa de jantar"),
      p("flat-8", "03.jpg", "Mesa de jantar posta no Flat 8"),
      p("flat-8", "04.jpg", "Varanda do Flat 8 com cadeiras ao entardecer"),
      p("flat-8", "05.jpg", "Mini cozinha do Flat 8 com micro-ondas e frigobar"),
      p("flat-8", "06.jpg", "Bancada com taças, pia e frigobar no Flat 8"),
      p("flat-8", "07.jpg", "Banheiro privativo do Flat 8"),
    ],
  },
];

export function getAccommodation(slug: string) {
  return accommodations.find((a) => a.slug === slug);
}

/** Fotos externas, sem vínculo com uma unidade específica */
export const exteriorPhotos: (Photo & { caption: string })[] = [
  {
    src: "/assets/areas-externas/fachada-flats-1-a-3.jpg",
    alt: "Fachada do prédio dos Flats 1 a 3 com estacionamento na frente",
    caption: "Fachada · Flats 1 a 3",
    orientation: "landscape",
  },
  {
    src: "/assets/areas-externas/entrada-flats-1-a-3.jpg",
    alt: "Entrada e vagas de estacionamento dos Flats 1 a 3",
    caption: "Entrada e estacionamento · Flats 1 a 3",
    orientation: "square",
  },
  {
    src: "/assets/areas-externas/fachada-flats-5-a-8.jpg",
    alt: "Fachada dos Flats 5 a 8 com vagas de estacionamento em dia de céu azul",
    caption: "Fachada · Flats 5 a 8",
    orientation: "landscape",
  },
];

/** Comodidades presentes em todos os flats (confirmadas no site original) */
export const sharedAmenities: { id: AmenityId | "selfcheckin"; label: string; detail: string }[] = [
  { id: "king", label: "Cama king-size", detail: "Em todos os flats, com enxoval completo" },
  { id: "banheiro", label: "Banheiro privativo", detail: "Com toalhas incluídas" },
  { id: "frigobar", label: "Mini cozinha", detail: "Frigobar e utensílios em todas as unidades" },
  { id: "tv", label: "TV no quarto", detail: "Smart TV na maioria dos flats" },
  { id: "wifi", label: "Wi-Fi gratuito", detail: "Internet sem custo extra" },
  { id: "estacionamento", label: "Estacionamento gratuito", detail: "Vagas em frente aos flats" },
  { id: "selfcheckin", label: "Self check-in", detail: "Chaves em cofre, das 14h às 20h" },
  { id: "varanda", label: "Varanda", detail: "Nos Flats 1, 5, 6, 7 e 8" },
];

/** Linhas da tabela comparativa */
export const comparisonRows: { id: AmenityId; label: string }[] = [
  { id: "varanda", label: "Varanda" },
  { id: "vista", label: "Vista" },
  { id: "microondas", label: "Micro-ondas" },
  { id: "fogao", label: "Fogão" },
  { id: "blackout", label: "Cortinas blackout" },
  { id: "streaming", label: "Netflix" },
  { id: "churrasqueira", label: "Churrasqueira" },
  { id: "entrada", label: "Entrada privativa" },
];
