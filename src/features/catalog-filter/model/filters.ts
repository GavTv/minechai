import type { Product } from '@/entities/product';

export interface CatalogFilters {
  packs: string[];
  subcategories: string[];
  saleOnly: boolean;
}

export interface Facet {
  value: string;
  label: string;
  count: number;
}

export interface Facets {
  packs: Facet[];
  subcategories: Facet[];
  saleCount: number;
}

export const FILTER_PARAMS = { pack: 'pack', subcategory: 'sub', sale: 'sale' } as const;

export const parseFilters = (params: URLSearchParams): CatalogFilters => ({
  packs: params.getAll(FILTER_PARAMS.pack),
  subcategories: params.getAll(FILTER_PARAMS.subcategory),
  saleOnly: params.get(FILTER_PARAMS.sale) === '1',
});

export const hasActiveFilters = (filters: CatalogFilters) =>
  filters.packs.length > 0 || filters.subcategories.length > 0 || filters.saleOnly;

const matchesPack = (product: Product, packs: string[]) =>
  !packs.length || product.variants.some((variant) => variant.label !== null && packs.includes(variant.label));

const matchesSubcategory = (product: Product, subcategories: string[]) =>
  !subcategories.length || (product.leaf !== null && subcategories.includes(product.leaf.slug));

const matchesSale = (product: Product, saleOnly: boolean) => !saleOnly || product.sale;

export const applyFilters = (products: Product[], filters: CatalogFilters) =>
  products.filter(
    (product) =>
      matchesPack(product, filters.packs) &&
      matchesSubcategory(product, filters.subcategories) &&
      matchesSale(product, filters.saleOnly),
  );

const packWeight = (label: string) => {
  const [amount, unit] = label.split(' ');
  return (unit === 'шт' ? 1e6 : 0) + Number(amount);
};

const toFacets = (counts: Map<string, { label: string; count: number }>) =>
  [...counts].map(([value, { label, count }]) => ({ value, label, count }));

/** Each facet is counted against the products matching all *other* active filters. */
export function buildFacets(products: Product[], filters: CatalogFilters): Facets {
  const packs = new Map<string, { label: string; count: number }>();
  const subcategories = new Map<string, { label: string; count: number }>();
  let saleCount = 0;

  for (const product of products) {
    const sub = matchesSubcategory(product, filters.subcategories);
    const pack = matchesPack(product, filters.packs);
    const sale = matchesSale(product, filters.saleOnly);

    if (sub && sale) {
      for (const label of new Set(product.variants.map((variant) => variant.label))) {
        if (label) packs.set(label, { label, count: (packs.get(label)?.count ?? 0) + 1 });
      }
    }
    if (pack && sale && product.leaf) {
      const { slug, name } = product.leaf;
      subcategories.set(slug, { label: name, count: (subcategories.get(slug)?.count ?? 0) + 1 });
    }
    if (sub && pack && product.sale) saleCount += 1;
  }

  return {
    packs: toFacets(packs).sort((a, b) => packWeight(a.value) - packWeight(b.value)),
    subcategories: toFacets(subcategories).sort((a, b) => a.label.localeCompare(b.label, 'ru')),
    saleCount,
  };
}
