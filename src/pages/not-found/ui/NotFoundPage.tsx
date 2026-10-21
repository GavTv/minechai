import { useLocation } from 'react-router-dom';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, EmptyState } from '@/shared/ui';

export function NotFoundPage() {
  const { pathname } = useLocation();
  useDocumentTitle('Страница не найдена');

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Страница не найдена' }]} />
      <h1 className="page-title">Страница не найдена</h1>
      <EmptyState
        title="Такой страницы нет в локальной версии"
        text={<>Проверьте адрес или откройте его на оригинальном сайте: <AppLink href={originalUrl(pathname)}>teaboom.ru{pathname}</AppLink>.</>}
        action={{ href: '/', label: 'На главную' }}
      />
    </div>
  );
}
