import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid, getProducts } from '@/entities/product';
import { reviewsData } from '@/entities/review';
import { AddVariantButton } from '@/features/add-to-cart';
import { SITE } from '@/shared/config/site';
import { useDocumentTitle } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import { CategorySidebar } from '@/widgets/category-sidebar';
import home from '../model/home.json';
import { FeaturesStrip } from './FeaturesStrip';
import { HeroSlider } from './HeroSlider';
import './home-page.css';

function scrollStrip(element: HTMLElement | null, direction: 1 | -1, steps = 1) {
  if (!element) return;
  const card = element.querySelector(':scope > li');
  const width = card ? card.getBoundingClientRect().width + 18 : element.clientWidth;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollBy({ left: direction * width * steps, behavior: reduced ? 'auto' : 'smooth' });
}

const STORIES = [
  {
    image: '/images/editorial/tea-pour.jpg',
    href: '/search?q=%D0%B3%D0%B0%D0%B1%D0%B0',
    title: 'Оригинальный габа чай из Тайваня и Вьетнама',
    note: '',
  },
  {
    image: '/images/editorial/tea-matcha.jpg',
    href: '/category-chernyy_tea',
    title: 'Черный чай',
    note: '',
  },
];

function HomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      video.pause();
      video.removeAttribute('autoplay');
    }
  }, []);

  return (
    <section className="home-video" aria-label={SITE.name}>
      <video
        ref={videoRef}
        className="home-video__media"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/editorial/tea-poster.jpg"
      >
        <source src="/videos/tea.mp4" type="video/mp4" />
      </video>
      <div className="home-video__copy">
        <p className="home-video__name">{SITE.name}</p>
        <p className="home-video__note">{SITE.tagline}</p>
        <Link to="/category-root">Каталог</Link>
      </div>
    </section>
  );
}

export function HomePage() {
  useDocumentTitle(SITE.tagline);
  const railRef = useRef<HTMLElement>(null);
  const postersRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLUListElement>(null);
  const quotes = reviewsData.items.slice(0, 6);

  return (
    <div className="home-page">
      <h1 className="visually-hidden">{SITE.name} — {SITE.tagline.toLowerCase()}</h1>
      <HeroSlider slides={home.slides} />
      <section className="home-rail" ref={railRef}>
        <CategorySidebar title="Каталог" slugs={home.sidebar} />
        <button className="strip-arrow strip-arrow--prev" type="button" aria-label="Разделы: назад" onClick={() => scrollStrip(railRef.current?.querySelector('.category-sidebar__list') ?? null, -1, 3)}>
          <Icon name="chevron-left" />
        </button>
        <button className="strip-arrow strip-arrow--next" type="button" aria-label="Разделы: вперёд" onClick={() => scrollStrip(railRef.current?.querySelector('.category-sidebar__list') ?? null, 1, 3)}>
          <Icon name="chevron-right" />
        </button>
      </section>
      <Link className="home-story" to={STORIES[0].href}>
        <img src={STORIES[0].image} alt="" />
        <span className="home-story__copy">
          <span className="home-story__note">{STORIES[0].note}</span>
          <span className="home-story__title">{STORIES[0].title}</span>
        </span>
      </Link>
      <div className="container">
        <FeaturesStrip />
      </div>
      <section className="home-posters" aria-labelledby="recommended-title">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" id="recommended-title">Рекомендуем</h2>
            <div className="home-posters__arrows">
              <button className="strip-arrow" type="button" aria-label="Рекомендуем: назад" onClick={() => scrollStrip(postersRef.current?.querySelector('.product-grid') ?? null, -1)}>
                <Icon name="chevron-left" />
              </button>
              <button className="strip-arrow" type="button" aria-label="Рекомендуем: вперёд" onClick={() => scrollStrip(postersRef.current?.querySelector('.product-grid') ?? null, 1)}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
          <div ref={postersRef}>
            <ProductGrid
              products={getProducts(home.recommended)}
              renderVariantAction={(product, variant) => <AddVariantButton product={product} variant={variant} />}
            />
          </div>
        </div>
      </section>
      <Link className="home-story home-story--alt" to={STORIES[1].href}>
        <img src={STORIES[1].image} alt="" />
        <span className="home-story__copy">
          <span className="home-story__note">{STORIES[1].note}</span>
          <span className="home-story__title">{STORIES[1].title}</span>
        </span>
      </Link>
      <section className="home-quotes" aria-labelledby="quotes-title">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" id="quotes-title">Отзывы</h2>
            <div className="home-posters__arrows">
              <button className="strip-arrow" type="button" aria-label="Отзывы: назад" onClick={() => scrollStrip(quotesRef.current, -1)}>
                <Icon name="chevron-left" />
              </button>
              <button className="strip-arrow" type="button" aria-label="Отзывы: вперёд" onClick={() => scrollStrip(quotesRef.current, 1)}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
          <ul className="home-quotes__track" ref={quotesRef}>
            {quotes.map((review) => (
              <li key={review.author + review.date}>
                <blockquote className="home-quote">
                  <p>{review.text[0]}</p>
                  <footer>{review.author}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
          <p className="home-quotes__more">
            <Link to="/shop_reviews/">Отзывы</Link>
          </p>
        </div>
      </section>
      <HomeVideo />
    </div>
  );
}
