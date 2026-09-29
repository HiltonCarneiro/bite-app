# Bite — Identidade Visual e Diretrizes de Interface

## 1. Marca

**Nome:** Bite

**Personalidade visual:**

- moderna;
- acolhedora;
- simples;
- apetitosa;
- direta;
- amigável.

A marca não deve parecer um aplicativo fitness, médico ou de dieta.

### Tagline de referência

> **Comida boa, mais momentos.**

A tagline é institucional e não deve ser usada para favorecer um item específico do cardápio.

---

## 2. Conceito do logo

O logo principal deve utilizar:

- palavra **Bite**;
- tipografia arredondada e amigável;
- cor principal escura;
- detalhe/folha ou elemento gráfico em laranja associado ao `i`.

### Versões permitidas

1. logo horizontal;
2. símbolo do aplicativo;
3. versão monocromática;
4. versão para fundo claro;
5. versão para fundo escuro, desde que mantenha contraste adequado.

### Não fazer

- distorcer;
- inclinar;
- aplicar gradiente aleatório;
- alterar cores fora dos tokens;
- adicionar sombras excessivas;
- substituir o logo por emoji;
- usar o logo como botão sem nome acessível quando sua função não for óbvia.

---

## 3. Ícone do aplicativo

Conceito:

- quadrado arredondado;
- base laranja;
- símbolo simplificado inspirado na letra `b`;
- detalhe orgânico/folha.

O ícone deve permanecer reconhecível em tamanho pequeno.

---

## 4. Paleta oficial

| Token | Cor | Hex | Uso |
|---|---|---|---|
| `brand-orange` | Laranja Bite | `#FF7A00` | acentos, fundos de destaque, elementos decorativos |
| `brand-red` | Vermelho | `#E63946` | erro/atenção, com texto/ícone complementar |
| `brand-brown` | Marrom escuro | `#2E1F17` | títulos, texto de alto contraste, logo |
| `brand-cream` | Creme | `#F7F4EE` | superfícies e fundos |
| `brand-green` | Verde | `#2E7D32` | sucesso/estado concluído, sem depender só da cor |
| `primary-accessible` | Laranja escuro | `#C95000` | botões primários com texto branco |
| `surface` | Branco | `#FFFFFF` | cards e superfícies |
| `text-muted` | Cinza escuro | `#5F5A57` | texto secundário quando contraste for suficiente |

### Regra importante de contraste

`#FF7A00` com texto branco **não deve ser usado para texto normal**, pois o contraste não atinge 4.5:1.

Usos aprovados:

```text
fundo #FF7A00 + texto #2E1F17
```

ou:

```text
fundo #C95000 + texto #FFFFFF
```

A estética nunca deve ter prioridade sobre acessibilidade.

---

## 5. Tipografia

### Família principal

**Poppins**

Carregar com `next/font` quando possível.

### Escala sugerida

| Uso | Tamanho | Peso |
|---|---:|---:|
| H1 | 32 px | 700 |
| H2 | 24 px | 700 |
| H3 | 20 px | 600 |
| Body | 16 px | 400 |
| Body strong | 16 px | 600 |
| Small | 14 px | 400 |
| Button | 16 px | 600 |

### Regras

- evitar texto funcional abaixo de 14 px;
- corpo padrão em 16 px;
- `line-height` confortável;
- não usar caixa alta em parágrafos;
- manter hierarquia semântica equivalente à hierarquia visual.

---

## 6. Espaçamento

Adotar escala baseada em múltiplos de 4:

```text
4
8
12
16
20
24
32
40
48
64
```

Padrões sugeridos:

- padding interno de card: 16 px;
- gap entre campos: 16 px;
- gap entre seções: 24–32 px;
- margem lateral mobile: 16 px.

---

## 7. Bordas e raio

### Radius

```text
small: 8 px
medium: 12 px
large: 16 px
pill: 9999 px
```

Uso:

- cards: 16 px;
- inputs: 12 px;
- botões: 12 px;
- chips: pill.

---

## 8. Sombras

Utilizar sombras discretas apenas para separar superfícies.

Evitar:

- sombras pesadas;
- brilho neon;
- elevação diferente usada para induzir escolha entre opções equivalentes.

Cards de alternativas concorrentes devem manter o mesmo tratamento visual.

---

## 9. Iconografia

Usar **Lucide React**.

Padrão:

- traço consistente;
- ícones entre 20 e 24 px;
- ícones decorativos com `aria-hidden="true"`;
- ícones funcionais devem ter texto visível ou nome acessível.

---

## 10. Componentes

### 10.1 Botão primário

Uso:

- ação principal da tela.

Exemplo:

```text
Adicionar ao carrinho
Continuar
Confirmar pedido
```

Estilo:

- fundo `#C95000`;
- texto branco;
- altura recomendada de 48 px;
- padding horizontal mínimo de 16 px;
- raio de 12 px;
- foco visível;
- estado hover;
- estado disabled com texto ainda legível.

