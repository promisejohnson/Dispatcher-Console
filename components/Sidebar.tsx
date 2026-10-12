import Link from 'next/link';
import { logoutAction } from '@/lib/actions';
import type { DispatchUser } from '@/types';
import styles from './Sidebar.module.css';

export default function Sidebar({ user }: { user: DispatchUser }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>W</div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>WASK</span>
          <span className={styles.brandSub}>Dispatch Console</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navLink}>Overview</Link>
        <Link href="/dashboard/alerts" className={styles.navLink}>Alerts</Link>
        <Link href="/dashboard/alerts/new" className={styles.navLinkPrimary}>+ New alert</Link>
      </nav>

      <div className={styles.userBox}>
        <div className={styles.userAvatar}>{user.name.charAt(0)}</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{user.role}</span>
        </div>
      </div>
      <form action={logoutAction}>
        <button type="submit" className={styles.logoutBtn}>Sign out</button>
      </form>
    </aside>
  );
}
