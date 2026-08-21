# SM Solution Technology — Site institucional

Projeto Next.js (App Router) com o site institucional da SM Solution Technology.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

## Estrutura

```
app/
  layout.jsx      → layout raiz + metadados de SEO (title, description, Open Graph)
  page.jsx         → renderiza o componente principal
  globals.css      → Tailwind + fontes (Inter e Poppins)
components/
  Site.jsx         → componente completo do site (nav, hero, seções, formulário, rodapé)
public/
  logo.png         → logo da empresa, usado no header, hero e rodapé
```

## Antes de publicar

- Troque os dados de contato fictícios em `components/Site.jsx` (telefone, e-mail,
  endereço e o link do WhatsApp `https://wa.me/55...`) pelos dados reais.
- Troque os links de redes sociais (Instagram, LinkedIn) pelos perfis reais.
- O formulário de contato hoje só mostra uma confirmação local — conecte o
  `handleSubmit` em `components/Site.jsx` a um endpoint real (API própria,
  Formspree, Resend, etc.) para receber as mensagens por e-mail.
- Ajuste os textos de "Cases de sucesso" e depoimentos para casos reais.

## Deploy

O projeto está pronto para deploy na Vercel (ou qualquer host compatível com Next.js):

```bash
npm run build
npm run start
```

Ou conecte o repositório diretamente à Vercel para deploy automático a cada push.
