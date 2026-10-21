import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ROOT_CATEGORY, categoryHref, getCategoryChain } from '@/entities/category';
import { getProduct, getProducts, getProductsInCategory, markViewed, recentlyViewedStore, type Product } from '@/entities/product';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle, useStore } from '@/shared/lib';
import { AppLink, Breadcrumbs, EmptyState, type Crumb } from '@/shared/ui';
import { CategorySidebar } from '@/widgets/category-sidebar';
import { ProductCarousel } from '@/widgets/product-carousel';
import { ProductDetails } from '@/widgets/product-details';
import './product-page.css';

const SIMILAR_LIMIT = 8;

function similarProducts(product: Product): Product[] {
  const listed = getProducts(product.details?.similar ?? []);
  const sameLeaf = product.leaf ? getProductsInCategory(product.leaf.slug) : [];
  const unique = new Map([...listed, ...sameLeaf].filter((item) => item.slug !== product.slug).map((item) => [item.slug, item]));
  return [...unique.values()].slice(0, SIMILAR_LIMIT);
}

function crumbsFor(product: Product): Crumb[] {
  const chain = product.leaf ? getCategoryChain(product.leaf.slug) : [];
  return [
    { label: 'Главная', href: '/' },
    { label: ROOT_CATEGORY.name, href: ROOT_CATEGORY.href },
    ...chain.map((category) => ({ label: category.name, href: categoryHref(category.slug) })),
    { label: product.name },
  ];
}

export function ProductPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const viewed = useStore(recentlyViewedStore);
  useDocumentTitle(product?.name ?? 'Товар не найден');

  useEffect(() => {
    if (product) markViewed(product.slug);
  }, [product]);

  if (!product) {
    return (
      <div className="container page">
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: ROOT_CATEGORY.name, href: ROOT_CATEGORY.href }, { label: 'Товар не найден' }]} />
        <h1 className="page-title">Товар не найден</h1>
        <EmptyState
          title="Этого товара нет в локальной версии"
          text={<>Возможно, он есть на оригинальном сайте: <AppLink href={originalUrl(`/product/${slug}`)}>открыть на teaboom.ru</AppLink>.</>}
          action={{ href: ROOT_CATEGORY.href, label: 'Перейти в каталог' }}
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <Breadcrumbs items={crumbsFor(product)} />
      <div className="product-page">
        <div className="product-page__sidebar">
          <CategorySidebar title="Каталог" />
        </div>
        <div className="product-page__main">
          <ProductDetails key={product.slug} product={product} />
          <ProductCarousel title="Похожие и сопутствующие товары" products={similarProducts(product)} />
          <ProductCarousel title="Вы смотрели" products={getProducts(viewed.filter((item) => item !== product.slug))} />
        </div>
      </div>
    </div>
  );
}
