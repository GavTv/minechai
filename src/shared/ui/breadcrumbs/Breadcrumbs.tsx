import { Link } from 'react-router-dom';
import './breadcrumbs.css';

export interface Crumb {
  label: string;
  href?: string;
}

/** The last item is rendered as the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Навигационная цепочка">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => (
          <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
            {index === items.length - 1 || !item.href ? (
              <span className="breadcrumbs__current" aria-current="page">{item.label}</span>
            ) : (
              <Link className="breadcrumbs__link" to={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
