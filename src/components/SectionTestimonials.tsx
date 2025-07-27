'use client';

import { useEffect, useState } from 'react';
import useInView from '@/hooks/useInView';
import api from '@/lib/axios';
import styles from '@/styles/testimSection.module.css';
import { JSX } from 'react';
interface Review {
  _id: string;
  title: string;
  description: string;
  name?: string;
}

function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
}

export default function SectionTestimonials(): JSX.Element {
  const [ref, visible] = useInView({ threshold: 0.3 });
  const [testimonials, setTestimonials] = useState<Review[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/client-reviews', {
          params: { page: 1, limit: 500 },
        });

        const allReviews: Review[] = data.reviews;
        const shuffled = allReviews.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setTestimonials(selected);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.testimonialSection} ${visible ? styles.visible : styles.hidden}`}
    >
      <h2 className={styles.sectionTitle}>What Our Clients Say</h2>

      <div className={styles.testimonialGrid}>
        {testimonials.map((t) => (
          <blockquote key={t._id} className={styles.testimonialCard}>
            <h3 className={styles.testimonialTitle}>{t.title}</h3>
            <p className={styles.testimonialText}>
              <span>&quot;{truncateWords(t.description, 50)}&quot;</span>
            </p>
            <footer className={styles.testimonialFooter}>
              — {t.name || 'Anonymous'}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
