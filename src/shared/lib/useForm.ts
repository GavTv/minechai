import { useState, type FormEvent } from 'react';
import { validateAll, validateValue, type Rule } from './validation';

/**
 * Client-side-only form state: validates on submit, re-validates touched fields on change,
 * focuses the first invalid control. Never sends anything anywhere.
 */
export function useForm<K extends string>(initial: Record<K, string>, schema: Partial<Record<K, Rule[]>>) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({});

  const setValue = (key: K, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key] !== undefined) {
      setErrors((current) => ({ ...current, [key]: validateValue(value, schema[key] ?? []) || undefined }));
    }
  };

  const handleSubmit = (onValid: (values: Record<K, string>) => void) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll(values, schema);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(schema) as K[]).find((key) => nextErrors[key]);
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    onValid(values);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
  };

  return { values, errors, setValue, handleSubmit, reset };
}
