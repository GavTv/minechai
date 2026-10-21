import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Product, Variant } from '../model/types';
import { Price } from './Price';
import { ProductImage } from './ProductImage';
import './product-card.css';

interface Props {
  product: Product;
  /** Slot for the per-variant action (add to cart), provided by a feature. */
  renderVariantAction?: (variant: Variant) => ReactNode;
}

export function ProductCard({ product, renderVariantAction }: Props) {
  const href = `/product/${product.slug}`;
  return (
    <article className="product-card">
      <Link className="product-card__image" to={href} tabIndex={-1} aria-hidden="true">
        <ProductImage src={product.image} alt={product.name} />
        {product.sale && <span className="product-card__badge">Скидка!</span>}
      </Link>
      <div className="product-card__content">
        {product.leaf && (
          <Link className="product-card__category" to={`/category-${product.leaf.slug}`} title={product.leaf.name}>{product.leaf.name}</Link>
        )}
        <h3 className="product-card__title">
          <Link to={href} title={product.name}>{product.name}</Link>
        </h3>
        {product.variants.length ? (
          <ul className="product-card__variants">
            {product.variants.map((variant) => (
              <li className="variant-row" key={variant.sku}>
                <span className="variant-row__info">
                  {variant.label && <span className="variant-row__label">{variant.label}</span>}
                  <span className="variant-row__sku">арт. {variant.sku}</span>
                </span>
                <Price price={variant.price} oldPrice={variant.oldPrice} />
                {renderVariantAction?.(variant)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="product-card__no-price">Цены не сохранены в локальной версии</p>
        )}
      </div>
    </article>
  );
}
