import type { Category, CustomizationGroup, MenuItem } from "@/types";

export const categories: Category[] = [
  { id: "meals", slug: "refeicoes", name: "Refeições", description: "Pratos servidos com acompanhamentos à escolha." },
  { id: "sandwiches", slug: "lanches", name: "Lanches", description: "Sanduíches e hambúrgueres preparados na hora." },
  { id: "pasta", slug: "massas", name: "Massas", description: "Massas com molhos e finalizações variadas." },
  { id: "bowls", slug: "bowls", name: "Bowls", description: "Combinações de arroz, legumes e proteínas em tigela." },
  { id: "drinks", slug: "bebidas", name: "Bebidas", description: "Bebidas geladas em porções individuais." },
  { id: "desserts", slug: "sobremesas", name: "Sobremesas", description: "Porções individuais para retirada." },
];

const bowlVegetablesGroups: CustomizationGroup[] = [
  {
    id: "bowl-legumes-base", name: "Escolha a base", description: "Selecione uma base. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "bowl-legumes-base-branco", name: "Arroz branco", priceDelta: 0, available: true },
      { id: "bowl-legumes-base-integral", name: "Arroz integral", priceDelta: 1.5, available: true },
      { id: "bowl-legumes-base-quinoa", name: "Quinoa", priceDelta: 4, available: true },
    ],
  },
  {
    id: "bowl-legumes-molho", name: "Escolha o molho", description: "Selecione até um molho. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "bowl-legumes-molho-ervas", name: "Molho de ervas", priceDelta: 0, available: true },
      { id: "bowl-legumes-molho-tahine", name: "Tahine", priceDelta: 2, available: true },
      { id: "bowl-legumes-molho-mostarda-mel", name: "Mostarda e mel", priceDelta: 2, available: true },
    ],
  },
  {
    id: "bowl-legumes-adicionais", name: "Adicionais", description: "Selecione até três adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "bowl-legumes-extra-abacate", name: "Abacate", priceDelta: 5, available: true },
      { id: "bowl-legumes-extra-grao-bico", name: "Grão-de-bico extra", priceDelta: 4, available: true },
      { id: "bowl-legumes-extra-legumes", name: "Legumes extra", priceDelta: 4, available: true },
    ],
  },
  {
    id: "bowl-legumes-retirar", name: "Retirar ingredientes", description: "Marque apenas os ingredientes que deseja retirar. O preço não é alterado.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "bowl-legumes-sem-grao-bico", name: "Sem grão-de-bico", priceDelta: 0, available: true },
      { id: "bowl-legumes-sem-tomate", name: "Sem tomate", priceDelta: 0, available: true },
      { id: "bowl-legumes-sem-folhas", name: "Sem folhas", priceDelta: 0, available: true },
    ],
  },
];

const bowlBeefGroups: CustomizationGroup[] = [
  {
    id: "bowl-carne-base", name: "Escolha a base", description: "Selecione uma base. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "bowl-carne-base-branco", name: "Arroz branco", priceDelta: 0, available: true },
      { id: "bowl-carne-base-integral", name: "Arroz integral", priceDelta: 1.5, available: true },
      { id: "bowl-carne-base-quinoa", name: "Quinoa", priceDelta: 4, available: true },
    ],
  },
  {
    id: "bowl-carne-molho", name: "Escolha o molho", description: "Selecione até um molho. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "bowl-carne-molho-ervas", name: "Molho de ervas", priceDelta: 0, available: true },
      { id: "bowl-carne-molho-chimichurri", name: "Chimichurri", priceDelta: 2, available: true },
      { id: "bowl-carne-molho-barbecue", name: "Barbecue", priceDelta: 2, available: true },
    ],
  },
  {
    id: "bowl-carne-adicionais", name: "Adicionais", description: "Selecione até três adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "bowl-carne-extra-carne", name: "Carne extra", priceDelta: 9, available: true },
      { id: "bowl-carne-extra-queijo", name: "Queijo", priceDelta: 4, available: true },
      { id: "bowl-carne-extra-cebola", name: "Cebola caramelizada", priceDelta: 3, available: true },
    ],
  },
  {
    id: "bowl-carne-retirar", name: "Retirar ingredientes", description: "Marque apenas os ingredientes que deseja retirar. O preço não é alterado.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "bowl-carne-sem-feijao", name: "Sem feijão", priceDelta: 0, available: true },
      { id: "bowl-carne-sem-tomate", name: "Sem tomate", priceDelta: 0, available: true },
      { id: "bowl-carne-sem-molho", name: "Sem molho de ervas", priceDelta: 0, available: true },
    ],
  },
];

