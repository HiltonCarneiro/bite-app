import type { Category, CustomizationGroup, MenuItem } from "@/types";

export const categories: Category[] = [
  { id: "meals", slug: "refeicoes", name: "Refeições", description: "Pratos completos para retirada." },
  { id: "sandwiches", slug: "lanches", name: "Lanches", description: "Sanduíches e hambúrgueres preparados na hora." },
  { id: "pasta", slug: "massas", name: "Massas", description: "Massas com diferentes molhos e complementos." },
  { id: "bowls", slug: "bowls", name: "Bowls", description: "Combinações servidas em tigela." },
];

const drinkGroup = (id: string): CustomizationGroup => ({
  id: `${id}-drink`,
  name: "Bebida",
  description: "Escolha uma bebida. Esta seleção é opcional.",
  required: false,
  selectionMode: "single",
  maxSelections: 1,
  options: [
    { id: `${id}-drink-water`, name: "Água sem gás", priceDelta: 3, available: true },
    { id: `${id}-drink-juice`, name: "Suco de laranja", priceDelta: 7, available: true },
    { id: `${id}-drink-soda`, name: "Refrigerante", priceDelta: 6, available: true },
  ],
});

const dessertGroup = (id: string): CustomizationGroup => ({
  id: `${id}-dessert`,
  name: "Sobremesa",
  description: "Escolha uma sobremesa. Esta seleção é opcional.",
  required: false,
  selectionMode: "single",
  maxSelections: 1,
  options: [
    { id: `${id}-dessert-brownie`, name: "Brownie", priceDelta: 8, available: true },
    { id: `${id}-dessert-pudding`, name: "Pudim", priceDelta: 7, available: true },
    { id: `${id}-dessert-fruit`, name: "Frutas da estação", priceDelta: 6, available: true },
  ],
});

const mealGroups = (id: string): CustomizationGroup[] => [
  {
    id: `${id}-size`, name: "Tamanho", description: "Selecione um tamanho. Campo obrigatório.", required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: `${id}-size-regular`, name: "Regular", description: "Porção individual", priceDelta: 0, available: true },
      { id: `${id}-size-large`, name: "Grande", description: "Porção ampliada", priceDelta: 8, available: true },
    ],
  },
  {
    id: `${id}-side`, name: "Acompanhamento", description: "Selecione um acompanhamento. Campo obrigatório.", required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: `${id}-side-rice`, name: "Arroz", priceDelta: 0, available: true },
      { id: `${id}-side-potato`, name: "Batatas assadas", priceDelta: 4, available: true },
      { id: `${id}-side-vegetables`, name: "Legumes", priceDelta: 3, available: true },
    ],
  },
  drinkGroup(id),
  dessertGroup(id),
];

const sandwichGroups = (id: string): CustomizationGroup[] => [
  {
    id: `${id}-bread`, name: "Pão", description: "Selecione um pão. Campo obrigatório.", required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: `${id}-bread-brioche`, name: "Brioche", priceDelta: 0, available: true },
      { id: `${id}-bread-sesame`, name: "Pão com gergelim", priceDelta: 0, available: true },
      { id: `${id}-bread-ciabatta`, name: "Ciabatta", priceDelta: 3, available: true },
    ],
  },
  {
    id: `${id}-extras`, name: "Complementos", description: "Selecione até 2 complementos. Esta seleção é opcional.", required: false, selectionMode: "multiple", minSelections: 0, maxSelections: 2,
    options: [
      { id: `${id}-extra-cheese`, name: "Queijo", priceDelta: 4, available: true },
      { id: `${id}-extra-onion`, name: "Cebola caramelizada", priceDelta: 3, available: true },
      { id: `${id}-extra-pickle`, name: "Picles", priceDelta: 2, available: true },
    ],
  },
  drinkGroup(id),
  dessertGroup(id),
];

const pastaGroups = (id: string): CustomizationGroup[] => [
  {
    id: `${id}-pasta`, name: "Tipo de massa", description: "Selecione um tipo de massa. Campo obrigatório.", required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: `${id}-pasta-spaghetti`, name: "Espaguete", priceDelta: 0, available: true },
      { id: `${id}-pasta-penne`, name: "Penne", priceDelta: 0, available: true },
      { id: `${id}-pasta-fettuccine`, name: "Fettuccine", priceDelta: 3, available: true },
    ],
  },
  {
    id: `${id}-finish`, name: "Finalização", description: "Selecione de 1 a 2 finalizações. Campo obrigatório.", required: true, selectionMode: "multiple", minSelections: 1, maxSelections: 2,
    options: [
      { id: `${id}-finish-cheese`, name: "Queijo ralado", priceDelta: 3, available: true },
      { id: `${id}-finish-basil`, name: "Manjericão", priceDelta: 2, available: true },
      { id: `${id}-finish-garlic`, name: "Alho crocante", priceDelta: 3, available: true },
    ],
  },
  drinkGroup(id),
  dessertGroup(id),
];

