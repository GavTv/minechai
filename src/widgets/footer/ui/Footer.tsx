import { Link } from 'react-router-dom';
import { FOOTER_NAV, SITE } from '@/shared/config/site';
import { AppLink, Icon, type IconName } from '@/shared/ui';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <section className="footer__column" aria-labelledby="footer-contacts">
          <h2 className="footer__title" id="footer-contacts">Контакты</h2>
          <dl className="footer__contacts">
            <dt>Адрес офиса</dt>
            <dd>{SITE.officeAddress}</dd>
            <dt>Телефоны</dt>
            <dd>
              {SITE.phones.map((phone) => (
                <a key={phone.href} href={phone.href}>{phone.label}</a>
              ))}
            </dd>
            <dt>Email</dt>
            <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
          </dl>
          <ul className="footer__socials">
            {SITE.socials.map((social) => (
              <li key={social.href}>
                <AppLink className="footer__social" href={social.href} aria-label={`${social.label} (откроется в новой вкладке)`}>
                  <Icon name={social.icon as IconName} />
                </AppLink>
              </li>
            ))}
          </ul>
        </section>

        {FOOTER_NAV.map((group) => (
          <nav className="footer__column" key={group.title} aria-label={group.title}>
            <h2 className="footer__title">{group.title}</h2>
            <ul className="footer__links">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© Все права защищены, <Link to="/">Teaboom.ru</Link></p>
          <p className="footer__note">
            Локальная демонстрационная копия публичной части сайта. Заказы и оплата работают только на{' '}
            <AppLink href={SITE.origin}>teaboom.ru</AppLink>.
          </p>
        </div>
      </div>
    </footer>
  );
}
