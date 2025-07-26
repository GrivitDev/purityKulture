'use client';

import useInView from '@/hooks/useInView';
import styles from '@/styles/sectionSide.module.css';

export default function SectionSideBySide() {
  const [ref, visible] = useInView({ threshold: 0.25 });

  return (
    <section ref={ref} className={`${styles.sideBySideSection} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.sideText}>
        <h2 className={styles.sectionTitle}>Every Stitch Tells a Story</h2>
        <p className={styles.sectionText}>
          From casual comfort to royal grandeur, our fashion expresses the soul of African femininity, crafted with modern artistry.
        </p>
      </div>
      <div className={styles.sideImage}>
        <img src="/images/hero4.jpg" alt="Stitching Story" />
      </div>
    </section>
  );
}
