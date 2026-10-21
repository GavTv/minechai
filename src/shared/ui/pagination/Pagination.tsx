import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import './pagination.css';

interface Props {
  page: number;
  pageCount: number;
  buildHref: (page: number) => string;
}

/** Page links use `?start=N`, like the original site. */
export function Pagination({ page, pageCount, buildHref }: Props) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return (
    <nav className="pagination" aria-label="Страницы">
      <ul className="pagination__list">
        {page > 1 && (
          <li><Link className="pagination__link" to={buildHref(page - 1)} aria-label="Предыдущая страница"><Icon name="chevron-left" /></Link></li>
        )}
        {pages.map((number) => (
          <li key={number}>
            {number === page
              ? <span className="pagination__link is-current" aria-current="page">{number}</span>
              : <Link className="pagination__link" to={buildHref(number)} aria-label={`Страница ${number}`}>{number}</Link>}
          </li>
        ))}
        {page < pageCount && (
          <li><Link className="pagination__link" to={buildHref(page + 1)} aria-label="Следующая страница"><Icon name="chevron-right" /></Link></li>
        )}
      </ul>
    </nav>
  );
}
