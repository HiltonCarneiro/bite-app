import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { menuItems } from "../src/data/menu";
import { uxCaseStudies } from "../src/data/ux-case-studies";

test("cada URL real do catálogo possui informação acessível e honesta", async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const item of menuItems) {
    await page.goto(`/produto/${item.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: item.name })).toBeVisible();
    const card = page.getByRole("region", { name: "Informações do item" });
    await expect(card).toBeVisible();
    await expect(card.getByText("Ingredientes completos", { exact: true })).toBeVisible();
    await expect(card.getByText("Alergênicos", { exact: true })).toBeVisible();
    await expect(card.getByText(/Informação não confirmada pelo estabelecimento/).first()).toBeVisible();
    if (!item.available) await expect(page.getByRole("heading", { name: "Item temporariamente indisponível" })).toBeVisible();
  }
  expect(errors).toEqual([]);
  await page.goto("/produto/produto-inexistente");
  // Next.js pode enviar status 200 quando notFound() ocorre após iniciar streaming.
  await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", "noindex");
});

test("rodapé abre estudos e permite explorar comparação com teclado", async ({ page }) => {
  await page.goto("/cardapio");
  const footerLink = page.getByRole("link", { name: "Ver refinamento acadêmico de UX" });
  await footerLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/academico\/refinamento/);
  for (const study of uxCaseStudies) {
    const article = page.locator(`#caso-${study.id}`);
    await expect(article).toHaveCount(1);
    for (const image of await article.locator("img").all()) {
      const response = await page.request.get((await image.getAttribute("src"))!);
      expect(response.ok()).toBe(true);
    }
  }
  const link = page.getByRole("link", { name: "B10 Viés de Confirmação", exact: true });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#caso-B10$/);
  const summary = page.locator("#caso-B10 summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#caso-B10 details").first()).toHaveAttribute("open", "");
  const imageLink = page.getByRole("link", { name: "Ampliar imagem Depois · B10 (nova aba)" });
  await imageLink.focus();
  const [popup] = await Promise.all([page.waitForEvent("popup"), page.keyboard.press("Enter")]);
  await expect(popup).toHaveURL(/information-depois.webp$/);
});

test("novas seções refluem em todas as larguras e com zoom de 200%", async ({ page }) => {
  test.setTimeout(120_000);
  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/academico/refinamento", "/produto/hamburguer-classico", "/produto/frango-grelhado"]) {
      await page.goto(route);
      if (route.startsWith("/produto")) await page.getByText("Consultar composição das personalizações").click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${route} em ${width}px`).toBe(true);
    }
  }
  await page.goto("/academico/refinamento");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("cartão expandido e estudos não têm violações axe em 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/produto/hamburguer-classico");
  await page.getByText("Consultar composição das personalizações").click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.goto("/academico/refinamento");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
