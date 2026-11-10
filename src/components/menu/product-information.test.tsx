import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductInformation } from "@/components/menu/product-information";
import { categories, menuItems } from "@/data/menu";
import { optionInformation } from "@/data/product-information";

describe("informações de todo o cardápio", () => {
  it.each(menuItems)("renderiza composição e incerteza de $name", (item) => {
    render(<ProductInformation item={item} />);
    expect(screen.getByRole("heading", { name: "Informações do item" })).toBeInTheDocument();
    expect(screen.getByText("Ingredientes completos")).toBeInTheDocument();
    expect(screen.getByText("Alergênicos")).toBeInTheDocument();
    expect(screen.getAllByText(/Informação não confirmada pelo estabelecimento/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Pode haver contato cruzado/)).toBeInTheDocument();
    expect(item.information.allergenStatus).toBe("unconfirmed");
    expect(categories.some((category) => category.id === item.categoryId)).toBe(true);
    if (item.information.status === "illustrative") {
      expect(item.information.ingredients.length).toBeGreaterThan(0);
      expect(screen.getByText("Receita ilustrativa do protótipo")).toBeInTheDocument();
    } else {
      expect(screen.getByText("Composição não disponível")).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toMatch(/undefined|não informados neste protótipo/);
  });

  it("cobre a composição de cada opção real, distinguindo ponto e retirada", () => {
    for (const item of menuItems) for (const group of item.customizationGroups) for (const option of group.options) {
      if (option.name.startsWith("Sem ") || group.id.endsWith("doneness")) continue;
      expect(optionInformation[option.name], `${item.name} / ${option.name}`).toBeDefined();
      expect(optionInformation[option.name].ingredients.length).toBeGreaterThan(0);
      expect(optionInformation[option.name].allergenStatus).toBe("unconfirmed");
    }
  });

  it("explica alergênicos nas opções e não promete segurança após retirada", async () => {
    const user = userEvent.setup();
    render(<ProductInformation item={menuItems.find((item) => item.id === "hamburguer-classico")!} />);
    await user.click(screen.getByText("Consultar composição das personalizações"));
    const breads = screen.getByRole("heading", { name: "Escolha o pão" }).parentElement!;
    expect(within(breads).getByText(/trigo \(glúten\), leite, ovo/)).toBeInTheDocument();
    expect(screen.getAllByText(/Não garante a eliminação de alergênicos ou de contato cruzado/)).toHaveLength(4);
    expect(screen.getByText(/A lista acima descreve a receita base/)).toBeInTheDocument();
  });

  it("trata bebida de composição desconhecida sem inferir ausência de alergênicos", () => {
    render(<ProductInformation item={menuItems.find((item) => item.id === "refrigerante")!} />);
    expect(screen.getByText(/Marca e sabor não definidos/)).toBeInTheDocument();
    expect(screen.getByText(/A lista de alergênicos não está confirmada/)).toBeInTheDocument();
    expect(screen.queryByText(/sem glúten|sem lactose|livre de alergênicos/i)).not.toBeInTheDocument();
  });

  it("exibe lacuna honesta para uma opção nova ainda sem ficha ilustrativa", async () => {
    const item = menuItems.find((entry) => entry.id === "suco-laranja")!;
    render(<ProductInformation item={{ ...item, customizationGroups: [{ id: "new", name: "Nova opção", required: false, selectionMode: "single", options: [{ id: "unknown", name: "Composição a confirmar", priceDelta: 0, available: true }] }] }} />);
    await userEvent.click(screen.getByText("Consultar composição das personalizações"));
    expect(screen.getByText(/Composição não disponível; confirme com o estabelecimento/)).toBeInTheDocument();
  });
});
