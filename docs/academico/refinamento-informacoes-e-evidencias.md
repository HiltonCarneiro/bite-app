# Informações dos itens e estudos visuais de UX

Entrega de 10/11/2026. Equipe: Hilton Carneiro, Jamilly Santos, Hugo Vinicius e João Batista. Disciplina: Interface com o Usuário, 2026.2.

## Escopo e cobertura do catálogo

14 produtos, 6 categorias e 14 cartões compartilhados, incluindo o produto indisponível. Todos os dados alimentares são exemplos acadêmicos, não receitas de um restaurante real. Não foi obtida ficha técnica ou confirmação de rótulo. Nenhuma informação nutricional ou certificação foi adicionada.

| Categoria | Produto | Dados da receita base | Alergênicos |
| --- | --- | --- | --- |
| Refeições | Frango Grelhado | Receita ilustrativa | Não confirmados |
| Refeições | Peixe Assado (indisponível) | Receita ilustrativa; espécie não definida | Peixe no exemplo; não confirmados |
| Lanches | Hambúrguer Clássico | Receita ilustrativa; pão separado | Leite, ovo e mostarda no exemplo; não confirmados |
| Lanches | Sanduíche da Casa | Receita ilustrativa; pão e molho separados | Leite no exemplo; não confirmados |
| Massas | Massa ao Molho de Tomate | Receita ilustrativa; tipo de massa separado | Conferir massa e finalizações; não confirmados |
| Massas | Massa com Cogumelos | Receita ilustrativa; tipo de massa separado | Leite no exemplo; não confirmados |
| Bowls | Bowl de Legumes | Receita ilustrativa; base e molho separados | Conferir opções; não confirmados |
| Bowls | Bowl de Carne | Receita ilustrativa; base separada | Conferir opções; não confirmados |
| Bebidas | Água sem gás | Composição ilustrativa; marca não definida | Não confirmados |
| Bebidas | Suco de laranja | Composição ilustrativa | Não confirmados |
| Bebidas | Refrigerante | Composição indisponível; marca e sabor não definidos | Consultar rótulo; não confirmados |
| Sobremesas | Brownie | Receita ilustrativa | Trigo, leite e ovo no exemplo; não confirmados |
| Sobremesas | Pudim | Receita ilustrativa | Leite e ovo no exemplo; não confirmados |
| Sobremesas | Frutas da estação | Combinação ilustrativa; sujeita a disponibilidade | Não confirmados |

O modelo exige `information` em qualquer produto novo. `ProductInformation` renderiza composição, escopo e incerteza em todas as URLs de produto. O cartão não acompanha dinamicamente a configuração: distingue explicitamente base, possibilidades de personalização e ingredientes a retirar. O acordeão nativo lista a composição ilustrativa de cada opção real; uma opção nova sem dados recebe mensagem de informação indisponível. Não se infere segurança a partir de uma retirada. Preços, limites de seleção, snapshots e chaves de persistência permanecem no domínio existente.

## Cobertura acadêmica

A fonte estruturada `src/data/ux-case-studies.ts` detalha todos os itens classificados como `Sim` ou `Parcial` no levantamento já versionado:

- 11 cartas: B01, B03, B05, B06, B08, B09, B10, B12, B13, B15, B16;
- 6 decisões do estudo Amazon: A01, A02, A03, A04, A07, A09;
- 8 decisões não implementadas aparecem separadamente: B02, B04, B07, B11, B14, A05, A06, A08;
- F01 permanece pendente de fonte. A página pública do caso Facebook consultada não revelou os slides.

Há 17 estudos de práticas implementadas, sem afirmar 17 intervenções comportamentais. O código não contém nudges alimentares ativos. Halo, Holofote, Priming, Mera Exposição e Viés do Presente têm relações indiretas ou hipotéticas com práticas observáveis; isso fica explícito. Lei de Fitts é um princípio motor, e efeitos de segunda ordem são uma reflexão ética. Consistência, acessibilidade, transparência e feedback não são automaticamente vieses ou nudges.

## Proveniência das imagens

