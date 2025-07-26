'use client';

import useInView from '@/hooks/useInView';
import styles from '@/styles/galleryHomeSection.module.css';

export default function SectionGallery() {
  const [ref, visible] = useInView({ threshold: 0.2 });

  const images = [
    '/images/home2.jpg',
    '/images/home3.jpg',
    '/images/home4.jpg',
    '/images/home5.jpg',
    '/images/home7.jpg',
  ];

  return (
    <section ref={ref} className={`${styles.gallerySection} ${visible ? styles.visible : styles.hidden}`}>
      <h2 className={styles.sectionTitle}>Our Gallery</h2>
      <p className={styles.inspirationText}>
        Each stitch tells a story. Each photo captures a culture reborn in beauty.
      </p>

      <div className={styles.artGallery}>
        <img src={images[0]} alt="Gallery center" className={`${styles.galleryImage} ${styles.centerImage}`} />
        <img src={images[1]} alt="Gallery 2" className={`${styles.galleryImage} ${styles.imgTopLeft}`} />
        <img src={images[2]} alt="Gallery 3" className={`${styles.galleryImage} ${styles.imgTopRight}`} />
        <img src={images[3]} alt="Gallery 4" className={`${styles.galleryImage} ${styles.imgBottomLeft}`} />
        <img src={images[4]} alt="Gallery 5" className={`${styles.galleryImage} ${styles.imgBottomRight}`} />
      </div>

      <a href="/gallery" className={styles.viewAllBtn}>Check Out Our Full Gallery</a>

    </section>
  );
}
