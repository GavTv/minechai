import { Link } from 'react-router-dom';
import { createPersistentStore, useStore } from '@/shared/lib';
import './cookie-banner.css';

type Consent = 'all' | 'necessary' | null;

const consentStore = createPersistentStore<Consent>('teaboom:cookie-consent', null);

export function CookieBanner() {
  const consent = useStore(consentStore);
  if (consent) return null;

  return (
    <section className="cookie-banner" aria-label="Использование cookie">
      <div className="cookie-banner__text">
        <p><strong>Мы используем файлы cookie</strong></p>
        <p>
          Необходимые cookie нужны для работы сайта. Аналитические cookie включаются только после вашего согласия. Мы используем аналитику только для
          улучшения работы сайта и опыта пользователей.
        </p>
        <p><Link to="/page/cookie-policy">Подробнее об использовании cookie</Link></p>
        <p className="cookie-banner__note">В локальной версии аналитики нет: выбор только сохраняется в localStorage браузера.</p>
      </div>
      <div className="cookie-banner__actions">
        <button className="button button--outline" type="button" onClick={() => consentStore.set('necessary')}>Закрыть</button>
        <button className="button button--primary" type="button" onClick={() => consentStore.set('all')}>Принять</button>
      </div>
    </section>
  );
}
