import { useLocation } from 'react-router-dom';
import { getInfoPage } from '@/entities/info-page';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, EmptyState, Notice, RichText, type Crumb } from '@/shared/ui';
import './info-page.css';

/** Text pages: /shipping/, /payment/, /page/:slug (documents and articles). */
export function InfoPage() {
  const { pathname } = useLocation();
  const page = getInfoPage(pathname);
  useDocumentTitle(page?.title ?? 'Страница не найдена');

  if (!page) {
    return (
      <div className="container page">
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Страница не найдена' }]} />
        <h1 className="page-title">Страница не найдена</h1>
        <EmptyState
          title="Этой страницы нет в локальной версии"
          text={<>Возможно, она есть на оригинальном сайте: <AppLink href={originalUrl(pathname)}>открыть на teaboom.ru</AppLink>.</>}
          action={{ href: '/', label: 'На главную' }}
        />
      </div>
    );
  }

  const crumbs: Crumb[] = [{ label: 'Главная', href: '/' }];
  if (page.kind === 'article') crumbs.push({ label: 'Статьи о чае', href: '/pages' });
  crumbs.push({ label: page.title });

  return (
    <div className="container page">
      <Breadcrumbs items={crumbs} />
      <article className="info-page">
        <h1 className="page-title">{page.title}</h1>
        {page.html ? (
          <RichText html={page.html} />
        ) : (
          <Notice>На оригинальном сайте эта страница пока не содержит текста — опубликован только заголовок.</Notice>
        )}
        <p className="info-page__source">
          Источник: {page.source}. <AppLink href={originalUrl(page.path)}>Открыть страницу на teaboom.ru</AppLink>
        </p>
      </article>
    </div>
  );
}
