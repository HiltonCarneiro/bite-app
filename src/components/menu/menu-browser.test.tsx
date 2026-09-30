import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MenuBrowser } from "@/components/menu/menu-browser";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams() }));

describe("MenuBrowser", () => {
  it("pesquisa itens pelo nome e exibe o estado sem resultados", async () => {
    const user = userEvent.setup();
    render(<MenuBrowser />);
    const search = screen.getByLabelText("Pesquisar no cardápio");
    await user.type(search, "Hambúrguer");
    expect(screen.getByRole("heading", { name: "Hambúrguer Clássico" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Frango Grelhado" })).not.toBeInTheDocument();
    await user.clear(search);
    await user.type(search, "inexistente");
    expect(screen.getByRole("heading", { name: "Nenhum item encontrado" })).toBeInTheDocument();
  });

  it("normaliza acentos e pesquisa por descrição e categoria", async () => {
    const user = userEvent.setup();
    render(<MenuBrowser />);
    const search = screen.getByLabelText("Pesquisar no cardápio");

    await user.type(search, "hamburguer");
    expect(screen.getByRole("heading", { name: "Hambúrguer Clássico" })).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "grao-de-bico");
    expect(screen.getByRole("heading", { name: "Bowl de Legumes" })).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "sobremesas");
    expect(screen.getByRole("heading", { name: "Brownie" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pudim" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frutas da estação" })).toBeInTheDocument();
  });

  it("filtra itens por categoria", async () => {
    const user = userEvent.setup();
    render(<MenuBrowser />);
    await user.click(screen.getByRole("radio", { name: /Massas/ }));
    expect(screen.getByRole("heading", { name: "Massa ao Molho de Tomate" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Hambúrguer Clássico" })).not.toBeInTheDocument();
  });

  it("renderiza e filtra as categorias de bebidas e sobremesas", async () => {
    const user = userEvent.setup();
    render(<MenuBrowser />);
    expect(screen.getByRole("radio", { name: /Bebidas/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Sobremesas/ })).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /Bebidas/ }));
    expect(screen.getByRole("heading", { name: "Água sem gás" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Brownie" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /Sobremesas/ }));
    expect(screen.getByRole("heading", { name: "Brownie" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Água sem gás" })).not.toBeInTheDocument();
  });

  it("mantém o produto indisponível identificado e sem ação de compra", () => {
    render(<MenuBrowser />);
    expect(screen.getByRole("heading", { name: "Peixe Assado" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Item indisponível" })).toBeDisabled();
  });
});
