import { beforeEach, describe, expect, it } from "vitest";
import { safeStorage } from "@/lib/safe-storage";

describe("armazenamento seguro", () => {
  beforeEach(() => localStorage.clear());

  it("ignora conteúdo corrompido", () => {
    localStorage.setItem("bite:test", "{inválido");
    expect(safeStorage.getItem("bite:test")).toBeNull();
  });

  it("lê conteúdo JSON válido", () => {
    localStorage.setItem("bite:test", JSON.stringify({ version: 1 }));
    expect(safeStorage.getItem("bite:test")).toBe('{"version":1}');
  });
});
