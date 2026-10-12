import type { Severity, AlertStatus } from '@/types';
import styles from './Badges.module.css';

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: 'var(--critical)',
  high: 'var(--high)',
  medium: 'var(--medium)',
  low: 'var(--low)',
};

const STATUS_COLOR: Record<AlertStatus, string> = {
  draft: 'var(--text-dim)',
  active: 'var(--critical)',
  resolved: 'var(--low)',
  cancelled: 'var(--text-muted)',
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const color = SEVERITY_COLOR[severity];
  return (
    <span
      className={styles.badge}
      style={{ color, borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, background: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      {severity}
    </span>
  );
}

export function AlertStatusBadge({ status }: { status: AlertStatus }) {
  const color = STATUS_COLOR[status];
  return (
    <span
      className={styles.badge}
      style={{ color, borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, background: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      {status}
    </span>
  );
}
