'use client';

import { useEffect, useRef, useState, JSX } from 'react';
import styles from '@/styles/collectionsBlock.module.css';
import OrderButton from './OrderButton';
import api from '@/lib/axios';
import Image from 'next/image';

type Style = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  priceMin: number;
  priceMax: number;
  wow?: number;
  fire?: number;
  gem?: number;
  dislike?: number;
};

type Category = {
  _id: string;
  name: string;
  imageUrl: string;
  styles: Style[];
};

const EMOJI_MAP: Record<'😍' | '🔥' | '💎' | '👎🏽', keyof Style> = {
  '😍': 'wow',
  '🔥': 'fire',
  '💎': 'gem',
  '👎🏽': 'dislike',
};

export default function CollectionCategoryBlock({ category }: { category: Category }): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [localReactions, setLocalReactions] = useState<Record<string, Partial<Record<keyof Style, number>>>>({});
  const [reactionDisplay, setReactionDisplay] = useState<Record<string, (keyof typeof EMOJI_MAP)[]>>({});

  const [displayText, setDisplayText] = useState<string>('');
  const indexRef = useRef<number>(0);
  const isDeleting = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing effect
  useEffect(() => {
    const fullText = category.name;
    const typingSpeed = 120;
    const pauseDuration = 4000;

    const type = () => {
      const current = fullText.slice(0, indexRef.current);
      setDisplayText(current + '|');

      if (!isDeleting.current && indexRef.current < fullText.length) {
        indexRef.current++;
        timeoutRef.current = setTimeout(type, typingSpeed);
      } else if (!isDeleting.current && indexRef.current === fullText.length) {
        timeoutRef.current = setTimeout(() => {
          isDeleting.current = true;
          type();
        }, pauseDuration);
      } else if (isDeleting.current && indexRef.current > 0) {
        indexRef.current--;
        timeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        isDeleting.current = false;
        timeoutRef.current = setTimeout(type, 1000);
      }
    };

    type();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [category.name]);

  // Emoji animation
  useEffect(() => {
    const emojiKeys = Object.keys(EMOJI_MAP) as (keyof typeof EMOJI_MAP)[];
    category.styles.forEach((style) => {
      let index = 0;

      const loop = () => {
        setReactionDisplay((prev) => ({
          ...prev,
          [style._id]: emojiKeys.slice(0, index + 1),
        }));

        index++;
        if (index < emojiKeys.length) {
          setTimeout(loop, 400);
        }
      };

      loop();
    });
  }, [category.styles]);

  const handleReact = async (styleId: string, emoji: keyof typeof EMOJI_MAP) => {
    const reactionField = EMOJI_MAP[emoji];
    const key = `emoji-${styleId}-${emoji}`;

    if (typeof window !== 'undefined' && localStorage.getItem(key)) {
      return alert('You’ve already reacted!');
    }

    try {
      await api.patch(`/admin/styles/${styleId}/react`, {
        reaction: reactionField,
      });

      const current = localReactions[styleId] || {};
      const base = category.styles.find((s) => s._id === styleId);
      const baseCount = base?.[reactionField] ?? 0;

      setLocalReactions((prev) => ({
        ...prev,
        [styleId]: {
          ...current,
          [reactionField]: (Number(current[reactionField] ?? baseCount) || 0) + 1,
        },
      }));

      localStorage.setItem(key, 'true');
      alert('Thanks for reacting!');
    } catch (err) {
      console.error('Reaction failed:', err);
      alert('Failed to send reaction.');
    }
  };

  const visibleStyles =
    !expanded && category.styles.length > 4
      ? category.styles.slice(0, 4)
      : category.styles;

  return (
    <section className={styles.categorySection}>
      <div
        className={styles.categoryBanner}
        style={{ backgroundImage: `url(${category.imageUrl})` }}
        role="banner"
        aria-label={`Styles for ${category.name}`}
      >
        <h2 className={styles.categoryTitle}>{displayText}</h2>
      </div>

      <div className={styles.stylesGrid}>
        {visibleStyles.map((style) => {
          const overrides = localReactions[style._id] || {};
          const displayedEmojis = reactionDisplay[style._id] || [];

          const discountPercent = Math.round(
            ((style.priceMax - style.priceMin) / style.priceMax) * 100
          );

          return (
            <div key={style._id} className={styles.styleCard}>
              <Image
                src={style.imageUrl}
                alt={style.title}
                width={400}
                height={400}
                className={styles.styleImage}
                onClick={() => setLightboxUrl(style.imageUrl)}
                role="button"
              />

              <div className={styles.cardContent}>
                <h4 className={styles.styleTitle}>{style.title}</h4>

                <div className={styles.descriptionWrapper}>
                  <p className={styles.styleDescription}>
                    {expandedDescriptions[style._id]
                      ? style.description
                      : style.description.length > 120
                      ? `${style.description.slice(0, 120)}...`
                      : style.description}
                  </p>
                  {style.description.length > 120 && (
                    <button
                      type="button"
                      className={styles.readMoreButton}
                      onClick={() =>
                        setExpandedDescriptions((prev) => ({
                          ...prev,
                          [style._id]: !prev[style._id],
                        }))
                      }
                    >
                      {expandedDescriptions[style._id] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>

                <div className={styles.priceWrapper}>
                  <div className={styles.oldPriceBlock}>
                    <span className={styles.oldPrice}>
                      ₦{style.priceMax.toLocaleString()}
                    </span>
                    {discountPercent >= 1 && (
                      <span className={styles.discount}>{discountPercent}% off</span>
                    )}
                  </div>
                  <span className={styles.currentPrice}>
                    ₦{style.priceMin.toLocaleString()}
                  </span>
                </div>

                <div className={styles.reactionRow}>
                  {displayedEmojis.map((emoji) => {
                    const field = EMOJI_MAP[emoji];
                    return (
                      <button
                        key={emoji}
                        type="button"
                        className={styles.reactionButton}
                        onClick={() => handleReact(style._id, emoji)}
                        aria-label={`React with ${emoji}`}
                      >
                        {emoji} {overrides[field] ?? style[field] ?? 0}
                      </button>
                    );
                  })}
                </div>

                <OrderButton
                  style={{
                    title: style.title,
                    imageUrl: style.imageUrl,
                    mediaType: 'image',
                    source: 'collection',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {category.styles.length > 4 && (
        <div className={styles.showMoreWrapper}>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={styles.showMoreButton}
            aria-expanded={expanded}
          >
            {expanded ? 'Show Less' : 'See More Styles'}
          </button>
        </div>
      )}

      {lightboxUrl && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxUrl(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxContent}>
            <Image
              src={lightboxUrl}
              alt="Expanded preview"
              width={800}
              height={800}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
