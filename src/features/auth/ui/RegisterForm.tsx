import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAccount } from '@/entities/session';
import { useForm } from '@/shared/lib';
import { Field, Notice } from '@/shared/ui';
import './auth-form.css';

const INITIAL = { name: '', email: '', password: '', confirm: '' };

export function RegisterForm() {
  const navigate = useNavigate();
  const { values, errors, setValue, handleSubmit } = useForm(INITIAL, {
    name: ['required'],
    email: ['required', 'email'],
    password: ['required', 'password'],
    confirm: ['required'],
  });
  const [formError, setFormError] = useState('');

  return (
    <form
      className="auth-form"
      noValidate
      onSubmit={handleSubmit(() => {
        if (values.password !== values.confirm) {
          setFormError('Пароли не совпадают');
          return;
        }
        const error = registerAccount(values.name, values.email, values.password);
        if (error) {
          setFormError(error);
          return;
        }
        navigate('/account', { replace: true });
      })}
    >
      <p className="auth-form__note">Нужны имя, почта и пароль. Данные остаются в этом браузере.</p>
      {formError && <Notice tone="warning">{formError}</Notice>}
      <Field id="register-name" label="Имя" required error={errors.name}>
        {(props) => (
          <input
            {...props}
            className="field__control"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setValue('name', event.target.value)}
          />
        )}
      </Field>
      <Field id="register-email" label="Email" required error={errors.email}>
        {(props) => (
          <input
            {...props}
            className="field__control"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValue('email', event.target.value)}
          />
        )}
      </Field>
      <Field id="register-password" label="Пароль" required error={errors.password} hint="Не меньше 6 символов">
        {(props) => (
          <input
            {...props}
            className="field__control"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => setValue('password', event.target.value)}
          />
        )}
      </Field>
      <Field id="register-confirm" label="Повторите пароль" required error={errors.confirm}>
        {(props) => (
          <input
            {...props}
            className="field__control"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={values.confirm}
            onChange={(event) => setValue('confirm', event.target.value)}
          />
        )}
      </Field>
      <button className="button button--primary auth-form__submit" type="submit">
        Создать аккаунт
      </button>
      <p className="auth-form__switch">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}
