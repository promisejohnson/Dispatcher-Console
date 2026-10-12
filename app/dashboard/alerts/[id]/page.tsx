import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAlertById } from '@/lib/data';
import { SeverityBadge, AlertStatusBadge } from '@/components/Badges';
import StatusUpdateControls from '@/components/StatusUpdateControls';
import shared from '../../page.module.css';
import styles from './page.module.css';

interface AlertDetailPageProps {
  params: { id: string };
}

export default async function AlertDetailPage({ params }: AlertDetailPageProps) {
  const alert = await getAlertById(params.id);
  if (!alert) notFound();

  return (
    <div>
      <Link href="/dashboard/alerts" className={styles.back}>← All alerts</Link>

      <div className={styles.headerRow}>
        <div>
          <h1 className={shared.title + ' mono'}>{alert.id}</h1>
          <p className={shared.subtitle}>
            Issued by {alert.issuedBy} · {new Date(alert.issuedAt).toLocaleString()}
          </p>
        </div>
        <div className={styles.badgeRow}>
          <SeverityBadge severity={alert.severity} />
          <AlertStatusBadge status={alert.status} />
        </div>
      </div>

      <div className={styles.layout}>
        <div className={shared.tableSection + ' ' + styles.mainCard}>
          <span className={styles.label}>Type</span>
          <p className={styles.value}>{alert.type}</p>

          <span className={styles.label}>Region</span>
          <p className={styles.value}>{alert.region}</p>

          <span className={styles.label}>Public message</span>
          <p className={styles.message}>{alert.message}</p>
        </div>

        <div className={styles.sideCard}>
          <h3 className={styles.sideTitle}>Update status</h3>
          <StatusUpdateControls alertId={alert.id} currentStatus={alert.status} />
        </div>
      </div>
    </div>
  );
}
