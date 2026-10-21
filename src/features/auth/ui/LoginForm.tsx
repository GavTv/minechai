import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loginAccount } from '@/entities/session';
import { useForm } from '@/shared/lib';
import { Field, Notice } from '@/shared/ui';
import './auth-form.css';

const INITIAL = { email: '', password: '' };

export function LoginForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { values, errors, setValue, handleSubmit } = useForm(INITIAL, {
    email: ['required', 'email'],
    password: ['required', 'password'],
  });
  const [formError, setFormError] = useState('');

  return (
    <form
      className="auth-form"
      noValidate
      onSubmit={handleSubmit(() => {
        const error = loginAccount(values.email, values.password);
        if (error) {
          setFormError(error);
          return;
        }
        navigate(params.get('from') || '/account', { replace: true });
      })}
    >
      <p className="auth-form__note">Аккаунт хранится только в этом браузере. На teaboom.ru он не передаётся.</p>
      {formError && <Notice tone="warning">{formError}</Notice>}
      <Field id="login-email" label="Email" required error={errors.email}>
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
      <Field id="login-password" label="Пароль" required error={errors.password}>
        {(props) => (
          <input
            {...props}
            className="field__control"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(event) => setValue('password', event.target.value)}
          />
        )}
      </Field>
      <button className="button button--primary auth-form__submit" type="submit">
        Войти
      </button>
      <p className="auth-form__switch">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </form>
  );
}
