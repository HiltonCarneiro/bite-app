"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings2, ShoppingCart } from "lucide-react";
import { createCartItem } from "@/domain/cart";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import type { MenuItem } from "@/types";

interface ProductCardProps {
  item: MenuItem;
  onAdded?: (itemName: string) => void;
}

export function ProductCard({ item, onAdded }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const hasCustomizations = item.customizationGroups.length > 0;
  const hasVariablePrice = item.customizationGroups.some((group) =>
    group.options.some((option) => option.priceDelta > 0),
  );

  const handleAdd = () => {
    addItem(createCartItem(item, {}, 1));
    onAdded?.(item.name);
  };

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Image
        className="aspect-[4/3] w-full object-cover"
        src={item.image}
        alt={item.imageAlt}
        width={800}
        height={600}
        sizes="(min-width: 1280px) 270px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid gap-1">
          <h2 className="m-0 text-xl font-semibold">{item.name}</h2>
          {!item.available && <p className="m-0 font-semibold text-[#9d1522]">Indisponível no momento</p>}
        </div>
        <p className="m-0 flex-1 text-sm text-[#5f5a57]">{item.description}</p>
        <p className="m-0 font-semibold">{hasVariablePrice ? "A partir de " : ""}{formatCurrency(item.basePrice)}</p>
        {item.available && hasCustomizations ? (
          <Link className="button-secondary mt-auto w-full" href={`/produto/${item.slug}`}><Settings2 aria-hidden="true" size={18} />Personalizar</Link>
        ) : item.available ? (
          <button className="button-secondary mt-auto w-full" type="button" onClick={handleAdd} disabled={!hasHydrated}><ShoppingCart aria-hidden="true" size={18} />Adicionar</button>
        ) : (
          <button className="button-secondary mt-auto w-full" type="button" disabled aria-disabled="true">Item indisponível</button>
        )}
      </div>
    </article>
  );
}
