'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import styles from '@/styles/adminReview.module.css';
import Image from 'next/image';
import { JSX } from 'react';


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

export default function AdminClientWall(): JSX.Element   {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/client-reviews', {
        params: { page: 1, limit: 1000 },
      });
      setReviews(data.reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/client-reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Client Wall Reviews</h1>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div key={review._id} className={styles.reviewCard}>
            <h3 className={styles.reviewTitle}>{review.title}</h3>

            <p className={styles.meta}><strong>Name:</strong> {review.name || 'Anonymous'}</p>
            <p className={styles.meta}><strong>Style:</strong> {review.style}</p>
            <p className={styles.meta}><strong>Rating:</strong> {review.rating} / 5</p>

            <p className={styles.description}>{review.description}</p>

            {review.media.length > 0 && (
              <div className={styles.mediaBox}>
                {review.media.map((m, idx) =>
                  m.type === 'image' ? (
                    <Image
                      key={idx}
                      src={m.url}
                      alt="Client Style"
                      className={styles.mediaItem}
                      onClick={() => setModalImage(m.url)}
                    />
                  ) : (
                    <video key={idx} src={m.url} controls className={styles.mediaItem} />
                  )
                )}
              </div>
            )}

            <button className={styles.deleteBtn} onClick={() => handleDelete(review._id)}>
              🗑 Delete Review
            </button>
          </div>
        ))}
      </div>

      {modalImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setModalImage(null)}
        >
          <Image
            src={modalImage}
            alt="Preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '1rem',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
}
