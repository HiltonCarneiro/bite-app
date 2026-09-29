# Bite — Arquitetura do MVP

## 1. Visão geral

**Bite** é um aplicativo web responsivo para seleção, personalização e realização simulada de pedidos de refeições.

Este documento define as decisões técnicas para a **primeira versão do projeto da disciplina de Interface com o Usuário**, que deve ser um **protótipo navegável e funcional, sem intervenções comportamentais (nudges)**.

A implementação deve funcionar como a **linha de base (baseline)** do experimento. Em uma etapa posterior da disciplina, a mesma aplicação poderá receber intervenções comportamentais e ser comparada com esta versão inicial.

### Objetivo do sistema

Permitir que uma pessoa:

1. consulte o cardápio;
2. pesquise e filtre itens;
3. visualize os detalhes de uma refeição;
4. personalize sua refeição;
5. adicione itens ao carrinho;
6. altere ou remova itens;
7. revise o pedido;
8. informe os dados mínimos necessários para o checkout;
9. escolha uma forma de pagamento simulada;
10. confirme o pedido;
11. consulte os pedidos realizados no dispositivo.

> Nesta versão, a interface deve permanecer neutra. Nenhuma opção pode ser destacada, pré-selecionada ou descrita de maneira a induzir uma escolha alimentar específica.

---

## 2. Princípios arquiteturais

A arquitetura deve priorizar:

- **custo zero para desenvolvimento e hospedagem**;
- **deploy simples na Vercel**;
- **mobile-first**;
- **acessibilidade desde a implementação inicial**;
- **baixo acoplamento entre UI, domínio e persistência**;
- **facilidade de manutenção por uma equipe pequena**;
- **funcionamento sem backend obrigatório**;
- **nenhuma dependência de APIs externas em tempo de execução**;
- **possibilidade de evolução futura sem reescrever o fluxo principal**.

---

## 3. Stack oficial

### 3.1 Framework

**Next.js**, utilizando:

- App Router;
- React;
- TypeScript;
- componentes server quando fizer sentido;
- componentes client apenas quando houver interação/estado no navegador.

### 3.2 Linguagem

**TypeScript em modo strict.**

Não utilizar `any` como atalho. Quando um tipo ainda não estiver definido, criar o tipo correto em `src/types` ou próximo ao domínio responsável.

### 3.3 Estilização

**Tailwind CSS**.

Motivos:

- desenvolvimento rápido;
- design responsivo;
- fácil aplicação de estados de foco;
- consistência de espaçamento;
- baixo custo de manutenção.

Os tokens visuais do projeto devem seguir `identidadevisual.md`.

### 3.4 Estado global

**Zustand**.

Usar apenas para estado realmente compartilhado, principalmente:

- carrinho;
- quantidade total de itens;
- histórico local de pedidos.

Evitar transformar todo o aplicativo em estado global.

### 3.5 Persistência

**localStorage**, por meio do middleware `persist` do Zustand ou de uma camada equivalente bem tipada.

Persistir somente:

- carrinho;
- pedidos confirmados;
- preferências estritamente funcionais, se surgirem.

Não armazenar:

- dados de cartão;
- senhas;
- tokens;
- informações sensíveis;
- dados desnecessários.

### 3.6 Formulários e validação

Usar:

- **React Hook Form** para gerenciamento de formulários;
- **Zod** para validação e tipagem dos dados.

A validação deve existir tanto para impedir estados inválidos quanto para fornecer mensagens claras e acessíveis.

### 3.7 Ícones

**Lucide React**.

Não usar emojis como substitutos de ícones funcionais importantes.

Todo botão apenas com ícone deve possuir nome acessível (`aria-label`) quando o significado não estiver expresso por texto visível.

### 3.8 Testes

Usar:

- **Vitest**;
- **React Testing Library**;
- **Playwright** para os fluxos essenciais;
- **axe-core / @axe-core/playwright** para verificações automatizadas de acessibilidade.

Os testes automatizados não substituem a verificação manual de acessibilidade.

### 3.9 Qualidade

Manter:

- ESLint;
- formatação consistente;
- TypeScript sem erros;
- build de produção funcionando.

---

## 4. Hospedagem

### Plataforma

**Vercel**.

Motivos:

- integração direta com Next.js;
- deploy automático a partir do GitHub;
- HTTPS;
- preview de pull requests;
- plano gratuito suficiente para o MVP acadêmico.

### Estratégia de deploy

Fluxo esperado:

```text
GitHub
   ↓
branch main
   ↓
Vercel
   ↓
aplicação publicada
```

O projeto não deve depender de um serviço backend separado no Render para esta primeira entrega.

