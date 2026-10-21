import { useEffect, useState } from 'react';
import { AppLink, Icon } from '@/shared/ui';
import './hero-slider.css';

export interface Slide {
  image: string;
  href: string;
  alt: string;
}

const INTERVAL = 6000;

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = (next: number) => setIndex((next + count) % count);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced || count < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  return (
    <section
      className="hero-slider"
      aria-roledescription="карусель"
      aria-label="Акции и новинки"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-slider__viewport">
        {slides.map((slide, slideIndex) => (
          <div
            className={`hero-slider__slide ${slideIndex === index ? 'is-active' : ''}`}
            key={slide.image}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${slideIndex + 1} из ${count}`}
            aria-hidden={slideIndex !== index}
            inert={slideIndex !== index}
          >
            <AppLink href={slide.href}>
              <img src={slide.image} alt={slide.alt} width={910} height={512} loading={slideIndex === 0 ? 'eager' : 'lazy'} />
            </AppLink>
          </div>
        ))}
      </div>
      <button className="hero-slider__arrow hero-slider__arrow--prev round-button" type="button" aria-label="Предыдущий слайд" onClick={() => go(index - 1)}>
        <Icon name="chevron-left" />
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--next round-button" type="button" aria-label="Следующий слайд" onClick={() => go(index + 1)}>
        <Icon name="chevron-right" />
      </button>
      <div className="hero-slider__dots">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.image}
            className={`hero-slider__dot ${slideIndex === index ? 'is-active' : ''}`}
            type="button"
            aria-label={`Слайд ${slideIndex + 1}: ${slide.alt}`}
            aria-current={slideIndex === index}
            onClick={() => go(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
