"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { calculateCartSubtotal } from "@/domain/cart";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";

const hiddenRoutes = ["/carrinho", "/checkout"];

export function MobileCartSummary() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  if (!hasHydrated || items.length === 0 || hiddenRoutes.some((route) => pathname.startsWith(route))) return null;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateCartSubtotal(items);

  return (
    <aside className="mobile-cart-summary sm:hidden" aria-label="Resumo do carrinho">
      <Link
        className="button-primary w-full justify-between shadow-lg"
        href="/carrinho"
        aria-label={`Ver carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}, total de ${formatCurrency(subtotal)}`}
      >
        <span className="flex items-center gap-2"><ShoppingCart aria-hidden="true" size={20} />Ver carrinho</span>
        <span>{itemCount} {itemCount === 1 ? "item" : "itens"} · {formatCurrency(subtotal)}</span>
      </Link>
    </aside>
  );
}
