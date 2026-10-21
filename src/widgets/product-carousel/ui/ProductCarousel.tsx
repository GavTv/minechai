import { useRef } from 'react';
import { ProductCard, type Product } from '@/entities/product';
import { AddVariantButton } from '@/features/add-to-cart';
import { Icon } from '@/shared/ui';
import './product-carousel.css';

/** Horizontal strip with scroll snapping; arrows scroll by one visible page. */
export function ProductCarousel({ title, products }: { title: string; products: Product[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  if (!products.length) return null;

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="product-carousel" aria-label={title}>
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
        <div className="product-carousel__arrows">
          <button className="round-button" type="button" aria-label={`${title}: назад`} onClick={() => scroll(-1)}>
            <Icon name="chevron-left" />
          </button>
          <button className="round-button" type="button" aria-label={`${title}: вперёд`} onClick={() => scroll(1)}>
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>
      <ul className="product-carousel__track" ref={trackRef}>
        {products.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} renderVariantAction={(variant) => <AddVariantButton product={product} variant={variant} />} />
          </li>
        ))}
      </ul>
    </section>
  );
}
