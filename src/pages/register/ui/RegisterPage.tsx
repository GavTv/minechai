import { Navigate } from 'react-router-dom';
import { useSession } from '@/entities/session';
import { RegisterForm } from '@/features/auth';
import '@/features/auth/ui/auth-form.css';
import { useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';

export function RegisterPage() {
  const session = useSession();
  useDocumentTitle('Регистрация');
  if (session) return <Navigate to="/account" replace />;

  return (
    <div className="container page auth-shell">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Регистрация' }]} />
      <h1 className="page-title">Регистрация</h1>
      <RegisterForm />
    </div>
  );
}
