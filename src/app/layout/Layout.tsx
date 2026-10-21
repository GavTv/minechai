import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { CookieBanner } from '@/features/cookie-consent';
import { ToastProvider } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

/** Moves focus to <main> after client-side page changes so screen readers start at the new content. */
function useFocusOnNavigate() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return mainRef;
}

export function Layout() {
  const mainRef = useFocusOnNavigate();

  return (
    <ToastProvider>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <Header />
      <main id="main" className="main" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <ScrollRestoration />
    </ToastProvider>
  );
}
