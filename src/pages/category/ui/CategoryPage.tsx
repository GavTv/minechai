import { useMemo } from 'react';
import { CategoryTile, ROOT_CATEGORY, getCategory, getCategoryChain, getChildren, getTopCategories, categoryHref } from '@/entities/category';
import { getAllProducts, getProductsInCategory } from '@/entities/product';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, EmptyState, Notice, RichText, type Crumb } from '@/shared/ui';
import { Catalog } from '@/widgets/catalog';
import './category-page.css';

function CategoryNotes({ slug, loaded, originalPages }: { slug: string; loaded: boolean; originalPages: number | null }) {
  const link = <AppLink href={originalUrl(categoryHref(slug))}>этом разделе на teaboom.ru</AppLink>;
  if (!loaded) {
    return <Notice>Страница этого раздела не изучалась — показаны товары, найденные в других разделах. Полный список — в {link}.</Notice>;
  }
  if (originalPages && originalPages > 1) {
    return (
      <Notice>
        На оригинальном сайте в разделе {originalPages} стр. товаров; в локальной версии сохранены товары с первой страницы и из изученных подразделов. Полный список — в {link}.
      </Notice>
    );
  }
  return null;
}

export function CategoryPage({ slug }: { slug: string }) {
  const isRoot = slug === ROOT_CATEGORY.slug;
  const category = isRoot ? undefined : getCategory(slug);
  const products = useMemo(() => (isRoot ? getAllProducts() : getProductsInCategory(slug)), [isRoot, slug]);
  useDocumentTitle(isRoot ? ROOT_CATEGORY.name : category?.name ?? 'Раздел не найден');

  if (!isRoot && !category) {
    return (
      <div className="container page">
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: ROOT_CATEGORY.name, href: ROOT_CATEGORY.href }, { label: 'Раздел не найден' }]} />
        <h1 className="page-title">Раздел не найден</h1>
        <EmptyState
          title="Этого раздела нет в локальной версии"
          text={<>Возможно, он есть на оригинальном сайте: <AppLink href={originalUrl(categoryHref(slug))}>открыть на teaboom.ru</AppLink>.</>}
          action={{ href: ROOT_CATEGORY.href, label: 'Перейти в каталог' }}
        />
      </div>
    );
  }

  const crumbs: Crumb[] = [{ label: 'Главная', href: '/' }];
  if (isRoot) crumbs.push({ label: ROOT_CATEGORY.name });
  else {
    crumbs.push({ label: ROOT_CATEGORY.name, href: ROOT_CATEGORY.href });
    const chain = getCategoryChain(slug);
    chain.forEach((item, index) => crumbs.push(index === chain.length - 1 ? { label: item.name } : { label: item.name, href: categoryHref(item.slug) }));
  }

  const children = isRoot ? getTopCategories() : getChildren(slug);

  return (
    <div className="container page">
      <Breadcrumbs items={crumbs} />
      <h1 className="page-title">{isRoot ? ROOT_CATEGORY.name : category!.name}</h1>

      {children.length > 0 && (
        <section className="category-page__children" aria-labelledby="subcategories-title">
          <h2 className="category-page__subtitle" id="subcategories-title">{isRoot ? 'Разделы каталога' : 'Выберите подкатегорию'}</h2>
          <ul className="category-page__tiles">
            {children.map((child) => (
              <li key={child.slug}>
                <CategoryTile category={child} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {isRoot ? (
        <Notice>Здесь собраны все товары, сохранённые в локальной версии ({products.length}). На teaboom.ru ассортимент значительно больше.</Notice>
      ) : (
        <CategoryNotes slug={slug} loaded={category!.loaded} originalPages={category!.originalPages} />
      )}

      <div className="category-page__catalog">
        <Catalog
          key={slug}
          products={products}
          emptyTitle="В локальной версии нет товаров этого раздела"
          emptyText="Выберите подкатегорию выше или откройте раздел на teaboom.ru."
        />
      </div>

      {category?.descriptionHtml && <RichText className="category-page__description" html={category.descriptionHtml} />}
    </div>
  );
}
