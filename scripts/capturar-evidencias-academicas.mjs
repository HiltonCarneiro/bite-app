import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const fase = process.argv[2] ?? "baseline";
const baseUrl = process.env.BITE_BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = path.resolve("docs", "academico", "evidencias", fase);

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

await page.goto(`${baseUrl}/`);
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.getByRole("heading", { name: /Seu pedido/ }).waitFor();
await page.screenshot({ path: path.join(outputDir, "01-home-desktop.png"), fullPage: true });

await page.goto(`${baseUrl}/cardapio`);
await page.getByRole("heading", { name: "Escolha seus itens" }).waitFor();
await page.screenshot({ path: path.join(outputDir, "02-cardapio-desktop.png"), fullPage: true });

await page.goto(`${baseUrl}/produto/hamburguer-classico`);
await page.getByRole("heading", { name: "Hambúrguer Clássico" }).waitFor();
await page.screenshot({ path: path.join(outputDir, "03-produto-desktop.png"), fullPage: true });
await page.getByRole("radio", { name: /Brioche/ }).check();
await page.getByRole("radio", { name: /Ao ponto/ }).check();
await page.getByRole("checkbox", { name: /Queijo extra/ }).check();
await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
await page.screenshot({ path: path.join(outputDir, "04-carrinho-desktop.png"), fullPage: true });

await page.getByRole("link", { name: "Continuar para checkout" }).click();
await page.getByLabel("Nome para retirada (obrigatório)").fill("Pessoa de teste");
await page.getByRole("radio", { name: /PIX/ }).check();
await page.screenshot({ path: path.join(outputDir, "05-checkout-desktop.png"), fullPage: true });
await page.getByRole("button", { name: "Confirmar pedido" }).click();
await page.screenshot({ path: path.join(outputDir, "06-confirmacao-desktop.png"), fullPage: true });

await page.getByRole("link", { name: "Pedidos", exact: true }).click();
await page.screenshot({ path: path.join(outputDir, "07-pedidos-desktop.png"), fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${baseUrl}/produto/hamburguer-classico`);
await page.getByRole("heading", { name: "Hambúrguer Clássico" }).waitFor();
await page.screenshot({ path: path.join(outputDir, "08-produto-mobile.png"), fullPage: true });
await page.goto(`${baseUrl}/carrinho`);
await page.locator("h1").waitFor();
await page.screenshot({ path: path.join(outputDir, "09-carrinho-mobile.png"), fullPage: true });

if (fase !== "baseline") {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/academico/refinamento`);
  await page.getByRole("heading", { name: "Refinamento responsável de UX" }).waitFor();
  await page.screenshot({ path: path.join(outputDir, "10-refinamento-academico.png"), fullPage: true });
}

await browser.close();
console.log(`Evidências salvas em ${outputDir}`);
