import { normalizeText } from '@/shared/lib';
import data from './products.json';
import type { Product, SortKey, Variant } from './types';

const normalizeLabel = (label: string | null) => label?.replace(/(\d)\s*(г|шт)$/, '$1 $2') ?? null;

const products = (data as Product[]).map((product) => ({
  ...product,
  variants: product.variants.map((variant) => ({ ...variant, label: normalizeLabel(variant.label) })),
}));
const bySlug = new Map(products.map((product) => [product.slug, product]));

export const getAllProducts = () => products;

export const getProduct = (slug: string) => bySlug.get(slug);

export const getProducts = (slugs: string[]) =>
  slugs.map((slug) => bySlug.get(slug)).filter((product): product is Product => Boolean(product));

export const getProductsInCategory = (categorySlug: string) =>
  products.filter((product) => product.categories.includes(categorySlug));

export function searchProducts(query: string): Product[] {
  const words = normalizeText(query).split(' ').filter(Boolean);
  if (!words.length) return [];
  return products.filter((product) => {
    const haystack = normalizeText(`${product.name} ${product.leaf?.name ?? ''}`);
    return words.every((word) => haystack.includes(word));
  });
}

/** Pack label, or the SKU when the original page lists several packs without naming them. */
export const variantName = (product: Product, variant: Variant): string | null =>
  variant.label ?? (product.variants.length > 1 ? `арт. ${variant.sku}` : null);

export const minPrice = (product: Product) =>
  product.variants.length ? Math.min(...product.variants.map((variant) => variant.price)) : Infinity;

const collator = new Intl.Collator('ru');

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'price-asc', label: 'По возрастанию цены' },
  { value: 'price-desc', label: 'По убыванию цены' },
  { value: 'name-asc', label: 'По алфавиту' },
  { value: 'name-desc', label: 'Обратно алфавиту' },
];

/** Products without saved prices always go last. */
function comparePrice(a: Product, b: Product, direction: 1 | -1): number {
  const pa = minPrice(a);
  const pb = minPrice(b);
  if (pa === pb) return 0;
  if (pa === Infinity) return 1;
  if (pb === Infinity) return -1;
  return (pa - pb) * direction;
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case 'price-desc':
      return sorted.sort((a, b) => comparePrice(a, b, -1));
    case 'name-asc':
      return sorted.sort((a, b) => collator.compare(a.name, b.name));
    case 'name-desc':
      return sorted.sort((a, b) => collator.compare(b.name, a.name));
    default:
      return sorted.sort((a, b) => comparePrice(a, b, 1));
  }
}

export const isSortKey = (value: string | null): value is SortKey =>
  SORT_OPTIONS.some((option) => option.value === value);
