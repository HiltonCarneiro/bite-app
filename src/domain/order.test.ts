import { describe, expect, it } from "vitest";
import { createCartItem } from "@/domain/cart";
import { createOrderSnapshot } from "@/domain/order";
import { menuItems } from "@/data/menu";

describe("snapshot do pedido", () => {
  it("cria uma cópia imutável em relação ao carrinho", () => {
    const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
    const cartItem = createCartItem(product, {
      "hamburguer-classico-bread": ["hamburguer-classico-bread-brioche"],
      "hamburguer-classico-doneness": ["hamburguer-classico-doneness-medium"],
    }, 2, "cart-item");
    const order = createOrderSnapshot([cartItem], {
      customerName: "Ana",
      fulfillmentMethod: "pickup",
      paymentMethod: "pix",
    }, { id: "order-id", createdAt: "2026-09-28T12:00:00.000Z" });

    cartItem.quantity = 8;
    cartItem.selectedOptions[0].optionName = "Alterado";

    expect(order.id).toBe("order-id");
    expect(order.items[0].quantity).toBe(2);
    expect(order.items[0].selectedOptions[0].optionName).toBe("Brioche");
    expect(order.total).toBe(order.items[0].unitPrice * 2);
  });

  it("não cria pedido sem itens", () => {
    expect(() => createOrderSnapshot([], { customerName: "Ana", fulfillmentMethod: "pickup", paymentMethod: "cash" })).toThrow(/ao menos um item/);
  });
});
