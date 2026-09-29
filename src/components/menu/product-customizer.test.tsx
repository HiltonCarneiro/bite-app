import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi } from "vitest";
import { ProductCustomizer } from "@/components/menu/product-customizer";
import { menuItems } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }), useSearchParams: () => new URLSearchParams() }));

describe("ProductCustomizer", () => {
  beforeEach(() => {
    push.mockReset();
    useCartStore.setState({ items: [], hasHydrated: true });
  });

  it("mantém a ação indisponível até completar escolhas obrigatórias", async () => {
    const user = userEvent.setup();
    const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
    render(<ProductCustomizer item={product} />);
    const submit = screen.getByRole("button", { name: "Adicionar ao carrinho" });
    expect(submit).toBeDisabled();
    expect(screen.getByText("Selecione uma opção em Pão.")).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: /Brioche/ }));
    expect(submit).toBeEnabled();
  });

  it("seleciona complementos, atualiza quantidade e adiciona ao carrinho", async () => {
    const user = userEvent.setup();
    const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
    render(<ProductCustomizer item={product} />);
    await user.click(screen.getByRole("radio", { name: /Brioche/ }));
    await user.click(screen.getByRole("checkbox", { name: /Queijo/ }));
    await user.click(screen.getByRole("button", { name: "Aumentar quantidade" }));
    await user.click(screen.getByRole("button", { name: "Adicionar ao carrinho" }));
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    expect(useCartStore.getState().items[0].selectedOptions).toHaveLength(2);
    expect(push).toHaveBeenCalledWith("/carrinho?adicionado=1");
  });
});
