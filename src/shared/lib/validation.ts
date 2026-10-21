export type Rule = 'required' | 'email' | 'phone' | 'message' | 'password';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateValue(value: string, rules: Rule[]): string {
  const text = value.trim();
  if (rules.includes('required') && !text) return 'Заполните это поле';
  if (!text) return '';
  if (rules.includes('email') && !EMAIL_RE.test(text)) return 'Введите email в формате name@example.ru';
  if (rules.includes('phone')) {
    const digits = text.replace(/\D/g, '');
    if (!/^\+?[\d\s()-]+$/.test(text) || digits.length < 10 || digits.length > 12) return 'Введите телефон, например +7 (900) 123-45-67';
  }
  if (rules.includes('message') && text.length < 10) return 'Сообщение должно быть не короче 10 символов';
  if (rules.includes('password') && text.length < 6) return 'Пароль должен быть не короче 6 символов';
  return '';
}

/** Validates all values; returns a map field → error (only invalid fields). */
export function validateAll<K extends string>(values: Record<K, string>, schema: Partial<Record<K, Rule[]>>): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};
  (Object.keys(schema) as K[]).forEach((key) => {
    const error = validateValue(values[key] ?? '', schema[key] ?? []);
    if (error) errors[key] = error;
  });
  return errors;
}
