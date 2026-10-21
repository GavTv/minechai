import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon';
import './quantity.css';

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max?: number;
}

/** − [n] + stepper; typed values are committed on blur or Enter. */
export function QuantityInput({ value, onChange, label, max = 99 }: Props) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  const commit = () => {
    const parsed = Number.parseInt(draft, 10);
    const next = Number.isFinite(parsed) ? Math.min(max, Math.max(1, parsed)) : value;
    setDraft(String(next));
    if (next !== value) onChange(next);
  };

  return (
    <div className="quantity" role="group" aria-label={label}>
      <button className="quantity__button" type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Уменьшить количество">
        <Icon name="minus" />
      </button>
      <input
        className="quantity__input"
        type="text"
        inputMode="numeric"
        value={draft}
        aria-label="Количество"
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, ''))}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
          }
        }}
      />
      <button className="quantity__button" type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Увеличить количество">
        <Icon name="plus" />
      </button>
    </div>
  );
}
