import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Price, ProductImage, type Product } from '@/entities/product';
import { AddToCartForm } from '@/features/add-to-cart';
import { VariantPicker } from '@/features/select-variant';
import { originalUrl } from '@/shared/config/site';
import { AppLink, Notice, RichText, Tabs, type TabItem } from '@/shared/ui';
import './product-details.css';

function leadText(html: string | undefined): string | null {
  if (!html) return null;
  const paragraph = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '';
  const text = paragraph
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return text || null;
}

function buildTabs(product: Product): TabItem[] {
  const { details } = product;
  const original = <AppLink href={originalUrl(`/product/${product.slug}`)}>странице товара на teaboom.ru</AppLink>;

  if (!details) {
    return [
      {
        id: 'description',
        label: 'Описание',
        content: <Notice>Подробное описание этого товара не сохранено в локальной версии. Его можно прочитать на {original}.</Notice>,
      },
    ];
  }

  return [
    {
      id: 'description',
      label: 'Описание',
      content: details.descriptionHtml ? <RichText html={details.descriptionHtml} /> : <p>Описание на сайте отсутствует.</p>,
    },
    {
      id: 'properties',
      label: 'Свойства',
      content: details.properties.length ? (
        <table className="properties-table">
          <tbody>
            {details.properties.map((property) => (
              <tr key={property.name}>
                <th scope="row">{property.name}</th>
                <td>{property.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Свойства для этого товара на сайте не указаны.</p>
      ),
    },
    {
      id: 'reviews',
      label: 'Отзывы',
      content: (
        <>
          <p>{details.noReviews ? 'Отзывов об этом товаре пока нет.' : 'Отзывы о товаре не сохранены в локальной версии.'}</p>
          <Notice>
            Оставить отзыв можно только после входа на {original}. Отзывы о магазине — на странице <Link to="/shop_reviews/">«Отзывы»</Link>.
          </Notice>
        </>
      ),
    },
  ];
}

export function ProductDetails({ product }: { product: Product }) {
  const [selectedSku, setSelectedSku] = useState(product.variants[0]?.sku ?? '');
  const variant = product.variants.find((item) => item.sku === selectedSku) ?? product.variants[0];
  const lead = leadText(product.details?.descriptionHtml);

  return (
    <article className="product-details">
      <div className="product-details__top">
        <div className="product-details__gallery">
          <ProductImage src={product.image} alt={product.name} loading="eager" />
          {product.sale && <span className="product-details__badge">Скидка</span>}
        </div>

        <div className="product-details__buy">
          <h1 className="product-details__title">{product.name}</h1>
          {product.leaf && (
            <p className="product-details__category">
              Категория: <Link to={`/category-${product.leaf.slug}`}>{product.leaf.name}</Link>
            </p>
          )}

          {variant ? (
            <>
              {product.variants.length > 1 && (
                <VariantPicker variants={product.variants} selectedSku={variant.sku} onSelect={setSelectedSku} />
              )}
              <div className="product-details__price" aria-live="polite" key={variant.sku}>
                <Price price={variant.price} oldPrice={variant.oldPrice} size="lg" />
                <p className="product-details__sku">
                  Артикул: <strong>{variant.sku}</strong>
                  {variant.stock && <> · Наличие: <strong>{variant.stock}</strong></>}
                </p>
              </div>
              <AddToCartForm product={product} variant={variant} />
            </>
          ) : (
            <Notice tone="warning">
              Фасовки и цены этого товара не сохранены в локальной версии — купить его можно на{' '}
              <AppLink href={originalUrl(`/product/${product.slug}`)}>teaboom.ru</AppLink>.
            </Notice>
          )}
          <p className="product-details__note">
            Цены и наличие сохранены с публичной страницы teaboom.ru 15.10.2026 и могут отличаться от актуальных.
          </p>
        </div>
      </div>

      {lead && <p className="product-details__lead">{lead}</p>}

      <div className="product-details__tabs">
        <Tabs key={product.slug} label="Информация о товаре" items={buildTabs(product)} />
      </div>
    </article>
  );
}
