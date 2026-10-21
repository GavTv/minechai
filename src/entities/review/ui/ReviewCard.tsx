import { Icon } from '@/shared/ui';
import type { Review } from '../model/reviews';
import './review-card.css';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <header className="review-card__head">
        <h2 className="review-card__author">{review.author}</h2>
        <span className="review-card__date">{review.date}</span>
        <span className="review-card__rating" aria-label={`Оценка ${review.rating} из 5`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="star" className={index < Math.round(review.rating) ? 'is-filled' : ''} />
          ))}
        </span>
      </header>
      {review.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </article>
  );
}
