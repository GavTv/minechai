import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductImage, minPrice, searchProducts } from '@/entities/product';
import { formatPrice } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import './search-form.css';

const SUGGESTIONS = 6;

export function SearchForm({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const urlQuery = location.pathname === '/search' ? params.get('q') ?? '' : '';
  const [query, setQuery] = useState(urlQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLFormElement>(null);
  const listId = useId();

  useEffect(() => setQuery(urlQuery), [urlQuery]);

  const suggestions = useMemo(() => (query.trim().length >= 2 ? searchProducts(query).slice(0, SUGGESTIONS) : []), [query]);
  const expanded = open && suggestions.length > 0;

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    setActive(-1);
    navigate(path);
    onDone?.();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (expanded && active >= 0) go(`/product/${suggestions[active].slug}`);
    else go(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    } else if (expanded && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      const last = suggestions.length - 1;
      setActive((index) => {
        if (event.key === 'ArrowDown') return index >= last ? -1 : index + 1;
        return index <= -1 ? last : index - 1;
      });
    }
  };

  return (
    <form className="search-form" role="search" onSubmit={submit} ref={rootRef}>
      <input
        className="search-form__input"
        type="search"
        name="q"
        placeholder="Начните вводить название товара..."
        autoComplete="off"
        aria-label="Поиск товаров"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      <button className="search-form__submit" type="submit" aria-label="Найти">
        <Icon name="search" />
      </button>
      <ul className="search-form__suggestions" id={listId} role="listbox" aria-label="Подсказки" hidden={!expanded}>
        {suggestions.map((product, index) => (
          <li
            key={product.slug}
            id={`${listId}-${index}`}
            role="option"
            aria-selected={index === active}
            className={`search-suggestion ${index === active ? 'is-active' : ''}`}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => go(`/product/${product.slug}`)}
          >
            <ProductImage src={product.image} alt={product.name} />
            <span className="search-suggestion__name">{product.name}</span>
            {product.variants.length > 0 && <span className="search-suggestion__price">от {formatPrice(minPrice(product))}</span>}
          </li>
        ))}
      </ul>
    </form>
  );
}
