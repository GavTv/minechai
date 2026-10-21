import { createPersistentStore } from '@/shared/lib';

const LIMIT = 6;

export const recentlyViewedStore = createPersistentStore<string[]>('teaboom:recently-viewed', []);

export function markViewed(slug: string): void {
  recentlyViewedStore.set((list) => [slug, ...list.filter((item) => item !== slug)].slice(0, LIMIT));
}
