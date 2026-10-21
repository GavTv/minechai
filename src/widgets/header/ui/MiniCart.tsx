import { Link } from 'react-router-dom';
import { summarize, useCartItems } from '@/entities/cart';
import { ProductImage } from '@/entities/product';
import { RemoveFromCartButton } from '@/features/cart-quantity';
import { formatPrice } from '@/shared/lib';
import { Drawer, EmptyState } from '@/shared/ui';

export function MiniCart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const summary = summarize(useCartItems());
  const empty = summary.items.length === 0;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Корзина"
      footer={
        !empty && (
          <div className="mini-cart__footer">
            <p className="mini-cart__total">
              <span>Итого:</span> <strong>{formatPrice(summary.total)}</strong>
            </p>
            {summary.totalWithoutDiscount > summary.total && (
              <p className="mini-cart__subtotal">Итого без скидок: <s>{formatPrice(summary.totalWithoutDiscount)}</s></p>
            )}
            <div className="mini-cart__actions">
              <Link className="button button--outline" to="/cart" onClick={onClose}>В корзину</Link>
              <Link className="button button--primary" to="/checkout-dispatcher" onClick={onClose}>Заказать</Link>
            </div>
          </div>
        )
      }
    >
      {empty ? (
        <EmptyState title="Ваша корзина пуста" text="Добавьте товары из каталога." />
      ) : (
        <ul className="mini-cart__list">
          {summary.items.map((item) => (
            <li className="mini-cart__item" key={item.sku}>
              <Link className="mini-cart__image" to={`/product/${item.slug}`} onClick={onClose} tabIndex={-1} aria-hidden="true">
                <ProductImage src={item.image} alt={item.name} />
              </Link>
              <div className="mini-cart__info">
                <Link className="mini-cart__name" to={`/product/${item.slug}`} onClick={onClose}>{item.name}</Link>
                <span className="mini-cart__meta">
                  {item.variantLabel && `${item.variantLabel} · `}
                  {item.quantity} × {formatPrice(item.price)}
                </span>
              </div>
              <RemoveFromCartButton item={item} />
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
