import { ContactForm } from '@/features/contact-form';
import { SITE } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { AppLink, Breadcrumbs, Icon } from '@/shared/ui';
import { LOCATIONS, REQUISITES } from '../model/contacts';
import './contact-page.css';

export function ContactPage() {
  useDocumentTitle('Контакты');

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]} />
      <h1 className="page-title">Контакты</h1>

      <div className="contact-page__locations">
        {LOCATIONS.map((location) => (
          <section className="contact-card" key={location.title} aria-labelledby={`location-${location.title}`}>
            <h2 className="contact-card__title" id={`location-${location.title}`}>{location.title}</h2>
            <p className="contact-card__company">{SITE.company}</p>
            <ul className="contact-card__list">
              <li><Icon name="pin" /> {location.address}</li>
              {SITE.phones.map((phone) => (
                <li key={phone.href}><Icon name="phone" /> <a href={phone.href}>{phone.label}</a></li>
              ))}
              <li><Icon name="mail" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="clock" /> {location.hours}</li>
            </ul>
            <p className="contact-card__note">{location.note}</p>
            <AppLink className="button button--outline" href={location.route}>
              Построить маршрут в Яндекс Картах <Icon name="external" />
            </AppLink>
          </section>
        ))}
      </div>

      <div className="contact-page__bottom">
        <ContactForm />
        <section aria-labelledby="requisites-title">
          <h2 id="requisites-title">Наши реквизиты</h2>
          {REQUISITES.map((group) => (
            <div className="requisites" key={group.title}>
              <h3 className="requisites__title">{group.title}</h3>
              <dl>
                {group.rows.map(([name, value]) => (
                  <div className="requisites__row" key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
