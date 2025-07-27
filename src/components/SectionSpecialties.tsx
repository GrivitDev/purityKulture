'use client';

import { JSX } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/sectionSpecialties.module.css';
import Image from 'next/image';

type Specialty = {
  icon: string;
  label: string;
  description: string;
};

export default function SectionSpecialties(): JSX.Element {
  const [ref, visible] = useInView({ threshold: 0.3 });

  const specialties: Specialty[] = [
    { icon: '💃', label: 'Evening Wear', description: 'Graceful gowns for special nights.' },
    { icon: '👗', label: 'Casual Dresses', description: 'Effortless fashion for daily elegance.' },
    { icon: '👰', label: 'Bridal Couture', description: 'Custom gowns for the perfect “I do”.' },
    { icon: '🧵', label: 'Custom Tailoring', description: 'Tailored to perfection, just for you.' },
    { icon: '🌸', label: 'Floral Embroidery', description: 'Delicate floral hand-embroidery.' },
    { icon: '🔥', label: 'Ankara Fusion', description: 'Modern style with African roots.' },
  ];

  return (
    <section
      ref={ref}
      className={`${styles.specialtiesSection} ${visible ? styles.visible : styles.hidden}`}
    >
      <h2 className={styles.sectionTitle}>Our Specialties</h2>
      <div className={styles.circleWrapper}>
        <div className={styles.centerImage}>
          <Image
            src="/no-bg/home1.png"
            alt="Purity Kulture Core"
            width={400}
            height={400}
            className={styles.image}
          />
        </div>

        {specialties.map((item, index) => (
          <div
            key={index}
            className={`${styles.specialtyItem} ${styles[`item${index + 1}`]}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.desc}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
