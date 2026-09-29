"use client";

import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/menu/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { categories, sortedMenuItems } from "@/data/menu";

export function MenuBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = categories.find((category) => category.slug === searchParams.get("categoria"))?.id ?? "all";
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return sortedMenuItems.filter((item) => {
      const matchesCategory = categoryId === "all" || item.categoryId === categoryId;
      const matchesSearch = item.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [categoryId, query]);

  return (
    <div className="section-stack">
      <div className="card grid gap-5 p-4 sm:p-6">
        <div>
          <label className="field-label" htmlFor="menu-search">Pesquisar no cardápio</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" size={20} />
            <input
              className="field-input pl-10"
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex.: massa ou hambúrguer"
            />
          </div>
        </div>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 font-semibold">Filtrar por categoria</legend>
          <div className="flex flex-wrap gap-2">
            {[{ id: "all", name: "Todos" }, ...categories].map((category) => {
              const selected = categoryId === category.id;
              return (
                <label key={category.id} className={`flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 font-semibold ${selected ? "border-[#c95000] bg-[#f7e5d7]" : "border-[#81756e] bg-white"}`}>
                  <input className="sr-only" type="radio" name="category" value={category.id} checked={selected} onChange={() => setCategoryId(category.id)} />
                  {category.name}{selected && <span className="ml-2" aria-hidden="true">✓</span>}
                  {selected && <span className="sr-only">, selecionado</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <p className="m-0" aria-live="polite">{visibleItems.length} {visibleItems.length === 1 ? "item encontrado" : "itens encontrados"}.</p>
      {visibleItems.length > 0 ? (
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => <li key={item.id}><ProductCard item={item} /></li>)}
        </ul>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Nenhum item encontrado"
          description="Altere o termo de pesquisa ou selecione outra categoria."
          action={<button className="button-secondary" type="button" onClick={() => { setQuery(""); setCategoryId("all"); }}>Limpar filtros</button>}
        />
      )}
    </div>
  );
}
