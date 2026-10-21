import { addToCart, useCartQuantity } from '@/entities/cart';
import type { Product, Variant } from '@/entities/product';
import { Icon, useToast } from '@/shared/ui';
import { toCartItem, variantTitle } from '../model/toCartItem';
import './add-to-cart.css';

/** Square cart button in a product card variant row: adds one pack per click. */
export function AddVariantButton({ product, variant }: { product: Product; variant: Variant }) {
  const inCart = useCartQuantity(variant.sku);
  const toast = useToast();

  const add = () => {
    addToCart(toCartItem(product, variant));
    toast(`${variantTitle(product, variant)} — добавлено в корзину`, { href: '/cart', label: 'Перейти в корзину' });
  };

  return (
    <button
      className={`add-variant ${inCart ? 'is-in-cart' : ''}`}
      type="button"
      onClick={add}
      aria-label={`Добавить в корзину: ${variantTitle(product, variant)}${inCart ? ` (в корзине: ${inCart})` : ''}`}
    >
      <Icon name="cart" />
      {inCart > 0 && <span className="add-variant__badge" aria-hidden="true">{inCart}</span>}
    </button>
  );
}
