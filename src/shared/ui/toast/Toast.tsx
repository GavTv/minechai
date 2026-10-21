import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import './toast.css';

interface ToastItem {
  id: number;
  message: string;
  link?: { href: string; label: string };
}

type ShowToast = (message: string, link?: ToastItem['link']) => void;

const ToastContext = createContext<ShowToast>(() => {});
const DURATION = 4000;
let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => setItems((list) => list.filter((item) => item.id !== id)), []);

  const show = useCallback<ShowToast>((message, link) => {
    const id = nextId++;
    setItems((list) => [...list.slice(-2), { id, message, link }]);
    window.setTimeout(() => remove(id), DURATION);
  }, [remove]);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {items.map((item) => (
          <div className="toast" key={item.id}>
            <Icon name="check" className="toast__icon" />
            <p className="toast__text">{item.message}</p>
            {item.link && (
              <Link className="toast__link" to={item.link.href} onClick={() => remove(item.id)}>{item.link.label}</Link>
            )}
            <button className="toast__close" type="button" aria-label="Закрыть уведомление" onClick={() => remove(item.id)}>
              <Icon name="close" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
