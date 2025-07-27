'use client';

import { JSX } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/sectionSide.module.css';
import Image from 'next/image';

export default function SectionSideBySide(): JSX.Element {
  const [ref, visible] = useInView({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      className={`${styles.sideBySideSection} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.sideText}>
        <h2 className={styles.sectionTitle}>Every Stitch Tells a Story</h2>
        <p className={styles.sectionText}>
          From casual comfort to royal grandeur, our fashion expresses the soul of African femininity,
          crafted with modern artistry.
        </p>
      </div>
      <div className={styles.sideImage}>
        <Image
          src="/images/hero4.jpg"
          alt="Stitching Story"
          width={600}
          height={500}
          className={styles.image}
        />
      </div>
    </section>
  );
}
