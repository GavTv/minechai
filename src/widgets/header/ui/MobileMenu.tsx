import { NavLink, Link } from 'react-router-dom';
import { useSession } from '@/entities/session';
import { categoryHref, getTopCategories } from '@/entities/category';
import { SearchForm } from '@/features/search-products';
import { MAIN_NAV, SITE } from '@/shared/config/site';
import { Drawer } from '@/shared/ui';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const session = useSession();
  return (
    <Drawer open={open} onClose={onClose} title="Меню" side="left">
      <div className="mobile-menu">
        <SearchForm onDone={onClose} />
        <nav aria-label="Основное меню">
          <ul className="mobile-menu__list">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <NavLink className={`mobile-menu__link ${item.accent ? 'is-accent' : ''}`} to={item.href} end onClick={onClose}>{item.label}</NavLink>
              </li>
            ))}
            <li>
              <Link className="mobile-menu__link" to={session ? '/account' : '/login'} onClick={onClose}>
                {session ? 'Кабинет' : 'Вход'}
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Разделы каталога">
          <h3 className="mobile-menu__title">Каталог</h3>
          <ul className="mobile-menu__list mobile-menu__list--small">
            {getTopCategories().map((category) => (
              <li key={category.slug}>
                <NavLink className="mobile-menu__link" to={categoryHref(category.slug)} onClick={onClose}>{category.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__contacts">
          {SITE.phones.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
    </Drawer>
  );
}
