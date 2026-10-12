'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction, type LoginState } from '@/lib/actions';
import styles from './LoginForm.module.css';

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      {state.error && <p className={styles.error} role="alert">{state.error}</p>}

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          type="email"
          name="email"
          required
          defaultValue="dispatcher@wask.africa"
          className={styles.input}
          autoComplete="email"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input
          type="password"
          name="password"
          required
          className={styles.input}
          autoComplete="current-password"
        />
      </label>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.submitBtn}>
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}
