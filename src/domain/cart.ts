import { createId } from "@/lib/ids";
import type {
  CartItem,
  CustomizationSelections,
  CustomizationValidation,
  MenuItem,
  SelectedOption,
} from "@/types";

export const calculateConfiguredUnitPrice = (
  basePrice: number,
  selectedOptions: Pick<SelectedOption, "priceDelta">[],
) => Math.max(0, basePrice + selectedOptions.reduce((sum, option) => sum + option.priceDelta, 0));

export const calculateCartItemTotal = (unitPrice: number, quantity: number) =>
  unitPrice * quantity;

export const calculateCartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + calculateCartItemTotal(item.unitPrice, item.quantity), 0);

export function validateCustomizationSelections(
  item: MenuItem,
  selections: CustomizationSelections,
): CustomizationValidation {
  const errors: Record<string, string> = {};

  for (const group of item.customizationGroups) {
    const selectedIds = selections[group.id] ?? [];
    const availableIds = new Set(group.options.filter((option) => option.available).map((option) => option.id));
    const validIds = selectedIds.filter((id) => availableIds.has(id));
    const minimum = group.minSelections ?? (group.required ? 1 : 0);
    const maximum = group.maxSelections ?? (group.selectionMode === "single" ? 1 : group.options.length);

    if (validIds.length < minimum) {
      errors[group.id] = minimum === 1 ? `Selecione uma opção em ${group.name}.` : `Selecione pelo menos ${minimum} opções em ${group.name}.`;
    } else if (validIds.length > maximum) {
      errors[group.id] = `Selecione no máximo ${maximum} opções em ${group.name}.`;
    } else if (validIds.length !== selectedIds.length) {
      errors[group.id] = `Uma opção selecionada em ${group.name} não está disponível.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function selectionsToOptions(
  item: MenuItem,
  selections: CustomizationSelections,
): SelectedOption[] {
  return item.customizationGroups.flatMap((group) =>
    (selections[group.id] ?? []).flatMap((optionId) => {
      const option = group.options.find((candidate) => candidate.id === optionId);
      return option
        ? [{
            groupId: group.id,
            groupName: group.name,
            optionId: option.id,
            optionName: option.name,
            priceDelta: option.priceDelta,
          }]
        : [];
    }),
  );
}

export function createCartItem(
  item: MenuItem,
  selections: CustomizationSelections,
  quantity: number,
  id = createId(),
): CartItem {
  if (!item.available) throw new Error("Este item não está disponível.");
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error("A quantidade deve ser um número inteiro maior que zero.");

  const validation = validateCustomizationSelections(item, selections);
  if (!validation.valid) throw new Error(Object.values(validation.errors)[0]);

  const selectedOptions = selectionsToOptions(item, selections);
  const unitPrice = calculateConfiguredUnitPrice(item.basePrice, selectedOptions);

  return {
    id,
    menuItemId: item.id,
    menuItemName: item.name,
    image: item.image,
    imageAlt: item.imageAlt,
    basePrice: item.basePrice,
    selectedOptions,
    quantity,
    unitPrice,
    totalPrice: calculateCartItemTotal(unitPrice, quantity),
  };
}
