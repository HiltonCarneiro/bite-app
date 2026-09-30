import type { Metadata } from "next";
import { Suspense } from "react";
import { CartView } from "@/components/cart/cart-view";
import { CartLoadingSkeleton } from "@/components/ui/loading-skeletons";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = { title: "Carrinho" };

export default function CartPage() {
  return (
    <div className="container-page page-section section-stack">
      <PageHeading eyebrow="Carrinho" title="Revise seu pedido" description="Altere quantidades, edite personalizações ou remova itens antes de continuar." />
      <Suspense fallback={<CartLoadingSkeleton />}><CartView /></Suspense>
    </div>
  );
}
