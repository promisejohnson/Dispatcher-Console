import Link from 'next/link';
import { getAlerts } from '@/lib/data';
import type { AlertStatus, Severity } from '@/types';
import AlertsTable from '@/components/AlertsTable';
import shared from '../page.module.css';
import styles from './page.module.css';

const STATUSES: (AlertStatus | 'all')[] = ['all', 'active', 'resolved', 'cancelled', 'draft'];
const SEVERITIES: (Severity | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];

interface AlertsPageProps {
  searchParams: { status?: string; severity?: string };
}

export default async function AlertsPage({ searchParams }: AlertsPageProps) {
  const allAlerts = await getAlerts();

  const statusFilter = (searchParams.status as AlertStatus | undefined) ?? 'all';
  const severityFilter = (searchParams.severity as Severity | undefined) ?? 'all';

  const filtered = allAlerts.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  function hrefFor(nextStatus: string, nextSeverity: string) {
    const params = new URLSearchParams();
    if (nextStatus !== 'all') params.set('status', nextStatus);
    if (nextSeverity !== 'all') params.set('severity', nextSeverity);
    const qs = params.toString();
    return `/dashboard/alerts${qs ? `?${qs}` : ''}`;
  }

  return (
    <div>
      <div className={shared.header}>
        <h1 className={shared.title}>Alerts</h1>
        <p className={shared.subtitle}>{filtered.length} of {allAlerts.length} alerts shown.</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Status</span>
          <div className={styles.chipRow}>
            {STATUSES.map((s) => (
              <Link
                key={s}
                href={hrefFor(s, severityFilter)}
                className={`${styles.chip} ${statusFilter === s ? styles.chipActive : ''}`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Severity</span>
          <div className={styles.chipRow}>
            {SEVERITIES.map((s) => (
              <Link
                key={s}
                href={hrefFor(statusFilter, s)}
                className={`${styles.chip} ${severityFilter === s ? styles.chipActive : ''}`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={shared.tableSection}>
        <AlertsTable alerts={filtered} />
      </div>
    </div>
  );
}