const grilledChickenGroups: CustomizationGroup[] = [
  {
    id: "frango-grelhado-acompanhamentos", name: "Escolha os acompanhamentos", description: "Selecione um ou dois acompanhamentos. Campo obrigatório.",
    required: true, selectionMode: "multiple", minSelections: 1, maxSelections: 2,
    options: [
      { id: "frango-acomp-arroz", name: "Arroz", priceDelta: 0, available: true },
      { id: "frango-acomp-feijao", name: "Feijão", priceDelta: 0, available: true },
      { id: "frango-acomp-pure", name: "Purê de batata", priceDelta: 3, available: true },
      { id: "frango-acomp-legumes", name: "Legumes", priceDelta: 3, available: true },
      { id: "frango-acomp-salada", name: "Salada", priceDelta: 2, available: true },
    ],
  },
  {
    id: "frango-grelhado-molho", name: "Escolha o molho", description: "Selecione até um molho. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "frango-molho-ervas", name: "Ervas", priceDelta: 0, available: true },
      { id: "frango-molho-alho", name: "Alho", priceDelta: 2, available: true },
      { id: "frango-molho-limao", name: "Limão", priceDelta: 0, available: true },
    ],
  },
  {
    id: "frango-grelhado-adicionais", name: "Adicionais", description: "Selecione até dois adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 2,
    options: [
      { id: "frango-extra-frango", name: "Frango extra", priceDelta: 9, available: true },
      { id: "frango-extra-legumes", name: "Legumes extra", priceDelta: 4, available: true },
    ],
  },
];

const bakedFishGroups: CustomizationGroup[] = [
  {
    id: "peixe-assado-acompanhamentos", name: "Escolha os acompanhamentos", description: "Selecione um ou dois acompanhamentos. Campo obrigatório.",
    required: true, selectionMode: "multiple", minSelections: 1, maxSelections: 2,
    options: [
      { id: "peixe-acomp-arroz", name: "Arroz", priceDelta: 0, available: true },
      { id: "peixe-acomp-pure", name: "Purê de batata", priceDelta: 3, available: true },
      { id: "peixe-acomp-legumes", name: "Legumes", priceDelta: 3, available: true },
      { id: "peixe-acomp-salada", name: "Salada", priceDelta: 2, available: true },
    ],
  },
  {
    id: "peixe-assado-finalizacao", name: "Escolha a finalização", description: "Selecione até uma finalização. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "peixe-final-ervas", name: "Ervas", priceDelta: 0, available: true },
      { id: "peixe-final-limao", name: "Limão", priceDelta: 0, available: true },
      { id: "peixe-final-alho", name: "Molho leve de alho", priceDelta: 2, available: true },
    ],
  },
  {
    id: "peixe-assado-adicionais", name: "Adicionais", description: "Selecione até dois adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 2,
    options: [
      { id: "peixe-extra-legumes", name: "Legumes extra", priceDelta: 4, available: true },
      { id: "peixe-extra-pure", name: "Purê extra", priceDelta: 4, available: true },
    ],
  },
];

