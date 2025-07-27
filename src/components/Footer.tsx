'use client';

import Link from 'next/link';
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from '@/styles/footer.module.css';
import { JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <nav className={styles.footerLinks}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.footerButtons}>
            <a
              href="https://wa.me/2348164580712?text=Hello%2C%20I%27d%20love%20to%20join%20your%20WhatsApp%20channel!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our WhatsApp Channel
            </a>
            <a
              href="https://wa.me/2348164580712?text=Hi%2C%20I%27m%20interested%20in%20joining%20the%20Purity%20Kulture%20WhatsApp%20Group."
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our WhatsApp Group
            </a>
          </div>

          <div className={styles.socialIcons} aria-label="Social Media Links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/2348164580712"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <p className={styles.copyText}>
          &copy; {new Date().getFullYear()} Purity Kulture. All rights reserved.
        </p>

        <p className={styles.credit}>
          Website Designer:{' '}
          <a
            href="https://wa.me/2348164580712?text=Hi%2C%20I%20saw%20your%20work%20on%20Purity%20Kulture%20and%20would%20love%20to%20hire%20you.%20Can%20we%20talk%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            Grivit
          </a>
        </p>
      </div>
    </footer>
  );
}
