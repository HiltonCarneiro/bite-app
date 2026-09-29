export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export type SelectionMode = "single" | "multiple";

export interface CustomizationOption {
  id: string;
  name: string;
  description?: string;
  priceDelta: number;
  available: boolean;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  selectionMode: SelectionMode;
  minSelections?: number;
  maxSelections?: number;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  imageAlt: string;
  customizationGroups: CustomizationGroup[];
  available: boolean;
}

export interface SelectedOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  image: string;
  imageAlt: string;
  basePrice: number;
  selectedOptions: SelectedOption[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  updatedAt: string;
}

export type PaymentMethod = "pix" | "card-at-counter" | "cash";
export type FulfillmentMethod = "pickup";

export interface CheckoutData {
  customerName: string;
  fulfillmentMethod: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export type OrderStatus = "confirmed";

export interface OrderSelectedOption {
  groupName: string;
  optionName: string;
  priceDelta: number;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  image: string;
  imageAlt: string;
  basePrice: number;
  selectedOptions: OrderSelectedOption[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  fulfillmentMethod: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
}

export type CustomizationSelections = Record<string, string[]>;

export interface CustomizationValidation {
  valid: boolean;
  errors: Record<string, string>;
}
