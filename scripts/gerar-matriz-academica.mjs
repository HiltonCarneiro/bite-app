import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = path.resolve("docs/academico/matriz_vieses_growth_bite.xlsx");
const previewDir = path.resolve(".artifact-work/previews");

const AMAZON_SOURCE = "https://growth.design/case-studies/amazon-purchase-ux";
const FACEBOOK_SOURCE = "https://growth.design/case-studies/facebook-misinformation";
const CARD_SOURCE = "baralho de viéses.zip (16 cartas fornecidas pela disciplina)";

const rows = [
  ["B01", "Baralho de vieses", "Efeito Ancoragem", "A primeira referência influencia a avaliação de valor.", "Sim", "Mostra preço base, acréscimos e total sem preço anterior fictício.", "/produto/[slug]; /carrinho; /checkout", "src/components/menu/product-customizer.tsx; docs/academico/evidencias/depois/03-produto-desktop.png", "Aplicação defensiva: transparência reduz ancoragem promocional.", CARD_SOURCE, "Baseline refinada", "Base + acréscimos × quantidade devem resultar no total exibido.", "Sem desconto ou preço riscado."],
  ["B02", "Baralho de vieses", "Efeito Chamariz", "Uma alternativa inferior pode deslocar a escolha para outra.", "Não", "Alternativas equivalentes mantêm tamanho, tipografia e cor equivalentes.", "/produto/[slug]; /checkout", "src/components/menu/product-customizer.tsx; src/components/checkout/checkout-form.tsx", "Criar chamariz violaria a neutralidade exigida para a baseline.", CARD_SOURCE, "Baseline refinada", "Comparar visualmente opções não selecionadas; nenhuma deve ter destaque seletivo.", "Rejeitado por limite ético."],
  ["B03", "Baralho de vieses", "Efeito Halo", "A percepção positiva de um atributo pode contaminar a avaliação do conjunto.", "Sim", "Usa marca, componentes e fotografias locais consistentes, sem endosso inventado.", "/; /cardapio", "public/brand/bite-logo.png; public/images/menu/SOURCES.md", "Aplicação limitada à coerência visual, não à alegação de qualidade.", CARD_SOURCE, "Baseline refinada", "Imagens locais carregam com alt adequado e sem selo de terceiros.", "Uso responsável de consistência."],
  ["B04", "Baralho de vieses", "Efeito Hawthorne", "Pessoas podem mudar o comportamento quando sabem que são observadas.", "Não", "Não há analytics, gravação de sessão ou coleta comportamental.", "Aplicação inteira", "README.md; busca no código por scripts de tracking", "A disciplina exige baseline sem coleta de comportamento.", CARD_SOURCE, "Baseline refinada", "O app deve funcionar sem cookies ou serviços analíticos.", "Dados ficam no navegador."],
  ["B05", "Baralho de vieses", "Efeito Holofote", "Tendemos a superestimar quanto os outros percebem nossas ações.", "Sim", "Edição é privada; erros são objetivos; remoção oferece desfazer sem constrangimento.", "/carrinho", "src/components/cart/cart-view.tsx; e2e/order-flow.spec.ts", "A aplicação reduz exposição percebida em vez de explorá-la.", CARD_SOURCE, "Baseline refinada", "Editar e remover devem funcionar sem mensagem moralizante.", "Feedback de interação, não persuasão."],
  ["B06", "Baralho de vieses", "Efeito Padrão", "Opções predefinidas tendem a ser mantidas por esforço ou incerteza.", "Sim", "Personalizações e pagamento começam desmarcados; edição restaura apenas a escolha anterior do usuário.", "/produto/[slug]; /checkout", "src/components/menu/product-customizer.tsx; src/components/checkout/checkout-form.tsx", "Aplicação defensiva contra consentimento presumido.", CARD_SOURCE, "Baseline refinada", "Botão de adicionar fica indisponível até escolhas obrigatórias; pagamento inicia vazio.", "Edição preserva escolha própria."],
  ["B07", "Baralho de vieses", "Efeito Placebo", "Expectativas podem alterar percepção sem efeito ativo comprovado.", "Não", "Não cria alegações de saúde, desempenho ou benefício subjetivo.", "/cardapio; /produto/[slug]", "src/data/menu.ts; src/app/produto/[slug]/page.tsx", "Não há evidência para promessas; aplicá-lo seria enganoso.", CARD_SOURCE, "Baseline refinada", "Textos do catálogo não podem usar classificações moralizantes ou alegações sem fonte.", "Rejeitado por integridade informacional."],
  ["B08", "Baralho de vieses", "Efeito Priming", "Contextos recentes podem preparar associações e influenciar decisões.", "Parcial", "Imagens e categorias apoiam reconhecimento, enquanto ordem e textos permanecem neutros.", "/; /cardapio", "src/data/menu.ts; src/components/menu/menu-browser.tsx", "Elementos visuais são necessários, mas não são usados para preparar uma escolha específica.", CARD_SOURCE, "Baseline refinada", "Itens devem seguir ordenação determinística e nenhum prato deve ser promovido.", "Contemplado somente como risco controlado."],
  ["B09", "Baralho de vieses", "Viés da Contabilidade Mental", "Separar valores em contas mentais pode distorcer a percepção do gasto total.", "Sim", "Explicita base, acréscimos, subtotal, taxa de retirada e total.", "/produto/[slug]; /carrinho; /checkout", "docs/academico/evidencias/depois/03-produto-desktop.png; docs/academico/evidencias/depois/05-checkout-desktop.png", "A decomposição é acompanhada do total para evitar fragmentação enganosa.", CARD_SOURCE, "Baseline refinada", "Subtotal + taxa de retirada deve ser igual ao total.", "Taxa atual: R$ 0,00."],
  ["B10", "Baralho de vieses", "Viés de Confirmação", "Buscamos informações que reforçam crenças prévias.", "Sim", "Declara ingredientes e alergênicos como não informados, sem inferir segurança.", "/produto/[slug]", "src/app/produto/[slug]/page.tsx; e2e/order-flow.spec.ts", "Evita confirmar expectativas sobre composição com dados inexistentes.", CARD_SOURCE, "Baseline refinada", "Página deve orientar confirmação da composição em caso de alergia.", "Informação ausente fica explícita."],
  ["B11", "Baralho de vieses", "Viés de Disponibilidade", "Exemplos recentes ou vívidos parecem mais frequentes ou importantes.", "Não", "Não exibe atividade recente, popularidade ou pedidos de outras pessoas.", "Aplicação inteira", "src/data/menu.ts; src/data/academic-refinements.ts", "Sem dados reais, exemplos recentes seriam fabricados e persuasivos.", CARD_SOURCE, "Baseline refinada", "Busca textual não deve encontrar rótulos como ‘mais pedido’ ou ‘popular’.", "Rejeitado por ausência de dados."],
  ["B12", "Baralho de vieses", "Viés de Enquadramento", "A forma de apresentar o mesmo fato altera a reação.", "Sim", "Mantém preços e condições em linguagem factual e estável em todas as etapas.", "/produto/[slug]; /carrinho; /checkout", "src/components/menu/product-customizer.tsx; src/components/cart/cart-view.tsx", "Enquadramento é tratado como requisito de consistência, sem ganho/perda persuasivo.", CARD_SOURCE, "Baseline refinada", "Condições de pedido e preço devem ser equivalentes em todas as etapas.", "Aplicação defensiva."],
  ["B13", "Baralho de vieses", "Viés de Mera Exposição", "Familiaridade repetida pode aumentar aceitação.", "Sim", "Repete rótulos e padrões de interação de forma funcional entre as etapas.", "Cardápio → produto → carrinho → checkout", "src/components/layout/site-header.tsx; e2e/order-flow.spec.ts", "A repetição promove previsibilidade, não um item comercial específico.", CARD_SOURCE, "Baseline refinada", "Navegação e ações equivalentes devem conservar nome e comportamento.", "Consistência de usabilidade."],
  ["B14", "Baralho de vieses", "Viés de Prova Social", "Comportamentos e avaliações de outras pessoas influenciam escolhas.", "Não", "Avaliações, contadores e selos foram omitidos.", "Aplicação inteira", "src/data/menu.ts; src/data/academic-refinements.ts", "O protótipo não possui avaliações ou dados reais de uso.", CARD_SOURCE, "Baseline refinada", "Nenhuma tela deve alegar popularidade, recomendação ou porcentagem de usuários.", "Rejeitado por ausência de dados."],
  ["B15", "Baralho de vieses", "Viés de Saliência", "Informações visualmente notáveis recebem mais atenção.", "Sim", "Ação principal, total e avisos críticos têm hierarquia, texto e contraste acessíveis.", "Aplicação inteira", "src/app/globals.css; e2e/accessibility.spec.ts", "Saliência é usada para orientação e segurança, sem esconder alternativas.", CARD_SOURCE, "Baseline refinada", "Axe sem violações; foco visível; estado não depende somente de cor.", "Suporta WCAG 1.4.1, 1.4.3 e 2.4.7."],
  ["B16", "Baralho de vieses", "Viés do Presente", "Recompensas imediatas podem superar consequências futuras.", "Parcial", "Fornece feedback imediato real, sem urgência, escassez ou promessa de tempo.", "/carrinho; /pedido/[id]/confirmado", "src/components/cart/cart-view.tsx; src/components/orders/order-confirmation.tsx", "Feedback é necessário à usabilidade; exploração de imediatismo foi rejeitada.", CARD_SOURCE, "Baseline refinada", "Não deve existir contagem regressiva, prazo artificial ou mensagem de urgência.", "Contemplado apenas como feedback legítimo."],
  ["A01", "Growth.Design — Amazon Purchase UX", "Defaults e consentimento", "O caso mostra assinatura predefinida e consentimento pouco informado.", "Sim", "Pedido é explicitamente único e nenhuma opção paga ou recorrente é pré-selecionada.", "/produto/[slug]; /checkout; confirmação", "src/components/checkout/checkout-form.tsx; docs/academico/evidencias/depois/05-checkout-desktop.png", "Evita o dark pattern observado no caso.", AMAZON_SOURCE, "Baseline refinada", "Checkout deve informar ausência de assinatura e cobrança recorrente.", "Insight individual A01."],
  ["A02", "Growth.Design — Amazon Purchase UX", "Ancoragem na apresentação de preço", "Preço por unidade pode deslocar atenção do custo total.", "Sim", "Apresenta composição e total verificáveis sem âncora promocional.", "/produto/[slug]; /carrinho; /checkout", "src/domain/cart.ts; src/domain/cart.test.ts", "O total recebe igual ou maior clareza que parcelas do preço.", AMAZON_SOURCE, "Baseline refinada", "Testes de cálculo devem validar base, acréscimos, quantidade e subtotal.", "Insight individual A02."],
  ["A03", "Growth.Design — Amazon Purchase UX", "Efeito dotação", "Linguagem como ‘receba terça’ pode antecipar sensação de posse.", "Sim", "Não promete posse, horário ou entrega antes da confirmação; retirada é informada factualmente.", "/checkout; confirmação", "src/components/checkout/checkout-form.tsx; src/components/orders/order-confirmation.tsx", "Remove antecipação persuasiva e conserva instrução operacional.", AMAZON_SOURCE, "Baseline refinada", "Antes de confirmar, a interface deve falar em simulação e retirada, não posse.", "Insight individual A03."],
  ["A04", "Growth.Design — Amazon Purchase UX", "Lei de Fitts e destaque desproporcional", "Tamanho e distância dos alvos podem favorecer uma alternativa.", "Sim", "Alternativas equivalentes têm alvos e hierarquia visual equivalentes.", "/produto/[slug]; /checkout", "src/components/menu/product-customizer.tsx; e2e/responsive.spec.ts", "Usa a Lei de Fitts para acessibilidade, não para direcionamento comercial.", AMAZON_SOURCE, "Baseline refinada", "Alvos críticos devem atender 24×24 px e alternativas não selecionadas devem ser equivalentes.", "Insight individual A04."],
  ["A05", "Growth.Design — Amazon Purchase UX", "Prova social na frequência", "O caso questiona uma frequência ‘mais comum’ sem base adequada.", "Não", "Não sugere frequência, assinatura ou comportamento de outras pessoas.", "Aplicação inteira", "src/data/academic-refinements.ts", "Não existe recorrência nem dado real que justifique a sugestão.", AMAZON_SOURCE, "Baseline refinada", "Nenhuma tela deve recomendar frequência de compra.", "Insight individual A05; rejeitado."],
  ["A06", "Growth.Design — Amazon Purchase UX", "Status quo e condições de desconto", "Descontos podem incentivar manutenção do estado padrão e ocultar condições.", "Não", "Não há desconto, assinatura ou condição comercial nesta versão.", "Aplicação inteira", "src/data/menu.ts; carrinho; checkout", "Adicionar desconto ampliaria o escopo e criaria incentivo persuasivo.", AMAZON_SOURCE, "Baseline refinada", "Preços devem permanecer estáveis e sem condição promocional.", "Insight individual A06; rejeitado."],
  ["A07", "Growth.Design — Amazon Purchase UX", "Efeitos de segunda ordem", "Decisões recorrentes podem gerar sobreconsumo e impactos logísticos.", "Sim", "A experiência evita assinatura e compra recorrente desnecessária.", "/checkout; confirmação", "src/components/checkout/checkout-form.tsx; src/components/orders/order-confirmation.tsx", "A solução considera consequências posteriores da decisão atual.", AMAZON_SOURCE, "Baseline refinada", "Pedido confirmado deve ser único e não criar recorrência futura.", "Insight individual A07."],
  ["A08", "Growth.Design — Amazon Purchase UX", "Gatilhos autoiniciados", "Lembretes escolhidos pelo usuário podem ser alternativa ética à recorrência.", "Não", "Não cria lembrete porque refeições do protótipo não têm necessidade real de recorrência.", "Aplicação inteira", "src/data/academic-refinements.ts", "Notificação ampliaria escopo e retenção sem benefício necessário.", AMAZON_SOURCE, "Baseline refinada", "O app deve funcionar sem permissão de notificação ou lembrete.", "Insight individual A08; rejeitado."],
  ["A09", "Growth.Design — Amazon Purchase UX", "Spark Effect", "Reduzir esforço pode facilitar uma ação simples e desejada.", "Sim", "Editar, remover e desfazer têm baixo atrito sem favorecer alternativa comercial.", "/carrinho", "src/components/cart/cart-view.tsx; e2e/order-flow.spec.ts", "A facilidade é distribuída entre ações do usuário, inclusive desfazer.", AMAZON_SOURCE, "Baseline refinada", "Fluxo E2E deve editar, alterar quantidade, remover e desfazer.", "Insight individual A09."],
  ["F01", "Growth.Design — Facebook Misinformation", "Insights individuais do caso", "A página pública exibiu apenas cadastro e imagem de preview; os slides não ficaram acessíveis.", "Pendente de fonte", "Nenhum princípio foi atribuído ao caso sem acesso ao conteúdo original.", "/academico/refinamento", "src/app/academico/refinamento/page.tsx; docs/academico/evidencias/depois/10-refinamento-academico.png", "É necessário anexar os slides ou uma cópia legível para desdobrar uma linha por insight.", FACEBOOK_SOURCE, "Baseline refinada", "Substituir esta linha por insights individuais somente após conferir a fonte original.", "Limitação real, registrada sem inferência."],
];

