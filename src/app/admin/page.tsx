'use client';

import { useEffect } from 'react';
import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/adminDashboardPage.module.css';

export default function DashboardPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('pk_admin_key');
      if (!isLoggedIn) {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return (
    <section className={styles.dashboardHome}>
      <div className={styles.welcomeSection}>
        <h1>Welcome, Purity 👋</h1>
        <p>Manage all activities from one place — use the panel below.</p>
      </div>

      <div className={styles.quickLinks}>
        <Link href="/admin/clients" className={`${styles.card} ${styles.card1}`}>
          <div className={styles.icon}>📝</div>
          <div>
            <h3>Reviews Manager</h3>
            <p>Monitor and moderate client feedback.</p>
          </div>
        </Link>

        <Link href="/admin/collections" className={`${styles.card} ${styles.card2}`}>
          <div className={styles.icon}>👗</div>
          <div>
            <h3>Collections Manager</h3>
            <p>Manage categories and fashion styles.</p>
          </div>
        </Link>

        <Link href="/admin/bts" className={`${styles.card} ${styles.card3}`}>
          <div className={styles.icon}>🎬</div>
          <div>
            <h3>BTS Manager</h3>
            <p>Upload behind-the-scenes content.</p>
          </div>
        </Link>

        <Link href="/admin/orders" className={`${styles.card} ${styles.card4}`}>
          <div className={styles.icon}>📦</div>
          <div>
            <h3>Orders Manager</h3>
            <p>Approve and follow up client orders.</p>
          </div>
        </Link>

        <Link href="/admin/gallery" className={`${styles.card} ${styles.card5}`}>
          <div className={styles.icon}>📸</div>
          <div>
            <h3>Gallery Manager</h3>
            <p>Upload and showcase visual content.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
