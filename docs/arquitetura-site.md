# Arquitetura do site

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing page completa (seções abaixo) |
| `/acomodacoes` | Cards + tabela comparativa + consulta |
| `/acomodacoes/[slug]` | Página de cada flat (`flat-1` … `flat-8`), gerada estaticamente |
| `/politicas` | Horários, regras da casa, pagamento e cancelamento |

## Landing page

1. **Hero** — título, subtítulo, CTA WhatsApp, link para os flats, foto principal (Flat 6) + vista da varanda
2. **Sobre** (`#sobre`) — texto curto, 3 pilares (privacidade, praticidade, localização)
3. **Acomodações** (`#acomodacoes`) — 7 cards + card “Na dúvida?” + tabela comparativa
4. **Galeria** (`#galeria`) — filtros por flat, masonry, lightbox com teclado e toque
5. **Comodidades** (`#comodidades`) — itens comuns a todos os flats
6. **Localização** (`#localizacao`) — endereço, horários, mapa incorporado, link do Google Maps
7. **FAQ** (`#duvidas`) — `<details>` nativos, sem JS
8. **Consulta** (`#consulta`) — formulário que abre o WhatsApp com os dados preenchidos
9. **Rodapé** — logo, navegação, flats, contato
10. **CTA fixo no celular** — aparece após a primeira dobra e some perto do rodapé

## Fluxo de conversão

Visitante → card do flat → (página do flat) → **Consultar** → WhatsApp com mensagem que já identifica o flat e/ou as datas. Nenhuma tela simula disponibilidade ou confirma reserva.

## Organização do código

```
app/                 rotas (App Router)
components/layout/   Header, MobileMenu, MobileCTA, Footer
components/sections/ Hero, About, Accommodations, Gallery, Amenities, Location, FAQ, ContactCTA
components/ui/       Button, AccommodationCard, ImageLightbox, FlatGallery, BookingForm, Icon, Reveal
data/                accommodations.ts, faq.ts, site-config.ts (fonte única de conteúdo)
lib/whatsapp.ts      montagem dos links wa.me
styles/globals.css   tokens + estilos por seção
public/assets/       logo, flats/flat-N, areas-externas
```

## Como editar

- **Telefone, e-mail, endereço, mensagens padrão:** `data/site-config.ts`
- **Textos, comodidades e fotos de cada flat:** `data/accommodations.ts`
- **Perguntas frequentes:** `data/faq.ts`
- **Adicionar um flat:** criar `public/assets/flats/flat-N/` e um novo objeto em `accommodations` — card, página, galeria, tabela, rodapé e formulário são atualizados automaticamente.
