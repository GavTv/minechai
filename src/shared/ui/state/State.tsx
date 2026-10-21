import type { ReactNode } from 'react';
import { AppLink } from '../app-link/AppLink';
import { Icon } from '../icon/Icon';
import './state.css';

interface EmptyStateProps {
  title: string;
  text?: ReactNode;
  action?: { href: string; label: string };
}

/** Empty list / nothing found placeholder. */
export function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__title">{title}</p>
      {text && <p className="empty-state__text">{text}</p>}
      {action && <AppLink className="button button--primary" href={action.href}>{action.label}</AppLink>}
    </div>
  );
}

/** Explicit marker for local-only data or actions the demo cannot perform. */
export function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warning' | 'success' }) {
  return (
    <div className={`notice notice--${tone}`} role={tone === 'success' ? 'status' : undefined}>
      <Icon name={tone === 'success' ? 'check' : 'info'} className="notice__icon" />
      <div className="notice__body">{children}</div>
    </div>
  );
}
