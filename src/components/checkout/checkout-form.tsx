"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmptyState } from "@/components/ui/empty-state";
import { calculateCartSubtotal } from "@/domain/cart";
import { createOrderSnapshot } from "@/domain/order";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import type { CheckoutData, PaymentMethod } from "@/types";
import { ShoppingCart } from "lucide-react";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Informe um nome com pelo menos 2 caracteres.").max(80, "Use no máximo 80 caracteres."),
  fulfillmentMethod: z.literal("pickup"),
  paymentMethod: z.enum(["pix", "card-at-counter", "cash"], { error: "Selecione um método de pagamento." }),
  notes: z.string().trim().max(300, "Use no máximo 300 caracteres.").optional(),
});

const paymentOptions: { value: PaymentMethod; label: string; description: string }[] = [
  { value: "pix", label: "PIX", description: "Pagamento simulado por PIX na retirada." },
  { value: "card-at-counter", label: "Cartão no balcão", description: "Pagamento simulado com cartão no momento da retirada." },
  { value: "cash", label: "Dinheiro", description: "Pagamento simulado em dinheiro no momento da retirada." },
];

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: "", fulfillmentMethod: "pickup", notes: "" },
  });

  if (!hasHydrated) return <p role="status">Carregando checkout…</p>;
  if (items.length === 0) return <EmptyState icon={ShoppingCart} title="Não há itens para finalizar" description="Adicione ao menos um item ao carrinho antes de abrir o checkout." action={<Link className="button-primary" href="/cardapio">Ver cardápio</Link>} />;

  const subtotal = calculateCartSubtotal(items);
  const onSubmit = (data: CheckoutData) => {
    const order = createOrderSnapshot(items, data);
    addOrder(order);
    clearCart();
    router.push(`/pedido/${order.id}/confirmado`);
  };

  return (
    <form className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-start" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5">
        <section className="card grid gap-4 p-5" aria-labelledby="pickup-data-title">
          <div><h2 id="pickup-data-title" className="m-0 text-xl font-semibold">Dados para retirada</h2><p className="m-0 text-sm text-[#5f5a57]">Campos marcados como obrigatórios devem ser preenchidos.</p></div>
          <div>
            <label className="field-label" htmlFor="customer-name">Nome para retirada (obrigatório)</label>
            <input className="field-input" id="customer-name" autoComplete="name" aria-invalid={!!errors.customerName} aria-describedby={errors.customerName ? "customer-name-error" : "customer-name-hint"} {...register("customerName")} />
            <p id="customer-name-hint" className="field-hint m-0 mt-1">Este nome será usado para identificar o pedido no balcão.</p>
            {errors.customerName && <p id="customer-name-error" className="error-message m-0 mt-1" role="alert"><AlertCircle aria-hidden="true" size={18} />{errors.customerName.message}</p>}
          </div>
          <input type="hidden" value="pickup" {...register("fulfillmentMethod")} />
          <div className="rounded-xl border-2 border-[#81756e] p-4"><h3 className="m-0 text-base font-semibold">Método de retirada</h3><p className="m-0">Retirada no balcão</p><p className="m-0 text-sm text-[#5f5a57]">Esta é a única modalidade disponível neste protótipo.</p></div>
        </section>

        <fieldset className="card m-0 grid gap-4 border p-5" aria-describedby={errors.paymentMethod ? "payment-error" : "payment-hint"}>
          <legend className="px-2 text-xl font-semibold">Método de pagamento (obrigatório)</legend>
          <p id="payment-hint" className="m-0 text-sm text-[#5f5a57]">Escolha como deseja simular o pagamento. Nenhuma opção vem selecionada.</p>
          <div className="grid gap-3">
            {paymentOptions.map((option) => (
              <label key={option.value} className="flex min-h-20 cursor-pointer items-start gap-3 rounded-xl border-2 border-[#81756e] bg-white p-3 has-[:checked]:border-[#c95000] has-[:checked]:bg-[#f7e5d7]">
                <input className="mt-1 size-5 accent-[#c95000]" type="radio" value={option.value} {...register("paymentMethod")} />
                <span><span className="block font-semibold">{option.label}</span><span className="block text-sm text-[#5f5a57]">{option.description}</span></span>
              </label>
            ))}
          </div>
          {errors.paymentMethod && <p id="payment-error" className="error-message m-0" role="alert"><AlertCircle aria-hidden="true" size={18} />{errors.paymentMethod.message}</p>}
        </fieldset>

        <section className="card grid gap-3 p-5" aria-labelledby="notes-title">
          <div><h2 id="notes-title" className="m-0 text-xl font-semibold">Observações</h2><p className="m-0 text-sm text-[#5f5a57]">Campo opcional, com até 300 caracteres.</p></div>
          <label className="field-label" htmlFor="notes">Observações do pedido (opcional)</label>
          <textarea className="field-input min-h-28 resize-y" id="notes" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? "notes-error" : undefined} {...register("notes")} />
          {errors.notes && <p id="notes-error" className="error-message m-0" role="alert"><AlertCircle aria-hidden="true" size={18} />{errors.notes.message}</p>}
        </section>
      </div>

      <aside className="card grid gap-4 p-5 lg:sticky lg:top-28" aria-labelledby="checkout-summary-title">
        <h2 id="checkout-summary-title" className="m-0 text-xl font-semibold">Resumo do pedido</h2>
        <ul className="m-0 grid list-none gap-3 p-0">
          {items.map((item) => <li key={item.id} className="flex justify-between gap-3 border-b border-[#ded6d0] pb-3"><span>{item.quantity} × {item.menuItemName}</span><strong>{formatCurrency(item.unitPrice * item.quantity)}</strong></li>)}
        </ul>
        <dl className="m-0 flex justify-between gap-4 text-lg"><dt>Total</dt><dd className="m-0 font-bold">{formatCurrency(subtotal)}</dd></dl>
        <p className="m-0 flex items-start gap-2 text-sm text-[#5f5a57]"><LockKeyhole aria-hidden="true" className="shrink-0" size={20} />Nenhum dado financeiro real será solicitado ou armazenado.</p>
        <button className="button-primary w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Confirmando…" : "Confirmar pedido"}</button>
        <Link className="button-secondary w-full" href="/carrinho">Voltar ao carrinho</Link>
      </aside>
    </form>
  );
}
