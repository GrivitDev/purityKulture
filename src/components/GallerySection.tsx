'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/gallerySection.module.css';
import OrderButton from './OrderButton';
import api from '@/lib/axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { JSX } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as unknown as (props: {
  url: string;
  muted?: boolean;
  playing?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}) => JSX.Element;

type GalleryMedia = {
  _id: string;
  mediaUrl: string;
  type: 'image' | 'video';
  reactions: Record<string, number>;
};

const emojiMap: Record<'smile' | 'thumbsUp' | 'heart' | 'wow' | 'sad', string> = {
  smile: '😊',
  thumbsUp: '👍',
  heart: '❤️',
  wow: '😮',
  sad: '😢',
};

export default function GallerySection(): JSX.Element {
  const [mediaList, setMediaList] = useState<GalleryMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [userReactions, setUserReactions] = useState<Record<string, keyof typeof emojiMap>>({});

  useEffect(() => {
    fetchGallery();
    loadUserReactions();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get<GalleryMedia[]>('/gallery');
      setMediaList(res.data);
    } catch (err) {
      console.error('Failed to load gallery media', err);
    }
  };

  const loadUserReactions = () => {
    const reactions: Record<string, keyof typeof emojiMap> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith('emoji-')) {
        const parts = key.split('-');
        if (parts.length === 3 && parts[2] in emojiMap) {
          const [, id, emoji] = parts;
          reactions[id] = emoji as keyof typeof emojiMap;
        }
      }
    }
    setUserReactions(reactions);
  };

  const handleReact = async (id: string, emoji: keyof typeof emojiMap) => {
    const previous = userReactions[id];

    if (previous && previous !== emoji) {
      alert(`You already reacted with ${emojiMap[previous]}`);
      return;
    }

    try {
      await api.patch(`/gallery/${id}/react/${emoji}`);
      localStorage.setItem(`emoji-${id}-${emoji}`, 'true');
      setUserReactions((prev) => ({ ...prev, [id]: emoji }));

      // Update media list
      setMediaList((prevList) =>
        prevList.map((item) =>
          item._id === id
            ? {
                ...item,
                reactions: {
                  ...item.reactions,
                  [emoji]: (item.reactions?.[emoji] || 0) + 1,
                },
              }
            : item
        )
      );

      // Update modal
      if (selectedMedia && selectedMedia._id === id) {
        setSelectedMedia((prev) =>
          prev
            ? {
                ...prev,
                reactions: {
                  ...prev.reactions,
                  [emoji]: (prev.reactions?.[emoji] || 0) + 1,
                },
              }
            : null
        );
      }
    } catch (err) {
      console.error(`Failed to react to media ${id}`, err);
    }
  };

  const handleMediaClick = (media: GalleryMedia) => setSelectedMedia(media);
  const closeModal = () => setSelectedMedia(null);

  return (
    <>
      <div className={styles.galleryGrid}>
        {mediaList.map((media, index) => (
          <div
            key={media._id}
            className={`${styles.card} ${styles[`media-${(index % 10) + 1}`]}`}
          >
            <div className={styles.mediaWrapper} onClick={() => handleMediaClick(media)}>
              {media.type === 'image' ? (
                <Image
                  src={media.mediaUrl}
                  alt="Gallery"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.media}
                />
              ) : (
                <ReactPlayer
                  url={media.mediaUrl}
                  muted
                  playing
                  loop
                  width="100%"
                  height="100%"
                  className={styles.media}
                />
              )}
            </div>

            <div className={styles.reactionCounts}>
              {(Object.keys(emojiMap) as Array<keyof typeof emojiMap>).map((emoji) => (
                <span key={emoji} className={styles.reaction}>
                  {emojiMap[emoji]} {media.reactions?.[emoji] || 0}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className={styles.modalOverlay} onClick={closeModal} role="dialog" aria-modal="true">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.mediaUrl}
                alt="Enlarged Media"
                width={900}
                height={600}
                className={styles.modalImage}
              />
            ) : (
              <ReactPlayer
                url={selectedMedia.mediaUrl}
                controls
                playing
                muted
                width="100%"
                height="100%"
                className={styles.modalVideo}
              />
            )}

            <div className={styles.reactions}>
              {(Object.keys(emojiMap) as Array<keyof typeof emojiMap>).map((emoji) => {
                const isReacted = userReactions[selectedMedia._id] === emoji;
                return (
                  <button
                    key={emoji}
                    onClick={() => handleReact(selectedMedia._id, emoji)}
                    className={isReacted ? styles.activeEmoji : ''}
                  >
                    {emojiMap[emoji]} {selectedMedia.reactions?.[emoji] || 0}
                  </button>
                );
              })}
            </div>

            <OrderButton
              style={{
                title: 'Gallery Style',
                imageUrl: selectedMedia.mediaUrl,
                mediaType: selectedMedia.type,
                source: 'gallery',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
