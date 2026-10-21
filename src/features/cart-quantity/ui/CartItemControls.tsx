import { MAX_QUANTITY, removeFromCart, setQuantity, type CartItem } from '@/entities/cart';
import { Icon, QuantityInput, useToast } from '@/shared/ui';
import './cart-item-controls.css';

const itemTitle = (item: CartItem) => `${item.name}${item.variantLabel ? `, ${item.variantLabel}` : ''}`;

export function CartQuantity({ item }: { item: CartItem }) {
  return (
    <QuantityInput
      value={item.quantity}
      max={MAX_QUANTITY}
      onChange={(value) => setQuantity(item.sku, value)}
      label={`Количество: ${itemTitle(item)}`}
    />
  );
}

export function RemoveFromCartButton({ item }: { item: CartItem }) {
  const toast = useToast();
  return (
    <button
      className="remove-item"
      type="button"
      aria-label={`Удалить из корзины: ${itemTitle(item)}`}
      onClick={() => {
        removeFromCart(item.sku);
        toast(`«${itemTitle(item)}» — удалено из корзины`);
      }}
    >
      <Icon name="trash" />
    </button>
  );
}
