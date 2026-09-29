import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = { title: "Cardápio" };

export default function MenuPage() {
  return (
    <div className="container-page page-section section-stack">
      <PageHeading eyebrow="Cardápio" title="Escolha sua refeição" description="Pesquise os itens e use os filtros para encontrar o que procura. A ordem é fixa por categoria e nome." />
      <Suspense fallback={<p role="status">Carregando cardápio…</p>}><MenuBrowser /></Suspense>
    </div>
  );
}
