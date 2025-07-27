'use client';

import { JSX, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLogout from './AdminLogout';
import styles from '@/styles/AdminNav.module.css';

export default function AdminNav(): JSX.Element {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
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
      <button
        type="button"
        className={styles.mobileMenuButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <nav
        ref={navRef}
        className={`${styles.navbar} ${open ? styles.open : ''}`}
        aria-label="Admin Navigation"
      >
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Purity Kulture Admin"
            width={120}
            height={120}
            className={styles.logo}
            priority
          />
          <h2>PURITY KULTURE</h2>
        </div>

        <ul>
          <li>
            <Link href="/admin" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Home">🏠</span> Home
            </Link>
          </li>
          <li>
            <Link href="/admin/clients" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Reviews">📝</span> Reviews Manager
            </Link>
          </li>
          <li>
            <Link href="/admin/collections" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Collections">👗</span> Collections Manager
            </Link>
          </li>
          <li>
            <Link href="/admin/bts" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Behind the Scenes">🎬</span> BTS Manager
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Orders">📦</span> Orders Manager
            </Link>
          </li>
          <li>
            <Link href="/admin/gallery" onClick={() => setOpen(false)}>
              <span role="img" aria-label="Gallery">📸</span> Gallery Manager
            </Link>
          </li>
          <li>
            <AdminLogout />
          </li>
        </ul>
      </nav>
    </>
  );
}