### 10.2 Botão secundário

- fundo claro;
- borda `brand-brown` ou cinza suficientemente contrastante;
- texto escuro;
- mesmo tamanho de alvo do botão primário quando ações tiverem relevância semelhante.

### 10.3 Card de refeição

Deve conter:

- imagem;
- nome;
- descrição curta;
- preço;
- ação clara.

Na baseline, não exibir:

- "mais pedido";
- "recomendado";
- "escolha saudável";
- porcentagem de usuários;
- contador;
- urgência;
- ranking.

### 10.4 Card de opção

Usado para:

- tamanho;
- acompanhamento;
- bebida;
- sobremesa.

Todas as alternativas equivalentes devem possuir:

- mesmo tamanho;
- mesma tipografia;
- mesma densidade visual;
- mesma estrutura;
- mesma família de cor.

O estado selecionado pode ser distinguido por:

- borda;
- ícone/check;
- texto auxiliar;
- cor.

Nunca apenas por cor.

### 10.5 Campos

Cada campo deve ter:

- `<label>`;
- nome visível;
- associação semântica;
- indicação textual de obrigatoriedade quando aplicável;
- erro associado ao campo;
- instruções quando necessárias.

Placeholder não substitui label.

### 10.6 Navegação

A navegação principal deve conter apenas destinos funcionais.

Sugestão mobile:

- Início;
- Cardápio;
- Pedidos;
- Carrinho.

O item atual pode usar cor + indicador visual adicional.

---

## 11. Layout mobile

Prioridade de projeto:

```text
320–430 px
```

Características:

- uma coluna;
- conteúdo principal com 16 px de margem;
- botões primários com largura ampla;
- áreas de toque confortáveis;
- cards empilhados;
- barra de navegação sem sobrepor conteúdo.

---

## 12. Desktop

Em telas maiores:

- `max-width` do conteúdo;
- grid de 2–4 colunas no cardápio;
- carrinho e resumo podem usar duas colunas;
- leitura não deve virar uma linha excessivamente longa.

---

# 13. Regra principal da primeira versão: sem nudges

O protótipo atual é a **baseline experimental**.

A interface NÃO deve tentar mudar o comportamento do usuário.

## Proibido nesta versão

- default proposital;
- pré-seleção de tamanho/bebida/sobremesa;
- destaque de uma escolha como "melhor";
- selo "recomendado";
- selo "saudável";
- selo "mais popular";
- social proof;
- urgência artificial;
- escassez artificial;
- contadores;
- framing de calorias;
- mensagem de culpa;
- mensagem de economia calórica;
- opção visualmente maior para induzir decisão;
- botão de "manter escolha" propositalmente escondido;
- confirmação insistente tentando trocar uma escolha;
- ordenação persuasiva.

## Permitido

- feedback necessário para concluir uma tarefa;
- mensagem de erro;
- estado de sucesso;
- indicação de item indisponível;
- informação objetiva de preço;
- descrição factual do produto;
- foco e estados de seleção necessários à usabilidade.

A futura versão com intervenções deve partir desta mesma base para permitir comparação justa.

---

# 14. WCAG — critérios obrigatórios do Bite

Referência utilizada:

**Guia WCAG — WCAG 2.2**  
https://guia-wcag.com/

Serão aplicados **9 critérios**, respeitando o limite solicitado de 7 a 9.

---

## 14.1 WCAG 1.1.1 — Conteúdo Não Textual [A]

### Aplicação no Bite

Imagens relevantes de refeições devem possuir `alt` que descreva o conteúdo necessário para compreensão.

Exemplo:

```tsx
<Image
  src="/images/frango-grelhado.webp"
  alt="Prato de frango grelhado com arroz e legumes"
/>
```

Imagens puramente decorativas:

```html
alt=""
```

### Critério de aceite

- toda imagem informativa tem alternativa textual;
- imagem decorativa não gera ruído em leitor de tela.

---

## 14.2 WCAG 1.3.1 — Informações e Relações [A]

### Aplicação no Bite

A estrutura visual deve existir também semanticamente.

Utilizar corretamente:

- `header`;
- `nav`;
- `main`;
- `section`;
- `footer`;
- headings;
- listas;
- `fieldset` e `legend` para grupos de escolhas;
- labels associados aos inputs.

### Critério de aceite

A página continua compreensível quando navegada por tecnologia assistiva sem depender apenas da posição visual.

---

## 14.3 WCAG 1.4.1 — Uso de Cores [A]

### Aplicação no Bite

Nenhuma informação deve depender exclusivamente de cor.

Exemplos:

**Erro**

Não usar apenas borda vermelha.

Usar:

- cor;
- ícone;
- mensagem textual.

**Opção selecionada**

Não usar apenas borda laranja.

Usar também:

- check;
- `aria-checked`;
- alteração de borda/forma.

