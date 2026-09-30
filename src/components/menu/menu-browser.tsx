"use client";

import { Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/menu/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { categories, sortedMenuItems } from "@/data/menu";
import { normalizeSearchText } from "@/lib/search";

const categoryNames = new Map(categories.map((category) => [category.id, category.name]));

export function MenuBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = categories.find((category) => category.slug === searchParams.get("categoria"))?.id ?? "all";
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    const syncCategoryWithUrl = () => {
      const slug = new URLSearchParams(window.location.search).get("categoria");
      setCategoryId(categories.find((category) => category.slug === slug)?.id ?? "all");
    };
    window.addEventListener("popstate", syncCategoryWithUrl);
    return () => window.removeEventListener("popstate", syncCategoryWithUrl);
  }, []);

  useEffect(() => {
    if (!lastAdded) return;
    const timeout = window.setTimeout(() => setLastAdded(null), 4_000);
    return () => window.clearTimeout(timeout);
  }, [lastAdded]);

  const selectCategory = (nextCategoryId: string) => {
    setCategoryId(nextCategoryId);
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategory = categories.find((category) => category.id === nextCategoryId);
    if (selectedCategory) params.set("categoria", selectedCategory.slug);
    else params.delete("categoria");
    const queryString = params.toString();
    window.history.pushState(null, "", queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname);
  };

  const visibleItems = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    return sortedMenuItems.filter((item) => {
      const matchesCategory = categoryId === "all" || item.categoryId === categoryId;
      const searchableText = normalizeSearchText([
        item.name,
        item.description,
        categoryNames.get(item.categoryId) ?? "",
      ].join(" "));
      const matchesSearch = searchableText.includes(normalizedQuery);
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
              className="field-input px-10"
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex.: massa ou suco"
            />
            {query && (
              <button className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg hover:bg-[#eee8df]" type="button" onClick={() => setQuery("")} aria-label="Limpar pesquisa">
                <X aria-hidden="true" size={20} />
              </button>
            )}
          </div>
        </div>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="mb-2 font-semibold">Filtrar por categoria</legend>
          <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Categorias disponíveis">
            {[{ id: "all", name: "Todos" }, ...categories].map((category) => {
              const selected = categoryId === category.id;
              return (
                <label key={category.id} className={`relative flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border-2 px-4 font-semibold ${selected ? "border-[#c95000] bg-[#f7e5d7]" : "border-[#81756e] bg-white hover:bg-[#f7f4ee]"}`}>
                  <input className="sr-only" type="radio" name="category" value={category.id} checked={selected} onChange={() => selectCategory(category.id)} />
                  {category.name}{selected && <span className="ml-2" aria-hidden="true">✓</span>}
                  {selected && <span className="sr-only">, selecionado</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {lastAdded && <p className="status-message m-0" role="status">✓ {lastAdded} adicionado ao carrinho.</p>}
      <p className="m-0" aria-live="polite">{visibleItems.length} {visibleItems.length === 1 ? "item encontrado" : "itens encontrados"}.</p>
      {visibleItems.length > 0 ? (
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => <li key={item.id}><ProductCard item={item} onAdded={setLastAdded} /></li>)}
        </ul>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Nenhum item encontrado"
          description="Nenhum item foi encontrado com esses filtros. Tente outro termo ou categoria."
          action={<button className="button-secondary" type="button" onClick={() => { setQuery(""); selectCategory("all"); }}>Limpar filtros</button>}
        />
      )}
    </div>
  );
}
