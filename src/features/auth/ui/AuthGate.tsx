import { Link } from 'react-router-dom';
import { useSession } from '@/entities/session';
import type { ReactNode } from 'react';
import './auth-form.css';

export function AuthGate({ children, from }: { children: ReactNode; from: string }) {
  const session = useSession();
  if (session) return children;
  return (
    <div className="auth-page">
      <p className="auth-form__note">Этот раздел открывается после входа в кабинет.</p>
      <div className="auth-page__actions">
        <Link className="button button--primary" to={`/login?from=${encodeURIComponent(from)}`}>
          Войти
        </Link>
        <Link className="button button--outline" to="/register">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
