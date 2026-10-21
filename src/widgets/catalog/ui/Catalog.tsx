import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductGrid, sortProducts, type Product } from '@/entities/product';
import { AddVariantButton } from '@/features/add-to-cart';
import { FilterPanel, PAGE_PARAM, applyFilters, buildFacets, hasActiveFilters, useFilterParams } from '@/features/catalog-filter';
import { SortSelect, useSortParam } from '@/features/catalog-sort';
import { pluralize } from '@/shared/lib';
import { EmptyState, Pagination } from '@/shared/ui';
import './catalog.css';

const PAGE_SIZE = 12;

interface Props {
  products: Product[];
  emptyTitle?: string;
  emptyText?: string;
}

/** Filterable, sortable, paginated product grid; all state lives in the URL. */
export function Catalog({ products, emptyTitle = 'В этом разделе нет товаров', emptyText }: Props) {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const [filters, setFilters] = useFilterParams();
  const sort = useSortParam();

  const facets = useMemo(() => buildFacets(products, filters), [products, filters]);
  const visible = useMemo(() => sortProducts(applyFilters(products, filters), sort), [products, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const start = Number.parseInt(params.get(PAGE_PARAM) ?? '0', 10) || 0;
  const page = Math.min(pageCount, Math.floor(Math.max(0, start) / PAGE_SIZE) + 1);
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const buildHref = (target: number) => {
    const next = new URLSearchParams(params);
    if (target > 1) next.set(PAGE_PARAM, String((target - 1) * PAGE_SIZE));
    else next.delete(PAGE_PARAM);
    const query = next.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  if (!products.length) return <EmptyState title={emptyTitle} text={emptyText} />;

  return (
    <div className="catalog">
      <aside className="catalog__filters">
        <FilterPanel facets={facets} filters={filters} onChange={setFilters} />
      </aside>
      <div className="catalog__main">
        <div className="catalog__toolbar">
          <p className="catalog__count" role="status">
            {visible.length} {pluralize(visible.length, ['товар', 'товара', 'товаров'])}
          </p>
          <SortSelect />
        </div>
        {pageItems.length ? (
          <>
            <ProductGrid products={pageItems} renderVariantAction={(product, variant) => <AddVariantButton product={product} variant={variant} />} />
            <Pagination page={page} pageCount={pageCount} buildHref={buildHref} />
          </>
        ) : (
          <EmptyState
            title="Ничего не найдено"
            text={hasActiveFilters(filters) ? 'Под выбранные фильтры не подходит ни один товар. Измените или сбросьте фильтры.' : undefined}
          />
        )}
      </div>
    </div>
  );
}
