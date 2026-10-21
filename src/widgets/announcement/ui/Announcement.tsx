import { createPersistentStore, useStore } from '@/shared/lib';
import { SITE } from '@/shared/config/site';
import { Icon } from '@/shared/ui';
import './announcement.css';

const { announcement } = SITE;
const dismissedStore = createPersistentStore<string | null>('teaboom:announcement-dismissed', null);

/** Shop notice published on teaboom.ru; can be hidden until its text changes. */
export function Announcement() {
  const dismissed = useStore(dismissedStore);
  if (dismissed === announcement.date) return null;

  return (
    <aside className="announcement" aria-label="Объявление магазина">
      <div className="container announcement__inner">
        <Icon name="info" className="announcement__icon" />
        <p className="announcement__text">
          <strong>{announcement.title}</strong> <time>{announcement.date}</time>. {announcement.text}
        </p>
        <button className="announcement__close" type="button" aria-label="Скрыть объявление" onClick={() => dismissedStore.set(announcement.date)}>
          <Icon name="close" />
        </button>
      </div>
    </aside>
  );
}
