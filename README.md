# Flat Jardim Serrano — GitHub Pages

Site em **Next.js 15 / React 19 / TypeScript**, organizado na raiz do repositório, com exportação HTML estática para o GitHub Pages. Inclui página inicial, listagem de acomodações, páginas individuais e políticas. Imagens originais estão em `public/assets/`.

## Publicação automática

1. Crie um repositório no GitHub e envie **o conteúdo deste ZIP diretamente para a raiz**, incluindo `.github/workflows/pages.yml`.
2. Use o branch `main`.
3. Vá em **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Execute o workflow **Publish GitHub Pages** ou faça um push no branch `main`.
5. O workflow gera o site em `out/` e publica automaticamente. Para projetos comuns, aplica `/nome-do-repositorio` como prefixo dos arquivos estáticos. No repositório `usuario.github.io` ou quando existe um arquivo `CNAME`, publica na raiz.

> **Domínio próprio:** não foi adicionado arquivo `CNAME` porque não foi solicitada a mudança de DNS. Ao configurar o domínio em Settings → Pages, o GitHub criará o arquivo CNAME; adicione-o ao repositório para que próximos builds usem a raiz. Confirme as configurações de DNS antes de mudar o domínio atual.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para gerar o site estático localmente:

```bash
npm run build
```

O HTML final é gerado na pasta `out/` (ignorada pelo Git). Não é necessário rodar `npm start` para o GitHub Pages.

## Estrutura

- `app/`: páginas e layout Next.js.
- `components/`: elementos visuais e formulários.
- `data/`: flats, FAQ e configurações.
- `public/assets/`: fotografias e logos.
- `styles/`: CSS global.
- `lib/`: utilitários de URLs e WhatsApp.
- `docs/` e `conteudo/`: documentação e textos de referência.
- `.github/workflows/pages.yml`: publicação automatizada.

## Conteúdo para revisar antes de publicar

Consulte `docs/pendencias.md`. Os dados de contato e endereço estão em `data/site-config.ts`; informações dos flats, em `data/accommodations.ts`. Os envios de consulta abrem o WhatsApp, não verificam disponibilidade em tempo real.

**Observação:** o site conserva as dependências do projeto de origem. O GitHub Pages hospeda somente os arquivos estáticos gerados; não executa servidores Next.js ou APIs dinâmicas.
