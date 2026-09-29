import { calculateCartSubtotal } from "@/domain/cart";
import { createId } from "@/lib/ids";
import type { CartItem, CheckoutData, Order } from "@/types";

export function createOrderSnapshot(
  items: CartItem[],
  checkout: CheckoutData,
  options: { id?: string; createdAt?: string } = {},
): Order {
  if (items.length === 0) throw new Error("O carrinho precisa ter ao menos um item.");

  const subtotal = calculateCartSubtotal(items);
  return {
    id: options.id ?? createId(),
    createdAt: options.createdAt ?? new Date().toISOString(),
    status: "confirmed",
    customerName: checkout.customerName.trim(),
    fulfillmentMethod: checkout.fulfillmentMethod,
    paymentMethod: checkout.paymentMethod,
    ...(checkout.notes?.trim() ? { notes: checkout.notes.trim() } : {}),
    items: items.map((item) => ({
      id: item.id,
      menuItemId: item.menuItemId,
      menuItemName: item.menuItemName,
      image: item.image,
      imageAlt: item.imageAlt,
      basePrice: item.basePrice,
      selectedOptions: item.selectedOptions.map((option) => ({
        groupName: option.groupName,
        optionName: option.optionName,
        priceDelta: option.priceDelta,
      })),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
    })),
    subtotal,
    total: subtotal,
  };
}
