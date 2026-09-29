"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { QuantityControl } from "@/components/cart/quantity-control";
import { EmptyState } from "@/components/ui/empty-state";
import { calculateCartSubtotal } from "@/domain/cart";
import { menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";

export function CartView() {
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const status = searchParams.has("atualizado") ? "Item atualizado no carrinho." : searchParams.has("adicionado") ? "Item adicionado ao carrinho." : null;

  if (!hasHydrated) return <p role="status">Carregando seu carrinho…</p>;

  if (items.length === 0) {
    return <EmptyState icon={ShoppingCart} title="Seu carrinho está vazio" description="Abra o cardápio e escolha um item para começar seu pedido." action={<Link className="button-primary" href="/cardapio">Ver cardápio</Link>} />;
  }

  const subtotal = calculateCartSubtotal(items);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.7fr)] lg:items-start">
      <div className="grid gap-4">
        {status && <p className="status-message m-0" role="status">✓ {status}</p>}
        <ul className="m-0 grid list-none gap-4 p-0">
          {items.map((item) => (
            <li key={item.id}>
              <article className="card grid gap-4 p-4 sm:grid-cols-[8rem_1fr]">
                <Image className="aspect-square w-full rounded-xl object-cover" src={item.image} alt={item.imageAlt} width={240} height={240} />
                <div className="grid min-w-0 gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><h2 className="m-0 text-xl font-semibold">{item.menuItemName}</h2><p className="m-0 text-sm text-[#5f5a57]">{formatCurrency(item.unitPrice)} por unidade</p></div>
                    <strong>{formatCurrency(item.unitPrice * item.quantity)}</strong>
                  </div>
                  {item.selectedOptions.length > 0 && (
                    <ul className="m-0 grid list-none gap-1 p-0 text-sm">
                      {item.selectedOptions.map((option) => <li key={`${option.groupId}-${option.optionId}`}><strong>{option.groupName}:</strong> {option.optionName}</li>)}
                    </ul>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <QuantityControl value={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} label={`Quantidade de ${item.menuItemName}`} />
                    <div className="flex flex-wrap gap-2">
                      <Link className="button-secondary" href={`/produto/${menuItems.find((menuItem) => menuItem.id === item.menuItemId)?.slug ?? item.menuItemId}?editar=${encodeURIComponent(item.id)}`}><Pencil aria-hidden="true" size={18} />Editar</Link>
                      <button className="button-danger" type="button" onClick={() => removeItem(item.id)}><Trash2 aria-hidden="true" size={18} />Remover</button>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <aside className="card grid gap-4 p-5 lg:sticky lg:top-28" aria-labelledby="cart-summary-title">
        <h2 id="cart-summary-title" className="m-0 text-xl font-semibold">Resumo do carrinho</h2>
        <dl className="m-0 flex items-center justify-between gap-4"><dt>Subtotal</dt><dd className="m-0 text-xl font-bold">{formatCurrency(subtotal)}</dd></dl>
        <p className="m-0 text-sm text-[#5f5a57]">Pedido simulado para retirada no balcão. Não há cobrança online.</p>
        <Link className="button-primary w-full" href="/checkout">Continuar para checkout</Link>
        <Link className="button-secondary w-full" href="/cardapio">Adicionar outro item</Link>
      </aside>
    </div>
  );
}
