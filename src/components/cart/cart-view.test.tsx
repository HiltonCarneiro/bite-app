import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CartView } from "@/components/cart/cart-view";
import { createCartItem } from "@/domain/cart";
import { menuItems } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams() }));

describe("CartView", () => {
  it("exibe o estado vazio", () => {
    useCartStore.setState({ items: [], hasHydrated: true });
    render(<CartView />);
    expect(screen.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeInTheDocument();
  });

  it("altera a quantidade e remove o item", async () => {
    const user = userEvent.setup();
    const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
    useCartStore.setState({ items: [createCartItem(product, {
      "hamburguer-classico-bread": ["hamburguer-classico-bread-brioche"],
      "hamburguer-classico-doneness": ["hamburguer-classico-doneness-medium"],
    }, 1, "cart-test")], hasHydrated: true });
    render(<CartView />);
    await user.click(screen.getByRole("button", { name: "Aumentar quantidade" }));
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    await user.click(screen.getByRole("button", { name: "Remover" }));
    expect(screen.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeInTheDocument();
  });
});
