import { createBrowserRouter, useParams } from 'react-router-dom';
import { AccountPage } from '@/pages/account';
import { ArticlesPage } from '@/pages/articles';
import { CartPage } from '@/pages/cart';
import { CategoryPage } from '@/pages/category';
import { CheckoutPage } from '@/pages/checkout';
import { ContactPage } from '@/pages/contact';
import { HomePage } from '@/pages/home';
import { InfoPage } from '@/pages/info';
import { NotFoundPage } from '@/pages/not-found';
import { LoginPage } from '@/pages/login';
import { PricelistPage } from '@/pages/pricelist';
import { ProductPage } from '@/pages/product';
import { RegisterPage } from '@/pages/register';
import { ReviewsPage } from '@/pages/reviews';
import { SearchPage } from '@/pages/search';
import { Layout } from '../layout/Layout';

const CATEGORY_PREFIX = 'category-';

/** The original uses `/category-<slug>`; React Router has no partial dynamic segments, so it is resolved here. */
function SegmentRoute() {
  const { segment = '' } = useParams();
  if (!segment.startsWith(CATEGORY_PREFIX)) return <NotFoundPage />;
  const slug = segment.slice(CATEGORY_PREFIX.length);
  return <CategoryPage key={slug} slug={slug} />;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:slug', element: <ProductPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout-dispatcher', element: <CheckoutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/shipping', element: <InfoPage /> },
      { path: '/payment', element: <InfoPage /> },
      { path: '/page/:slug', element: <InfoPage /> },
      { path: '/pages', element: <ArticlesPage /> },
      { path: '/shop_reviews', element: <ReviewsPage /> },
      { path: '/pricelist', element: <PricelistPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/:segment', element: <SegmentRoute /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
