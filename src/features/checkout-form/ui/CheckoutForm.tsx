import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, type Rule } from '@/shared/lib';
import { Field, Notice } from '@/shared/ui';
import './checkout-form.css';

const DELIVERY = [
  'Самовывоз (ул. Народного Ополчения, 47)',
  'Самовывоз (м. Октябрьское поле, выход №1)',
  'Самовывоз (МЦК Панфиловская)',
  'Доставка курьером',
  'До пункта отправления Почта России в г. Москва',
  'До пункта отправления CDEK в г. Москва',
];

const PAYMENT = ['Наличные курьеру', 'Оплата при самовывозе', 'ЮKassa', 'Оплата по счету', 'Предоплата'];

const needsAddress = (delivery: string) => !delivery.startsWith('Самовывоз');

const INITIAL = { name: '', phone: '', email: '', delivery: '', address: '', payment: '', comment: '' };
type Key = keyof typeof INITIAL;

function RadioGroup({ name, legend, options, value, error, onChange }: { name: Key; legend: string; options: string[]; value: string; error?: string; onChange: (value: string) => void }) {
  return (
    <fieldset className="checkout-form__group" aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="field__label">
        {legend}
        <span className="field__required" aria-hidden="true">*</span>
      </legend>
      {options.map((option) => (
        <label className="check" key={option}>
          <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} />
          {option}
        </label>
      ))}
      {error && <p className="field__error" id={`${name}-error`}>{error}</p>}
    </fieldset>
  );
}

export function CheckoutForm() {
  const [checked, setChecked] = useState(false);
  const schema: Partial<Record<Key, Rule[]>> = {
    name: ['required'],
    phone: ['required', 'phone'],
    email: ['required', 'email'],
    delivery: ['required'],
    payment: ['required'],
  };
  const form = useForm(INITIAL, schema);
  if (needsAddress(form.values.delivery)) schema.address = ['required'];
  const { values, errors, setValue } = form;

  return (
    <form className="checkout-form" noValidate onSubmit={form.handleSubmit(() => setChecked(true))}>
      <Notice tone="warning">
        Это локальная демо-версия: заказ не создаётся и никуда не отправляется, оплата недоступна. Реальный заказ можно оформить только на teaboom.ru.
      </Notice>

      <div className="checkout-form__row">
        <Field id="checkout-name" label="Имя" required error={errors.name}>
          {(props) => <input {...props} className="field__control" name="name" autoComplete="name" value={values.name} onChange={(event) => setValue('name', event.target.value)} />}
        </Field>
        <Field id="checkout-phone" label="Телефон" required error={errors.phone}>
          {(props) => <input {...props} className="field__control" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => setValue('phone', event.target.value)} />}
        </Field>
        <Field id="checkout-email" label="Email" required error={errors.email}>
          {(props) => <input {...props} className="field__control" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => setValue('email', event.target.value)} />}
        </Field>
      </div>

      <RadioGroup name="delivery" legend="Способ получения" options={DELIVERY} value={values.delivery} error={errors.delivery} onChange={(value) => setValue('delivery', value)} />
      <p className="field__hint">
        Условия и стоимость каждого способа — на странице <Link to="/shipping/">«Методы доставки»</Link>.
      </p>

      {needsAddress(values.delivery) && values.delivery && (
        <Field id="checkout-address" label="Адрес доставки" required error={errors.address}>
          {(props) => <textarea {...props} className="field__control" name="address" rows={3} autoComplete="street-address" value={values.address} onChange={(event) => setValue('address', event.target.value)} />}
        </Field>
      )}

      <RadioGroup name="payment" legend="Способ оплаты" options={PAYMENT} value={values.payment} error={errors.payment} onChange={(value) => setValue('payment', value)} />
      <p className="field__hint">
        Подробнее — на странице <Link to="/payment/">«Методы оплаты»</Link>.
      </p>

      <Field id="checkout-comment" label="Комментарий к заказу">
        {(props) => <textarea {...props} className="field__control" name="comment" rows={3} value={values.comment} onChange={(event) => setValue('comment', event.target.value)} />}
      </Field>

      <button className="button button--primary" type="submit">Проверить данные заказа</button>
      {checked && (
        <Notice tone="success">
          Данные заполнены верно. В локальной версии заказ не оформляется — корзина сохранена, вы можете вернуться к ней в любой момент.
        </Notice>
      )}
    </form>
  );
}
