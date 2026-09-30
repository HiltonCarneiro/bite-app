import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container-page page-section section-stack">
      <PageHeading eyebrow="Checkout" title="Finalize seu pedido" description="Informe os dados para retirada e escolha como deseja pagar no balcão." />
      <CheckoutForm />
    </div>
  );
}
