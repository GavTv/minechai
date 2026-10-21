import { useId, useState } from 'react';
import { Icon } from '@/shared/ui';
import { hasActiveFilters, type CatalogFilters, type Facet, type Facets } from '../model/filters';
import './filter-panel.css';

interface Props {
  facets: Facets;
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
}

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

/** Keeps checked values visible even when they no longer match anything. */
const withSelected = (facets: Facet[], selected: string[]) => [
  ...facets,
  ...selected.filter((value) => !facets.some((facet) => facet.value === value)).map((value) => ({ value, label: value, count: 0 })),
];

function FacetGroup({ title, facets, selected, onToggle }: { title: string; facets: Facet[]; selected: string[]; onToggle: (value: string) => void }) {
  if (!facets.length) return null;
  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>
      {facets.map((facet) => (
        <label className={`check filter-group__option ${facet.count === 0 ? 'is-empty' : ''}`} key={facet.value}>
          <input type="checkbox" checked={selected.includes(facet.value)} onChange={() => onToggle(facet.value)} />
          <span>{facet.label}</span>
          <span className="filter-group__count" aria-label={`товаров: ${facet.count}`}>{facet.count}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function FilterPanel({ facets, filters, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = hasActiveFilters(filters);
  const activeCount = filters.packs.length + filters.subcategories.length + (filters.saleOnly ? 1 : 0);

  return (
    <section className={`filter-panel ${open ? 'is-open' : ''}`} aria-label="Фильтры">
      <button className="filter-panel__toggle button button--outline" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        <Icon name="filter" />
        Фильтры{activeCount > 0 && ` (${activeCount})`}
      </button>
      <div className="filter-panel__body" id={panelId}>
        <FacetGroup
          title="Фасовка"
          facets={withSelected(facets.packs, filters.packs)}
          selected={filters.packs}
          onToggle={(value) => onChange({ ...filters, packs: toggle(filters.packs, value) })}
        />
        {facets.subcategories.length > 1 && (
          <FacetGroup
            title="Подкатегория"
            facets={withSelected(facets.subcategories, filters.subcategories)}
            selected={filters.subcategories}
            onToggle={(value) => onChange({ ...filters, subcategories: toggle(filters.subcategories, value) })}
          />
        )}
        <fieldset className="filter-group">
          <legend className="filter-group__title">Цена</legend>
          <label className={`check filter-group__option ${facets.saleCount === 0 ? 'is-empty' : ''}`}>
            <input type="checkbox" checked={filters.saleOnly} onChange={() => onChange({ ...filters, saleOnly: !filters.saleOnly })} />
            <span>Только со скидкой</span>
            <span className="filter-group__count" aria-label={`товаров: ${facets.saleCount}`}>{facets.saleCount}</span>
          </label>
        </fieldset>
        {active && (
          <button className="button button--outline button--block" type="button" onClick={() => onChange({ packs: [], subcategories: [], saleOnly: false })}>
            Сбросить фильтры
          </button>
        )}
      </div>
    </section>
  );
}
