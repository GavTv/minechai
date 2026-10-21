import { createPersistentStore, useStore } from '@/shared/lib';

export interface CartItem {
  sku: string;
  slug: string;
  name: string;
  /** Pack label, e.g. "100 г"; null for single-item goods. */
  variantLabel: string | null;
  image: string | null;
  price: number;
  oldPrice: number | null;
  quantity: number;
}

export const MAX_QUANTITY = 99;

const cartStore = createPersistentStore<CartItem[]>('teaboom:cart', []);

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity) || 1));

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
  cartStore.set((items) => {
    const existing = items.find((entry) => entry.sku === item.sku);
    if (existing) {
      return items.map((entry) => (entry.sku === item.sku ? { ...entry, quantity: clamp(entry.quantity + quantity) } : entry));
    }
    return [...items, { ...item, quantity: clamp(quantity) }];
  });
}

export function setQuantity(sku: string, quantity: number): void {
  cartStore.set((items) => items.map((entry) => (entry.sku === sku ? { ...entry, quantity: clamp(quantity) } : entry)));
}

export function removeFromCart(sku: string): void {
  cartStore.set((items) => items.filter((entry) => entry.sku !== sku));
}

export function clearCart(): void {
  cartStore.set([]);
}

export interface CartSummary {
  items: CartItem[];
  count: number;
  total: number;
  totalWithoutDiscount: number;
}

export function summarize(items: CartItem[]): CartSummary {
  return items.reduce<CartSummary>(
    (summary, item) => ({
      items,
      count: summary.count + item.quantity,
      total: summary.total + item.price * item.quantity,
      totalWithoutDiscount: summary.totalWithoutDiscount + (item.oldPrice ?? item.price) * item.quantity,
    }),
    { items, count: 0, total: 0, totalWithoutDiscount: 0 },
  );
}

export const useCartItems = () => useStore(cartStore);

export const useCartQuantity = (sku: string) => useCartItems().find((item) => item.sku === sku)?.quantity ?? 0;
