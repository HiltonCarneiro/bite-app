import { expect, test } from "@playwright/test";

const widths = [320, 360, 375, 390, 430, 768, 1024, 1440];
const mobileWidths = [320, 360, 390, 430];

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page, width: number) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth, `overflow horizontal em ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth);
}

test("home permanece utilizável sem rolagem horizontal nas larguras previstas", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Seu pedido/ })).toBeVisible();
    await expectNoHorizontalOverflow(page, width);
  }
});

test("rotas principais permanecem sem rolagem horizontal em celulares", async ({ page }) => {
  test.setTimeout(120_000);
  const routes = ["/cardapio", "/produto/hamburguer-classico", "/carrinho", "/checkout", "/pedidos"];

  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await expectNoHorizontalOverflow(page, width);
    }
  }
});

test("conteúdo principal continua disponível com zoom de 200%", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/cardapio");
  await expect(page.getByRole("heading", { name: "Escolha seus itens" })).toBeVisible();
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await expect(page.getByLabel("Pesquisar no cardápio")).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver detalhes" }).first()).toBeVisible();
});
