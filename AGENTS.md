# AGENTS.md — Instruções de implementação do Bite

## 1. Papel do agente

Você é responsável por implementar o **MVP completo, navegável, funcional, responsivo e acessível do Bite**.

Não entregue apenas telas estáticas.

A aplicação precisa permitir concluir o fluxo real do protótipo do início ao fim.

Antes de alterar código, leia integralmente:

1. `AGENTS.md`;
2. `arquitetura.md`;
3. `entidades.md`;
4. `identidadevisual.md`.

Não contradiga esses documentos sem necessidade técnica comprovável.

---

# 2. Contexto acadêmico obrigatório

O projeto pertence à disciplina de **Interface com o Usuário**.

A primeira avaliação exige:

- objetivo do sistema;
- protótipo navegável com todas as funcionalidades;
- **sem considerar intervenções comportamentais**;
- aplicação de **7 a 9 critérios WCAG**.

O Bite adotará **9 critérios WCAG**, documentados em `identidadevisual.md`, a partir do:

https://guia-wcag.com/

Esta entrega será a **baseline sem nudges**. Em etapas futuras da disciplina existirão intervenções comportamentais e os protótipos serão comparados.

Portanto, a primeira versão precisa permanecer neutra.

---

# 3. Objetivo do sistema

Construir um aplicativo web de pedidos de refeições no qual o usuário possa:

1. acessar o cardápio;
2. pesquisar e filtrar itens;
3. abrir os detalhes de uma refeição;
4. escolher personalizações;
5. adicionar ao carrinho;
6. editar/remover itens;
7. revisar o pedido;
8. preencher checkout;
9. escolher método de pagamento simulado;
10. confirmar;
11. visualizar histórico local de pedidos.

---

# 4. Stack obrigatória

Implementar com:

- Next.js;
- App Router;
- React;
- TypeScript strict;
- Tailwind CSS;
- Zustand;
- React Hook Form;
- Zod;
- Lucide React;
- Vitest;
- React Testing Library;
- Playwright;
- axe-core ou `@axe-core/playwright`.

Hospedagem alvo:

- Vercel.

Não criar backend dedicado.

Não criar banco de dados.

Não exigir `.env` para o MVP funcionar.

---

# 5. Regra inegociável: NÃO IMPLEMENTAR NUDGES

A versão atual deve ser neutra.

É proibido adicionar:

- "recomendado";
- "mais pedido";
- "mais saudável";
- "melhor escolha";
- porcentagem de usuários;
- prova social;
- escassez;
- urgência;
- defaults persuasivos;
- opções pré-selecionadas;
- comparação calórica persuasiva;
- framing de perda/ganho;
- destaque seletivo de uma alternativa;
- pop-up para tentar mudar a escolha;
- dark pattern;
- ordenação com intenção persuasiva.

## Alternativas equivalentes

Devem possuir:

- mesmo tamanho visual;
- mesma estrutura;
- mesma tipografia;
- mesma hierarquia;
- tratamento de cor equivalente.

Seleção feita pelo usuário pode receber estado visual diferente porque isso é feedback de interação, não nudge.

---

# 6. Não criar funcionalidades fora do escopo

Não implementar agora:

- login;
- cadastro;
- autenticação;
- recuperação de senha;
- painel administrativo;
- restaurantes múltiplos;
- delivery com mapa;
- geolocalização;
- pagamento real;
- cupom;
- programa de fidelidade;
- recomendação;
- IA;
- chatbot;
- ranking nutricional;
- analytics;
- coleta de comportamento;
- Supabase;
- API própria.

Se algo não for necessário para o fluxo principal, não aumentar o escopo.

---

# 7. Fluxo obrigatório

## 7.1 Home

Deve permitir:

- identificar claramente o Bite;
- navegar para o cardápio;
- acessar carrinho;
- acessar pedidos;
- visualizar categorias de forma neutra.

Não criar hero que favoreça um prato específico.

## 7.2 Cardápio

Implementar:

- listagem;
- pesquisa;
- filtro por categoria;
- estado "nenhum resultado";
- abertura de produto.

Ordenar itens de maneira determinística e neutra.

Preferência: ordem alfabética dentro da categoria.

## 7.3 Produto

Mostrar:

- imagem;
- nome;
- descrição;
- preço base;
- grupos de personalização;
- quantidade;
- preço atualizado;
- botão para adicionar.

