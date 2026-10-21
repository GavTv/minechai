import { Link } from 'react-router-dom';
import { summarize, useCartItems } from '@/entities/cart';
import { ROOT_CATEGORY } from '@/entities/category';
import { CheckoutForm } from '@/features/checkout-form';
import { formatPrice, useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs, EmptyState } from '@/shared/ui';
import './checkout-page.css';

export function CheckoutPage() {
  const summary = summarize(useCartItems());
  useDocumentTitle('Оформление заказа');

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина', href: '/cart' }, { label: 'Оформление заказа' }]} />
      <h1 className="page-title">Оформление заказа</h1>

      {summary.items.length === 0 ? (
        <EmptyState title="Корзина пуста" text="Чтобы оформить заказ, добавьте товары в корзину." action={{ href: ROOT_CATEGORY.href, label: 'Перейти в каталог' }} />
      ) : (
        <div className="checkout-page">
          <CheckoutForm />
          <aside className="checkout-page__order" aria-labelledby="order-title">
            <h2 className="checkout-page__title" id="order-title">Ваш заказ</h2>
            <ul className="checkout-page__items">
              {summary.items.map((item) => (
                <li key={item.sku}>
                  <span>
                    {item.name}
                    {item.variantLabel && `, ${item.variantLabel}`} × {item.quantity}
                  </span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>
            <p className="checkout-page__total">
              <span>Итого без доставки</span>
              <strong>{formatPrice(summary.total)}</strong>
            </p>
            <Link to="/cart">Изменить корзину</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
