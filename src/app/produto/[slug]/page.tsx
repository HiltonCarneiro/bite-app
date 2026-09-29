import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductCustomizer } from "@/components/menu/product-customizer";
import { findMenuItemBySlug, menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/format";

interface ProductPageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findMenuItemBySlug(slug);
  return item ? { title: item.name, description: item.description } : { title: "Produto não encontrado" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const item = findMenuItemBySlug(slug);
  if (!item) notFound();

  return (
    <div className="container-page page-section section-stack">
      <Link className="inline-flex min-h-11 w-fit items-center gap-1 rounded-lg font-semibold" href="/cardapio"><ChevronLeft aria-hidden="true" />Voltar ao cardápio</Link>
      <article className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="grid h-fit gap-4 lg:sticky lg:top-28">
          <Image className="card aspect-[4/3] w-full object-cover" src={item.image} alt={item.imageAlt} width={800} height={560} priority />
          <header className="grid gap-2">
            <h1 className="m-0 text-3xl font-bold leading-tight">{item.name}</h1>
            {!item.available && <p className="error-message m-0" role="status">Indisponível no momento</p>}
            <p className="m-0 text-[#5f5a57]">{item.description}</p>
            <p className="m-0 text-lg font-semibold">A partir de {formatCurrency(item.basePrice)}</p>
          </header>
        </div>
        {item.available ? <ProductCustomizer item={item} /> : (
          <section className="card h-fit p-6"><h2 className="m-0 text-xl font-semibold">Item temporariamente indisponível</h2><p>Volte ao cardápio para consultar os demais itens.</p><Link className="button-primary" href="/cardapio">Ver outros itens</Link></section>
        )}
      </article>
    </div>
  );
}