Grupos sugeridos:

- tamanho;
- acompanhamento;
- bebida;
- sobremesa.

Nenhuma opção começa selecionada.

Para grupos obrigatórios, o botão de adicionar permanece indisponível até a escolha válida.

## 7.4 Carrinho

Implementar:

- listagem;
- personalizações escolhidas;
- quantidade;
- alteração de quantidade;
- edição;
- remoção;
- subtotal;
- estado vazio;
- continuar para checkout.

## 7.5 Edição de item

Ao editar:

- abrir o produto com a configuração do `CartItem`;
- permitir alteração;
- substituir o item original no carrinho;
- não duplicar acidentalmente.

Pré-carregar a seleção já feita durante **edição** é permitido, pois isso preserva a escolha anterior do próprio usuário e não constitui default persuasivo.

## 7.6 Checkout

Implementar formulário acessível com:

- nome para retirada;
- método de retirada fixo/claramente informado;
- método de pagamento simulado;
- observações opcionais.

Métodos:

- PIX;
- cartão no balcão;
- dinheiro.

Não solicitar:

- número de cartão;
- validade;
- CVV;
- CPF;
- senha.

## 7.7 Confirmação

Ao concluir:

1. validar checkout;
2. gerar pedido;
3. salvar snapshot;
4. limpar carrinho;
5. navegar para confirmação;
6. exibir código do pedido;
7. oferecer link para detalhes.

## 7.8 Histórico

Implementar:

- lista de pedidos locais;
- estado sem pedidos;
- detalhe do pedido;
- data/hora;
- itens;
- personalizações;
- quantidade;
- total;
- método de pagamento.

---

# 8. Rotas obrigatórias

Criar:

```text
/
 /cardapio
 /produto/[slug]
 /carrinho
 /checkout
 /pedido/[id]/confirmado
 /pedidos
 /pedidos/[id]
```

Rotas inexistentes devem apresentar tratamento adequado do Next.js.

Produto inexistente deve resultar em `notFound()`.

---

# 9. Navegação principal

A navegação mobile pode conter:

- Início;
- Cardápio;
- Pedidos;
- Carrinho.

Regras:

- todos os itens precisam funcionar;
- estado atual deve ser perceptível sem depender somente de cor;
- ícones decorativos com `aria-hidden`;
- rótulos sempre visíveis;
- badge de quantidade do carrinho deve ter nome acessível.

---

# 10. Dados do cardápio

Criar um catálogo fictício, coerente e suficiente para testar o app.

Requisitos:

- ao menos 6 pratos;
- ao menos 3 categorias;
- diferentes preços;
- diferentes grupos de personalização;
- bebidas;
- sobremesas.

Exemplo de nomes possíveis:

- Hambúrguer Clássico;
- Frango Grelhado;
- Massa ao Molho de Tomate;
- Wrap de Frango;
- Bowl de Legumes;
- Sanduíche da Casa.

Evitar nomes que classifiquem escolhas moralmente como boas/ruins.

Não usar "Fit", "Culpa Zero", "Detox", "Saudável" ou equivalentes como forma de persuasão.

---

# 11. Imagens

Preferir imagens armazenadas localmente:

```text
public/images/
```

Não depender de serviço de imagem em produção.

Se houver acesso à internet durante implementação:

- obter imagens apropriadas e livres para uso;
- baixar e armazenar localmente;
- manter dimensões otimizadas.

Se não houver internet:

- criar placeholders SVG locais consistentes;
- não deixar imagens quebradas;
- não usar URL aleatória que possa expirar.

Toda imagem informativa precisa de `alt` adequado.

---

# 12. Estado e persistência

## Carrinho

Persistir em:

```text
bite:cart:v1
```

## Pedidos

Persistir em:

```text
bite:orders:v1
```

Implementar tratamento seguro para:

- SSR;
- hidratação;
- localStorage indisponível;
- dado antigo/corrompido.

Evitar erro de hydration mismatch.

---

# 13. Modelo de domínio

Seguir exatamente `entidades.md`.

Não duplicar interfaces incompatíveis em vários arquivos.

Criar funções de domínio puras para:

- cálculo de preço;
- validação;
- criação de carrinho;
- criação de pedido;
- formatação.

---

# 14. Identidade visual

Seguir `identidadevisual.md`.

Regras principais:

