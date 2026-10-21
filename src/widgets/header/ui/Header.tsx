import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { summarize, useCartItems } from '@/entities/cart';
import { useSession } from '@/entities/session';
import { SearchForm } from '@/features/search-products';
import { MAIN_NAV, SITE } from '@/shared/config/site';
import { formatPrice, pluralize } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import { CatalogMenu } from './CatalogMenu';
import { MiniCart } from './MiniCart';
import { MobileMenu } from './MobileMenu';
import './header.css';

const startNav = MAIN_NAV.filter((item) => item.catalogMenu || item.accent);
const endNav = MAIN_NAV.filter((item) => !item.catalogMenu && !item.accent);

function NavItems({ items }: { items: typeof MAIN_NAV }) {
  return items.map((item) =>
    item.catalogMenu ? (
      <CatalogMenu key={item.href} href={item.href} label={item.label} />
    ) : (
      <li className="main-nav__item" key={item.href}>
        <NavLink className={`main-nav__link ${item.accent ? 'is-accent' : ''}`} to={item.href} end>{item.label}</NavLink>
      </li>
    ),
  );
}

export function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { count, total } = summarize(useCartItems());
  const session = useSession();

  useEffect(() => setSearchOpen(false), [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    headerRef.current?.querySelector<HTMLInputElement>('.header__search-panel input')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [searchOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header__bar">
        <div className="container header__bar-inner">
          <button className="header__icon-button header__burger" type="button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}>
            <Icon name="menu" />
          </button>

          <nav className="main-nav main-nav--start" aria-label="Основное меню">
            <ul className="main-nav__list">
              <NavItems items={startNav} />
              <li className="main-nav__item">
                <button
                  className={`main-nav__link main-nav__search ${searchOpen ? 'is-open' : ''}`}
                  type="button"
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((open) => !open)}
                >
                  Поиск
                </button>
              </li>
            </ul>
          </nav>

          <Link className="header__logo" to="/" aria-label={`${SITE.name} — на главную`}>
            <img className="header__logo-mark" src="/images/brand/logo.webp" alt="" width={60} height={60} />
            <span className="header__logo-name">{SITE.name}</span>
            <span className="header__logo-tagline">{SITE.tagline}</span>
          </Link>

          <nav className="main-nav main-nav--end" aria-label="Разделы магазина">
            <ul className="main-nav__list">
              <NavItems items={endNav} />
            </ul>
          </nav>

          <div className="header__actions">
            <Link
              className="header__icon-button"
              to={session ? '/account' : '/login'}
              aria-label={session ? 'Личный кабинет' : 'Вход в личный кабинет'}
            >
              <Icon name="user" />
            </Link>
            <button
              className="header__icon-button header__cart"
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={count ? `Корзина: ${count} ${pluralize(count, ['товар', 'товара', 'товаров'])} на ${formatPrice(total)}` : 'Корзина пуста'}
            >
              <Icon name="cart" />
              {count > 0 && <span className="header__cart-count" aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
        <div className="header__mobile-search container">
          <SearchForm />
        </div>
      </div>
      <div className="header__search-panel" hidden={!searchOpen}>
        <div className="container">
          <SearchForm onDone={() => setSearchOpen(false)} />
        </div>
      </div>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
