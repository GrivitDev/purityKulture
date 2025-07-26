import AdminNav from '@/components/AdminNav';
import '@/app/globals.css';
import styles from '@/styles/adminLayout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutGrid}>
      <AdminNav />
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
