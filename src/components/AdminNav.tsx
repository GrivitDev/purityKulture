'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import AdminLogout from './AdminLogout';
import styles from '@/styles/AdminNav.module.css';
import Image from 'next/image';

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close nav on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Sidebar Navigation */}
      <nav
        ref={navRef}
        className={`${styles.navbar} ${open ? styles.open : ''}`}
      >
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Purity Kulture Admin"
            width={120}
            height={120}
            className={styles.logo}
          />
          <h2>PURITY KULTURE</h2>
        </div>
        <ul>
          <li>
            <Link href="/admin" onClick={() => setOpen(false)}>🏠 Home</Link>
          </li>
          <li>
            <Link href="/admin/clients" onClick={() => setOpen(false)}>📝 Reviews Manager</Link>
          </li>
          <li>
            <Link href="/admin/collections" onClick={() => setOpen(false)}>👗 Collections Manager</Link>
          </li>
          <li>
            <Link href="/admin/bts" onClick={() => setOpen(false)}>🎬 BTS Manager</Link>
          </li>
          <li>
            <Link href="/admin/orders" onClick={() => setOpen(false)}>📦 Orders Manager</Link>
          </li>
          <li>
            <Link href="/admin/gallery" onClick={() => setOpen(false)}>📸 Gallery Manager</Link>
          </li>
          <li><AdminLogout /></li>
        </ul>

      </nav>
    </>
  );
}
