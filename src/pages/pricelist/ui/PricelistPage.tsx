import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/entities/product';
import { AuthGate } from '@/features/auth';
import { formatPrice, useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import '@/features/auth/ui/auth-form.css';

export function PricelistPage() {
  useDocumentTitle('Прайслист');
  const [query, setQuery] = useState('');
  const products = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return getAllProducts()
      .filter((product) => product.variants.length)
      .filter((product) => !needle || product.name.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Прайслист' }]} />
      <h1 className="page-title">Прайслист</h1>
      <AuthGate from="/pricelist">
        <p className="auth-form__note">Цены из локальной копии каталога. На teaboom.ru они могут отличаться.</p>
        <FieldSearch value={query} onChange={setQuery} />
        <table className="pricelist-table">
          <thead>
            <tr>
              <th scope="col">Товар</th>
              <th scope="col">Фасовка</th>
              <th scope="col">Артикул</th>
              <th scope="col">Цена</th>
            </tr>
          </thead>
          <tbody>
            {products.flatMap((product) =>
              product.variants.map((variant, index) => (
                <tr key={`${product.slug}-${variant.sku}`}>
                  <td>
                    {index === 0 ? (
                      <Link className="pricelist-table__name" to={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    ) : (
                      <span className="visually-hidden">{product.name}</span>
                    )}
                  </td>
                  <td>{variant.label ?? '—'}</td>
                  <td className="pricelist-table__meta">{variant.sku}</td>
                  <td>{formatPrice(variant.price)}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </AuthGate>
    </div>
  );
}

function FieldSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="field pricelist-search">
      <label className="field__label" htmlFor="pricelist-search">
        Найти в прайсе
      </label>
      <input
        id="pricelist-search"
        className="field__control"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Название товара"
      />
    </div>
  );
}