---

## 5. Banco de dados e backend

### Decisão para o MVP

**Não haverá banco de dados nem backend dedicado nesta primeira versão.**

O cardápio será estático e versionado no repositório.

Exemplo:

```text
src/data/menu.ts
```

O estado de carrinho e pedidos simulados será persistido localmente no navegador.

### Motivo

O objetivo acadêmico atual é validar:

- navegação;
- interface;
- fluxo de decisão;
- acessibilidade;
- funcionamento do protótipo.

Adicionar API, autenticação e banco de dados aumentaria a complexidade sem contribuir diretamente para os critérios atuais da disciplina.

### Evolução futura

Se uma etapa posterior exigir coleta centralizada de dados, autenticação ou pedidos persistentes em múltiplos dispositivos, a opção recomendada é:

- Supabase;
- PostgreSQL;
- Supabase Auth, apenas se autenticação passar a ser requisito.

Essa evolução **não deve ser implementada agora**.

---

## 6. Escopo funcional do MVP

### 6.1 Início

A home deve:

- apresentar a marca Bite;
- permitir acessar o cardápio;
- mostrar as categorias disponíveis;
- permitir acesso ao carrinho;
- permitir acesso aos pedidos anteriores.

Evitar banners que promovam uma opção alimentar em relação a outra.

### 6.2 Cardápio

Funcionalidades:

- listar todos os itens;
- pesquisar por nome;
- filtrar por categoria;
- abrir detalhes de um item.

Regras de neutralidade:

- cards de mesmo nível devem usar o mesmo peso visual;
- não utilizar "mais pedido";
- não utilizar "recomendado";
- não utilizar "saudável";
- não utilizar ranking social;
- não ordenar com a intenção de favorecer uma escolha específica;
- usar ordenação determinística e neutra, preferencialmente alfabética dentro da categoria.

### 6.3 Detalhes e personalização

O usuário poderá escolher, quando aplicável:

- tamanho;
- acompanhamento;
- bebida;
- sobremesa;
- quantidade.

Regras:

- nenhuma alternativa de decisão deve vir selecionada por padrão;
- alternativas equivalentes devem receber o mesmo tratamento visual;
- o botão de continuar/adicionar deve permanecer desabilitado enquanto uma seleção obrigatória estiver incompleta;
- o motivo deve estar claro para leitores de tela e visualmente.

### 6.4 Carrinho

Permitir:

- visualizar itens;
- alterar quantidade;
- remover item;
- editar personalizações;
- visualizar subtotal e total;
- avançar para checkout.

Como não existe pagamento real, o total é apenas demonstrativo.

### 6.5 Checkout

Dados mínimos:

- nome;
- opção de retirada;
- método de pagamento simulado.

Métodos sugeridos:

- PIX;
- cartão no balcão;
- dinheiro.

Não coletar número de cartão, CVV ou qualquer dado financeiro real.

### 6.6 Confirmação

Após confirmar:

- gerar um ID local legível;
- registrar data/hora;
- armazenar snapshot do pedido no histórico local;
- limpar o carrinho;
- exibir tela de sucesso;
- disponibilizar ação para visualizar o pedido.

### 6.7 Pedidos

Permitir:

- listar pedidos feitos no dispositivo;
- abrir detalhes;
- visualizar itens, personalizações, total e data.

---

## 7. Rotas

Estrutura recomendada:

```text
/
├── /cardapio
├── /produto/[slug]
├── /carrinho
├── /checkout
├── /pedido/[id]/confirmado
├── /pedidos
└── /pedidos/[id]
```

Não criar páginas sem função real apenas para preencher navegação.

---

## 8. Estrutura de diretórios

```text
src/
├── app/
│   ├── page.tsx
│   ├── cardapio/
│   ├── produto/[slug]/
│   ├── carrinho/
│   ├── checkout/
│   ├── pedido/[id]/confirmado/
│   └── pedidos/
├── components/
│   ├── layout/
│   ├── menu/
│   ├── cart/
│   ├── checkout/
│   └── ui/
├── data/
│   └── menu.ts
├── domain/
│   ├── cart/
│   └── order/
├── hooks/
├── lib/
│   ├── currency.ts
│   ├── ids.ts
│   └── validation.ts
├── store/
│   ├── cart-store.ts
│   └── order-store.ts
├── types/
│   └── index.ts
└── styles/
```

---

## 9. Separação de responsabilidades

### `data`

Contém dados estáticos do cardápio.

Não deve conter estado mutável.

### `types`

Contratos das entidades e DTOs internos.

### `domain`

Regras como:

