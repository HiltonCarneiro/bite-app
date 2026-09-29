import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi } from "vitest";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { createCartItem } from "@/domain/cart";
import { menuItems } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

describe("CheckoutForm", () => {
  beforeEach(() => {
    push.mockReset();
    const product = menuItems.find((item) => item.id === "hamburguer-classico")!;
    useCartStore.setState({ items: [createCartItem(product, { "hamburguer-classico-bread": ["hamburguer-classico-bread-brioche"] }, 1, "checkout-cart")], hasHydrated: true });
    useOrderStore.setState({ orders: [], hasHydrated: true });
  });

  it("mostra erros textuais nos campos obrigatórios", async () => {
    const user = userEvent.setup();
    render(<CheckoutForm />);
    await user.click(screen.getByRole("button", { name: "Confirmar pedido" }));
    expect(await screen.findByText("Informe um nome com pelo menos 2 caracteres.")).toBeInTheDocument();
    expect(screen.getByText("Selecione um método de pagamento.")).toBeInTheDocument();
  });

  it("cria o pedido e limpa o carrinho após dados válidos", async () => {
    const user = userEvent.setup();
    render(<CheckoutForm />);
    await user.type(screen.getByLabelText("Nome para retirada (obrigatório)"), "Ana Silva");
    await user.click(screen.getByRole("radio", { name: /PIX/ }));
    await user.click(screen.getByRole("button", { name: "Confirmar pedido" }));
    expect(useOrderStore.getState().orders).toHaveLength(1);
    expect(useCartStore.getState().items).toHaveLength(0);
    expect(push).toHaveBeenCalledWith(expect.stringMatching(/^\/pedido\/.+\/confirmado$/));
  });
});
