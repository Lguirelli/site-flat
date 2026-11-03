# Decisões de design — versão premium

## Direção

Direção de arte sorteada e escolhida com a skill **design-taste-frontend** (tasteskill v2): *The place carries it* — "o lugar é o argumento" (seed `1677146069`, ver `.taste-skill/direction.json`). As fotos dos flats fazem o trabalho; a interface recua.

**A ideia:** o relógio de uma estadia (a chave no cofre às 14h, a varanda no fim da tarde, o café na manhã seguinte, o check-out ao meio-dia) vira a sequência da página. Ninguém mais tem esse ritual: é o self check-in deste lugar.

**A coisa viva:** o seletor "O que não pode faltar?" na lista de flats. O visitante marca varanda, vista, fogão, Netflix, blackout… e vê quais flats têm tudo; o botão monta a mensagem do WhatsApp com os itens e os flats certos.

## Paleta (verde-escuro e osso)

| Token | Cor | Uso |
|---|---|---|
| `--bg` | `#161c1a` | Fundo de todas as páginas |
| `--surface` | `#1f2725` | Seção de dúvidas, painéis |
| `--ink` | `#e3e2da` | Texto; cartão de endereço e rodapé (invertidos) |
| `--muted` | `#a3a8a0` | Texto secundário (contraste 6,3:1) |
| `--accent` | `#9fc7b8` | **Só** a ação de reserva |

A cor fica nas fotos. Sem gradientes, sombras em repouso ou linhas finas (regras da skill).

### Modo claro

| Token | Cor |
|---|---|
| `--bg` | `#f1efe8` |
| `--surface` | `#e7e4db` |
| `--ink` | `#161c1a` |
| `--muted` | `#545b56` |
| `--accent` | `#2f6b58` (texto claro no botão) |

O tema segue `prefers-color-scheme` e pode ser trocado no botão sol/lua do cabeçalho; a escolha fica em `localStorage` (`tema`) e é aplicada por um script inline antes da primeira pintura. O rodapé e o cartão de endereço usam as cores invertidas nos dois temas.

### Cantos

Fotos, botões, campos e painéis usam `--radius: 16px`. As fotos que eram de borda a borda ("Onde fica" e chamada final) passaram a respeitar as margens da página para mostrar os cantos.

## Tipografia

- **Imbue** (títulos, caixa-alta, condensada e de alto contraste — lê como fachada de hotel antigo).
- **Albert Sans** (texto, 400/500).
- Seis tamanhos no total: pequeno 14, corpo 19, lead 26, título 55, seção 92, hero 184 px (a 1440 px).
- Títulos com no máximo duas linhas, quebradas à mão.

## Composição por seção

| Seção | Blueprint |
|---|---|
| Hero | Título em degrau ("A serra, / a dois.") com duas fotos: a vista da varanda pendurada no alto e o quarto do Flat 6 cortado pela borda |
| Introdução | Título que atravessa para dentro da foto do jantar no Flat 6 |
| Flats | Título largo + lista "índice com prévia": passar o mouse em um flat troca a foto da esquerda; seletor de comodidades |
| A estadia | Três fotos descendo na diagonal (14h → fim da tarde → manhã) |
| Fotos | Fileira arrastável de módulos (alto, par, largo), filtros por flat, setas para mouse, lightbox |
| Incluso | Linhas presas a um eixo, cada uma com sua foto na margem, em tamanhos desiguais |
| Onde fica | A vista em tela cheia com um único cartão de visita (endereço, horários, reserva) |
| Dúvidas | Perguntas ao lado de uma foto alta com uma quadrada sobreposta |
| Chamada final | Última foto (Flat 1, luz quente) com o convite na metade calma |
| Rodapé | Convite com botão de reserva, quatro blocos (onde fica, horários, contato, links), os flats como botões e o nome "JARDIM SERRANO" ocupando a largura; no desktop a página desliza e revela o rodapé |

## Movimento

Revisado com as skills **design-taste-frontend** (motion.md) e **review-animations** (critérios de Emil Kowalski).

- **Assinatura:** o título do hero sobe de trás da própria linha de base (900 ms, expo-out), as duas fotos abrem como obturador. Tudo assentado em ~1,2 s.
- **Entradas por seção:** título por linhas mascaradas → texto → foto (máscara de baixo para cima + leve zoom), 80 ms entre as partes, uma única vez.
- **Foto em movimento:** a vista do "Onde fica" e a foto final derivam presas à rolagem (`animation-timeline: view()`, só onde há suporte).
- **Feedback:** botões encolhem a 0,97 no toque; hover só em ponteiro fino; seta dos links avança 4 px.
- **Interface abaixo de 300 ms:** cabeçalho que some ao descer, barra do celular, acordeão, troca de foto no índice.
- **`prefers-reduced-motion`:** todo estado escondido vive dentro de `no-preference`; com movimento reduzido, a página já aparece pronta.
- Só `transform`, `opacity` e `clip-path` são animados (o acordeão usa `::details-content`, que é a exceção aceita).

## Conversão

- Uma ação principal em todo o site: **Consultar datas**. É um link real para o WhatsApp (funciona sem JS); com JS abre antes um formulário de datas (`<dialog>` nativo, vira folha inferior no celular) que calcula as noites e manda a mensagem completa.
- Pontos de reserva: cabeçalho, hero, seletor de flats, cartão de endereço, chamada final, barra fixa no celular, página de cada flat (formulário fixo ao lado), catálogo.
- Objeções respondidas perto da ação: Pix com 10% de desconto, 3x sem juros, reembolso em 7 dias (CDC), "a disponibilidade e o valor chegam na conversa".
- Eventos para GA4/GTM em `lib/track.ts`: `cta_click`, `booking_open`, `booking_submit`, `flat_filter`.
- Preço "a partir de" pronto para ligar em `siteConfig.pricing` (desligado: ver pendências).

## Resultado do inspetor (tasteskill)

`inspect.mjs` em 1440, 768 e 390 px: **0 FAIL** em `/`, `/acomodacoes`, `/acomodacoes/flat-6` e `/politicas`. Avisos mantidos de propósito:

- **covered-text (celular):** a barra fixa "Consultar datas" passa por cima de títulos durante a rolagem. É o principal ponto de conversão no celular; aparece só depois da primeira dobra e some perto do rodapé.
- **side-scroll / empty-middle (galeria):** a fileira arrastável é cortada na borda de propósito; no desktop há setas.
- **lopsided (chamada final):** o texto ocupa a metade direita porque a foto (a cama do Flat 1) ocupa a esquerda.
- **no-footage:** não há vídeo do lugar. Se o proprietário tiver um clipe da varanda ou da vista, ele entra como loop mudo no "Onde fica".

Observação: o Windows desta máquina está com "efeitos de animação" desligados, então o inspetor foi rodado forçando `prefers-reduced-motion: no-preference` (e também verificado com `reduce`).

## Marca

O logotipo original foi preservado; `logo-claro.svg` é só a versão em cor osso para o fundo escuro.
