import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FILTER_PARAMS, parseFilters, type CatalogFilters } from './filters';

export const PAGE_PARAM = 'start';

export function useFilterParams(): [CatalogFilters, (next: CatalogFilters) => void] {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);

  const setFilters = useCallback(
    (next: CatalogFilters) => {
      setParams(
        (current) => {
          const updated = new URLSearchParams(current);
          Object.values(FILTER_PARAMS).forEach((key) => updated.delete(key));
          updated.delete(PAGE_PARAM);
          next.packs.forEach((pack) => updated.append(FILTER_PARAMS.pack, pack));
          next.subcategories.forEach((slug) => updated.append(FILTER_PARAMS.subcategory, slug));
          if (next.saleOnly) updated.set(FILTER_PARAMS.sale, '1');
          return updated;
        },
        { preventScrollReset: true },
      );
    },
    [setParams],
  );

  return [filters, setFilters];
}
