import Link from 'next/link';
import NewAlertForm from '@/components/NewAlertForm';
import shared from '../../page.module.css';
import styles from './page.module.css';

export default function NewAlertPage() {
  return (
    <div>
      <Link href="/dashboard/alerts" className={styles.back}>← All alerts</Link>
      <div className={shared.header}>
        <h1 className={shared.title}>Issue a new alert</h1>
        <p className={shared.subtitle}>This will be published to the public alert network immediately.</p>
      </div>
      <NewAlertForm />
    </div>
  );
}
