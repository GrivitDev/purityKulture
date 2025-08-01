'use client';

import { JSX } from 'react';
import styles from '@/styles/galleryHomeSection.module.css';
import Image from 'next/image';

export default function SectionGallery(): JSX.Element {
  const images = [
    { src: '/images/home2.jpg', alt: 'Detailed embroidery on Ankara gown', position: styles.imgTopLeft },
    { src: '/images/home3.jpg', alt: 'Lace dress close-up detail', position: styles.imgTopRight },
    { src: '/images/home4.jpg', alt: 'Evening dress model posing', position: styles.imgBottomLeft },
    { src: '/images/home5.jpg', alt: 'Bridal couture flowing design', position: styles.imgBottomRight },
    { src: '/images/home7.jpg', alt: 'Custom tailored casual outfit', position: styles.centerImage },
  ];

  return (
    <section
      className={styles.gallerySection}
      aria-labelledby="gallery-heading"
    >
      <h2 id="gallery-heading" className={styles.sectionTitle}>
        Our Gallery
      </h2>

      <p className={styles.inspirationText}>
        Each stitch tells a story. Each photo captures a culture reborn in beauty.
      </p>

      <div className={styles.artGallery} role="region" aria-label="Featured fashion gallery">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.src}
            alt={img.alt}
            width={400}
            height={500}
            className={`${styles.galleryImage} ${img.position}`}
            priority={index === 4}
          />
        ))}
      </div>

      <a href="/gallery" className={styles.viewAllBtn} aria-label="View full fashion gallery">
        Check Out Our Full Gallery
      </a>
    </section>
  );
}
