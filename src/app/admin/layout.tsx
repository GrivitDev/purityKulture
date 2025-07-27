import { JSX } from 'react';
import AdminNav from '@/components/AdminNav';
import '@/app/globals.css';
import styles from '@/styles/adminLayout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className={styles.layoutGrid}>
      <AdminNav />
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
