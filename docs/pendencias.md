# Pendências

Informações que precisam de confirmação do proprietário antes da publicação. Nada abaixo foi inventado no site; onde havia dúvida, o item foi omitido ou publicado exatamente como estava no site original.

## Conteúdo a confirmar

1. **Duas edificações?** As fotos mostram dois prédios diferentes (Flats 1–3 e Flats 5–8). Confirmar se ambos ficam na Rua Brasil, 677, ou se há outro endereço. Se houver, informar para o mapa e a página de cada flat.
2. **Flat 1 tem varanda?** Aparece em “Outras comodidades” no site original, mas não há foto de varanda (há uma escada com floreira). Hoje o site lista “Varanda” no Flat 1.
3. **Churrasqueira do Flat 2:** listada como destaque, sem foto. Confirmar se é exclusiva do flat ou de uso comum, e enviar foto.
4. **Política de cancelamento:** o site original tem duas versões. A tabela diz “até 5 dias antes: 1%”; o texto diz “cancelamento gratuito até 5 dias antes”. O FAQ antigo diz “50% até 1 dia antes”; o texto diz “50% com menos de 5 dias”. Publicamos a combinação da tabela + texto (1% / 50% / no-show 100% / CDC). Confirmar a regra oficial.
5. **Fogão nos Flats 5–8:** as fotos sugerem cooktop, mas o site não lista fogão nesses flats. Mantido sem fogão.
6. **Distâncias:** só “menos de 1 km do centro” (todos) e “900 m do centro” (Flat 2) foram publicados. Para citar atrações (Alto da Serra, Fonte Santo Agostinho, teleférico etc.), informar distâncias verificadas.
7. **Ventilador e ar-condicionado:** ventilador listado em quase todos; ar-condicionado não aparece em nenhum. Confirmar.
8. **Vagas:** “1 vaga” está explícito nos Flats 2 e 3. Confirmar se todos têm 1 vaga.
9. **Privacidade/LGPD:** a página `/politicas` traz regras e cancelamento. A política de privacidade completa do site original não foi migrada; definir se será reaproveitada.

## Fotografias

10. **Resolução:** o CDN público entrega no máximo 768 px de altura. Para um hero em tela cheia e galerias mais nítidas, enviar os arquivos originais. O layout atual foi desenhado para não ampliar além da resolução disponível.
11. **Faltam fotos:** varanda do Flat 1, churrasqueira do Flat 2, vistas dos Flats 5, 7 e 8 sem reflexo, áreas comuns, entorno/cidade.
12. **Direitos de uso:** confirmar que as fotos (algumas parecem profissionais, como as do Flat 6) podem ser usadas no novo site.

## Comercial

13. **Preços:** não publicados (o calendário original mostrava diárias a partir de R$ 378 em nov/2026, variando por data). Definir se o site mostrará “a partir de”.
14. **Reserva online:** o site original tem motor de reservas (BookSuite). Hoje o novo site usa só o WhatsApp. Se quiser manter a reserva online, adicionar a URL em `data/site-config.ts` e um botão secundário.
15. **Pacotes de feriados** (Natal, Réveillon etc.) existem no site original e não foram migrados. Avaliar uma seção sazonal.
16. **Avaliações de hóspedes:** nenhuma encontrada no site. Se houver notas no Booking/Airbnb/Google, podem virar uma seção de prova social, com fonte.
17. **Domínio e analytics:** definir o domínio final (`siteConfig.url`) e se Google Analytics/Clarity continuam.

## Versão premium (novas)

18. **Preço "a partir de":** o código está pronto (`siteConfig.pricing`), desligado. Ligar só com um valor confirmado.
19. **Analytics:** os eventos de conversão (`cta_click`, `booking_open`, `booking_submit`, `flat_filter`) vão para o `dataLayer`. Falta instalar o GTM/GA4 para recebê-los.
20. **Vídeo:** um clipe curto da varanda ou da vista (10–20 s, sem pessoas) completaria a seção "Onde fica".
21. **Fotos em alta:** o hero e as seções em tela cheia ampliam fotos de 768 px de altura; com os originais, ficam nítidas em telas grandes.
22. **Reembolso em 7 dias:** a chamada final cita a regra do CDC que já estava nas políticas; confirmar junto com o item 4.

