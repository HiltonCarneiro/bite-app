import { amazonRefinements, biasCardRefinements } from "@/data/academic-refinements";

export { default as evidenceScenes } from "@/data/ux-evidence-scenes.json";
import scenes from "@/data/ux-evidence-scenes.json";

export type EvidenceScene = keyof typeof scenes;

interface CaseDetail {
  scene: EvidenceScene;
  location: string;
  step: string;
  classification: string;
  before: string;
  after: string;
  changes: string[];
  rationale: string;
  hypothesis: string;
  ethics: string;
  validation: string;
}

const details: Record<string, CaseDetail> = {
  B01: {
    scene: "price", location: "ProductCustomizer · resumo de preço", step: "Personalizar → compreender o custo",
    classification: "Viés cognitivo · prevenção de ancoragem enganosa",
    before: "O total da configuração já era recalculado, mas o resumo não separava todos os componentes do custo.",
    after: "Preço base, acréscimos por unidade, quantidade e total aparecem em linhas próprias.",
    changes: ["Decomposição explícita do total.", "Preço inicial permanece factual, sem preço riscado ou desconto inventado."],
    rationale: "Uma referência inicial pode orientar julgamentos posteriores. A base pode funcionar como âncora; revelar os acréscimos ajuda a contextualizá-la, sem afirmar que o viés foi eliminado.",
    hypothesis: "A pessoa poderá explicar melhor por que o total mudou após adicionar queijo.",
    ethics: "Não diminuir visualmente o total nem usar uma referência fictícia para aumentar a percepção de vantagem.",
    validation: "Comparar as versões com a mesma configuração e pedir o valor por unidade e o total de duas unidades. Registrar acertos e tempo de compreensão.",
  },
  B03: {
    scene: "home", location: "Home · Logo e galeria de fotografias locais", step: "Início → formar uma primeira impressão",
    classification: "Viés cognitivo · hipótese sobre percepção visual",
    before: "A baseline já utilizava o logo Bite, Poppins, a paleta oficial e fotografias locais.",
    after: "A identidade permanece consistente. Esta comparação registra continuidade, sem atribuir uma nova mudança à home.",
    changes: ["Identidade visual preservada nas duas versões.", "O estudo explicita que aparência não comprova qualidade do alimento."],
    rationale: "Uma impressão positiva da apresentação pode se estender a atributos não demonstrados, como qualidade ou confiabilidade. O código confirma consistência visual; não confirma que ocorreu Efeito Halo.",
    hypothesis: "A apresentação poderá facilitar o reconhecimento da marca; uma inferência de qualidade é apenas uma possibilidade a investigar.",
    ethics: "Fotografias ilustrativas não validam receita, segurança, endosso ou qualidade de um estabelecimento real.",
    validation: "Após ver cada versão, perguntar quais atributos foram percebidos e quais evidências os sustentam. Distinguir reconhecimento visual de confiança sem fundamento.",
  },
  B05: {
    scene: "cart", location: "CartView · editar, remover e desfazer", step: "Revisar → corrigir uma escolha",
    classification: "Viés cognitivo · relação indireta com usabilidade",
    before: "Editar, remover e desfazer já existiam no carrinho privado, com feedback de inclusão.",
    after: "O refinamento explica que a edição preserva as escolhas da própria pessoa. A reversibilidade já existente permanece.",
    changes: ["Aviso de restauração das escolhas adicionado durante edição.", "Ações de editar e remover continuam disponíveis sem linguagem de julgamento."],
    rationale: "O Efeito Holofote descreve superestimar quanto outras pessoas observam nossas ações. Um carrinho privado e erros objetivos evitam amplificar constrangimento; não demonstram, por si, a presença desse viés.",
    hypothesis: "As pessoas poderão corrigir uma configuração com menos receio de perder o pedido.",
    ethics: "Não inventar observadores, popularidade ou mensagens de culpa. Desfazer deve restaurar exatamente a escolha anterior.",
    validation: "Pedir para editar e remover um item e recuperar a remoção. Observar sucesso, hesitação e percepção de controle, sem coleta automática.",
  },
  B06: {
    scene: "options", location: "ProductCustomizer · fieldsets; CheckoutForm · pagamento", step: "Personalizar → escolher conscientemente",
    classification: "Viés cognitivo · prevenção de default persuasivo",
    before: "As alternativas já começavam desmarcadas e a inclusão incompleta permanecia bloqueada.",
    after: "Um aviso explica a ausência de seleção automática e as instruções explicitam o número permitido de opções.",
    changes: ["Aviso de consentimento antes dos grupos.", "Limites e obrigatoriedade expressos em texto.", "Edição restaura somente escolhas anteriores do usuário."],
    rationale: "Defaults podem ser aceitos por inércia. Aqui a decisão exige uma ação explícita e não favorece um pão ou pagamento. É uma proteção contra o efeito, não um nudge de escolha alimentar.",
    hypothesis: "A pessoa poderá reconhecer que nenhuma opção paga foi incluída sem sua ação.",
    ethics: "A ausência de defaults também pode exigir mais esforço; instruções claras ajudam sem decidir pela pessoa.",
    validation: "Conferir as alternativas antes da primeira interação e pedir para concluir uma configuração. Comparar compreensão dos campos obrigatórios e erros de seleção.",
  },
  B08: {
    scene: "menu", location: "MenuBrowser e ProductCard · categorias, imagens e ordenação", step: "Explorar → reconhecer opções",
    classification: "Priming · aplicação parcial, sem indução intencional",
    before: "Categorias, fotos e ordenação determinística já organizavam o catálogo.",
    after: "A organização permanece. O estudo documenta a exposição visual sem alegar um estímulo comportamental novo.",
    changes: ["Mesma hierarquia entre produtos equivalentes.", "Nenhum selo ou mensagem favorece uma alternativa."],
    rationale: "Exposição prévia a estímulos pode afetar respostas posteriores. Ter fotos não comprova priming; aqui elas dão contexto ao catálogo, com ordem neutra e sem estímulo experimental controlado.",
    hypothesis: "Categorias e imagens poderão ajudar a localizar um item conhecido, sem uma hipótese de aumento de vendas de um prato.",
    ethics: "Evitar imagens ou rótulos que atribuam superioridade moral a uma refeição.",
    validation: "Pedir para encontrar um produto em cada categoria e comparar tempo, erros e entendimento da ordem, mantendo o mesmo catálogo nas versões.",
  },
  B09: {
    scene: "price", location: "ProductCustomizer · custo; CartView e CheckoutForm · totais", step: "Configurar → revisar o orçamento",
    classification: "Viés cognitivo · transparência de custos",
    before: "O produto mostrava o total; o carrinho apresentava subtotal sem linha explícita de taxa de retirada.",
    after: "O resumo distingue base e adicionais. Carrinho e checkout informam taxa de retirada de valor zero e total.",
    changes: ["Custos separados com total visível.", "Taxa de retirada explicitada, sem cobrança real."],
    rationale: "A contabilidade mental separa valores em categorias subjetivas. Exibir parcelas sem esconder a soma busca reduzir uma leitura fragmentada do gasto; não induz a gastar mais em adicionais.",
    hypothesis: "As pessoas poderão distinguir o custo de uma unidade do custo do pedido completo.",
    ethics: "Parcelas devem contextualizar a soma, nunca disfarçar o valor final ou inventar economia.",
    validation: "Perguntar o custo de adicionar queijo e dobrar a quantidade. Comparar acurácia do cálculo e percepção de taxas inesperadas.",
  },
  B10: {
    scene: "information", location: "ProductInformation · abaixo da descrição e do preço inicial", step: "Examinar → conferir composição",
    classification: "Viés cognitivo · integridade informacional",
    before: "Em 7fc2924 não existia o cartão. O refinamento seguinte adicionou campos genéricos de ingredientes e alergênicos não informados.",
    after: "Todos os produtos têm composição ilustrativa ou lacuna específica, alergênicos não confirmados e escopo explícito das personalizações.",
    changes: ["14 produtos cobertos pelo mesmo componente.", "Receita base separada das opções e retiradas.", "A ausência de informação nunca é apresentada como ausência de alergênicos."],
    rationale: "Buscar apenas informação que confirma uma crença pode levar a interpretar uma foto como garantia da receita. Expor limites e incerteza oferece contraponto; isso é transparência, não prova de correção do viés.",
    hypothesis: "A pessoa poderá distinguir os dados ilustrativos de uma composição validada pelo estabelecimento.",
    ethics: "Nenhuma receita é uma orientação de consumo para alérgicos. Retirar ingredientes não garante segurança nem elimina contato cruzado.",
    validation: "Perguntar se seria possível concluir que o prato é seguro para uma alergia e quais dados ainda faltam. Não pedir que ninguém consuma um alimento durante o teste.",
  },
  B12: {
    scene: "checkout", location: "CheckoutForm · resumo e condições de retirada", step: "Checkout → compreender a confirmação",
    classification: "Viés cognitivo · enquadramento factual",
    before: "O formulário já limitava o pedido à retirada e ao pagamento simulado.",
    after: "O texto explicita pedido único sem cobrança recorrente e mostra a taxa de retirada junto ao total.",
    changes: ["Condição de pedido único declarada.", "Valores e condições descritos em linguagem factual."],
    rationale: "O enquadramento altera a interpretação pela forma de apresentar uma informação. O Bite mantém condições estáveis e evita mensagens de ganho ou perda para pressionar a decisão.",
    hypothesis: "O caráter simulado e a ausência de recorrência poderão ser compreendidos antes da confirmação.",
    ethics: "Não esconder limitações em letras pequenas ou prometer entrega e prazo não existentes.",
    validation: "Antes de confirmar, pedir que a pessoa explique retirada, cobrança e recorrência. Comparar interpretações das duas versões.",
  },
  B13: {
    scene: "cart", location: "Componentes compartilhados · navegação, botões e QuantityControl", step: "Produto → carrinho → checkout",
    classification: "Viés cognitivo · consistência de interface",
    before: "Controles de quantidade, navegação e botões já usavam padrões comuns.",
    after: "Os padrões permanecem; novos textos de preço seguem a mesma linguagem. O estudo não apresenta consistência como uma intervenção nova.",
    changes: ["Componentes e rótulos mantidos entre as etapas.", "Resumo de valores ampliado com o mesmo vocabulário."],
    rationale: "A familiaridade pode influenciar preferências pela repetição. Reutilizar controles é também uma prática de usabilidade e não comprova mera exposição a uma marca ou preferência por um prato.",
    hypothesis: "Quem aprendeu a alterar quantidade no produto poderá reconhecer o mesmo controle no carrinho.",
    ethics: "Repetição funcional não deve virar exposição promocional insistente.",
    validation: "Pedir a alteração de quantidade nas duas telas e observar necessidade de reaprendizagem, erros e entendimento dos rótulos.",
  },
  B15: {
    scene: "price", location: "ProductCustomizer · ação, total e instrução de impedimento", step: "Personalizar → adicionar",
    classification: "Viés de atenção · hierarquia e acessibilidade",
    before: "O botão principal, o total e as mensagens de validação já eram destacados.",
    after: "A hierarquia é preservada e inclui a decomposição do custo, instruções e um aviso de escolhas não automáticas.",
    changes: ["Informação crítica próxima da ação.", "Nenhum produto ou alternativa ganha destaque seletivo.", "Texto e controles nativos complementam cor e contraste."],
    rationale: "Elementos salientes atraem atenção. Dar visibilidade à ação e ao total apoia a tarefa; critérios WCAG de contraste e rótulos são requisitos funcionais, não vieses cognitivos.",
    hypothesis: "O motivo do botão indisponível e o total poderão ser localizados com menos busca visual.",
    ethics: "A visibilidade da ação não pode ocultar o custo, as alternativas ou os erros.",
    validation: "Perguntar por que não é possível adicionar antes das escolhas e onde está o total. Repetir com teclado e zoom de 200%.",
  },
  B16: {
    scene: "cart", location: "CartView · feedback real após inclusão e remoção", step: "Adicionar → reconhecer o resultado",
    classification: "Viés do presente · relação parcial com feedback",
    before: "Mensagens de inclusão, remoção e desfazer já respondiam às ações reais.",
    after: "O feedback é preservado junto à explicitação do custo e da reversibilidade. Não foi introduzida urgência.",
    changes: ["Estado do carrinho permanece visível após inclusão.", "Sem contagem regressiva, recompensa ou promessa de rapidez."],
    rationale: "O viés do presente favorece recompensas imediatas. Feedback imediato de uma ação é uma prática de usabilidade; sem um experimento sobre preferências temporais, não demonstra exploração desse viés.",
    hypothesis: "As pessoas poderão confirmar que a inclusão ocorreu sem tentar adicionar novamente.",
    ethics: "Não associar o retorno imediato a pressão para consumir ou concluir rapidamente.",
    validation: "Observar se a pessoa reconhece a inclusão e se tenta repetir a ação por dúvida. Comparar sem introduzir atrasos artificiais no app.",
  },
  A01: {
    scene: "checkout", location: "CheckoutForm · pagamento e aviso de pedido único", step: "Checkout → consentir com o pagamento simulado",
    classification: "Lição Amazon · consentimento, prevenção de defaults",
    before: "Pagamento já começava desmarcado; não existia assinatura.",
    after: "A interface informa explicitamente que não haverá assinatura ou cobrança recorrente.",
    changes: ["Aviso de pedido único antes da confirmação.", "PIX, cartão no balcão e dinheiro seguem sem pré-seleção."],
    rationale: "O estudo Amazon discute assinatura selecionada automaticamente. A adaptação ao Bite é defensiva: tornar a natureza da transação explícita sem adicionar um modelo recorrente.",
    hypothesis: "A pessoa poderá reconhecer que cada pedido é uma simulação independente.",
    ethics: "Consentimento não pode ser presumido; não criar uma assinatura apenas para demonstrar um problema acadêmico.",
    validation: "Perguntar antes de confirmar se haverá cobrança futura e verificar se o método só é selecionado por ação da pessoa.",
  },
  A02: {
    scene: "price", location: "ProductCustomizer · base, acréscimos e total", step: "Personalizar → interpretar o preço",
    classification: "Lição Amazon · prevenção de âncora promocional",
    before: "O total era atualizado sem linhas separadas de base e acréscimos.",
    after: "O cálculo aparece decomposto e sem comparação com valor promocional fictício.",
    changes: ["Parcelas verificáveis ao lado do total.", "Mesma moeda e formatação em todas as etapas."],
    rationale: "O caso Amazon mostra como referências de preço podem influenciar valor percebido. No Bite, a base é contextualizada por todos os acréscimos, com objetivo de transparência.",
    hypothesis: "A diferença entre o preço inicial e o total configurado poderá ser explicada corretamente.",
    ethics: "Não usar preço unitário para diminuir a importância da soma a pagar.",
    validation: "Mostrar a mesma configuração nas versões e pedir para reconstruir o cálculo, sem sugerir a resposta.",
  },
  A03: {
    scene: "checkout", location: "CheckoutForm · retirada; OrderConfirmation · pedido confirmado", step: "Revisar → confirmar",
    classification: "Lição Amazon · prevenção de dotação antecipada",
    before: "O Bite já tratava o pedido como retirada, sem prometer prazo ou posse antecipada.",
    after: "A linguagem factual permanece e a condição de pedido único é explícita. Não há promessa nova de entrega.",
    changes: ["Continuidade da linguagem de retirada.", "Confirmação ocorre somente após envio válido do formulário."],
    rationale: "O estudo relaciona linguagem de entrega antecipada à sensação de posse. Evitar essa promessa no Bite é uma delimitação ética; não é evidência de que o efeito dotação ocorreu.",
    hypothesis: "A pessoa poderá identificar o momento em que o pedido foi efetivamente registrado no histórico local.",
    ethics: "Não anunciar entrega, reserva ou preparo que o protótipo não realiza.",
    validation: "Perguntar em qual etapa o pedido passa a existir e conferir o histórico antes e depois da confirmação.",
  },
  A04: {
    scene: "options", location: "ProductCustomizer e CheckoutForm · alternativas nativas", step: "Escolher → acionar um controle",
    classification: "Lei de Fitts · princípio motor de interação, não viés",
    before: "Alternativas equivalentes já tinham dimensões e hierarquia comuns.",
    after: "O tamanho dos alvos é preservado; instruções de seleção foram reforçadas.",
    changes: ["Mesmo tratamento visual para opções do mesmo grupo.", "Rótulos clicáveis e foco visível mantidos."],
    rationale: "A Lei de Fitts relaciona aquisição de alvos a tamanho e distância. O caso Amazon critica o desequilíbrio entre ações concorrentes; o Bite mantém alvos equivalentes, sem favorecer uma alternativa comercial.",
    hypothesis: "As opções poderão ser acionadas com precisão em celular e por teclado.",
    ethics: "Uma alternativa não deve ser mais difícil de alcançar para direcionar a escolha.",
    validation: "Verificar tamanho, acionamento e foco de cada opção a 320 px e 1440 px; observar erros de toque em uma sessão consentida.",
  },
  A07: {
    scene: "checkout", location: "CheckoutForm · pedido único; persistência local", step: "Confirmar → compreender consequências",
    classification: "Efeitos de segunda ordem · reflexão ética",
    before: "A arquitetura já excluía assinatura, recompra automática e cobrança real.",
    after: "O formulário explicita a ausência de recorrência. A arquitetura local permanece.",
    changes: ["Condição de pedido único tornada visível.", "Sem lembretes de recompra ou pedidos automáticos."],
    rationale: "O caso Amazon discute consequências posteriores de assinaturas. No Bite, considerar essas consequências sustenta a decisão de manter pedidos individuais; não é um viés aplicado nem uma redução de consumo comprovada.",
    hypothesis: "As consequências do ato de confirmar poderão ser compreendidas sem supor compromissos futuros.",
    ethics: "Não alegar economia, redução de desperdício ou impacto ambiental sem medição.",
    validation: "Pedir que a pessoa descreva o que acontece após confirmar, incluindo persistência local e ausência de uma nova cobrança.",
  },
  A09: {
    scene: "cart", location: "CartView · editar, remover e desfazer", step: "Revisar → corrigir sem reiniciar",
    classification: "Spark Effect · analogia de redução de atrito",
    before: "Editar e desfazer já permitiam corrigir o pedido sem recomeçar.",
    after: "As ações são mantidas; a edição explica a restauração de configurações e os totais ficam mais explícitos.",
    changes: ["Reversibilidade preservada.", "Explicação adicional ao editar uma configuração existente."],
    rationale: "O estudo Amazon usa Spark Effect em uma alternativa de lembrete. No Bite não há lembrete: a relação é uma analogia com facilitar ações solicitadas pelo usuário, sem afirmar equivalência experimental.",
    hypothesis: "Uma alteração de configuração poderá ser concluída sem duplicar o item nem perder a quantidade.",
    ethics: "Facilitar a correção e a saída tanto quanto a inclusão; não reduzir atrito apenas para comprar mais.",
    validation: "Pedir para trocar o pão, salvar e remover. Conferir quantidade, ausência de duplicatas e restauração pelo desfazer.",
  },
};

export const uxCaseStudies = [...biasCardRefinements, ...amazonRefinements]
  .filter((item) => item.status === "Sim" || item.status === "Parcial")
  .map((item) => ({ ...item, ...details[item.id], source: item.id.startsWith("A") ? "amazon" as const : "baralho" as const }));

export const unappliedRefinements = [...biasCardRefinements, ...amazonRefinements].filter((item) => item.status === "Não");
