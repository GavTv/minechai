/** Public contact data as shown on teaboom.ru (checked 15.10.2026). */
export const SITE = {
  name: 'Чайный Бум',
  tagline: 'Интернет-магазин чая и посуды',
  origin: 'https://teaboom.ru',
  company: 'ООО "КАССИОПЕЯ"',
  phones: [
    { label: '+7 (495) 120-15-51', href: 'tel:+74951201551' },
    { label: '+7 (495) 796-79-74', href: 'tel:+74957967974' },
  ],
  email: 'info@teaboom.ru',
  officeAddress: 'Москва, ул. 1-я Боевская, д. 2/12, стр. 4, пом. 1/1',
  hours: ['пн - пт с 10:00 до 19:00', 'сб - вс с 12:00 до 16:00'],
  socials: [
    { label: 'Telegram', href: 'https://t.me/Teaboom', icon: 'telegram' },
    { label: 'ВКонтакте', href: 'https://vk.com/teaboom', icon: 'vk' },
    { label: 'Одноклассники', href: 'https://www.ok.ru/teaboom', icon: 'ok' },
  ],
  announcement: {
    date: '15 октября 2026',
    title: 'Уважаемые покупатели!',
    text: 'Из-за ситуации с дата-центрами Яндекса у нас могут некорректно работать оповещения и почта. Если у вас наблюдаются проблемы, просьба звонить по телефону. Надеемся на скорейшее возобновление работы IT-гиганта.',
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: (NavLink & { catalogMenu?: boolean; accent?: boolean })[] = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/category-root', catalogMenu: true },
  { label: 'Подарки', href: '/category-podarki', accent: true },
  { label: 'Прайслист', href: '/pricelist' },
  { label: 'Отзывы', href: '/shop_reviews/' },
  { label: 'Контакты', href: '/contact' },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Компания',
    links: [
      { label: 'Наши сервисы', href: '/page/nashi-servisy' },
      { label: 'Бизнес с нами', href: '/page/biznes-s-nami' },
      { label: 'Вакансии', href: '/page/vakansii' },
    ],
  },
  {
    title: 'Документы',
    links: [
      { label: 'Договор-оферта', href: '/page/dogovor' },
      { label: 'Сертификаты', href: '/page/sertifikaty' },
      { label: 'Статьи о чае', href: '/pages' },
      { label: 'Политика конфиденциальности', href: '/page/privacy-policy' },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { label: 'Доставка', href: '/shipping/' },
      { label: 'Оплата', href: '/payment/' },
      { label: 'Обмен и возврат', href: '/page/exchange-and-refund' },
    ],
  },
];

export const originalUrl = (path: string) => SITE.origin + path;
