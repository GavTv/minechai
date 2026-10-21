import { useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SORT_OPTIONS, isSortKey, type SortKey } from '@/entities/product';
import './sort-select.css';

const SORT_PARAM = 'sort';
const DEFAULT_SORT: SortKey = 'price-asc';

export function useSortParam(): SortKey {
  const [params] = useSearchParams();
  const value = params.get(SORT_PARAM);
  return isSortKey(value) ? value : DEFAULT_SORT;
}

export function SortSelect() {
  const id = useId();
  const [, setParams] = useSearchParams();
  const sort = useSortParam();

  const change = (value: string) =>
    setParams(
      (current) => {
        const updated = new URLSearchParams(current);
        updated.delete('start');
        if (value === DEFAULT_SORT) updated.delete(SORT_PARAM);
        else updated.set(SORT_PARAM, value);
        return updated;
      },
      { preventScrollReset: true },
    );

  return (
    <div className="sort-select">
      <label className="sort-select__label" htmlFor={id}>Сортировка:</label>
      <select className="sort-select__control" id={id} value={sort} onChange={(event) => change(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
