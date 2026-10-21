import type { CartItem } from '@/entities/cart';
import { variantName, type Product, type Variant } from '@/entities/product';

export const toCartItem = (product: Product, variant: Variant): Omit<CartItem, 'quantity'> => ({
  sku: variant.sku,
  slug: product.slug,
  name: product.name,
  variantLabel: variantName(product, variant),
  image: product.image,
  price: variant.price,
  oldPrice: variant.oldPrice,
});

export const variantTitle = (product: Product, variant: Variant) => {
  const name = variantName(product, variant);
  return name ? `«${product.name}», ${name}` : `«${product.name}»`;
};
