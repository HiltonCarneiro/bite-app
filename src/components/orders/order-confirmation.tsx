"use client";

import Link from "next/link";
import { CheckCircle2, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, fulfillmentMethodLabels, getOrderDisplayCode } from "@/lib/format";
import { useOrderStore } from "@/store/order-store";

export function OrderConfirmation({ id }: { id: string }) {
  const orders = useOrderStore((state) => state.orders);
  const hasHydrated = useOrderStore((state) => state.hasHydrated);
  if (!hasHydrated) return <p role="status">Carregando confirmação…</p>;
  const order = orders.find((candidate) => candidate.id === id);
  if (!order) return <EmptyState icon={SearchX} title="Pedido não encontrado" description="Este pedido não está salvo neste navegador ou o endereço está incorreto." action={<Link className="button-primary" href="/pedidos">Ver pedidos</Link>} />;

  return (
    <section className="card mx-auto grid max-w-2xl justify-items-center gap-5 p-6 text-center sm:p-10">
      <span className="grid size-20 place-items-center rounded-full bg-[#edf7ed] text-[#2e7d32]"><CheckCircle2 aria-hidden="true" size={48} /></span>
      <div><p className="m-0 font-semibold text-[#2e7d32]">Pedido confirmado</p><h1 className="m-0 text-3xl font-bold">Tudo certo, {order.customerName}!</h1></div>
      <p className="m-0">Seu código de pedido é</p>
      <p className="m-0 rounded-xl bg-[#f7f4ee] px-5 py-3 text-2xl font-bold tracking-wide" aria-label={`Código do pedido ${getOrderDisplayCode(order.id)}`}>{getOrderDisplayCode(order.id)}</p>
      <dl className="m-0 grid w-full gap-3 text-left sm:grid-cols-2">
        <div className="rounded-xl border border-[#ded6d0] p-3"><dt className="text-sm text-[#5f5a57]">Status</dt><dd className="m-0 font-semibold">Confirmado</dd></div>
        <div className="rounded-xl border border-[#ded6d0] p-3"><dt className="text-sm text-[#5f5a57]">Total</dt><dd className="m-0 font-semibold">{formatCurrency(order.total)}</dd></div>
        <div className="rounded-xl border border-[#ded6d0] p-3 sm:col-span-2"><dt className="text-sm text-[#5f5a57]">Retirada</dt><dd className="m-0 font-semibold">{fulfillmentMethodLabels[order.fulfillmentMethod]}</dd></div>
      </dl>
      <p className="m-0 text-sm text-[#5f5a57]">Esta confirmação faz parte de uma simulação. Nenhuma cobrança foi realizada.</p>
      <div className="flex w-full flex-wrap justify-center gap-3"><Link className="button-primary flex-1" href={`/pedidos/${order.id}`}>Ver detalhes</Link><Link className="button-secondary flex-1" href="/cardapio">Voltar ao cardápio</Link></div>
    </section>
  );
}
