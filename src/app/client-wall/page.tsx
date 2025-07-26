'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import styles from '@/styles/review.module.css';

interface Media {
  url: string;
  type: 'image' | 'video';
}

interface Review {
  _id: string;
  name?: string;
  title: string;
  style: string;
  description: string;
  rating: number;
  media: Media[];
  likes: number;
}

export default function ClientWallPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadReviews = async () => {
    try {
      const { data } = await api.get('/client-reviews', {
        params: { page, limit: 500 },
      });

      if (page === 1) {
        setReviews(data.reviews);
      } else {
        setReviews((prev) => [...prev, ...data.reviews]);
      }

      setHasMore(reviews.length + data.reviews.length < data.total);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

const handleToggleExpand = (id: string) => {
  setExpandedReviews(prev => ({
    ...prev,
    [id]: !prev[id],
  }));
};

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLike = async (id: string) => {
    try {
      const { data } = await api.post(`/client-reviews/${id}/like`);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, likes: data.likes } : r))
      );
    } catch (err) {
      console.error('Failed to like review:', err);
    }
  };

  const handleReviewSubmit = () => {
    setPage(1);
    loadReviews();
  };

  return (
    <main className={styles.reviewContainer}>
      <div className={styles.brandHeader}>
        <img
          src="/logo.png" // Update this if using a different path
          alt="Purity Kulture Logo"
          className={styles.brandLogo}
        />
        <h2 className={styles.brandName}>Purity Kulture</h2>
      </div>

      <h1 className={styles.reviewTitle}>Client Wall</h1>

      <section className={styles.reviewGrid}>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onLike={handleLike}
            isExpanded={!!expandedReviews[review._id]}
            onToggleExpand={handleToggleExpand}
          />

        ))}
      </section>

      {hasMore && (
        <div className={styles.paginationContainer}>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={styles.paginationBtn}
          >
            Load More Reviews
          </button>
        </div>
      )}

      <ReviewForm onSuccess={handleReviewSubmit} />
    </main>
  );
}