if (rows.length !== 26) throw new Error(`Esperadas 26 linhas, encontradas ${rows.length}.`);
if (rows.filter((row) => row[0].startsWith("B")).length !== 16) throw new Error("O baralho deve ter exatamente 16 cartas.");

const workbook = Workbook.create();
const summary = workbook.worksheets.add("Resumo");
const matrix = workbook.worksheets.add("Matriz");
const font = "Arial";
const dark = "#2E1F17";
const cream = "#F7F4EE";
const orange = "#C95000";
const lightOrange = "#FBE7D6";
const green = "#2E7D32";
const lightGreen = "#E8F5E9";
const red = "#E63946";
const lightRed = "#FDEBEC";
const gray = "#6B625E";
const line = "#D8D0C9";

for (const sheet of [summary, matrix]) {
  sheet.showGridLines = false;
  sheet.getRange("A1:M40").format.font = { name: font, size: 10, color: dark };
}

summary.tabColor = dark;
summary.getRange("A2:F2").merge();
summary.getRange("A2").values = [["Matriz de vieses e insights — Bite"]];
summary.getRange("A2:F2").format = { font: { name: font, size: 16, bold: true, color: dark }, verticalAlignment: "center" };
summary.getRange("A3:F3").merge();
summary.getRange("A3").values = [["Rastreabilidade acadêmica do refinamento responsável de UX • 27/10/2026"]];
summary.getRange("A3:F3").format = { font: { name: font, size: 10, italic: true, color: gray }, borders: { bottom: { style: "thin", color: orange } } };
summary.getRange("A5:B5").values = [["Cobertura", "Quantidade"]];
summary.getRange("D5:E5").values = [["Status", "Quantidade"]];
summary.getRange("A6:A9").values = [["Total de linhas"], ["Cartas do baralho"], ["Insights Amazon"], ["Caso Facebook pendente"]];
summary.getRange("B6:B9").formulas = [["=COUNTA(Matriz!$A$5:$A$30)"], ["=COUNTIF(Matriz!$B$5:$B$30,\"Baralho de vieses\")"], ["=COUNTIF(Matriz!$B$5:$B$30,\"Growth.Design — Amazon Purchase UX\")"], ["=COUNTIF(Matriz!$E$5:$E$30,\"Pendente de fonte\")"]];
summary.getRange("D6:D9").values = [["Sim"], ["Parcial"], ["Não"], ["Pendente de fonte"]];
summary.getRange("E6:E9").formulas = [["=COUNTIF(Matriz!$E$5:$E$30,\"Sim\")"], ["=COUNTIF(Matriz!$E$5:$E$30,\"Parcial\")"], ["=COUNTIF(Matriz!$E$5:$E$30,\"Não\")"], ["=COUNTIF(Matriz!$E$5:$E$30,\"Pendente de fonte\")"]];
summary.getRange("A5:B5").format = summary.getRange("D5:E5").format = { fill: dark, font: { name: font, size: 10, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "inside", style: "thin", color: "#FFFFFF" } };
summary.getRange("A6:B9").format = summary.getRange("D6:E9").format = { fill: cream, borders: { preset: "outside", style: "thin", color: line }, verticalAlignment: "center" };
summary.getRange("B6:B9").format.horizontalAlignment = "right";
summary.getRange("E6:E9").format.horizontalAlignment = "right";
summary.getRange("D6").format = { fill: lightGreen, font: { name: font, size: 10, bold: true, color: green } };
summary.getRange("D7").format = { fill: lightOrange, font: { name: font, size: 10, bold: true, color: orange } };
summary.getRange("D8").format = { fill: cream, font: { name: font, size: 10, bold: true, color: dark } };
summary.getRange("D9").format = { fill: lightRed, font: { name: font, size: 10, bold: true, color: red } };
summary.getRange("A11:F11").merge();
summary.getRange("A11").values = [["Leitura dos resultados"]];
summary.getRange("A11:F11").format = { fill: dark, font: { name: font, size: 10, bold: true, color: "#FFFFFF" } };
summary.getRange("A12:F15").merge(true);
summary.getRange("A12:A15").values = [["• As 16 cartas foram analisadas individualmente: 9 Sim, 2 Parcial e 5 Não."], ["• O caso Amazon foi desdobrado em 9 insights: 6 Sim e 3 Não."], ["• O caso Facebook permanece com 1 linha pendente porque os slides não estavam acessíveis na página pública."], ["• ‘Não’ e ‘Parcial’ são decisões válidas quando preservam a baseline neutra e evitam dark patterns."]];
summary.getRange("A12:F15").format = { fill: "#FFFFFF", font: { name: font, size: 10, color: dark }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: line } };
summary.getRange("A17:F17").merge();
summary.getRange("A17").values = [["Fontes verificadas"]];
summary.getRange("A17:F17").format = { fill: dark, font: { name: font, size: 10, bold: true, color: "#FFFFFF" } };
summary.getRange("A18:F20").merge(true);
summary.getRange("A18:A20").values = [[CARD_SOURCE], [AMAZON_SOURCE], [FACEBOOK_SOURCE]];
summary.getRange("A18:F20").format = { fill: cream, font: { name: font, size: 10, color: dark }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: line } };
summary.getRange("A2:F20").format.rowHeight = 22;
summary.getRange("A2:F2").format.rowHeight = 30;
summary.getRange("A12:F15").format.rowHeight = 28;
summary.getRange("A:A").format.columnWidth = 31;
summary.getRange("B:B").format.columnWidth = 12;
summary.getRange("C:C").format.columnWidth = 3;
summary.getRange("D:D").format.columnWidth = 24;
summary.getRange("E:E").format.columnWidth = 12;
summary.getRange("F:F").format.columnWidth = 12;

