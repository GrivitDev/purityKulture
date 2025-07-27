'use client';

import type { JSX } from 'react'
import type { FormEvent, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import styles from '@/styles/BtsAdmin.module.css';
import api from '@/lib/axios';

type Video = {
  _id: string;
  videoUrl: string;
  caption: string;
  description: string;
  reactions: Record<string, number>;
};

const emojiMap: Record<string, string> = {
  smile: '😊',
  thumbsUp: '👍',
  heart: '❤️',
  wow: '😮',
  sad: '😢',
};

export default function BtsAdminPage(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (): Promise<void> => {
    try {
      const res = await api.get('/bts');
      setVideos(res.data);
    } catch {
      setMessage('Failed to fetch videos.');
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!file || !caption.trim() || !description.trim()) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const form = new FormData();
      form.append('video', file);
      form.append('caption', caption);
      form.append('description', description);

      const res = await api.post('/bts', form);

      if (res.status === 200 || res.status === 201) {
        setMessage('Video uploaded!');
        setCaption('');
        setDescription('');
        setFile(null);
        fetchVideos();
      } else {
        setMessage('Upload failed.');
      }
    } catch {
      setMessage('Upload failed due to an error.');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const confirmed = window.confirm('Delete this BTS video?');
    if (!confirmed) return;

    try {
      await api.delete(`/bts/${id}`);
      fetchVideos();
    } catch {
      setMessage('Failed to delete video.');
    }
  };

  const handleReplace = async (id: string): Promise<void> => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';

    input.onchange = async () => {
      if (!input.files?.[0]) return;

      const form = new FormData();
      form.append('video', input.files[0]);

      try {
        await api.patch(`/bts/${id}/replace-video`, form);
        fetchVideos();
      } catch {
        setMessage('Failed to replace video.');
      }
    };

    input.click();
  };

  const handleUpdateText = async (id: string): Promise<void> => {
    const video = videos.find((v) => v._id === id);
    if (!video) return;

    const newCaption = prompt('Update caption:', video.caption);
    const newDescription = prompt('Update description:', video.description);

    if (newCaption !== null && newDescription !== null) {
      try {
        await api.patch(`/bts/${id}`, {
          caption: newCaption.trim(),
          description: newDescription.trim(),
        });
        fetchVideos();
      } catch {
        setMessage('Failed to update text.');
      }
    }
  };

  const handleReact = async (id: string, emoji: string): Promise<void> => {
    try {
      await api.patch(`/bts/${id}/react/${emoji}`);
      fetchVideos();
    } catch {
      setMessage('Failed to register reaction.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Behind the Scenes Manager</h1>

      <form onSubmit={handleUpload} className={styles.form}>
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <input
          type="text"
          placeholder="Caption (title)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (story)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Upload BTS Video</button>
        {message && <p className={styles.msg}>{message}</p>}
      </form>

      <div className={styles.grid}>
        {videos.map((v) => (
          <div key={v._id} className={styles.card}>
            <video src={v.videoUrl} controls />
            <h3>{v.caption}</h3>
            <p>{v.description}</p>
            <div className={styles.controls}>
              <button type="button" onClick={() => handleReplace(v._id)}>Replace Video</button>
              <button type="button" onClick={() => handleUpdateText(v._id)}>Edit Text</button>
              <button type="button" onClick={() => handleDelete(v._id)}>Delete</button>
            </div>
            <div className={styles.reactions}>
              {Object.keys(emojiMap).map((e) => (
                <button key={e} type="button" onClick={() => handleReact(v._id, e)}>
                  {emojiMap[e]} {v.reactions[e] || 0}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
