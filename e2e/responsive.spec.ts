import { expect, test } from "@playwright/test";

const widths = [320, 375, 430, 768, 1024, 1440];

test("home permanece utilizável sem rolagem horizontal nas larguras previstas", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Seu pedido/ })).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth, `overflow horizontal em ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test("conteúdo principal continua disponível com zoom de 200%", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/cardapio");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await expect(page.getByRole("heading", { name: "Escolha sua refeição" })).toBeVisible();
  await expect(page.getByLabel("Pesquisar no cardápio")).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver detalhes" }).first()).toBeVisible();
});
