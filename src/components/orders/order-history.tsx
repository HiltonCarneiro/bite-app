"use client";

import Link from "next/link";
import { ClipboardList, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDateTime, getOrderDisplayCode, paymentMethodLabels } from "@/lib/format";
import { useOrderStore } from "@/store/order-store";

export function OrderHistory() {
  const orders = useOrderStore((state) => state.orders);
  const hasHydrated = useOrderStore((state) => state.hasHydrated);
  if (!hasHydrated) return <p role="status">Carregando seus pedidos…</p>;
  if (orders.length === 0) return <EmptyState icon={ClipboardList} title="Nenhum pedido por aqui" description="Os pedidos confirmados neste navegador aparecerão nesta página." action={<Link className="button-primary" href="/cardapio">Fazer um pedido</Link>} />;

  return (
    <ul className="m-0 grid list-none gap-4 p-0">
      {orders.map((order) => (
        <li key={order.id}>
          <article className="card grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2"><h2 className="m-0 text-xl font-semibold">Pedido {getOrderDisplayCode(order.id)}</h2><span className="rounded-full bg-[#edf7ed] px-3 py-1 text-sm font-semibold text-[#236027]">✓ Confirmado</span></div>
              <p className="m-0 text-sm text-[#5f5a57]"><time dateTime={order.createdAt}>{formatDateTime(order.createdAt)}</time></p>
              <p className="m-0">{order.items.reduce((sum, item) => sum + item.quantity, 0)} {order.items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "item" : "itens"} · {paymentMethodLabels[order.paymentMethod]}</p>
              <strong className="text-lg">{formatCurrency(order.total)}</strong>
            </div>
            <Link className="button-secondary" href={`/pedidos/${order.id}`}>Ver detalhes <ChevronRight aria-hidden="true" size={20} /></Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
