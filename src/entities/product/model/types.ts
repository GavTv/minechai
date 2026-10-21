export interface Variant {
  /** Pack label as on the original, e.g. "100 г"; null for single-item goods. */
  label: string | null;
  sku: string;
  /** Stock label from the original: "Много", "В наличии", "Мало". */
  stock: string | null;
  price: number;
  oldPrice: number | null;
}

export interface ProductDetails {
  descriptionHtml: string;
  properties: { name: string; value: string }[];
  similar: string[];
  noReviews: boolean;
}

export interface Product {
  slug: string;
  name: string;
  image: string | null;
  sale: boolean;
  /** The most specific category shown on the card. */
  leaf: { slug: string; name: string } | null;
  /** Category slugs the product belongs to (listing pages + leaf + known ancestors). */
  categories: string[];
  variants: Variant[];
  /** Present only for products whose own page was studied. */
  details: ProductDetails | null;
}

export type SortKey = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
