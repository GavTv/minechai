import { useId } from 'react';
import { Price, type Variant } from '@/entities/product';
import './variant-picker.css';

interface Props {
  variants: Variant[];
  selectedSku: string;
  onSelect: (sku: string) => void;
}

/** Native radio group of packs: arrow keys and labels work out of the box. */
export function VariantPicker({ variants, selectedSku, onSelect }: Props) {
  const name = useId();
  return (
    <fieldset className="variant-picker">
      <legend className="variant-picker__legend">Фасовка</legend>
      {variants.map((variant) => (
        <label className={`variant-option ${variant.sku === selectedSku ? 'is-selected' : ''}`} key={variant.sku}>
          <input
            className="variant-option__input"
            type="radio"
            name={name}
            value={variant.sku}
            checked={variant.sku === selectedSku}
            onChange={() => onSelect(variant.sku)}
          />
          <span className="variant-option__label">{variant.label ?? 'Фасовка не указана'}</span>
          <span className="variant-option__sku">арт. {variant.sku}</span>
          <Price price={variant.price} oldPrice={variant.oldPrice} />
        </label>
      ))}
    </fieldset>
  );
}
