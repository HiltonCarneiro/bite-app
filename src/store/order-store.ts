"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { safeStorage } from "@/lib/safe-storage";
import type { Order } from "@/types";

interface OrderStore {
  orders: Order[];
  hasHydrated: boolean;
  addOrder: (order: Order) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      hasHydrated: false,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "bite:orders:v1",
      storage: createJSONStorage(() => safeStorage),
      partialize: ({ orders }) => ({ orders }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
