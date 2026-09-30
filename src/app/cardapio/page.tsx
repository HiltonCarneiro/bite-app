import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = { title: "Cardápio" };

export default function MenuPage() {
  return (
    <div className="container-page page-section section-stack">
      <PageHeading eyebrow="Cardápio" title="Escolha seus itens" description="Pesquise pelo nome, descrição ou categoria e use os filtros para encontrar o que procura." />
      <Suspense fallback={<p role="status">Carregando cardápio…</p>}><MenuBrowser /></Suspense>
    </div>
  );
}
