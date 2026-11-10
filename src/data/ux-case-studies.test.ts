import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { biasCardRefinements, amazonRefinements } from "@/data/academic-refinements";
import { evidenceScenes, uxCaseStudies, unappliedRefinements } from "@/data/ux-case-studies";
import captures from "@/data/ux-evidence.json";

describe("rastreabilidade dos estudos de UX", () => {
  it("detalha todas as cartas e decisões implementadas, inclusive parciais", () => {
    const applied = [...biasCardRefinements, ...amazonRefinements].filter((item) => ["Sim", "Parcial"].includes(item.status));
    expect(uxCaseStudies.map((item) => item.id)).toEqual(applied.map((item) => item.id));
    expect(new Set(uxCaseStudies.map((item) => item.id)).size).toBe(17);
    for (const study of uxCaseStudies) {
      for (const field of [study.location, study.step, study.classification, study.before, study.after, study.rationale, study.hypothesis, study.ethics, study.validation]) expect(field?.length).toBeGreaterThan(15);
      expect(study.changes.length).toBeGreaterThan(0);
      expect(evidenceScenes[study.scene].route.startsWith("/")).toBe(true);
      expect(study.status).not.toBe("Não");
    }
    expect(unappliedRefinements).toHaveLength(8);
  });

  it("usa pares autênticos locais, com origem e estados equivalentes", () => {
    for (const [scene, pair] of Object.entries(captures)) {
      expect(pair.antes.status).toBe("authentic");
      expect(pair.antes.version).toMatch(/^7fc2924/);
      expect(pair.antes.route).toBe(pair.depois.route);
      expect(pair.antes.viewport).toEqual(pair.depois.viewport);
      expect(pair.antes.state).toBe(pair.depois.state);
      for (const capture of [pair.antes, pair.depois]) {
        const file = path.join(process.cwd(), "public", capture.path);
        expect(fs.existsSync(file), `${scene} ${file}`).toBe(true);
        const bytes = fs.readFileSync(file);
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(capture.sha256);
        expect(bytes.length).toBeLessThan(250_000);
        expect(new Date(capture.capturedAt).toISOString()).toBe(capture.capturedAt);
      }
    }
    expect(JSON.parse(fs.readFileSync("public/ux-refinement/proveniencia.json", "utf8"))).toEqual(captures);
  });
});
