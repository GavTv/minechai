import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from '../icon/Icon';
import './drawer.css';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: 'left' | 'right';
  children: ReactNode;
  footer?: ReactNode;
}

/** Off-canvas panel on a native modal <dialog>: focus trap, Esc and inert page come for free. */
export function Drawer({ open, onClose, title, side = 'right', children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle('has-drawer', open);
    return () => document.documentElement.classList.remove('has-drawer');
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`drawer drawer--${side}`}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="drawer__panel">
        <header className="drawer__head">
          <h2 className="drawer__title">{title}</h2>
          <button className="drawer__close" type="button" onClick={onClose}>
            <Icon name="close" />
            Закрыть
          </button>
        </header>
        <div className="drawer__body">{children}</div>
        {footer && <footer className="drawer__footer">{footer}</footer>}
      </div>
    </dialog>
  );
}
