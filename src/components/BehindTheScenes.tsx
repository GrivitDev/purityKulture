'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import styles from '@/styles/bts.module.css';
import api from '@/lib/axios';

type BTSVideo = {
  _id: string;
  videoUrl: string;
  caption: string;
  description: string;
  reactions: Record<string, number>;
};

const emojis = [
  { key: 'smile', icon: '😊' },
  { key: 'thumbsUp', icon: '👍' },
  { key: 'heart', icon: '❤️' },
  { key: 'wow', icon: '😲' },
  { key: 'sad', icon: '😢' },
];

export default function BehindTheScenes(): JSX.Element {
  const [videos, setVideos] = useState<BTSVideo[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const fetchVideos = async (): Promise<void> => {
      try {
        const res = await api.get('/bts');
        setVideos(res.data);
      } catch (err) {
        console.error('Failed to load BTS videos', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleReact = async (videoId: string, emoji: string): Promise<void> => {
    try {
      await api.patch(`/bts/${videoId}/react/${emoji}`);
      setVideos((prev) =>
        prev.map((vid) =>
          vid._id === videoId
            ? {
                ...vid,
                reactions: {
                  ...vid.reactions,
                  [emoji]: (vid.reactions?.[emoji] || 0) + 1,
                },
              }
            : vid
        )
      );
    } catch (err) {
      console.error('Reaction failed', err);
    }
  };

  const toggleExpanded = (id: string): void => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handlePlay = (currentId: string): void => {
    Object.keys(videoRefs.current).forEach((id) => {
      if (id !== currentId) {
        videoRefs.current[id]?.pause();
      }
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading videos...</div>;
  }

  return (
    <div className={styles.btsGrid}>
      {videos.map((video) => {
        const isExpanded = expandedIds.includes(video._id);
        return (
          <div key={video._id} className={styles.btsCard}>
            <video
              controls
              className={styles.btsVideo}
              ref={(el) => {
                videoRefs.current[video._id] = el;
              }}
              onPlay={() => handlePlay(video._id)}
              aria-label={`Behind the scenes video: ${video.caption}`}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>{video.caption}</h3>
            <p className={`${styles.description} ${isExpanded ? styles.expanded : ''}`}>
              {video.description}
            </p>
            {video.description?.length > 150 && (
              <button
                type="button"
                onClick={() => toggleExpanded(video._id)}
                className={styles.readMoreBtn}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
            <div className={styles.reactionContainer}>
              {emojis.map(({ key, icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleReact(video._id, key)}
                  className={styles.reactionButton}
                >
                  {icon} {video.reactions?.[key] || 0}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
