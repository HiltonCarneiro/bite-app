import type { FulfillmentMethod, PaymentMethod } from "@/types";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  pix: "PIX",
  "card-at-counter": "Cartão no balcão",
  cash: "Dinheiro",
};

export const fulfillmentMethodLabels: Record<FulfillmentMethod, string> = {
  pickup: "Retirada no balcão",
};

export const getOrderDisplayCode = (orderId: string) =>
  `BITE-${orderId.replaceAll("-", "").slice(0, 4).toUpperCase()}`;
