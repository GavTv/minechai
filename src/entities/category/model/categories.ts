import data from './categories.json';

export interface Category {
  slug: string;
  name: string;
  /** 'root' for top-level sections, null when the parent was not discovered. */
  parent: string | null;
  /** Small round icon used in the home sidebar. */
  icon: string | null;
  /** Tile image shown in the "Выберите подкатегорию" block. */
  image: string | null;
  children: string[];
  /** Whether the listing page itself was studied (otherwise only its name/link is known). */
  loaded: boolean;
  /** Number of listing pages the original reported for this category. */
  originalPages: number | null;
  descriptionHtml: string;
}

const categories = (data as (Omit<Category, 'descriptionHtml'> & { description: string })[]).map(
  ({ description, ...rest }) => ({ ...rest, descriptionHtml: description }),
);
const bySlug = new Map(categories.map((category) => [category.slug, category]));

export const ROOT_CATEGORY = { slug: 'root', name: 'Каталог', href: '/category-root' };

export const categoryHref = (slug: string) => `/category-${slug}`;

export const getCategory = (slug: string) => bySlug.get(slug);

/** Top-level sections in the order of the original catalog menu. */
export const getTopCategories = () => categories.filter((category) => category.parent === 'root');

export const getChildren = (slug: string) =>
  (bySlug.get(slug)?.children ?? []).map((child) => bySlug.get(child)).filter((child): child is Category => Boolean(child));

/** Ancestors from the top-level section down to the category itself. */
export function getCategoryChain(slug: string): Category[] {
  const chain: Category[] = [];
  const seen = new Set<string>();
  let current = bySlug.get(slug);
  while (current && !seen.has(current.slug)) {
    chain.unshift(current);
    seen.add(current.slug);
    current = current.parent && current.parent !== 'root' ? bySlug.get(current.parent) : undefined;
  }
  return chain;
}
