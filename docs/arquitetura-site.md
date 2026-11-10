# Arquitetura do site

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing page completa (seções abaixo) |
| `/acomodacoes` | Cards + tabela comparativa + consulta |
| `/acomodacoes/[slug]` | Página de cada flat (`flat-1` … `flat-8`), gerada estaticamente |
| `/politicas` | Horários, regras da casa, pagamento e cancelamento |

## Landing page

1. **Hero** — "A serra, a dois.", duas fotos do Flat 6, ação "Consultar datas"
2. **Introdução** (`#sobre`) — privacidade e self check-in
3. **Flats** (`#acomodacoes`) — seletor "O que não pode faltar?" + lista com prévia de foto
4. **A estadia** (`#estadia`) — 14h, fim da tarde, manhã seguinte
5. **Fotos** (`#galeria`) — fileira arrastável, filtros por flat, lightbox
6. **Incluso** (`#comodidades`) — o que todos os flats têm
7. **Onde fica** (`#localizacao`) — vista em tela cheia + cartão de endereço e horários
8. **Dúvidas** (`#duvidas`) — acordeão nativo
9. **Chamada final** (`#consulta`) — foto do Flat 1 + condições de pagamento
10. **Rodapé** — colunas + nome em largura total
11. **Barra fixa no celular** e **formulário de datas** (`BookingDialog`, aberto por qualquer botão "Consultar datas")

## Fluxo de conversão

Visitante → seletor ou página do flat → **Consultar datas** → formulário (datas, hóspedes, flat) → WhatsApp com a mensagem completa. Sem JS, os botões levam direto ao WhatsApp. Nenhuma tela simula disponibilidade ou confirma reserva.

## Organização do código

```
app/                 rotas (App Router)
components/layout/   Header, MobileMenu, MobileCTA, Footer
components/sections/ Hero, About, Accommodations, FlatFinder, Experience, Gallery, Amenities,
                     Location, FAQ, ContactCTA, FlatCatalog
components/ui/       Button, BookingButton, BookingDialog, BookingForm, CtaTracker, Lines, Reveal,
                     FlatGallery, ImageLightbox, Icon
data/                accommodations.ts, faq.ts, site-config.ts (fonte única de conteúdo)
lib/                 whatsapp.ts (links wa.me), track.ts (eventos de conversão)
styles/globals.css   tokens + estilos por seção + camada de movimento
public/assets/       logo, flats/flat-N, areas-externas
```

## Como editar

- **Telefone, e-mail, endereço, mensagens padrão:** `data/site-config.ts`
- **Textos, comodidades e fotos de cada flat:** `data/accommodations.ts`
- **Perguntas frequentes:** `data/faq.ts`
- **Adicionar um flat:** criar `public/assets/flats/flat-N/` e um novo objeto em `accommodations` — card, página, galeria, tabela, rodapé e formulário são atualizados automaticamente.
