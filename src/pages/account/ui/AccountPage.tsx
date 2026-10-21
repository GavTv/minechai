import { Link, Navigate } from 'react-router-dom';
import { logoutAccount, useSession } from '@/entities/session';
import { useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import '@/features/auth/ui/auth-form.css';

export function AccountPage() {
  const session = useSession();
  useDocumentTitle('Личный кабинет');
  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="container page auth-shell">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Кабинет' }]} />
      <h1 className="page-title">Личный кабинет</h1>
      <section className="account-card">
        <p>Здравствуйте, {session.name}</p>
        <p className="account-card__email">{session.email}</p>
        <div className="account-card__actions">
          <Link className="button button--primary" to="/pricelist">
            Прайслист
          </Link>
          <button className="button button--outline" type="button" onClick={() => logoutAccount()}>
            Выйти
          </button>
        </div>
      </section>
    </div>
  );
}
