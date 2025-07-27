'use client';

import BehindTheScenes from '@/components/BehindTheScenes';
import GallerySection from '@/components/GallerySection';
import styles from '@/styles/Gallery.module.css';
import Image from 'next/image';
import type { JSX } from 'react';

export default function GalleryPage(): JSX.Element {
  return (
    <div className={styles.galleryContainer}>
      <header className={styles.pageHeader}>
        <div className={styles.brandHeader}>
          <Image
            src="/logo.png"
            alt="Purity Kulture Logo"
            className={styles.brandLogo}
            width={120}
            height={120}
            priority
          />
          <h2 className={styles.brandName}>Purity Kulture</h2>
        </div>
        <p className={styles.introText}>
          Take a look at some of our stunning designs and behind-the-scenes moments.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Gallery Styles</h2>
        <GallerySection />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Behind the Scenes</h2>
        <BehindTheScenes />
      </section>
    </div>
  );
}
