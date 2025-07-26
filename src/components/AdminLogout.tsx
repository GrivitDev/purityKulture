'use client';

import { useRouter } from 'next/navigation';
import styles from '@/styles/AdminNav.module.css';

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in');
    router.push('/admin/login');
  };

  return (
    <button onClick={handleLogout} className={styles.adminLogoutButton}>
      Logout
    </button>
  );
}
