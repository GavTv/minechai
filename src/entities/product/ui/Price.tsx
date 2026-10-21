import { formatPrice } from '@/shared/lib';
import './price.css';

export function Price({ price, oldPrice, size = 'md' }: { price: number; oldPrice: number | null; size?: 'md' | 'lg' }) {
  const sale = oldPrice !== null && oldPrice > price;
  return (
    <span className={`price price--${size} ${sale ? 'price--sale' : ''}`}>
      <span className="price__current">
        <span className="visually-hidden">Цена: </span>
        {formatPrice(price)}
      </span>
      {sale && (
        <s className="price__old">
          <span className="visually-hidden">Старая цена: </span>
          {formatPrice(oldPrice)}
        </s>
      )}
    </span>
  );
}