### Critério de aceite

Se a pessoa não distinguir as cores, o estado ainda é compreensível.

---

## 14.4 WCAG 1.4.3 — Contraste (mínimo) [AA]

### Aplicação no Bite

Como regra:

- texto normal: pelo menos **4.5:1**;
- texto grande: pelo menos **3:1**.

A paleta deve ser validada antes de usar novas combinações.

### Combinações aprovadas de referência

- `#2E1F17` sobre `#FFFFFF`;
- `#2E1F17` sobre `#F7F4EE`;
- `#2E1F17` sobre `#FF7A00`;
- `#FFFFFF` sobre `#C95000`;
- `#FFFFFF` sobre `#2E7D32`.

### Evitar

- branco sobre `#FF7A00` em texto normal;
- cinza claro sobre creme;
- texto de placeholder com contraste insuficiente.

---

## 14.5 WCAG 1.4.4 — Redimensionar Texto [AA]

### Aplicação no Bite

A aplicação deve permanecer utilizável com zoom de até 200%.

### Critério de aceite

Em zoom de 200%:

- texto não fica cortado;
- botões continuam utilizáveis;
- conteúdo não se sobrepõe;
- funcionalidades não desaparecem;
- leitura principal não exige rolagem horizontal por causa do layout.

---

## 14.6 WCAG 2.1.1 — Teclado [A]

### Aplicação no Bite

Todo fluxo deve ser possível via teclado:

```text
Home
→ Cardápio
→ Produto
→ Personalização
→ Carrinho
→ Checkout
→ Confirmação
```

### Critério de aceite

O usuário consegue:

- abrir links;
- selecionar opções;
- alterar quantidade;
- remover itens;
- preencher formulário;
- confirmar pedido;

sem mouse.

Não deve existir armadilha de teclado.

---

## 14.7 WCAG 2.4.7 — Foco Visível [AA]

### Aplicação no Bite

Todo elemento focável deve apresentar indicador visível.

Sugestão:

```css
focus-visible:ring-2
focus-visible:ring-offset-2
```

A cor do anel deve contrastar com o fundo.

### Critério de aceite

É sempre possível identificar visualmente qual elemento está com foco durante navegação por teclado.

---

## 14.8 WCAG 2.5.8 — Tamanho do Alvo (mínimo) [AA]

O guia estabelece mínimo de **24 x 24 px** em condições normais.

### Decisão do Bite

O projeto adotará meta superior:

**44 x 44 px sempre que viável**.

Aplicar especialmente em:

- botões;
- ícones clicáveis;
- itens de navegação;
- controles de quantidade;
- opções de personalização.

### Critério de aceite

Nenhuma ação principal depende de um alvo minúsculo ou excessivamente próximo de outro alvo.

---

## 14.9 WCAG 3.3.2 — Rótulos ou Instruções [A]

### Aplicação no Bite

Todo campo deve informar claramente sua finalidade.

Correto:

```text
Nome para retirada
[________________]
```

Evitar:

```text
[Digite aqui...]
```

sem label.

### Critério de aceite

- campos têm labels;
- obrigatoriedade é informada;
- limites de seleção são explicados;
- instruções aparecem antes ou próximas ao controle correspondente.

---

# 15. Verificação de acessibilidade

Antes de considerar a entrega pronta:

### Automatizado

Executar:

- axe;
- testes de componentes;
- testes E2E.

### Manual

Verificar:

1. navegação somente com teclado;
2. ordem do foco;
3. foco visível;
4. zoom a 200%;
5. labels;
6. textos alternativos;
7. contraste;
8. áreas de toque;
9. uso de cor.

---

# 16. Checklist visual da entrega

- [ ] Bite aparece corretamente;
- [ ] Poppins está aplicada;
- [ ] paleta segue os tokens;
- [ ] layout é mobile-first;
- [ ] cards são consistentes;
- [ ] nenhuma alternativa recebe destaque persuasivo;
- [ ] nenhuma decisão vem pré-selecionada;
- [ ] contraste foi validado;
- [ ] foco é claramente visível;
- [ ] ícones têm função compreensível;
- [ ] botões têm tamanho confortável;
- [ ] estados disabled são legíveis;
- [ ] erros usam texto, ícone e não apenas cor;
- [ ] todos os 9 critérios selecionados estão demonstráveis na apresentação.

---

# 17. Como apresentar ao professor

A equipe deve conseguir demonstrar no aplicativo:

1. **Objetivo do sistema**;
2. **fluxo completo e navegável**;
3. **ausência de intervenções comportamentais na baseline**;
4. **9 critérios WCAG aplicados concretamente**;
5. **pontos de decisão que poderão receber intervenções em uma etapa futura**, sem implementar essas intervenções agora.

O foco da primeira entrega é provar que existe uma interface funcional, consistente, acessível e neutra que servirá de comparação para a versão futura.
