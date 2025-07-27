'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/AdminNav.module.css';

export default function AdminLogout(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = (): void => {
    try {
      setLoading(true);
      localStorage.removeItem('admin-logged-in');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={styles.adminLogoutButton}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
