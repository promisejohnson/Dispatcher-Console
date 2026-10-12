'use client';

import { useTransition } from 'react';
import { updateAlertStatusAction } from '@/lib/actions';
import type { AlertStatus } from '@/types';
import styles from './StatusUpdateControls.module.css';

const OPTIONS: { value: AlertStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function StatusUpdateControls({ alertId, currentStatus }: { alertId: string; currentStatus: AlertStatus }) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(status: AlertStatus) {
    startTransition(() => {
      updateAlertStatusAction(alertId, status);
    });
  }

  return (
    <div className={styles.options}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleUpdate(opt.value)}
          disabled={isPending || currentStatus === opt.value}
          className={`${styles.option} ${currentStatus === opt.value ? styles.optionActive : ''}`}
        >
          {opt.label}
        </button>
      ))}
      <p className={styles.note}>
        {isPending ? 'Updating…' : 'Status changes are visible to the public alert feed immediately.'}
      </p>
    </div>
  );
}