const classicBurgerGroups: CustomizationGroup[] = [
  {
    id: "hamburguer-classico-bread", name: "Escolha o pão", description: "Selecione um pão. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "hamburguer-classico-bread-brioche", name: "Brioche", priceDelta: 0, available: true },
      { id: "hamburguer-classico-bread-sesame", name: "Pão com gergelim", priceDelta: 0, available: true },
      { id: "hamburguer-classico-bread-ciabatta", name: "Ciabatta", priceDelta: 3, available: true },
    ],
  },
  {
    id: "hamburguer-classico-doneness", name: "Escolha o ponto da carne", description: "Selecione o ponto da carne. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "hamburguer-classico-doneness-medium", name: "Ao ponto", priceDelta: 0, available: true },
      { id: "hamburguer-classico-doneness-well", name: "Bem passada", priceDelta: 0, available: true },
    ],
  },
  {
    id: "hamburguer-classico-extras", name: "Adicionais", description: "Selecione até quatro adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 4,
    options: [
      { id: "hamburguer-classico-extra-bacon", name: "Bacon", priceDelta: 5, available: true },
      { id: "hamburguer-classico-extra-cheese", name: "Queijo extra", priceDelta: 4, available: true },
      { id: "hamburguer-classico-extra-egg", name: "Ovo", priceDelta: 4, available: true },
      { id: "hamburguer-classico-extra-onion", name: "Cebola caramelizada", priceDelta: 3, available: true },
    ],
  },
  {
    id: "hamburguer-classico-remove", name: "Retirar ingredientes", description: "Marque apenas os ingredientes que deseja retirar. O preço não é alterado.",
    required: false, selectionMode: "multiple", maxSelections: 4,
    options: [
      { id: "hamburguer-classico-no-cheese", name: "Sem queijo", priceDelta: 0, available: true },
      { id: "hamburguer-classico-no-tomato", name: "Sem tomate", priceDelta: 0, available: true },
      { id: "hamburguer-classico-no-leaves", name: "Sem folhas", priceDelta: 0, available: true },
      { id: "hamburguer-classico-no-sauce", name: "Sem molho", priceDelta: 0, available: true },
    ],
  },
];

const houseSandwichGroups: CustomizationGroup[] = [
  {
    id: "sanduiche-casa-bread", name: "Escolha o pão", description: "Selecione um pão. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "sanduiche-casa-bread-brioche", name: "Brioche", priceDelta: 0, available: true },
      { id: "sanduiche-casa-bread-sesame", name: "Pão com gergelim", priceDelta: 0, available: true },
      { id: "sanduiche-casa-bread-ciabatta", name: "Ciabatta", priceDelta: 3, available: true },
    ],
  },
  {
    id: "sanduiche-casa-sauce", name: "Escolha o molho", description: "Selecione até um molho. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "sanduiche-casa-sauce-herbs", name: "Ervas", priceDelta: 0, available: true },
      { id: "sanduiche-casa-sauce-garlic", name: "Alho", priceDelta: 2, available: true },
      { id: "sanduiche-casa-sauce-mustard", name: "Mostarda", priceDelta: 1.5, available: true },
    ],
  },
  {
    id: "sanduiche-casa-extras", name: "Adicionais", description: "Selecione até três adicionais. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "sanduiche-casa-extra-bacon", name: "Bacon", priceDelta: 5, available: true },
      { id: "sanduiche-casa-extra-cheese", name: "Queijo extra", priceDelta: 4, available: true },
      { id: "sanduiche-casa-extra-cream-cheese", name: "Creme de queijo", priceDelta: 4, available: true },
    ],
  },
  {
    id: "sanduiche-casa-remove", name: "Retirar ingredientes", description: "Marque apenas os ingredientes que deseja retirar. O preço não é alterado.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "sanduiche-casa-no-cheese", name: "Sem queijo", priceDelta: 0, available: true },
      { id: "sanduiche-casa-no-tomato", name: "Sem tomate", priceDelta: 0, available: true },
      { id: "sanduiche-casa-no-leaves", name: "Sem folhas", priceDelta: 0, available: true },
    ],
  },
];

const tomatoPastaGroups: CustomizationGroup[] = [
  {
    id: "massa-tomate-pasta", name: "Escolha o tipo de massa", description: "Selecione um tipo de massa. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "massa-tomate-pasta-spaghetti", name: "Espaguete", priceDelta: 0, available: true },
      { id: "massa-tomate-pasta-penne", name: "Penne", priceDelta: 0, available: true },
      { id: "massa-tomate-pasta-fettuccine", name: "Fettuccine", priceDelta: 3, available: true },
    ],
  },
  {
    id: "massa-tomate-protein", name: "Proteína adicional", description: "Selecione até uma proteína. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "massa-tomate-protein-chicken", name: "Frango", priceDelta: 7, available: true },
      { id: "massa-tomate-protein-beef", name: "Carne", priceDelta: 9, available: true },
    ],
  },
  {
    id: "massa-tomate-finish", name: "Finalizações", description: "Selecione até três finalizações. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 3,
    options: [
      { id: "massa-tomate-finish-parmesan", name: "Parmesão", priceDelta: 3, available: true },
      { id: "massa-tomate-finish-basil", name: "Manjericão", priceDelta: 0, available: true },
      { id: "massa-tomate-finish-garlic", name: "Alho crocante", priceDelta: 3, available: true },
    ],
  },
  {
    id: "massa-tomate-extras", name: "Extras", description: "Selecione até um extra. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 1,
    options: [{ id: "massa-tomate-extra-sauce", name: "Molho extra", priceDelta: 4, available: true }],
  },
];

