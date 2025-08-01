'use client';

import { useEffect, useState } from 'react';
import CollectionCategoryBlock from '@/components/CollectionCategoryBlock';
import styles from '@/styles/Collections.module.css';
import api from '@/lib/axios';
import Image from 'next/image';
import { JSX } from 'react';

type Style = {
  _id: string;
  title: string;
  imageUrls: string[]; // ✅ updated to handle multiple images
  description: string;
  priceMin: number;
  priceMax: number;
  reactions: Record<string, number>;
  category: { _id: string };
};

type Category = {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  styles: Style[];
};

export default function CollectionsPage(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [catRes, styleRes] = await Promise.all([
          api.get<Category[]>('/admin/categories'),
          api.get<Style[]>('/admin/styles'),
        ]);

        const grouped = catRes.data.map((cat) => {
          const styles = styleRes.data.filter(
            (style) => style.category._id === cat._id
          );

          return {
            ...cat,
            styles,
            imageUrl: styles[0]?.imageUrls?.[0] || '/fallback-category.jpg', // ✅ updated image accessor
          };
        });

        setCategories(grouped);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Failed to fetch collections:', err.message);
        } else {
          console.error('Unknown error while fetching collections:', err);
        }

        setError('We encountered an error loading the collections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className={styles.statusMessage}>Loading Collections...</p>;
  if (error) return <p className={styles.statusMessage}>{error}</p>;
  if (!categories.length) return <p className={styles.statusMessage}>No collections available at the moment.</p>;

  return (
    <div className={styles.collectionsPage}>
      <div className={styles.brandHeader}>
        <Image src="/logo.png" alt="Purity Kulture Logo" className={styles.brandLogo} />
        <h2 className={styles.brandName}>Purity Kulture</h2>
      </div>

      <p className={styles.pageIntro}>
        Browse through the wide variety of elegant female styles we offer. Every dress
        category has its own unique touch, fit, and beauty.
      </p>

      <h1 className={styles.pageTitle}>Our Collections</h1>

      {categories.map((cat) => (
        <CollectionCategoryBlock key={cat._id} category={cat} />
      ))}
    </div>
  );
}
