# Decisões de design

## Direção

Hospedagem de charme com linguagem editorial: fotos como protagonistas, muito respiro, tipografia serifada nos títulos. A paleta foi tirada das próprias fotos — madeira, pastilhas bege, paredes claras e o verde da serra — para que a interface não brigue com os ambientes.

## Paleta

| Token | Cor | Uso |
|---|---|---|
| `--bg` | `#f5f0e8` linho | Fundo geral |
| `--surface` | `#fbf8f3` | Cards, seções alternadas |
| `--ink` | `#26231f` | Texto |
| `--green` | `#33412f` verde-serra | Seções de destaque, botões primários |
| `--wood` | `#8b5e3c` madeira | Sobretítulos, detalhes |
| `--whatsapp` | `#1f7a4d` | CTAs de consulta (verde mais sóbrio que o oficial) |

## Tipografia

- **Fraunces** (títulos): serifada com eixo “soft”, acolhedora sem ser antiga. Itálico usado com moderação para dar ritmo (“no seu ritmo.”).
- **Manrope** (texto): sem serifa legível em telas pequenas.
- Títulos com `clamp()` e `text-wrap: balance`; parágrafos limitados a ~34–40rem.

## Fotos

- As fotos públicas têm no máximo 768 px de altura. Por isso o hero é **dividido** (texto + foto em moldura), e não em tela cheia — evita ampliar a imagem e perder nitidez.
- Foto principal: Flat 6 (luz quente, madeira, mesa posta). É a imagem que melhor transmite acolhimento.
- Cada foto é identificada pelo flat na galeria e no lightbox; fachadas ficam separadas para não confundir unidades.

## Componentes

- **Card do flat:** selo com o diferencial principal na foto, contador de fotos, chips de destaque e dois CTAs (ver / consultar). O 8º espaço da grade virou um card de apoio (“Na dúvida?”) para quem não tem preferência de unidade.
- **Tabela comparativa:** só os itens que variam, para facilitar a escolha. Rola na horizontal no celular, com a primeira coluna fixa.
- **Formulário:** 4 campos, validação básica (datas no futuro, saída após entrada) e aviso claro de que é uma consulta.

## Movimento

Fade-in leve na entrada das seções, hover suave nos cards e imagens, abertura suave do menu e do lightbox. Tudo desativado com `prefers-reduced-motion`; sem JavaScript, o conteúdo aparece normalmente.

## Marca

O logotipo original (folha + “Flat Jardim Serrano”) foi preservado sem alterações de desenho. Apenas o enquadramento foi recortado para uso horizontal no cabeçalho e invertido para branco no rodapé.