export const menuItems: MenuItem[] = [
  {
    id: "bowl-legumes", slug: "bowl-de-legumes", categoryId: "bowls", name: "Bowl de Legumes",
    description: "Arroz, legumes assados, grão-de-bico e molho de ervas servidos em tigela.", basePrice: 29.9,
    image: "/images/bowl-legumes.svg", imageAlt: "Bowl com arroz, grão-de-bico e legumes coloridos", available: true,
    customizationGroups: mealGroups("bowl-legumes"),
  },
  {
    id: "bowl-carne", slug: "bowl-de-carne", categoryId: "bowls", name: "Bowl de Carne",
    description: "Arroz, tiras de carne, feijão, tomate e molho de ervas servidos em tigela.", basePrice: 34.9,
    image: "/images/bowl-carne.svg", imageAlt: "Bowl com arroz, tiras de carne, feijão e tomate", available: true,
    customizationGroups: mealGroups("bowl-carne"),
  },
  {
    id: "frango-grelhado", slug: "frango-grelhado", categoryId: "meals", name: "Frango Grelhado",
    description: "Filé de frango grelhado com temperos suaves e acompanhamento à escolha.", basePrice: 32.5,
    image: "/images/frango-grelhado.svg", imageAlt: "Filé de frango grelhado com legumes e arroz", available: true,
    customizationGroups: mealGroups("frango-grelhado"),
  },
  {
    id: "peixe-assado", slug: "peixe-assado", categoryId: "meals", name: "Peixe Assado",
    description: "Filé de peixe assado com limão, ervas e acompanhamento à escolha.", basePrice: 38,
    image: "/images/peixe-assado.svg", imageAlt: "Filé de peixe assado com limão e legumes", available: false,
    customizationGroups: mealGroups("peixe-assado"),
  },
  {
    id: "hamburguer-classico", slug: "hamburguer-classico", categoryId: "sandwiches", name: "Hambúrguer Clássico",
    description: "Hambúrguer bovino, queijo, tomate e folhas em pão à escolha.", basePrice: 27.9,
    image: "/images/hamburguer.svg", imageAlt: "Hambúrguer com queijo, tomate e folhas", available: true,
    customizationGroups: sandwichGroups("hamburguer-classico"),
  },
  {
    id: "sanduiche-casa", slug: "sanduiche-da-casa", categoryId: "sandwiches", name: "Sanduíche da Casa",
    description: "Frango desfiado, queijo, tomate e molho de ervas em pão à escolha.", basePrice: 25.5,
    image: "/images/sanduiche.svg", imageAlt: "Sanduíche de frango com queijo e tomate", available: true,
    customizationGroups: sandwichGroups("sanduiche-casa"),
  },
  {
    id: "massa-tomate", slug: "massa-ao-molho-de-tomate", categoryId: "pasta", name: "Massa ao Molho de Tomate",
    description: "Massa e molho de tomates preparados com ervas e finalização à escolha.", basePrice: 28.9,
    image: "/images/massa-tomate.svg", imageAlt: "Massa com molho de tomate, queijo e manjericão", available: true,
    customizationGroups: pastaGroups("massa-tomate"),
  },
  {
    id: "massa-cogumelos", slug: "massa-com-cogumelos", categoryId: "pasta", name: "Massa com Cogumelos",
    description: "Massa com molho cremoso, cogumelos salteados e finalização à escolha.", basePrice: 33.5,
    image: "/images/massa-cogumelos.svg", imageAlt: "Massa com molho cremoso e cogumelos", available: true,
    customizationGroups: pastaGroups("massa-cogumelos"),
  },
];

const categoryOrder = new Map(categories.map((category, index) => [category.id, index]));

export const sortedMenuItems = [...menuItems].sort((a, b) => {
  const categoryDifference = (categoryOrder.get(a.categoryId) ?? 0) - (categoryOrder.get(b.categoryId) ?? 0);
  return categoryDifference || a.name.localeCompare(b.name, "pt-BR");
});

export const findMenuItemBySlug = (slug: string) => menuItems.find((item) => item.slug === slug);
