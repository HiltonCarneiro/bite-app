import type { Metadata } from "next";
import { OrderDetails } from "@/components/orders/order-details";

export const metadata: Metadata = { title: "Detalhes do pedido" };

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="container-page page-section"><OrderDetails id={id} /></div>;
}