const headers = ["ID", "Origem", "Carta / insight", "Explicação resumida", "Contemplado?", "Como foi aplicado no Bite", "Tela / rota / componente", "Evidência", "Motivo se não contemplado / limite ético", "Fonte", "Versão", "Teste de aceite", "Observação"];
matrix.getRange("A2:M2").merge();
matrix.getRange("A2").values = [["Matriz detalhada de rastreabilidade"]];
matrix.getRange("A2:M2").format = { font: { name: font, size: 16, bold: true, color: dark }, borders: { bottom: { style: "thin", color: orange } } };
matrix.getRange("A3:M3").merge();
matrix.getRange("A3").values = [["Uma linha por carta ou insight verificado. Use os filtros da linha 4 para revisar origem, status e decisão ética."]];
matrix.getRange("A3:M3").format = { font: { name: font, size: 10, italic: true, color: gray } };
matrix.getRange("A4:M4").values = [headers];
matrix.getRange("A5:M30").values = rows;
matrix.getRange("A4:M4").format = { fill: dark, font: { name: font, size: 10, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true, borders: { preset: "inside", style: "thin", color: "#FFFFFF" } };
matrix.getRange("A5:M30").format = { font: { name: font, size: 10, color: dark }, verticalAlignment: "top", wrapText: true, borders: { insideHorizontal: { style: "thin", color: line }, bottom: { style: "thin", color: line } } };
matrix.getRange("A5:A30").format.horizontalAlignment = "center";
matrix.getRange("E5:E30").format.horizontalAlignment = "center";
matrix.getRange("K5:K30").format.horizontalAlignment = "center";
matrix.getRange("E5:E30").dataValidation = { rule: { type: "list", values: ["Sim", "Parcial", "Não", "Pendente de fonte"] } };
matrix.getRange("E5:E30").conditionalFormats.add("containsText", { text: "Sim", format: { fill: lightGreen, font: { bold: true, color: green } } });
matrix.getRange("E5:E30").conditionalFormats.add("containsText", { text: "Parcial", format: { fill: lightOrange, font: { bold: true, color: orange } } });
matrix.getRange("E5:E30").conditionalFormats.add("containsText", { text: "Não", format: { fill: cream, font: { bold: true, color: dark } } });
matrix.getRange("E5:E30").conditionalFormats.add("containsText", { text: "Pendente de fonte", format: { fill: lightRed, font: { bold: true, color: red } } });
matrix.tables.add("A4:M30", true, "MatrizRefinamento").style = "TableStyleMedium2";
matrix.freezePanes.freezeRows(4);
matrix.freezePanes.freezeColumns(1);
const widths = [8, 30, 28, 42, 18, 48, 34, 55, 48, 52, 18, 48, 34];
widths.forEach((width, index) => { matrix.getRangeByIndexes(0, index, 31, 1).format.columnWidth = width; });
matrix.getRange("4:4").format.rowHeight = 42;
matrix.getRange("5:30").format.rowHeight = 82;

workbook.recalculate();

const summaryInspection = await workbook.inspect({ kind: "region", sheetId: "Resumo", range: "A1:F20", maxChars: 7000 });
const matrixInspection = await workbook.inspect({ kind: "region", sheetId: "Matriz", range: "A1:M30", maxChars: 12000, tableMaxRows: 30, tableMaxCols: 13, tableMaxCellChars: 80 });
console.log(summaryInspection.ndjson);
console.log(matrixInspection.ndjson);

await fs.mkdir(previewDir, { recursive: true });
for (const sheetName of ["Resumo", "Matriz"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: sheetName === "Matriz" ? 0.6 : 1, format: "png" });
  await fs.writeFile(path.join(previewDir, `${sheetName.toLowerCase()}.png`), new Uint8Array(await preview.arrayBuffer()));
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

const imported = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const importedMatrix = imported.worksheets.getItem("Matriz");
const importedRows = importedMatrix.getRange("A5:M30").values;
const statuses = importedRows.map((row) => row[4]);
const expected = { Sim: 15, Parcial: 2, "Não": 8, "Pendente de fonte": 1 };
for (const [status, count] of Object.entries(expected)) {
  const actual = statuses.filter((value) => value === status).length;
  if (actual !== count) throw new Error(`Status ${status}: esperado ${count}, encontrado ${actual}.`);
}
const serialized = JSON.stringify(importedRows);
for (const token of ["#REF!", "#DIV/0!", "#VALUE!", "#NAME?", "#N/A"]) {
  if (serialized.includes(token)) throw new Error(`Erro de fórmula detectado: ${token}`);
}
console.log(`Arquivo validado: ${outputPath}`);
console.log(`Linhas: ${importedRows.length}; status: ${JSON.stringify(expected)}`);

