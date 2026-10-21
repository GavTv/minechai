import { Link } from 'react-router-dom';
import { clearCart, summarize, useCartItems } from '@/entities/cart';
import { ROOT_CATEGORY } from '@/entities/category';
import { Price, ProductImage } from '@/entities/product';
import { CartQuantity, RemoveFromCartButton } from '@/features/cart-quantity';
import { formatPrice, pluralize, useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs, EmptyState } from '@/shared/ui';
import './cart-page.css';

export function CartPage() {
  const summary = summarize(useCartItems());
  useDocumentTitle('Корзина');

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина' }]} />
      <h1 className="page-title">Корзина</h1>

      {summary.items.length === 0 ? (
        <EmptyState title="Ваша корзина пуста" text="Добавьте товары из каталога — корзина сохранится в этом браузере." action={{ href: ROOT_CATEGORY.href, label: 'Перейти в каталог' }} />
      ) : (
        <div className="cart-page">
          <div className="cart-page__items">
            <table className="cart-table">
              <caption className="visually-hidden">Товары в корзине</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="visually-hidden">Фото</span></th>
                  <th scope="col">Товар</th>
                  <th scope="col">Цена</th>
                  <th scope="col">Количество</th>
                  <th scope="col">Сумма</th>
                  <th scope="col"><span className="visually-hidden">Удалить</span></th>
                </tr>
              </thead>
              <tbody>
                {summary.items.map((item) => (
                  <tr key={item.sku}>
                    <td className="cart-table__image">
                      <ProductImage src={item.image} alt={item.name} />
                    </td>
                    <td className="cart-table__name">
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      <span className="cart-table__meta">
                        {item.variantLabel && `${item.variantLabel} · `}арт: {item.sku}
                      </span>
                    </td>
                    <td className="cart-table__price" data-label="Цена">
                      <Price price={item.price} oldPrice={item.oldPrice} />
                    </td>
                    <td className="cart-table__qty" data-label="Количество">
                      <CartQuantity item={item} />
                    </td>
                    <td className="cart-table__sum" data-label="Сумма">{formatPrice(item.price * item.quantity)}</td>
                    <td className="cart-table__remove">
                      <RemoveFromCartButton item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-page__links">
              <Link to={ROOT_CATEGORY.href}>← Продолжить покупки</Link>
              <button className="button button--outline" type="button" onClick={clearCart}>Очистить корзину</button>
            </div>
          </div>

          <aside className="cart-summary" aria-label="Итого">
            <p className="cart-summary__row">
              <span>{summary.count} {pluralize(summary.count, ['товар', 'товара', 'товаров'])}</span>
              <span>{formatPrice(summary.totalWithoutDiscount)}</span>
            </p>
            {summary.totalWithoutDiscount > summary.total && (
              <p className="cart-summary__row cart-summary__row--discount">
                <span>Скидка</span>
                <span>−{formatPrice(summary.totalWithoutDiscount - summary.total)}</span>
              </p>
            )}
            <p className="cart-summary__row cart-summary__row--total">
              <span>Итого</span>
              <strong>{formatPrice(summary.total)}</strong>
            </p>
            <p className="cart-summary__note">Без учёта доставки. Условия — на странице <Link to="/shipping/">«Методы доставки»</Link>.</p>
            <Link className="button button--primary button--block" to="/checkout-dispatcher">Оформить заказ</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
