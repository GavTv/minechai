import { Link } from 'react-router-dom';
import './features-strip.css';

const FEATURES = [
  { icon: '/images/icons/feature-van.png', title: 'Бесплатная доставка', text: 'При заказе от 3500', href: '/shipping/', tone: 'green' },
  { icon: '/images/icons/feature-walet.png', title: 'Акции и скидки', text: 'Множество скидок каждый день', href: '/category-root?sale=1', tone: 'yellow' },
  { icon: '/images/icons/feature-shield.png', title: 'Безопасные платежи', text: 'ЮKassa', href: '/payment/', tone: 'blue' },
];

export function FeaturesStrip() {
  return (
    <ul className="features-strip">
      {FEATURES.map((feature) => (
        <li key={feature.title}>
          <Link className={`feature feature--${feature.tone}`} to={feature.href}>
            <img src={feature.icon} alt="" width={42} height={33} />
            <span className="feature__title">{feature.title}</span>
            <span className="feature__text">{feature.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
