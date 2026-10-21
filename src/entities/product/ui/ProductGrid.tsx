import type { ReactNode } from 'react';
import type { Product, Variant } from '../model/types';
import { ProductCard } from './ProductCard';
import './product-grid.css';

interface Props {
  products: Product[];
  renderVariantAction?: (product: Product, variant: Variant) => ReactNode;
}

export function ProductGrid({ products, renderVariantAction }: Props) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} renderVariantAction={renderVariantAction && ((variant) => renderVariantAction(product, variant))} />
        </li>
      ))}
    </ul>
  );
}
