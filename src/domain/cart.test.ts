import { describe, expect, it } from "vitest";
import { calculateCartItemTotal, calculateCartSubtotal, calculateConfiguredUnitPrice, createCartItem, validateCustomizationSelections } from "@/domain/cart";
import { menuItems } from "@/data/menu";

const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
const validSelections = {
  "hamburguer-classico-bread": ["hamburguer-classico-bread-brioche"],
  "hamburguer-classico-doneness": ["hamburguer-classico-doneness-medium"],
  "hamburguer-classico-extras": ["hamburguer-classico-extra-cheese", "hamburguer-classico-extra-onion"],
};

describe("domínio do carrinho", () => {
  it("calcula o preço unitário configurado", () => {
    expect(calculateConfiguredUnitPrice(20, [{ priceDelta: 3 }, { priceDelta: 4.5 }])).toBe(27.5);
  });

  it("multiplica o preço unitário pela quantidade", () => {
    expect(calculateCartItemTotal(27.5, 3)).toBe(82.5);
  });

  it("calcula o subtotal usando valores derivados", () => {
    const first = createCartItem(product, validSelections, 2, "first");
    const second = createCartItem(product, {
      "hamburguer-classico-bread": ["hamburguer-classico-bread-sesame"],
      "hamburguer-classico-doneness": ["hamburguer-classico-doneness-well"],
    }, 1, "second");
    expect(calculateCartSubtotal([first, second])).toBeCloseTo(first.unitPrice * 2 + second.unitPrice);
  });

  it("rejeita grupo obrigatório sem seleção", () => {
    const result = validateCustomizationSelections(product, {});
    expect(result.valid).toBe(false);
    expect(result.errors["hamburguer-classico-bread"]).toMatch(/Selecione uma opção/);
  });

  it("respeita o limite máximo de seleções múltiplas", () => {
    const chicken = menuItems.find((item) => item.id === "frango-grelhado")!;
    const result = validateCustomizationSelections(chicken, {
      "frango-grelhado-acompanhamentos": [
        "frango-acomp-arroz",
        "frango-acomp-feijao",
        "frango-acomp-pure",
      ],
    });
    expect(result.valid).toBe(false);
    expect(result.errors["frango-grelhado-acompanhamentos"]).toMatch(/no máximo 2/);
  });

  it("mantém o preço base ao retirar ingredientes", () => {
    const item = createCartItem(product, {
      ...validSelections,
      "hamburguer-classico-remove": ["hamburguer-classico-no-tomato", "hamburguer-classico-no-sauce"],
    }, 1, "removals");
    expect(item.selectedOptions.filter((option) => option.groupName === "Retirar ingredientes")).toHaveLength(2);
    expect(item.unitPrice).toBe(product.basePrice + 7);
  });

  it("cria itens sem personalizações para bebidas e sobremesas", () => {
    const drink = menuItems.find((item) => item.id === "suco-laranja")!;
    const item = createCartItem(drink, {}, 2, "drink");
    expect(item.selectedOptions).toEqual([]);
    expect(item.totalPrice).toBe(16);
  });
});
