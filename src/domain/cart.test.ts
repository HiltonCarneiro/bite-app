import { describe, expect, it } from "vitest";
import { calculateCartItemTotal, calculateCartSubtotal, calculateConfiguredUnitPrice, createCartItem, validateCustomizationSelections } from "@/domain/cart";
import { menuItems } from "@/data/menu";

const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
const validSelections = {
  "hamburguer-classico-bread": ["hamburguer-classico-bread-brioche"],
  "hamburguer-classico-extras": ["hamburguer-classico-extra-cheese", "hamburguer-classico-extra-pickle"],
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
    const second = createCartItem(product, { "hamburguer-classico-bread": ["hamburguer-classico-bread-sesame"] }, 1, "second");
    expect(calculateCartSubtotal([first, second])).toBeCloseTo(first.unitPrice * 2 + second.unitPrice);
  });

  it("rejeita grupo obrigatório sem seleção", () => {
    const result = validateCustomizationSelections(product, {});
    expect(result.valid).toBe(false);
    expect(result.errors["hamburguer-classico-bread"]).toMatch(/Selecione uma opção/);
  });

  it("respeita o limite máximo de seleções múltiplas", () => {
    const result = validateCustomizationSelections(product, {
      ...validSelections,
      "hamburguer-classico-extras": [
        "hamburguer-classico-extra-cheese",
        "hamburguer-classico-extra-pickle",
        "hamburguer-classico-extra-onion",
      ],
    });
    expect(result.valid).toBe(false);
    expect(result.errors["hamburguer-classico-extras"]).toMatch(/no máximo 2/);
  });
});