- nome Bite;
- Poppins;
- `#2E1F17` para texto principal;
- `#F7F4EE` como superfície de apoio;
- `#FF7A00` como laranja de marca;
- `#C95000` para botão com texto branco;
- `#2E7D32` para sucesso;
- `#E63946` para erro/atenção;
- layout moderno e acolhedor;
- radius entre 12 e 16 px;
- sombras discretas.

Não utilizar branco sobre `#FF7A00` para texto normal.

---

# 15. WCAG obrigatório

Implementar e demonstrar os 9 critérios definidos em `identidadevisual.md`:

1. 1.1.1 — Conteúdo Não Textual [A];
2. 1.3.1 — Informações e Relações [A];
3. 1.4.1 — Uso de Cores [A];
4. 1.4.3 — Contraste (mínimo) [AA];
5. 1.4.4 — Redimensionar Texto [AA];
6. 2.1.1 — Teclado [A];
7. 2.4.7 — Foco Visível [AA];
8. 2.5.8 — Tamanho do Alvo (mínimo) [AA];
9. 3.3.2 — Rótulos ou Instruções [A].

Referência:

https://guia-wcag.com/

Acessibilidade é requisito funcional.

---

# 16. HTML e semântica

Preferir elementos nativos.

Usar:

- `<button>` para ações;
- `<a>`/`Link` para navegação;
- `<fieldset>` + `<legend>` para grupos de opções;
- radio para seleção única;
- checkbox para múltipla;
- `<label>` para campos;
- headings em ordem lógica.

Não transformar `div` em botão sem necessidade.

ARIA deve complementar HTML semântico, não substituir semântica nativa.

---

# 17. Foco

Todos os elementos interativos devem ter `:focus-visible`.

Não remover outline sem substituto.

Após navegação comum, deixar o navegador controlar foco de maneira previsível.

Em modais, se algum for realmente necessário:

- mover foco para dentro;
- conter foco apenas enquanto aberto;
- devolver foco ao gatilho;
- permitir fechar por teclado.

Evitar modal se uma página/section resolver de maneira mais simples.

---

# 18. Formulários

Regras:

- label visível;
- `id` único;
- `htmlFor`;
- mensagens de erro textuais;
- `aria-describedby` quando necessário;
- `aria-invalid` em erro;
- foco no primeiro erro ao submeter, se isso puder ser feito sem comportamento inesperado.

Placeholder é complementar.

---

# 19. Estados obrigatórios

Não implementar apenas happy path.

Criar estados para:

- carrinho vazio;
- histórico vazio;
- pesquisa sem resultados;
- item indisponível;
- formulário inválido;
- botão disabled;
- pedido concluído;
- rota de produto inexistente.

---

# 20. Responsividade

Testar pelo menos:

```text
320 px
375 px
430 px
768 px
1024 px
1440 px
```

Em 320 px:

- não pode haver rolagem horizontal causada pelo layout;
- textos não podem ser cortados;
- controles continuam utilizáveis.

Também testar zoom de 200%.

---

# 21. Testes obrigatórios

## 21.1 Unitários

Testar:

- cálculo de preço;
- subtotal;
- multiplicação por quantidade;
- validação de grupos obrigatórios;
- limites de seleção;
- criação de snapshot do pedido.

## 21.2 Componentes

Testar:

- filtros;
- busca;
- seleção de opções;
- estados de erro;
- estado vazio;
- controles de quantidade.

## 21.3 E2E

Criar pelo menos estes fluxos:

### Fluxo A — pedido completo

```text
home
→ cardápio
→ produto
→ personalizações
→ adicionar ao carrinho
→ checkout
→ confirmar
→ confirmação
→ histórico
→ detalhe
```

### Fluxo B — validação

Tentar continuar sem preencher seleções obrigatórias e verificar mensagem/estado correto.

### Fluxo C — carrinho

Adicionar, alterar quantidade, editar configuração e remover.

### Fluxo D — teclado

Percorrer fluxo principal usando teclado nos pontos críticos.

## 21.4 Acessibilidade automatizada

Executar axe nas páginas principais:

- home;
- cardápio;
- produto;
- carrinho;
- checkout;
- confirmação.

Não ignorar violações sem justificativa documentada.

---

# 22. Scripts

Garantir:

```bash
npm run dev
npm run lint
npm run test
npm run build
```

Adicionar:

