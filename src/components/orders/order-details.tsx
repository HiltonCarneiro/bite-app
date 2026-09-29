"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDateTime, fulfillmentMethodLabels, getOrderDisplayCode, paymentMethodLabels } from "@/lib/format";
import { useOrderStore } from "@/store/order-store";

export function OrderDetails({ id }: { id: string }) {
  const orders = useOrderStore((state) => state.orders);
  const hasHydrated = useOrderStore((state) => state.hasHydrated);
  if (!hasHydrated) return <p role="status">Carregando pedido…</p>;
  const order = orders.find((candidate) => candidate.id === id);
  if (!order) return <EmptyState icon={SearchX} title="Pedido não encontrado" description="Este pedido não está salvo neste navegador ou o endereço está incorreto." action={<Link className="button-primary" href="/pedidos">Voltar aos pedidos</Link>} />;

  return (
    <div className="section-stack">
      <Link className="inline-flex min-h-11 w-fit items-center gap-1 rounded-lg font-semibold" href="/pedidos"><ChevronLeft aria-hidden="true" />Voltar aos pedidos</Link>
      <header className="grid gap-2"><p className="m-0 font-semibold text-[#2e7d32]">✓ Confirmado</p><h1 className="m-0 text-3xl font-bold">Pedido {getOrderDisplayCode(order.id)}</h1><p className="m-0 text-[#5f5a57]"><time dateTime={order.createdAt}>{formatDateTime(order.createdAt)}</time></p></header>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        <section className="grid gap-4" aria-labelledby="order-items-title">
          <h2 id="order-items-title" className="m-0 text-2xl font-bold">Itens do pedido</h2>
          <ul className="m-0 grid list-none gap-4 p-0">
            {order.items.map((item) => (
              <li key={item.id} className="card grid gap-4 p-4 sm:grid-cols-[7rem_1fr]">
                <Image className="aspect-square w-full rounded-xl object-cover" src={item.image} alt={item.imageAlt} width={200} height={200} />
                <div className="grid gap-2"><div className="flex justify-between gap-3"><h3 className="m-0 text-lg font-semibold">{item.quantity} × {item.menuItemName}</h3><strong>{formatCurrency(item.totalPrice)}</strong></div>
                  {item.selectedOptions.length > 0 && <ul className="m-0 grid list-none gap-1 p-0 text-sm">{item.selectedOptions.map((option, index) => <li key={`${option.groupName}-${option.optionName}-${index}`}><strong>{option.groupName}:</strong> {option.optionName}</li>)}</ul>}
                  <p className="m-0 text-sm text-[#5f5a57]">{formatCurrency(item.unitPrice)} por unidade</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <aside className="card grid gap-4 p-5" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title" className="m-0 text-xl font-semibold">Resumo</h2>
          <dl className="m-0 grid gap-3">
            <div><dt className="text-sm text-[#5f5a57]">Nome para retirada</dt><dd className="m-0 font-semibold">{order.customerName}</dd></div>
            <div><dt className="text-sm text-[#5f5a57]">Retirada</dt><dd className="m-0 font-semibold">{fulfillmentMethodLabels[order.fulfillmentMethod]}</dd></div>
            <div><dt className="text-sm text-[#5f5a57]">Pagamento</dt><dd className="m-0 font-semibold">{paymentMethodLabels[order.paymentMethod]}</dd></div>
            {order.notes && <div><dt className="text-sm text-[#5f5a57]">Observações</dt><dd className="m-0 whitespace-pre-wrap">{order.notes}</dd></div>}
            <div className="flex justify-between border-t border-[#ded6d0] pt-3 text-lg"><dt>Total</dt><dd className="m-0 font-bold">{formatCurrency(order.total)}</dd></div>
          </dl>
          <p className="m-0 text-sm text-[#5f5a57]">Snapshot salvo no momento da confirmação.</p>
        </aside>
      </div>
    </div>
  );
}
