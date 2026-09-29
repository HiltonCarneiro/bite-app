import type { StateStorage } from "zustand/middleware";

const memoryStorage = new Map<string, string>();

export const safeStorage: StateStorage = {
  getItem(name) {
    try {
      const value =
        typeof window === "undefined"
          ? memoryStorage.get(name) ?? null
          : window.localStorage.getItem(name);

      if (value !== null) JSON.parse(value);
      return value;
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      if (typeof window === "undefined") memoryStorage.set(name, value);
      else window.localStorage.setItem(name, value);
    } catch {
      // A aplicação continua utilizável quando o armazenamento não está disponível.
    }
  },
  removeItem(name) {
    try {
      if (typeof window === "undefined") memoryStorage.delete(name);
      else window.localStorage.removeItem(name);
    } catch {
      // Sem efeito quando o armazenamento não está disponível.
    }
  },
};
