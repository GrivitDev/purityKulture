'use client';

import useInView from '@/hooks/useInView';
import styles from '@/styles/collectionssection.module.css';
import Image from 'next/image';

const collections = [
  {
    title: 'Bridal Couture',
    image: '/images/home1.jpg',
    description: 'Graceful gowns tailored for elegance and timeless love.',
  },
  {
    title: 'Ankara Fusion',
    image: '/images/home2.jpg',
    description: 'A bold mix of culture, color, and modern fashion.',
  },
  {
    title: 'Lace Elegance',
    image: '/images/home3.jpg',
    description: 'Delicate patterns for refined and luxurious style.',
  },
  {
    title: 'Casual Chic',
    image: '/images/home5.jpg',
    description: 'Effortless daily wear that blends comfort with flair.',
  },
  {
    title: 'Evening Glamour',
    image: '/images/home4.jpg',
    description: 'Statement pieces perfect for shining at any event.',
  },
  {
    title: 'Custom Tailoring',
    image: '/images/home7.jpg',
    description: 'Made-to-measure creations for your perfect fit.',
  },
  {
    title: 'Floral Beauty',
    image: '/images/home8.jpg',
    description: 'Inspired by nature, designed to bloom with style.',
  },
  {
    title: 'Traditional Attire',
    image: '/images/home10.jpg',
    description: 'Rooted in heritage with a modern silhouette.',
  },
];

export default function SectionCollections() {
  const [ref, visible] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${styles.collectionsSection} ${visible ? styles.visible : styles.hidden}`}>
      <h2 className={styles.sectionTitle}>Our Collections</h2>
      <p className={styles.sectionText}>
        Explore diverse styles from our curated categories — Bridal, Ankara, Casual, Lace & More.
      </p>

      <div className={styles.collectionScroll}>
        {collections.map((item, index) => (
          <div key={index} className={styles.collectionCard}>
            <Image src={item.image} alt={item.title} fill className={styles.collectionImage} />
            <h3 className={styles.collectionTitle}>{item.title}</h3>
            <p className={styles.collectionDescription}>{item.description}</p>
          </div>
        ))}
      </div>

      <a href="/collections" className={styles.viewAllBtn}>Explore More Styles</a>
    </section>
  );
}
