import { useState } from 'react';
import { SITE } from '@/shared/config/site';
import { useForm } from '@/shared/lib';
import { Field, Notice } from '@/shared/ui';
import './contact-form.css';

const INITIAL = { name: '', email: '', message: '' };

export function ContactForm() {
  const { values, errors, setValue, handleSubmit, reset } = useForm(INITIAL, {
    name: ['required'],
    email: ['required', 'email'],
    message: ['required', 'message'],
  });
  const [checked, setChecked] = useState(false);

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit(() => {
        setChecked(true);
        reset();
      })}
    >
      <h2 className="contact-form__title">Напишите нам</h2>
      <Notice tone="info">Демо-форма: данные проверяются только в браузере и никуда не отправляются.</Notice>
      <Field id="contact-name" label="Имя" required error={errors.name}>
        {(props) => (
          <input {...props} className="field__control" name="name" autoComplete="name" value={values.name} onChange={(event) => setValue('name', event.target.value)} />
        )}
      </Field>
      <Field id="contact-email" label="Email" required error={errors.email}>
        {(props) => (
          <input {...props} className="field__control" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => setValue('email', event.target.value)} />
        )}
      </Field>
      <Field id="contact-message" label="Сообщение" required error={errors.message}>
        {(props) => (
          <textarea {...props} className="field__control" name="message" rows={5} value={values.message} onChange={(event) => setValue('message', event.target.value)} />
        )}
      </Field>
      <button className="button button--primary" type="submit">Отправить</button>
      {checked && (
        <Notice tone="success">
          Форма заполнена верно, но в локальной версии сообщение не отправлено. Связаться с магазином можно по адресу{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </Notice>
      )}
    </form>
  );
}
