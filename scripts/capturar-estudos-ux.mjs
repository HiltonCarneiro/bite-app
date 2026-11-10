import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

// Execute na worktree atual, com a baseline histórica disponível em :3001.
const scenes = JSON.parse(await fs.readFile("src/data/ux-evidence-scenes.json", "utf8"));
const output = "public/ux-refinement";
await fs.mkdir(output, { recursive: true });
const historicalRoot = process.env.BITE_BASELINE_ROOT ?? "../bite-before";
const baseline = execFileSync("git", ["-C", historicalRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const current = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const sourceHash = createHash("sha256");
async function hashSources(dir) {
  for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await hashSources(file);
    else if (!file.includes("ux-evidence.json")) sourceHash.update(file).update(await fs.readFile(file));
  }
}
await hashSources("src");
const sourceFingerprint = sourceHash.digest("hex");
const manifest = {};
const browser = await chromium.launch();

async function ready(page) {
  await page.locator("h1").waitFor();
  await page.locator(".skeleton").first().waitFor({ state: "hidden" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; } html { scroll-behavior: auto !important; }" });
}

async function configureBurger(page, baseURL) {
  await page.goto(`${baseURL}/produto/hamburguer-classico`);
  await ready(page);
  await page.getByRole("radio", { name: /Brioche/ }).check();
  await page.getByRole("radio", { name: /Ao ponto/ }).check();
  await page.getByRole("checkbox", { name: /Queijo extra/ }).check();
}

try {
  for (const [phase, baseURL] of [["antes", "http://127.0.0.1:3001"], ["depois", "http://127.0.0.1:3000"]]) {
    for (const [scene, config] of Object.entries(scenes)) {
      const viewport = ["cart", "checkout"].includes(scene) ? { width: 1440, height: 1000 } : { width: 390, height: 844 };
      const context = await browser.newContext({ viewport, locale: "pt-BR", reducedMotion: "reduce" });
      const page = await context.newPage();
      if (["cart", "checkout", "price"].includes(scene)) {
        await configureBurger(page, baseURL);
        if (scene !== "price") {
          await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
          await page.waitForURL(/\/carrinho/);
        }
      }
      if (scene !== "price") await page.goto(`${baseURL}${config.route}`);
      await ready(page);
      if (scene === "menu") await page.getByLabel("Pesquisar no cardápio").waitFor();
      const target = page.locator(config.target).first();
      const exists = await target.count() > 0;
      if (scene === "information" && !exists) {
        await page.locator("article header").evaluate((node) => node.scrollIntoView({ block: "start" }));
      } else if (!["home", "menu", "cart", "checkout"].includes(scene)) {
        await target.evaluate((node) => node.scrollIntoView({ block: "start" }));
      }
      if (!["home", "menu", "cart", "checkout"].includes(scene)) await page.evaluate(() => window.scrollBy(0, -96));
      // Imagens acima da dobra devem estar decodificadas antes da captura.
      await page.waitForFunction(() => {
        return [...document.images].filter((img) => {
          const rect = img.getBoundingClientRect();
          return rect.top < innerHeight && rect.bottom > 0;
        }).every((img) => img.complete && img.naturalWidth > 0);
      });
      const file = `${scene}-${phase}.webp`;
      const png = await page.screenshot();
      const bytes = await sharp(png).webp({ quality: 85 }).toBuffer();
      await fs.writeFile(`${output}/${file}`, bytes);
      manifest[scene] ??= {};
      manifest[scene][phase] = {
        path: `/ux-refinement/${file}`, status: "authentic", route: config.route,
        version: phase === "antes" ? baseline : `${current} + alterações locais desta entrega`,
        sourceFingerprint: phase === "depois" ? sourceFingerprint : null,
        capturedAt: new Date().toISOString(), viewport,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        state: ["cart", "checkout", "price"].includes(scene) ? "1 Hambúrguer Clássico; Brioche; Ao ponto; Queijo extra; quantidade 1; checkout sem preencher" : "Armazenamento vazio; nenhuma opção selecionada",
        note: scene === "information" && !exists ? "Cartão ausente na baseline; captura autêntica do resumo do produto antes da personalização." : "Captura de viewport; abrir a imagem para examinar em tamanho original.",
      };
      await context.close();
      console.log(`${phase}: ${scene} (${bytes.length} bytes)`);
    }
  }
  await fs.writeFile("src/data/ux-evidence.json", JSON.stringify(manifest, null, 2) + "\n");
  await fs.writeFile(`${output}/proveniencia.json`, JSON.stringify(manifest, null, 2) + "\n");
} finally {
  await browser.close();
}
