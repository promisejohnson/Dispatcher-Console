'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createAlertAction, type CreateAlertState } from '@/lib/actions';
import type { Severity } from '@/types';
import styles from './NewAlertForm.module.css';

const initialState: CreateAlertState = { error: null };

const SEVERITIES: { value: Severity; label: string; hint: string }[] = [
  { value: 'critical', label: 'Critical', hint: 'Immediate danger to life — evacuate or shelter now' },
  { value: 'high', label: 'High', hint: 'Significant risk — take action soon' },
  { value: 'medium', label: 'Medium', hint: 'Be aware and prepared' },
  { value: 'low', label: 'Low', hint: 'Informational' },
];

export default function NewAlertForm() {
  const [state, formAction] = useFormState(createAlertAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      {state.error && <p className={styles.error} role="alert">{state.error}</p>}

      <label className={styles.field}>
        <span className={styles.label}>Alert type</span>
        <input
          type="text"
          name="type"
          required
          placeholder="e.g. Flash Flood, Structure Fire, Security Incident"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Region</span>
        <input
          type="text"
          name="region"
          required
          placeholder="e.g. Accra, Kumasi, Tamale"
          className={styles.input}
        />
      </label>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Severity</legend>
        <div className={styles.severityGrid}>
          {SEVERITIES.map((s, i) => (
            <label key={s.value} className={styles.severityOption}>
              <input type="radio" name="severity" value={s.value} defaultChecked={i === 2} className={styles.radio} />
              <span className={styles.severityLabel}>{s.label}</span>
              <span className={styles.severityHint}>{s.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Clear, actionable instructions for the public — what's happening and what they should do."
          className={styles.textarea}
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
      {pending ? 'Publishing…' : 'Publish alert'}
    </button>
  );
}
