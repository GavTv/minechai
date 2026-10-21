# Карта страниц: teaboom.ru → локальные маршруты

Изучено 15.10.2026 по публичному HTML (r.jina.ai). Закрытые разделы и действия, которые могли создать заказ или аккаунт, не открывались.

Статусы:

- **полный** — страница собрана из публичного HTML, сценарии на ней работают на сохранённых данных;
- **частичный** — шаблон есть, но листинг/карточка/фото неполные;
- **заглушка** — на оригинале нужен вход или страница пустая / 404;
- **демо** — форма только проверяет поля, ничего не отправляет;
- **не изучался** — URL известен, содержимое оригинала не читалось.

Хвостовой слэш в ссылках совпадает с оригиналом; React Router принимает оба варианта.

| Оригинал | Локальный маршрут | Статус | Примечание |
|---|---|---|---|
| `/` | `/` | полный | Слайдер, три преимущества, сайдбар разделов, блок «Рекомендуем» |
| `/category-root` | `/category-root` | частичный | Все 273 сохранённых товара; на сайте ассортимент больше |
| `/category-<slug>` | `/category-<slug>` | частичный | 209 разделов в дереве; листинги изучены у 28 (см. ниже) |
| `/product/<slug>` | `/product/<slug>` | частичный | 273 товара; полное описание у 10 карточек |
| `/search?q=` | `/search?q=` | полный | Поиск по сохранённым названиям, подсказки, пустое состояние |
| `/cart` | `/cart` | полный | Количество, сумма, удаление, очистка, localStorage |
| `/checkout-dispatcher` | `/checkout-dispatcher` | демо | Оригинал не изучался, чтобы не создать заказ. Способы доставки/оплаты взяты с `/shipping/` и `/payment/` |
| `/contact` | `/contact` | полный + демо-форма | Адреса склада и офиса, реквизиты, карта — внешние ссылки Яндекс.Карт |
| `/shipping/` | `/shipping/` | полный | Якоря `#shipping_1` … `#shipping_6` |
| `/payment/` | `/payment/` | полный | |
| `/page/dogovor` | `/page/dogovor` | полный | |
| `/page/exchange-and-refund` | `/page/exchange-and-refund` | полный | |
| `/page/nashi-servisy` | `/page/nashi-servisy` | полный | Якоря `#p1` … `#p5` |
| `/page/biznes-s-nami` | `/page/biznes-s-nami` | полный | |
| `/page/vakansii` | `/page/vakansii` | полный | |
| `/page/sertifikaty` | `/page/sertifikaty` | частичный | Текст есть; часть сканов сертификатов не скачалась |
| `/page/privacy-policy` | `/page/privacy-policy` | полный | |
| `/page/cookie-policy` | `/page/cookie-policy` | заглушка | На оригинале только заголовок |
| `/pages` | `/pages` | полный | Список 5 публичных статей |
| `/page/cikl-istoriya-razvitiya-chajnoj-kultury` | тот же | полный | |
| `/page/vidy-chaya-iz-kitaya` | тот же | полный | |
| `/page/bum-godzhi` | тот же | полный | |
| `/page/kak-zavarivat-kitajskij-chaj-v-kolbe` | тот же | полный | |
| `/page/kak-zavarivat-chaj-v-gajvani` | тот же | полный | |
| `/shop_reviews/` | `/shop_reviews/` | частичный | 10 из 463 отзывов, средняя 4.9; email не сохранялись |
| `/pricelist` | `/pricelist` | заглушка | На оригинале нужен вход |
| `/login` | `/login` | заглушка | Вход/регистрация не воспроизводятся |
| `/my-favorite-products` | нет маршрута | не изучался | Нужен вход |
| `/product/ananasovij-ulun-tajvan` | 404 (`NotFoundPage`) | заглушка | На оригинале тоже 404 |
| неизвестный URL | `NotFoundPage` | полный | Ссылка на тот же путь на teaboom.ru |

## Изученные разделы каталога

Листинг (как правило первая страница) сохранён у:

`podarki`, `matcha`, `chernyy_tea`, `chaj-zelyonyj-s-chernym-aromatizirovannyj`, `zelenyj-chaj`, `krasnyj-chaj`, `belyj-chaj`, `zheltyj-chaj`, `ulun`, `puer`, `travyanoj-chaj`, `dobavki-k-chayu`, `fruktovyj-chaj`, `mate-i-lapacho`, `rojbush-hanibush-i-karkade-gibiskus`, `svyazannyj-chaj`, `kofe`, `siropy-i-toppingi`, `sladosti`, `posuda-i-aksessuary`, `krasnyj-kitajskij-chaj`, `naturalnyj-ulun`, `aromatizirovannyj-ulun`, `shu-puer-chernyj`, `shen-puer-zelenyj`, `mate`, `lapacho`, `sahar`.

У многих из них на оригинале 2–7 страниц — в локальной версии это отмечено плашкой на странице раздела. Остальные разделы известны по меню/хлебным крошкам: товары в них попадают, только если встретились в изученных листингах.

## Карточки с полным описанием

`/product/ananasovij-ulun`, `/product/te-guan-letnii` и ещё 8 товаров, у которых публичная страница была сохранена целиком (вкладки «Описание», «Свойства», «Отзывы», похожие товары).

## Внешние ссылки (намеренно)

Телефон, email, Telegram / VK / Одноклассники, маршруты в Яндекс.Картах, «открыть на teaboom.ru». Аналитика оригинала не подключалась.