const mushroomPastaGroups: CustomizationGroup[] = [
  {
    id: "massa-cogumelos-pasta", name: "Escolha o tipo de massa", description: "Selecione um tipo de massa. Campo obrigatório.",
    required: true, selectionMode: "single", minSelections: 1, maxSelections: 1,
    options: [
      { id: "massa-cogumelos-pasta-spaghetti", name: "Espaguete", priceDelta: 0, available: true },
      { id: "massa-cogumelos-pasta-penne", name: "Penne", priceDelta: 0, available: true },
      { id: "massa-cogumelos-pasta-fettuccine", name: "Fettuccine", priceDelta: 3, available: true },
    ],
  },
  {
    id: "massa-cogumelos-finish", name: "Adicionais e finalizações", description: "Selecione até quatro opções. Esta escolha é opcional.",
    required: false, selectionMode: "multiple", maxSelections: 4,
    options: [
      { id: "massa-cogumelos-extra-mushroom", name: "Cogumelos extra", priceDelta: 6, available: true },
      { id: "massa-cogumelos-finish-parmesan", name: "Parmesão", priceDelta: 3, available: true },
      { id: "massa-cogumelos-finish-garlic", name: "Alho crocante", priceDelta: 3, available: true },
      { id: "massa-cogumelos-finish-herbs", name: "Ervas", priceDelta: 0, available: true },
    ],
  },
  {
    id: "massa-cogumelos-protein", name: "Proteína adicional", description: "Selecione até uma proteína. Esta escolha é opcional.",
    required: false, selectionMode: "single", maxSelections: 1,
    options: [
      { id: "massa-cogumelos-protein-chicken", name: "Frango", priceDelta: 7, available: true },
      { id: "massa-cogumelos-protein-beef", name: "Carne", priceDelta: 9, available: true },
    ],
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "bowl-legumes", slug: "bowl-de-legumes", categoryId: "bowls", name: "Bowl de Legumes",
    description: "Arroz, legumes, grão-de-bico, folhas e molho servidos em tigela.", basePrice: 29.9,
    image: "/images/menu/bowl-legumes.webp", imageAlt: "Bowl com arroz, grão-de-bico, folhas e legumes", available: true,
    customizationGroups: bowlVegetablesGroups,
  },
  {
    id: "bowl-carne", slug: "bowl-de-carne", categoryId: "bowls", name: "Bowl de Carne",
    description: "Arroz, tiras de carne, feijão, tomate e molho de ervas servidos em tigela.", basePrice: 34.9,
    image: "/images/menu/bowl-carne.webp", imageAlt: "Bowl com arroz, tiras de carne, legumes e ovo", available: true,
    customizationGroups: bowlBeefGroups,
  },
  {
    id: "frango-grelhado", slug: "frango-grelhado", categoryId: "meals", name: "Frango Grelhado",
    description: "Frango grelhado com temperos suaves e até dois acompanhamentos à escolha.", basePrice: 32.5,
    image: "/images/menu/frango-grelhado.webp", imageAlt: "Frango grelhado servido sobre salada", available: true,
    customizationGroups: grilledChickenGroups,
  },
  {
    id: "peixe-assado", slug: "peixe-assado", categoryId: "meals", name: "Peixe Assado",
    description: "Peixe assado com limão, ervas e acompanhamentos à escolha.", basePrice: 38,
    image: "/images/menu/peixe-assado.webp", imageAlt: "Peixe assado inteiro com limão e ervas", available: false,
    customizationGroups: bakedFishGroups,
  },
  {
    id: "hamburguer-classico", slug: "hamburguer-classico", categoryId: "sandwiches", name: "Hambúrguer Clássico",
    description: "Hambúrguer bovino com queijo, tomate, folhas e molho em pão à escolha.", basePrice: 27.9,
    image: "/images/menu/hamburguer-classico.webp", imageAlt: "Hambúrguer bovino com queijo, cebola e picles", available: true,
    customizationGroups: classicBurgerGroups,
  },
  {
    id: "sanduiche-casa", slug: "sanduiche-da-casa", categoryId: "sandwiches", name: "Sanduíche da Casa",
    description: "Frango, queijo, tomate e folhas em pão à escolha.", basePrice: 25.5,
    image: "/images/menu/sanduiche-casa.webp", imageAlt: "Sanduíche de frango com folhas e picles", available: true,
    customizationGroups: houseSandwichGroups,
  },
  {
    id: "massa-tomate", slug: "massa-ao-molho-de-tomate", categoryId: "pasta", name: "Massa ao Molho de Tomate",
    description: "Massa com molho de tomates, ervas e finalizações à escolha.", basePrice: 28.9,
    image: "/images/menu/massa-tomate.webp", imageAlt: "Espaguete com molho de tomate, ervas e tomates-cereja", available: true,
    customizationGroups: tomatoPastaGroups,
  },
  {
    id: "massa-cogumelos", slug: "massa-com-cogumelos", categoryId: "pasta", name: "Massa com Cogumelos",
    description: "Massa com molho cremoso, cogumelos salteados e ervas.", basePrice: 33.5,
    image: "/images/menu/massa-cogumelos.webp", imageAlt: "Fettuccine com cogumelos e ervas", available: true,
    customizationGroups: mushroomPastaGroups,
  },
  {
    id: "agua-sem-gas", slug: "agua-sem-gas", categoryId: "drinks", name: "Água sem gás",
    description: "Garrafa individual de água sem gás, 500 ml.", basePrice: 4,
    image: "/images/menu/agua-sem-gas.webp", imageAlt: "Copo de água gelada com limão", available: true, customizationGroups: [],
  },
  {
    id: "suco-laranja", slug: "suco-de-laranja", categoryId: "drinks", name: "Suco de laranja",
    description: "Copo individual de suco de laranja, 400 ml.", basePrice: 8,
    image: "/images/menu/suco-laranja.webp", imageAlt: "Copo de suco de laranja com uma rodela da fruta", available: true, customizationGroups: [],
  },
  {
    id: "refrigerante", slug: "refrigerante", categoryId: "drinks", name: "Refrigerante",
    description: "Lata individual de refrigerante, 350 ml.", basePrice: 6,
    image: "/images/menu/refrigerante.webp", imageAlt: "Refrigerante sendo servido em um copo com gelo", available: true, customizationGroups: [],
  },
  {
    id: "brownie", slug: "brownie", categoryId: "desserts", name: "Brownie",
    description: "Fatia individual de brownie de chocolate.", basePrice: 9,
    image: "/images/menu/brownie.webp", imageAlt: "Fatias de brownie de chocolate empilhadas em um prato", available: true, customizationGroups: [],
  },
  {
    id: "pudim", slug: "pudim", categoryId: "desserts", name: "Pudim",
    description: "Fatia individual de pudim com calda de caramelo.", basePrice: 8,
    image: "/images/menu/pudim.webp", imageAlt: "Fatia de pudim com calda de caramelo em prato branco", available: true, customizationGroups: [],
  },
  {
    id: "frutas-estacao", slug: "frutas-da-estacao", categoryId: "desserts", name: "Frutas da estação",
    description: "Porção individual de frutas frescas cortadas.", basePrice: 7,
    image: "/images/menu/frutas-estacao.webp", imageAlt: "Tigela com morango, kiwi, mirtilo e outras frutas", available: true, customizationGroups: [],
  },
];

const categoryOrder = new Map(categories.map((category, index) => [category.id, index]));

export const sortedMenuItems = [...menuItems].sort((a, b) => {
  const categoryDifference = (categoryOrder.get(a.categoryId) ?? 0) - (categoryOrder.get(b.categoryId) ?? 0);
  return categoryDifference || a.name.localeCompare(b.name, "pt-BR");
});

export const findMenuItemBySlug = (slug: string) => menuItems.find((item) => item.slug === slug);