- Antes: checkout histórico real do commit `7fc2924`, anterior a `ff48122`, em worktree isolada, sem alterar o código histórico. Trata-se da baseline funcional após o polimento inicial, não da primeira versão absoluta do projeto.
- Depois: aplicação local desta entrega sobre `ee36bfe` (main remota que já incorporava PR #2). A versão-base e o hash das fontes no momento de captura ficam registrados no manifesto.
- 7 pares autênticos, reutilizados pelos 17 estudos conforme a interação: início, cardápio, opções, preço, informações do produto, carrinho e checkout.
- 7 imagens anteriores autênticas; 0 reconstruídas; 0 anteriores indisponíveis. A ausência do cartão de informações na versão histórica é mostrada por uma captura real do resumo do produto e descrita na legenda.
- Imagens em `public/ux-refinement/*-antes.webp` e `*-depois.webp`; registros completos em `src/data/ux-evidence.json` e no arquivo público idêntico `public/ux-refinement/proveniencia.json`.
- Viewports pareadas: 390 × 844 px para início, cardápio e produto; 1440 × 1000 px para carrinho e checkout, permitindo examinar ações e resumo de valores juntos.
- Cada registro contém rota, commit/base de worktree, data UTC, viewport, estado da interação, nota e SHA-256 do asset. A interface formata a data em pt-BR/America-Fortaleza.
- Contextos independentes, armazenamento vazio antes de cada cenário. Preço, carrinho e checkout usam um Hambúrguer Clássico, Brioche, Ao ponto, Queijo extra, quantidade 1. Checkout sem nome ou pagamento escolhido. Nenhum dado pessoal real ou credencial.
- Fontes e imagens visíveis aguardam carregamento; skeletons e indicadores de desenvolvimento não são evidência de estado final. Somente o portal visual de desenvolvimento é ocultado durante a captura. Não há transformação da interface de compra para simular um resultado.
- O enquadramento mostra uma viewport, não necessariamente toda a página. O cartão é ausente no antes de B10; mudanças de edição e desfazer exigem interação além da imagem estática. Os textos distinguem mudança recente de continuidade histórica.

### Reproduzir

Usar o script `scripts/capturar-estudos-ux.mjs` na cópia atual, com a versão histórica em `../bite-before`, ou definir `BITE_BASELINE_ROOT`. Iniciar a baseline na porta 3001 e a implementação na 3000. Instalar Chromium com `npx playwright install chromium`. Executar `node scripts/capturar-estudos-ux.mjs`. O script usa Playwright e o Sharp já incluído na árvore de dependências do Next.js, sem dependências adicionais.

## Fontes e limites

- [Growth.Design — Amazon Purchase UX](https://growth.design/case-studies/amazon-purchase-ux): princípios verificados na versão textual pública em 10/11/2026. Síntese própria e adaptação explicitamente delimitada; nenhuma imagem do estudo foi copiada.
- [Growth.Design — Facebook Misinformation](https://growth.design/case-studies/facebook-misinformation): acesso público limitado a cadastro/preview na consulta. Não foram atribuídos insights sem acesso ao conteúdo.
- Cartas B01–B16: títulos e decisões já registrados em `src/data/academic-refinements.ts` e `docs/academico/plano_rastreabilidade_interno.md`. O ZIP original do baralho não integra este repositório; não há alegação de nova verificação das cartas.
- [Guia WCAG](https://guia-wcag.com/): nove critérios definidos em `identidadevisual.md`. Componentes semânticos, texto alternativo, cor com informação textual, contraste, reflow, teclado, foco, alvos e instruções são preservados nesta entrega.

As propostas de avaliação são hipóteses, sem métricas coletadas ou resultados comportamentais demonstrados. Os testes técnicos verificam interface e domínio; não comprovam causalidade psicológica, conformidade WCAG completa nem segurança alimentar. As alterações locais preexistentes de planilha, relatório, gerador e apresentações foram preservadas na worktree original e não fazem parte desta entrega.

## Validação executada

- `npm run lint`: aprovado, sem avisos.
- `npx tsc --noEmit`: aprovado.
- `npm run test -- --reporter=dot`: 49 testes aprovados em 10 arquivos.
- `npm run build`: aprovado; 22 páginas geradas, incluindo as 14 URLs de produto.
- `npm run test:e2e -- --reporter=line`: 14 testes aprovados em Chromium, usando o build servido por `npm run start` na porta 3000. O Playwright reutiliza o servidor local pelo mecanismo existente da configuração.
- Verificados: fluxo completo, seleção obrigatória, preço, edição sem duplicação, quantidade, remoção/desfazer, filtros, teclado, cartão de todos os produtos, rota inexistente, navegação pelo rodapé, ampliação de imagem, procedência dos arquivos e persistência de carrinho/pedido após reload.
- Axe: nenhuma violação detectada nas páginas principais e nas novas seções a 320 px, incluindo composição expandida. Nenhuma regra desabilitada.
- Responsividade das novas seções em 320, 375, 430, 768, 1024 e 1440 px, sem overflow; zoom CSS de 200% sem overflow na página acadêmica. As verificações anteriores de home também cobrem 360 e 390 px. Revisão visual de capturas desktop e mobile executada.
- O teste de rota inexistente verifica a UI de `notFound()` e `noindex`: conforme a documentação instalada do Next.js, respostas já iniciadas por streaming podem manter HTTP 200.
- Não foram executados teste com leitor de tela, estudo com participantes ou medição de efeito comportamental. Zoom CSS automatizado não substitui todos os modos de ampliação de navegador/tecnologia assistiva.

## Execução e publicação

`main` foi trabalhada em `.worktrees/bite-main`, preservando a branch e o trabalho não commitado do diretório original. Para continuar localmente, usar essa worktree: `npm install` (se necessário) e `npm run dev`. Não são necessárias variáveis de ambiente. Rodar os checks do README antes de publicar.

O repositório já possui integração Vercel: atualizações verificadas são enviadas por `git push origin main`. Não foi criado projeto adicional nem alterada a configuração de produção. Confirmar a conclusão no status Vercel do commit no GitHub e abrir `/academico/refinamento` e `/produto/frango-grelhado` no domínio público. Esta documentação não substitui a confirmação de um deploy específico.
