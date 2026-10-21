import { useState, type FormEvent } from 'react';
import { MAX_QUANTITY, addToCart, useCartQuantity } from '@/entities/cart';
import type { Product, Variant } from '@/entities/product';
import { Icon, QuantityInput, useToast } from '@/shared/ui';
import { toCartItem, variantTitle } from '../model/toCartItem';
import './add-to-cart.css';

/** Quantity + "В корзину" for the selected variant on the product page. */
export function AddToCartForm({ product, variant }: { product: Product; variant: Variant }) {
  const [quantity, setQuantity] = useState(1);
  const inCart = useCartQuantity(variant.sku);
  const toast = useToast();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    addToCart(toCartItem(product, variant), quantity);
    toast(`${variantTitle(product, variant)} × ${quantity} — добавлено в корзину`, { href: '/cart', label: 'Перейти в корзину' });
    setQuantity(1);
  };

  return (
    <form className="add-to-cart" onSubmit={submit}>
      <QuantityInput value={quantity} max={MAX_QUANTITY} onChange={setQuantity} label={`Количество: ${variantTitle(product, variant)}`} />
      <button className="button button--primary add-to-cart__submit" type="submit">
        <Icon name="cart" />
        В корзину
      </button>
      {inCart > 0 && (
        <p className="add-to-cart__status">
          <Icon name="check" /> В корзине: {inCart} шт.
        </p>
      )}
    </form>
  );
}
