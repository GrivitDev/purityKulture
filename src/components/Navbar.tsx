'use client';

import { useEffect, useState } from 'react';
import { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from '@/styles/navbar.module.css';

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const SCROLL_THRESHOLD = 20;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        {/* Hamburger */}
        <div className={styles.leftRoundContainer}>
          <button
            className={styles.hamburger}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </button>
        </div>

        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <Image
            src="/logo.png"
            alt="Purity Kulture Logo"
            width={68}
            height={68}
            className={styles.logoIcon}
            priority
          />
          <div className={styles.brandText}>
            <span className={styles.purity}>Purity</span>
            <span className={styles.kulture}>Kulture</span>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/collections">Collections</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/client-wall">Clients Wall</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Social Icons */}
        <div className={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <ul className={styles.sidebarLinks}>
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link href="/collections" onClick={() => setOpen(false)}>Collections</Link></li>
          <li><Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link></li>
          <li><Link href="/client-wall" onClick={() => setOpen(false)}>Clients Wall</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
        <div className={styles.sidebarIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </aside>
    </>
  );
}
