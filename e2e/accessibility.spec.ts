import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function expectNoAxeViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations, results.violations.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("páginas principais não apresentam violações automatizadas", async ({ page }) => {
  await page.goto("/");
  await expectNoAxeViolations(page);

  await page.goto("/cardapio");
  await expectNoAxeViolations(page);

  await page.goto("/produto/hamburguer-classico");
  await expectNoAxeViolations(page);

  await page.goto("/carrinho");
  await expect(page.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeVisible();
  await expectNoAxeViolations(page);

  await page.goto("/produto/hamburguer-classico");
  await page.getByRole("radio", { name: /Brioche/ }).check();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await page.getByRole("link", { name: "Continuar para checkout" }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.getByRole("heading", { name: "Finalize seu pedido" })).toBeVisible();
  await expectNoAxeViolations(page);

  await page.getByLabel("Nome para retirada (obrigatório)").fill("Pessoa Teste");
  await page.getByRole("radio", { name: /Dinheiro/ }).check();
  await page.getByRole("button", { name: "Confirmar pedido" }).click();
  await expect(page.getByRole("heading", { name: /Tudo certo/ })).toBeVisible();
  await expectNoAxeViolations(page);
});
