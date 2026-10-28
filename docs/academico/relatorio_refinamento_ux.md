# Relatório de refinamento de UX — Bite

**Equipe:** Hilton Carneiro, Jamilly Santos, Hugo Vinicius e João Batista  
**Entrega:** 4 de novembro de 2026  
**Versão analisada:** baseline funcional sem nudges

## Objetivo

Refinar o protótipo navegável do Bite a partir das 16 cartas de vieses cognitivos e dos insights verificáveis dos casos da Growth.Design, sem transformar o estudo em justificativa para dark patterns. A aplicação continua neutra: não há recomendação, urgência, escassez, prova social, opção paga pré-selecionada, assinatura ou rastreamento comportamental.

## Resultado do baralho

As 16 cartas foram analisadas individualmente: **9 Sim**, **2 Parcial** e **5 Não**. “Sim” inclui usos defensivos, como tornar custos e estados mais claros. “Parcial” identifica um princípio inevitável na interface, mas controlado para não direcionar uma alternativa. “Não” registra decisões conscientes de não aplicar técnicas incompatíveis com a baseline ou sem evidência real.

Mudanças verificáveis incluem decomposição de preço, aviso de ausência de seleção automática, informação explícita sobre ingredientes e alergênicos não disponíveis, igualdade visual entre alternativas, pedido único sem cobrança recorrente e feedback de edição/remoção sem constrangimento.

## Resultado dos casos Growth.Design

O caso **Amazon Purchase UX** foi desdobrado em nove insights: **6 Sim** e **3 Não**. A principal resposta foi evitar defaults de assinatura, âncoras promocionais, frequência social inventada e condições de desconto, mantendo o custo total e o consentimento explícitos.

O caso **Facebook Misinformation** permanece com **1 linha “Pendente de fonte”**. A página pública consultada exibiu somente cadastro e imagem de preview; os slides não foram atribuídos ou resumidos sem acesso ao conteúdo original. Quando uma cópia legível for fornecida, essa linha deve ser substituída por uma linha para cada insight individual.

Fontes consultadas:

- [Growth.Design — Amazon Purchase UX](https://growth.design/case-studies/amazon-purchase-ux)
- [Growth.Design — Facebook Misinformation](https://growth.design/case-studies/facebook-misinformation)
- `baralho de viéses.zip`, fornecido pela disciplina, com 16 cartas

## Evidências

- Baseline: `docs/academico/evidencias/baseline/`
- Depois do refinamento: `docs/academico/evidencias/depois/`
- Demonstração navegável: `/academico/refinamento`
- Matriz principal: `docs/academico/matriz_vieses_growth_bite.xlsx`
- Plano anterior às alterações: `docs/academico/plano_rastreabilidade_interno.md`

## Validação técnica

- Testes unitários e de componentes: 28 aprovados.
- Testes E2E, teclado, responsividade e axe: 10 aprovados.
- Build de produção do Next.js: aprovado.
- ESLint do código do aplicativo, testes e scripts desta entrega: aprovado.
- O comando global `npm run lint` falha porque trata como erro um aviso preexistente em `presentation/generate-presentation.mjs` (variável não usada), arquivo não pertencente a esta entrega e preservado sem alteração.

## Limitação real

A única lacuna de conteúdo é o detalhamento do caso Facebook. Ela está visível no protótipo e na planilha, com fonte e próximo passo, para evitar uma falsa alegação de cobertura acadêmica.

