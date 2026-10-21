import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categoryHref, getTopCategories } from '@/entities/category';
import { Icon } from '@/shared/ui';

/** "Каталог" item with a two-column mega menu, opened by hover, focus or the chevron button. */
export function CatalogMenu({ href, label }: { href: string; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number>(0);
  const location = useLocation();
  const categories = getTopCategories();
  const half = Math.ceil(categories.length / 2);
  const columns = [categories.slice(0, half), categories.slice(half)];

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  useEffect(() => setOpen(false), [location]);

  return (
    <li
      className={`main-nav__item main-nav__item--catalog ${open ? 'is-open' : ''}`}
      ref={rootRef}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <NavLink className="main-nav__link" to={href}>{label}</NavLink>
      <button className="main-nav__toggle" type="button" aria-expanded={open} aria-label="Разделы каталога" onClick={() => setOpen(!open)}>
        <Icon name="chevron-down" />
      </button>
      <div className="mega-menu" hidden={!open}>
        {columns.map((column, index) => (
          <ul className="mega-menu__column" key={index}>
            {column.map((category) => (
              <li key={category.slug}>
                <Link className="mega-menu__link" to={categoryHref(category.slug)}>{category.name}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </li>
  );
}
