import { ReviewCard, reviewsData } from '@/entities/review';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, Notice } from '@/shared/ui';
import './reviews-page.css';

export function ReviewsPage() {
  useDocumentTitle('Отзывы о магазине Teaboom.ru');
  const { total, average, items } = reviewsData;

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Отзывы о магазине Teaboom.ru' }]} />
      <h1 className="page-title">Отзывы о магазине Teaboom.ru</h1>
      <dl className="reviews-page__stats">
        <div><dt>Всего отзывов:</dt> <dd>{total}</dd></div>
        <div><dt>Средняя оценка:</dt> <dd>{average?.toFixed(2)}</dd></div>
      </dl>
      <Notice>
        Показана первая страница отзывов ({items.length} из {total}), сохранённая 15.10.2026. Добавить отзыв можно только после входа на{' '}
        <AppLink href={originalUrl('/shop_reviews/')}>teaboom.ru</AppLink>.
      </Notice>
      <ul className="reviews-page__list">
        {items.map((review) => (
          <li key={`${review.author}-${review.date}`}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
