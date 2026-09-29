# Bite

MVP acadêmico de um aplicativo web para consultar um cardápio, personalizar refeições e simular pedidos para retirada. Esta versão é a baseline do projeto: ela é funcional e deliberadamente neutra, sem recomendações, opções pré-selecionadas ou outras intervenções comportamentais.

## Fluxo disponível

```text
Início → Cardápio → Produto → Personalização → Carrinho
→ Checkout → Confirmação → Histórico → Detalhes do pedido
```

Rotas:

- `/`
- `/cardapio`
- `/produto/[slug]`
- `/carrinho`
- `/checkout`
- `/pedido/[id]/confirmado`
- `/pedidos`
- `/pedidos/[id]`

## Stack

- Next.js com App Router, React e TypeScript strict;
- Tailwind CSS;
- Zustand com persistência em `localStorage`;
- React Hook Form e Zod;
- Lucide React;
- Vitest e React Testing Library;
- Playwright e `@axe-core/playwright`.

Não há backend, banco de dados, serviço externo em tempo de execução nem variável de ambiente obrigatória.

## Persistência local

O carrinho é salvo em `bite:cart:v1` e os pedidos em `bite:orders:v1`. A camada de persistência trata SSR, armazenamento indisponível, JSON corrompido e estruturas antigas ou inválidas. Cada pedido guarda um snapshot dos itens e personalizações para que o histórico não dependa de alterações futuras no cardápio.

## Acessibilidade

O projeto aplica os nove critérios definidos em `identidadevisual.md`:

1. WCAG 1.1.1 — Conteúdo Não Textual;
2. WCAG 1.3.1 — Informações e Relações;
3. WCAG 1.4.1 — Uso de Cores;
4. WCAG 1.4.3 — Contraste Mínimo;
5. WCAG 1.4.4 — Redimensionar Texto;
6. WCAG 2.1.1 — Teclado;
7. WCAG 2.4.7 — Foco Visível;
8. WCAG 2.5.8 — Tamanho do Alvo;
9. WCAG 3.3.2 — Rótulos ou Instruções.

Os testes automatizados executam axe nas páginas principais. A revisão manual continua recomendada para leitor de tela, ordem de foco e contraste percebido.

## Como executar

Requisitos: Node.js 20 ou mais recente e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

## Publicação na Vercel

1. Importe este repositório na Vercel.
2. Mantenha o preset **Next.js** e o comando de build padrão `npm run build`.
3. Não configure variáveis de ambiente: o MVP não precisa delas.
4. Publique. Carrinho e histórico permanecerão locais a cada navegador/dispositivo.
