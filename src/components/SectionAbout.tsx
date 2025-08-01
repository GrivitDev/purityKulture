'use client';

import Link from 'next/link';
import styles from '@/styles/sectionAbout.module.css';
import Image from 'next/image';

export default function SectionAbout() {
  return (
    <section className={`${styles.section} ${styles.aboutSection}`}>
      <div className={styles.aboutContent}>
        <div className={styles.aboutImage}>
          <Image
            src="/no-bg/home6.png"
            alt="Model in elegant African dress designed by Purity Kulture"
            width={500}
            height={500}
            priority
            className={styles.responsiveImage}
          />
        </div>

        <div className={styles.aboutText}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.sectionText}>
            At <strong>Purity Kulture</strong>, we design elegance with intention — celebrating the strength,
            style, and grace of every woman. Our passion lies in transforming fabrics into timeless expressions
            of African beauty and global sophistication.
          </p>
          <Link href="/about" className={styles.aboutLink}>
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}
