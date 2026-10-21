import { Navigate } from 'react-router-dom';
import { useSession } from '@/entities/session';
import { LoginForm } from '@/features/auth';
import '@/features/auth/ui/auth-form.css';
import { useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';

export function LoginPage() {
  const session = useSession();
  useDocumentTitle('Вход в личный кабинет');
  if (session) return <Navigate to="/account" replace />;

  return (
    <div className="container page auth-shell">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Вход' }]} />
      <h1 className="page-title">Вход в личный кабинет</h1>
      <LoginForm />
    </div>
  );
}
