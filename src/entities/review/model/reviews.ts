import data from './reviews.json';

export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string[];
}

/** First page of public shop reviews (author emails intentionally not stored). */
export const reviewsData = data as { total: number | null; average: number | null; items: Review[] };
