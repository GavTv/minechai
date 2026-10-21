import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROOT_CATEGORY } from '@/entities/category';
import { searchProducts } from '@/entities/product';
import { useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs, EmptyState } from '@/shared/ui';
import { Catalog } from '@/widgets/catalog';

export function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const results = useMemo(() => searchProducts(query), [query]);
  useDocumentTitle(query ? `Поиск: ${query}` : 'Поиск');

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Поиск' }]} />
      <h1 className="page-title">{query ? <>Результаты поиска по запросу «{query}»</> : 'Поиск'}</h1>
      {!query ? (
        <EmptyState title="Введите запрос" text="Начните вводить название товара в поле поиска в шапке сайта." action={{ href: ROOT_CATEGORY.href, label: 'Перейти в каталог' }} />
      ) : (
        <Catalog
          key={query}
          products={results}
          emptyTitle="Ничего не найдено"
          emptyText="Попробуйте изменить запрос: например, «улун», «пуэр» или «габа». Поиск идёт только по товарам, сохранённым в локальной версии."
        />
      )}
    </div>
  );
}
