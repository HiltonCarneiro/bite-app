"use client";

import { AlertCircle, Check, ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuantityControl } from "@/components/cart/quantity-control";
import { calculateConfiguredUnitPrice, createCartItem, selectionsToOptions, validateCustomizationSelections } from "@/domain/cart";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import type { CartItem, CustomizationSelections, MenuItem } from "@/types";

export function ProductCustomizer({ item }: { item: MenuItem }) {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editar");
  const cartItems = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const editingItem = editId ? cartItems.find((cartItem) => cartItem.id === editId && cartItem.menuItemId === item.id) : undefined;

  if (!hasHydrated) return <p role="status">Carregando opções do produto…</p>;

  return <ProductCustomizerReady key={editId ?? "new-item"} item={item} editId={editId} editingItem={editingItem} />;
}

interface ProductCustomizerReadyProps {
  item: MenuItem;
  editId: string | null;
  editingItem?: CartItem;
}

function ProductCustomizerReady({ item, editId, editingItem }: ProductCustomizerReadyProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const replaceItem = useCartStore((state) => state.replaceItem);
  const [selections, setSelections] = useState<CustomizationSelections>(() =>
    editingItem
      ? editingItem.selectedOptions.reduce<CustomizationSelections>((result, option) => ({
        ...result,
        [option.groupId]: [...(result[option.groupId] ?? []), option.optionId],
      }), {})
      : {},
  );
  const [quantity, setQuantity] = useState(editingItem?.quantity ?? 1);

  const validation = useMemo(() => validateCustomizationSelections(item, selections), [item, selections]);
  const selectedOptions = useMemo(() => selectionsToOptions(item, selections), [item, selections]);
  const unitPrice = calculateConfiguredUnitPrice(item.basePrice, selectedOptions);
  const total = unitPrice * quantity;

  const toggleOption = (groupId: string, optionId: string, mode: "single" | "multiple", maxSelections?: number) => {
    setSelections((current) => {
      const selected = current[groupId] ?? [];
      if (mode === "single") return { ...current, [groupId]: selected.includes(optionId) ? [] : [optionId] };
      if (selected.includes(optionId)) return { ...current, [groupId]: selected.filter((id) => id !== optionId) };
      if (maxSelections && selected.length >= maxSelections) return current;
      return { ...current, [groupId]: [...selected, optionId] };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validation.valid || !item.available) return;
    const configuredItem = createCartItem(item, selections, quantity, editingItem?.id);
    if (editingItem) replaceItem(editingItem.id, configuredItem);
    else addItem(configuredItem);
    router.push(editingItem ? "/carrinho?atualizado=1" : "/carrinho?adicionado=1");
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
      {editId && !editingItem && (
        <p className="error-message" role="alert"><AlertCircle aria-hidden="true" size={20} />Não foi possível localizar este item no carrinho. Você pode criar uma nova configuração.</p>
      )}
      {item.customizationGroups.length === 0 && (
        <section className="card p-4" aria-labelledby="no-customization-title">
          <h2 id="no-customization-title" className="m-0 text-lg font-semibold">Sem personalizações</h2>
          <p className="m-0 mt-1 text-sm text-[#5f5a57]">Escolha a quantidade para adicionar ao carrinho.</p>
        </section>
      )}
      {item.customizationGroups.map((group) => {
        const selectedIds = selections[group.id] ?? [];
        const instructionId = `${group.id}-instruction`;
        const errorId = `${group.id}-error`;
        const maximumReached = group.selectionMode === "multiple" && !!group.maxSelections && selectedIds.length >= group.maxSelections;
        return (
          <fieldset key={group.id} className="m-0 grid gap-3 rounded-2xl border border-[#c8bdb5] bg-white p-4" aria-describedby={`${instructionId}${validation.errors[group.id] ? ` ${errorId}` : ""}`}>
            <legend className="px-2 text-lg font-semibold">{group.name} {group.required ? <span className="text-sm font-normal">(obrigatório)</span> : <span className="text-sm font-normal">(opcional)</span>}</legend>
            <p id={instructionId} className="m-0 text-sm text-[#5f5a57]">{group.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.options.map((option) => {
                const selected = selectedIds.includes(option.id);
                const disabled = !option.available || (!selected && maximumReached);
                return (
                  <label key={option.id} className={`relative flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border-2 p-3 ${selected ? "border-[#c95000] bg-[#f7e5d7]" : "border-[#81756e] bg-white"} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}>
                    <input
                      className="size-5 shrink-0 accent-[#c95000]"
                      type={group.selectionMode === "single" ? "radio" : "checkbox"}
                      name={group.id}
                      value={option.id}
                      checked={selected}
                      disabled={disabled}
                      onChange={() => toggleOption(group.id, option.id, group.selectionMode, group.maxSelections)}
                    />
                    <span className="grid flex-1 gap-1">
                      <span className="font-semibold">{option.name}</span>
                      {option.description && <span className="text-sm text-[#5f5a57]">{option.description}</span>}
                      <span className="text-sm">
                        {option.priceDelta === 0
                          ? group.name === "Retirar ingredientes" ? "Sem alteração no preço" : "Sem acréscimo"
                          : `+ ${formatCurrency(option.priceDelta)}`}
                      </span>
                      {!option.available && <span className="text-sm font-semibold">Indisponível</span>}
                    </span>
                    {selected && <Check aria-label="Selecionado" size={22} />}
                  </label>
                );
              })}
            </div>
            {!group.required && group.selectionMode === "single" && selectedIds.length > 0 && (
              <button
                className="button-secondary w-fit"
                type="button"
                onClick={() => setSelections((current) => ({ ...current, [group.id]: [] }))}
              >
                Limpar esta escolha
              </button>
            )}
            {validation.errors[group.id] && <p id={errorId} className="error-message m-0"><AlertCircle aria-hidden="true" size={18} />{validation.errors[group.id]}</p>}
          </fieldset>
        );
      })}

      <section className="card grid gap-4 p-4" aria-labelledby="quantity-title">
        <div><h2 id="quantity-title" className="m-0 text-lg font-semibold">Quantidade</h2><p className="m-0 text-sm text-[#5f5a57]">Escolha quantas unidades deseja adicionar.</p></div>
        <QuantityControl value={quantity} onChange={setQuantity} />
      </section>

      <div className="grid gap-3 rounded-2xl border border-[#ded6d0] bg-white p-4 shadow-lg sm:sticky sm:bottom-3 sm:z-20 sm:grid-cols-[1fr_auto] sm:items-center">
        <div><p className="m-0 text-sm text-[#5f5a57]">Total desta configuração</p><p className="m-0 text-2xl font-bold" aria-live="polite">{formatCurrency(total)}</p></div>
        <button className="button-primary" type="submit" disabled={!validation.valid || !item.available} aria-describedby={!validation.valid ? "submit-help" : undefined}>
          <ShoppingCart aria-hidden="true" size={20} />{editingItem ? "Salvar alterações" : "Adicionar ao carrinho"}
        </button>
        {!validation.valid && <p id="submit-help" className="m-0 text-sm text-[#5f5a57] sm:col-span-2">Complete as escolhas obrigatórias indicadas acima para continuar.</p>}
      </div>
    </form>
  );
}