```bash
npm run test:e2e
```

quando Playwright estiver configurado.

---

# 23. Conteúdo textual

Idioma:

```text
pt-BR
```

Usar português correto.

Evitar:

- lorem ipsum;
- textos genéricos sem sentido;
- inglês misturado na UI;
- tom moralizante sobre alimentação.

Exemplo adequado:

```text
Escolha uma bebida
```

Evitar:

```text
Faça a escolha certa!
```

---

# 24. Formatação de moeda e data

Moeda:

```ts
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})
```

Data:

usar `Intl.DateTimeFormat("pt-BR", ...)`.

Não concatenar manualmente `R$`.

---

# 25. Git

Não executar automaticamente:

- `git push`;
- force push;
- reset destrutivo;
- alteração da branch remota.

Se o ambiente já for um repositório:

- preservar histórico;
- não apagar arquivos que não pertencem à tarefa;
- manter mudanças focadas.

Commits e push só devem ser feitos quando solicitados pelo usuário ou quando a tarefa fornecida explicitamente exigir.

---

# 26. Arquivos sensíveis

Garantir `.gitignore` adequado para:

```text
.env
.env.local
.next/
node_modules/
playwright-report/
test-results/
coverage/
```

O app não precisa de segredo de ambiente nesta etapa.

---

# 27. Dependências

Antes de adicionar pacote:

1. verificar se o framework já resolve;
2. evitar bibliotecas redundantes;
3. não instalar UI kit pesado apenas por um componente;
4. não trocar a stack definida.

Não usar shadcn/ui como dependência obrigatória. Componentes simples podem ser implementados localmente para preservar controle visual e acessibilidade.

---

# 28. Qualidade de código

Obrigatório:

- TypeScript strict;
- funções pequenas;
- nomes claros;
- componentes com responsabilidade definida;
- lógica de domínio fora do JSX;
- evitar duplicação;
- sem `console.log` esquecido;
- sem código morto;
- sem TODO essencial para a entrega;
- sem mocks que façam o fluxo parecer funcional quando não é.

---

# 29. Definition of Done

A implementação só está concluída quando TODOS os itens abaixo forem verdadeiros.

## Produto

- [ ] Home funcional;
- [ ] cardápio funcional;
- [ ] busca funcional;
- [ ] filtro funcional;
- [ ] produto funcional;
- [ ] personalizações funcionais;
- [ ] preço recalculado;
- [ ] carrinho funcional;
- [ ] edição funcional;
- [ ] remoção funcional;
- [ ] checkout funcional;
- [ ] confirmação funcional;
- [ ] histórico funcional;
- [ ] detalhe do pedido funcional.

## Baseline

- [ ] nenhuma opção vem pré-selecionada;
- [ ] nenhum item possui recomendação;
- [ ] nenhum social proof;
- [ ] nenhum nudge;
- [ ] nenhuma arquitetura persuasiva intencional.

## Acessibilidade

- [ ] 1.1.1 atendido;
- [ ] 1.3.1 atendido;
- [ ] 1.4.1 atendido;
- [ ] 1.4.3 atendido;
- [ ] 1.4.4 atendido;
- [ ] 2.1.1 atendido;
- [ ] 2.4.7 atendido;
- [ ] 2.5.8 atendido;
- [ ] 3.3.2 atendido.

## Técnico

- [ ] TypeScript sem erro;
- [ ] `npm run lint` passa;
- [ ] `npm run test` passa;
- [ ] `npm run build` passa;
- [ ] Playwright cobre fluxo principal;
- [ ] sem erro de hidratação;
- [ ] sem imagens quebradas;
- [ ] sem rota quebrada;
- [ ] app funciona após reload;
- [ ] carrinho persiste;
- [ ] pedidos persistem;
- [ ] layout funciona em mobile;
- [ ] layout funciona em desktop;
- [ ] pronto para deploy na Vercel.

---

# 30. Relatório ao finalizar a implementação

Ao terminar, responder ao usuário com:

1. resumo do que foi implementado;
2. estrutura principal criada;
3. rotas;
4. funcionalidades;
5. critérios WCAG aplicados;
6. testes executados e resultados;
7. resultado do build;
8. qualquer limitação real restante;
9. instruções para rodar;
10. instruções para publicar na Vercel.

Não afirmar que algo foi testado se o comando correspondente não foi executado.
