import { expect, test } from "@playwright/test";

async function addClassicBurger(page: import("@playwright/test").Page) {
  await page.goto("/produto/hamburguer-classico");
  await page.getByRole("radio", { name: /Brioche/ }).check();
  await page.getByRole("radio", { name: /Ao ponto/ }).check();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await expect(page).toHaveURL(/\/carrinho/);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("fluxo completo do pedido até o histórico e detalhe", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Abrir cardápio/ }).click();
  await page.getByLabel("Pesquisar no cardápio").fill("Hambúrguer");
  await page.getByRole("link", { name: "Ver detalhes" }).click();
  await page.getByRole("radio", { name: /Brioche/ }).check();
  await page.getByRole("radio", { name: /Ao ponto/ }).check();
  await page.getByRole("checkbox", { name: /Queijo extra/ }).check();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();

  await expect(page.getByText("Item adicionado ao carrinho.")).toBeVisible();
  await page.getByRole("link", { name: "Continuar para checkout" }).click();
  await page.getByLabel("Nome para retirada (obrigatório)").fill("Ana Silva");
  await page.getByRole("radio", { name: /PIX/ }).check();
  await page.getByLabel("Observações do pedido (opcional)").fill("Retirar no fim da tarde.");
  await page.getByRole("button", { name: "Confirmar pedido" }).click();

  await expect(page).toHaveURL(/\/pedido\/.+\/confirmado/);
  await expect(page.getByRole("heading", { name: "Tudo certo, Ana Silva!" })).toBeVisible();
  await page.getByRole("link", { name: "Ver detalhes" }).click();
  await expect(page.getByRole("heading", { name: /Pedido BITE-/ })).toBeVisible();
  await expect(page.getByText("Retirar no fim da tarde.")).toBeVisible();

  await page.getByRole("link", { name: "Pedidos", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Pedido BITE-/ })).toBeVisible();
  await page.getByRole("link", { name: /Ver detalhes/ }).click();
  await expect(page.getByRole("heading", { name: "Itens do pedido" })).toBeVisible();
});

test("informa escolhas obrigatórias e impede inclusão incompleta", async ({ page }) => {
  await page.goto("/produto/hamburguer-classico");
  await expect(page.getByText("Selecione uma opção: Escolha o pão.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Adicionar ao carrinho" })).toBeDisabled();
  await page.getByRole("radio", { name: /Brioche/ }).check();
  await expect(page.getByRole("button", { name: "Adicionar ao carrinho" })).toBeDisabled();
  await page.getByRole("radio", { name: /Ao ponto/ }).check();
  await expect(page.getByRole("button", { name: "Adicionar ao carrinho" })).toBeEnabled();
});

test("altera quantidade, edita a configuração e remove o item", async ({ page }) => {
  await addClassicBurger(page);
  await page.getByRole("button", { name: "Aumentar quantidade" }).click();
  await expect(page.getByLabel("2 unidades")).toBeVisible();
  await page.getByRole("link", { name: "Editar" }).click();
  await expect(page.getByRole("radio", { name: /Brioche/ })).toBeChecked();
  await expect(page.getByRole("radio", { name: /Ao ponto/ })).toBeChecked();
  await page.getByRole("radio", { name: /Pão com gergelim/ }).check();
  await page.getByRole("button", { name: "Salvar alterações" }).click();
  await expect(page.getByText("Item atualizado no carrinho.")).toBeVisible();
  await expect(page.getByText(/Pão com gergelim/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hambúrguer Clássico" })).toHaveCount(1);
  await page.getByRole("button", { name: "Remover" }).click();
  await expect(page.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeVisible();
});

test("permite interações críticas somente com teclado", async ({ page }) => {
  await page.goto("/");
  const menuLink = page.getByRole("link", { name: /Abrir cardápio/ });
  await menuLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/cardapio/);

  const searchInput = page.getByLabel("Pesquisar no cardápio");
  await searchInput.focus();
  await page.keyboard.type("Hambúrguer");
  const productLink = page.getByRole("link", { name: "Ver detalhes" });
  await productLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/produto\/hamburguer-classico/);
  const firstRequiredRadio = page.getByRole("radio", { name: /Brioche/ });
  await firstRequiredRadio.focus();
  await page.keyboard.press("Space");
  await expect(firstRequiredRadio).toBeChecked();
  const donenessRadio = page.getByRole("radio", { name: /Ao ponto/ });
  await donenessRadio.focus();
  await page.keyboard.press("Space");
  await expect(donenessRadio).toBeChecked();
  const addButton = page.getByRole("button", { name: "Adicionar ao carrinho" });
  await expect(addButton).toBeEnabled();
  await addButton.focus();
  await expect(addButton).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/carrinho/);
});

test("adiciona bebida e sobremesa como produtos independentes", async ({ page }) => {
  await page.goto("/cardapio?categoria=bebidas");
  await page.getByRole("link", { name: "Ver detalhes" }).first().click();
  await expect(page.getByRole("heading", { name: "Sem personalizações" })).toBeVisible();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();

  await page.getByRole("link", { name: "Cardápio", exact: true }).click();
  await page.getByRole("group", { name: "Filtrar por categoria" }).getByText("Sobremesas", { exact: true }).click();
  await page.getByRole("link", { name: "Ver detalhes" }).first().click();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();

  await expect(page.getByRole("heading", { name: "Água sem gás" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Brownie" })).toBeVisible();
});
