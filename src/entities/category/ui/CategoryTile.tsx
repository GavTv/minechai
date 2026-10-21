import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackPhoto } from '@/shared/lib';
import { categoryHref, type Category } from '../model/categories';
import './category-tile.css';

export function CategoryTile({ category }: { category: Category }) {
  const original = category.image ?? category.icon;
  const [failed, setFailed] = useState(false);
  const src = original && !failed ? original : fallbackPhoto(`${category.slug} ${category.name}`);

  return (
    <Link className="category-tile" to={categoryHref(category.slug)}>
      <span className="category-tile__image">
        <img
          src={src}
          alt=""
          loading="lazy"
          width={100}
          height={100}
          onError={() => {
            if (src === original) setFailed(true);
          }}
        />
      </span>
      <span className="category-tile__name" title={category.name}>{category.name}</span>
    </Link>
  );
}
