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

  it("filtra itens por categoria", async () => {
    const user = userEvent.setup();
    render(<MenuBrowser />);
    await user.click(screen.getByRole("radio", { name: /Massas/ }));
    expect(screen.getByRole("heading", { name: "Massa ao Molho de Tomate" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Hambúrguer Clássico" })).not.toBeInTheDocument();
  });
});
