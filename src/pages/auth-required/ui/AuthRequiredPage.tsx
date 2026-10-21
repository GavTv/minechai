import { useLocation } from 'react-router-dom';
import { ROOT_CATEGORY } from '@/entities/category';
import { originalUrl } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, Icon, Notice } from '@/shared/ui';
import './auth-required-page.css';

const COPY: Record<string, { title: string; text: string }> = {
  '/pricelist': {
    title: 'Прайслист',
    text: 'На teaboom.ru прайслист доступен только после входа в личный кабинет, поэтому его содержимое в локальную версию не переносилось.',
  },
  '/login': {
    title: 'Вход в личный кабинет',
    text: 'Вход, регистрация, избранное и история заказов работают только на teaboom.ru. Локальная версия не хранит учётные записи и не принимает пароли.',
  },
};

export function AuthRequiredPage() {
  const { pathname } = useLocation();
  const copy = COPY[pathname] ?? COPY['/login'];
  useDocumentTitle(copy.title);

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: copy.title }]} />
      <h1 className="page-title">{copy.title}</h1>
      <div className="auth-required">
        <Icon name="user" className="auth-required__icon" />
        <Notice tone="warning">{copy.text}</Notice>
        <div className="auth-required__actions">
          <AppLink className="button button--primary" href={originalUrl(pathname)}>
            Открыть на teaboom.ru <Icon name="external" />
          </AppLink>
          <AppLink className="button button--outline" href={ROOT_CATEGORY.href}>Перейти в каталог</AppLink>
        </div>
      </div>
    </div>
  );
}
