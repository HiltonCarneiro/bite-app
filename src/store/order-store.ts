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

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const order = value as Partial<Order>;
  return typeof order.id === "string"
    && typeof order.createdAt === "string"
    && order.status === "confirmed"
    && typeof order.customerName === "string"
    && order.fulfillmentMethod === "pickup"
    && ["pix", "card-at-counter", "cash"].includes(order.paymentMethod ?? "")
    && Array.isArray(order.items)
    && order.items.length > 0
    && typeof order.total === "number";
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
      merge: (persisted, current) => {
        const saved = persisted as Partial<OrderStore> | undefined;
        return { ...current, orders: Array.isArray(saved?.orders) ? saved.orders.filter(isOrder) : [] };
      },
    },
  ),
);
