import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/orders/order-confirmation";

export const metadata: Metadata = { title: "Pedido confirmado" };

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="container-page page-section"><OrderConfirmation id={id} /></div>;
}
