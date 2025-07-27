'use client';

import React, { useState } from 'react';
import ReactPlayer from './ReactPlayerWrapper';
import styles from '@/styles/reviewCard.module.css';
import OrderButton from './OrderButton';
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

export default function ReviewCard({
  review,
  onLike,
  isExpanded,
  onToggleExpand,
}: {
  review: Review;
  onLike: (id: string) => void;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}): JSX.Element {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const renderMedia = () => {
    const items = review.media.slice(0, 5); // max 5 items

    return items.map((m, idx) => (
      <button
        key={idx}
        onClick={() => setSelectedMedia(m)}
        className={`${styles.mediaItem} ${styles[`mediaItem${items.length}-${idx}`]}`}
      >
        {m.type === 'image' ? (
          <Image src={m.url} alt={`media-${idx}`} className={styles.reviewImage} />
        ) : (
          <ReactPlayer
            url={m.url}
            muted
            controls={false}
            playing={false}
            width="100%"
            height="100%"
            className={styles.reviewVideo}
          />
        )}
      </button>
    ));
  };

  return (
    <>
      <div className={styles.reviewCard}>
        <h3 className={styles.reviewTitleText}>{review.title}</h3>
        <div className={styles.reviewName}>
          {review.name || 'Anonymous'} — <span className={styles.reviewStyle}>{review.style}</span>
        </div>
        <div className={styles.reviewStars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
          ))}
        </div>
        <div>
          <p className={`${styles.reviewDescription} ${isExpanded ? styles.expandedText : ''}`}>
            {review.description}
          </p>
          {review.description.length > 100 && (
            <span
              onClick={() => onToggleExpand(review._id)}
              className={styles.readMoreBtn}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </span>
          )}
        </div>


        {review.media.length > 0 && (
          <div className={styles.mediaContainer}>{renderMedia()}</div>
        )}

        <div className={styles.likeContainer}>
          <button onClick={() => onLike(review._id)} className={styles.likeBtn}>❤️</button>
          <span className={styles.likeCount}>{review.likes}</span>
        </div>

        <OrderButton
          style={{
            title: review.style,
            imageUrl: review.media[0]?.url || '',
            mediaType: review.media[0]?.type || 'image',
            source: 'client-wall',
          }}
        />
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div className={styles.lightboxOverlay} onClick={() => setSelectedMedia(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <Image src={selectedMedia.url} alt="fullscreen" />
            ) : (
              <ReactPlayer url={selectedMedia.url} controls width="100%" />
            )}
          </div>
        </div>
      )}
    </>
  );
}

