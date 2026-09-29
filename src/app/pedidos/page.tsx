import type { Metadata } from "next";
import { OrderHistory } from "@/components/orders/order-history";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = { title: "Pedidos" };

export default function OrdersPage() {
  return <div className="container-page page-section section-stack"><PageHeading eyebrow="Histórico" title="Meus pedidos" description="Consulte os pedidos confirmados e salvos neste navegador." /><OrderHistory /></div>;
}
