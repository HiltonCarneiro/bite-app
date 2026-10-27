export type AcademicStatus = "Sim" | "Parcial" | "Não" | "Pendente de fonte";

export interface AcademicRefinement {
  id: string;
  title: string;
  status: AcademicStatus;
  decision: string;
}

export const biasCardRefinements: AcademicRefinement[] = [
  { id: "B01", title: "Efeito Ancoragem", status: "Sim", decision: "Preço base, acréscimos e total são apresentados sem preço anterior fictício." },
  { id: "B02", title: "Efeito Chamariz", status: "Não", decision: "O Bite não cria uma opção inferior para direcionar a compra de outra." },
  { id: "B03", title: "Efeito Halo", status: "Sim", decision: "Marca, componentes e fotografias locais mantêm uma apresentação consistente, sem endossos inventados." },
  { id: "B04", title: "Efeito Hawthorne", status: "Não", decision: "O protótipo não usa analytics nem observa comportamento. Dados ficam apenas no navegador." },
  { id: "B05", title: "Efeito Holofote", status: "Sim", decision: "A edição é privada, os erros são objetivos e a remoção pode ser desfeita." },
  { id: "B06", title: "Efeito Padrão", status: "Sim", decision: "Personalizações e pagamento começam desmarcados; somente a edição restaura escolhas do próprio usuário." },
  { id: "B07", title: "Efeito Placebo", status: "Não", decision: "Nenhuma alegação de saúde ou benefício subjetivo é criada sem evidência." },
  { id: "B08", title: "Efeito Priming", status: "Parcial", decision: "Imagens e categorias apoiam reconhecimento, mas a ordem e os textos permanecem neutros." },
  { id: "B09", title: "Viés da Contabilidade Mental", status: "Sim", decision: "Base, acréscimos, subtotal, taxa de retirada e total aparecem de forma explícita." },
  { id: "B10", title: "Viés de Confirmação", status: "Sim", decision: "Ingredientes e alergênicos ausentes são identificados como não informados, sem presumir segurança." },
  { id: "B11", title: "Viés de Disponibilidade", status: "Não", decision: "Não há atividade recente, popularidade ou pedidos de outras pessoas sem dados reais." },
  { id: "B12", title: "Viés de Enquadramento", status: "Sim", decision: "Preços e condições usam linguagem factual e estável em todas as etapas." },
  { id: "B13", title: "Viés de Mera Exposição", status: "Sim", decision: "Rótulos e padrões de interação se repetem de forma funcional entre cardápio, produto, carrinho e checkout." },
  { id: "B14", title: "Viés de Prova Social", status: "Não", decision: "Avaliações, contadores e selos foram omitidos porque o protótipo não possui dados reais." },
  { id: "B15", title: "Viés de Saliência", status: "Sim", decision: "Ação principal, total e avisos críticos têm hierarquia e contraste acessíveis." },
  { id: "B16", title: "Viés do Presente", status: "Parcial", decision: "Há feedback imediato real, sem urgência, escassez, contagem regressiva ou promessa de tempo." },
];

export const amazonRefinements: AcademicRefinement[] = [
  { id: "A01", title: "Defaults e consentimento", status: "Sim", decision: "O pedido é único e nenhuma opção paga ou recorrente é pré-selecionada." },
  { id: "A02", title: "Ancoragem de preço", status: "Sim", decision: "A interface mostra a composição verificável do preço, sem âncoras promocionais." },
  { id: "A03", title: "Efeito dotação", status: "Sim", decision: "Não há linguagem de posse ou promessa de entrega antes da confirmação." },
  { id: "A04", title: "Lei de Fitts", status: "Sim", decision: "Alternativas equivalentes mantêm alvos e hierarquia visual equivalentes." },
  { id: "A05", title: "Prova social na frequência", status: "Não", decision: "Não existe recorrência nem dado real que justifique sugerir uma frequência de compra." },
  { id: "A06", title: "Status quo e descontos", status: "Não", decision: "O Bite não usa descontos ou condições comerciais nesta versão." },
  { id: "A07", title: "Efeitos de segunda ordem", status: "Sim", decision: "A experiência evita assinatura e compra recorrente desnecessária." },
  { id: "A08", title: "Gatilhos autoiniciados", status: "Não", decision: "Não há lembrete porque o produto não possui uma necessidade real de recorrência." },
  { id: "A09", title: "Spark Effect", status: "Sim", decision: "Editar, remover e desfazer têm baixo atrito sem favorecer uma alternativa comercial." },
];

export const facebookRefinements: AcademicRefinement[] = [
  {
    id: "F01",
    title: "Insights individuais do caso Facebook Misinformation",
    status: "Pendente de fonte",
    decision: "A página pública forneceu apenas um preview com cadastro. Os slides precisam ser anexados antes de atribuir princípios ao estudo.",
  },
];