- cálculo de preço;
- validação de seleção;
- criação de snapshot de pedido;
- operações puras do carrinho.

### `store`

Estado persistido no navegador.

Não colocar lógica visual.

### `components`

Componentes reutilizáveis.

Componentes de UI não devem conhecer `localStorage` diretamente.

### `app`

Composição de páginas e rotas.

---

## 10. Estratégia de dados

### Catálogo

O catálogo será definido localmente:

```ts
export const menuItems: MenuItem[] = [...]
```

O catálogo deve conter dados suficientes para testar todo o fluxo.

Sugestão mínima:

- 6 pratos principais;
- pelo menos 3 categorias;
- opções de tamanho;
- opções de acompanhamento;
- bebidas;
- sobremesas.

### Imagens

Preferir imagens locais em `public/images`.

Se imagens externas forem baixadas durante o desenvolvimento, elas devem ser armazenadas no repositório e servidas localmente depois.

Não depender de URLs externas para o funcionamento visual em produção.

---

## 11. Decisões sobre responsividade

### Mobile-first

A principal referência de projeto é:

- largura de 320 px até 430 px.

Também deve funcionar adequadamente em:

- tablets;
- desktops.

### Breakpoints

Utilizar os breakpoints padrão do Tailwind, evitando criar breakpoints arbitrários sem necessidade.

No desktop:

- limitar largura de conteúdo;
- evitar esticar cards indefinidamente;
- aproveitar grid responsivo.

---

## 12. Acessibilidade

As regras completas de interface e os critérios selecionados estão em `identidadevisual.md`.

A aplicação adotará **9 critérios da WCAG 2.2** selecionados a partir do Guia WCAG:

https://guia-wcag.com/

A implementação deve considerar acessibilidade como requisito de aceite, e não como correção posterior.

---

## 13. Baseline sem nudges

Esta regra é obrigatória.

A versão atual deve ser uma interface **sem intervenção comportamental**.

Não implementar:

- opção recomendada;
- alternativa pré-selecionada;
- default comportamental;
- social proof;
- escassez;
- urgência;
- mensagens de perda/ganho para direcionar escolha;
- comparação calórica usada para persuadir;
- destaque visual seletivo;
- selo "mais saudável";
- selo "mais popular";
- ordem de opções definida com finalidade persuasiva;
- pop-up tentando alterar a decisão do usuário;
- confirmação com escolha propositalmente assimétrica.

A estrutura deve ser reutilizável para que uma versão futura possa alterar a arquitetura de escolha sem modificar o domínio de pedidos.

---

## 14. Segurança e privacidade

Mesmo sendo um protótipo:

- não versionar `.env`;
- não inserir chaves ou tokens no código;
- não solicitar dados desnecessários;
- não implementar cobrança real;
- não armazenar dados de cartão;
- não adicionar analytics sem necessidade;
- não usar trackers externos.

O MVP deve funcionar sem segredos de ambiente.

---

## 15. Requisitos de desempenho

Metas práticas:

- evitar JavaScript desnecessário;
- usar `next/image` quando apropriado;
- definir dimensões das imagens;
- evitar layout shift;
- lazy loading para imagens fora da primeira dobra;
- não instalar bibliotecas pesadas para funções triviais.

---

## 16. Scripts esperados

O projeto deverá disponibilizar, no mínimo:

```bash
npm run dev
npm run lint
npm run test
npm run build
```

Se os testes E2E estiverem configurados:

```bash
npm run test:e2e
```

---

## 17. Critérios de aceite técnico

A entrega só está pronta quando:

- o fluxo completo pode ser concluído;
- nenhuma rota principal está quebrada;
- o carrinho persiste após reload;
- pedidos confirmados aparecem em histórico local;
- o checkout valida campos;
- nenhum dado financeiro real é solicitado;
- layout funciona em celular e desktop;
- navegação por teclado é possível;
- foco é visível;
- contraste segue as regras definidas;
- imagens relevantes têm texto alternativo;
- `npm run lint` passa;
- `npm run test` passa;
- `npm run build` passa;
- não há nudges na baseline;
- a aplicação pode ser publicada na Vercel sem backend adicional.

---

## 18. Documentos relacionados

Antes de implementar, ler:

1. `AGENTS.md`
2. `arquitetura.md`
3. `entidades.md`
4. `identidadevisual.md`

Em caso de conflito:

1. requisitos acadêmicos e ausência de nudges têm prioridade;
2. acessibilidade tem prioridade sobre preferência estética;
3. `arquitetura.md` decide tecnologia;
4. `entidades.md` decide o modelo de domínio;
5. `identidadevisual.md` decide aparência e comportamento visual.
