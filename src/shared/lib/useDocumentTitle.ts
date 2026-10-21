import { useEffect } from 'react';

const SUFFIX = 'интернет-магазин чая «Чайный Бум»';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : `Купить чай в Москве по доступной цене — ${SUFFIX}`;
  }, [title]);
}
