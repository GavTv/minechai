import { NavLink } from 'react-router-dom';
import { categoryHref, getCategory, getTopCategories, type Category } from '@/entities/category';
import { fallbackPhoto } from '@/shared/lib';
import './category-sidebar.css';

interface Props {
  title?: string;
  /** Explicit list (home page order); top-level sections by default. */
  slugs?: string[];
}

export function CategorySidebar({ title = 'Категории', slugs }: Props) {
  const categories = slugs
    ? slugs.map(getCategory).filter((category): category is Category => Boolean(category))
    : getTopCategories();

  return (
    <nav className="category-sidebar" aria-label={title}>
      <h2 className="category-sidebar__title">{title}</h2>
      <ul className="category-sidebar__list">
        {categories.map((category) => (
          <li key={category.slug}>
            <NavLink className="category-sidebar__link" to={categoryHref(category.slug)}>
              <img
                src={category.icon ?? fallbackPhoto(`${category.slug} ${category.name}`)}
                alt=""
                width={30}
                height={30}
                loading="lazy"
                onError={(event) => {
                  const standIn = fallbackPhoto(`${category.slug} ${category.name}`);
                  if (!event.currentTarget.src.includes(standIn)) event.currentTarget.src = standIn;
                }}
              />
              <span className="category-sidebar__name">{category.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
