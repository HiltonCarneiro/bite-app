"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { calculateCartItemTotal } from "@/domain/cart";
import { safeStorage } from "@/lib/safe-storage";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  updatedAt: string;
  hasHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  replaceItem: (id: string, item: CartItem) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
}

const now = () => new Date().toISOString();

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      updatedAt: now(),
      hasHydrated: false,
      addItem: (item) => set((state) => ({ items: [...state.items, item], updatedAt: now() })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id), updatedAt: now() })),
      updateQuantity: (id, quantity) => {
        if (!Number.isInteger(quantity) || quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) => item.id === id
            ? { ...item, quantity, totalPrice: calculateCartItemTotal(item.unitPrice, quantity) }
            : item),
          updatedAt: now(),
        }));
      },
      replaceItem: (id, replacement) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...replacement, id } : item),
        updatedAt: now(),
      })),
      clearCart: () => set({ items: [], updatedAt: now() }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "bite:cart:v1",
      storage: createJSONStorage(() => safeStorage),
      partialize: ({ items, updatedAt }) => ({ items, updatedAt }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
