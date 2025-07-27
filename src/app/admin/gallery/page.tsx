'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios'
import styles from '@/styles/GalleryAdmin.module.css';
import Image from 'next/image';
import type { JSX } from 'react';

type Media = {
  _id: string;
  mediaUrl: string;
  type: 'image' | 'video';
  source: string;
  reactions: Record<string, number>;
};

export default function GalleryAdminPage(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await api.get<Media[]>('/gallery');
    setMediaList(res.data);
  };
  

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!files.length) return setMessage('Select files first.');
  
    const form = new FormData();
    files.forEach(file => form.append('media', file));
  
    // DEBUG: Log the content
    for (const [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      await api.post('/gallery', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Uploaded successfully!');
      setFiles([]);
      fetchMedia();
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('Upload failed.');
    }
  };
  
  

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media?')) return;
    await api.delete(`/gallery/${id}`);
    fetchMedia();
  };
  

  const handleReplace = async (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = async () => {
      if (!input.files?.[0]) return;
      const form = new FormData();
      form.append('media', input.files[0]);
      await api.patch(`/gallery/${id}/replace-media`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchMedia();
    };
    input.click();
  };
  

  const handleReact = async (id: string, emoji: string) => {
    await api.patch(`/gallery/${id}/like`, { emoji });
    fetchMedia();
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Gallery Manager</h1>

      <section className={styles.uploadSection}>
        <label>
          <input type="file" multiple onChange={handleFilesChange} accept="image/*,video/*" />
        </label>
        <button onClick={handleUpload}>Upload</button>
        {message && <p className={styles.message}>{message}</p>}
      </section>

      <section className={styles.grid}>
        {mediaList.map(m => (
          <div key={m._id} className={styles.card}>
            {m.type === 'image' ? (
              <Image src={m.mediaUrl} alt="Gallery" />
            ) : (
              <video src={m.mediaUrl} controls />
            )}
            <div className={styles.cardControls}>
              <button onClick={() => handleReplace(m._id)}>Replace</button>
              <button onClick={() => handleDelete(m._id)}>Delete</button>
            </div>
            <div className={styles.reactions}>
              {Object.entries(m.reactions).map(([emo, count]) => (
                <button key={emo} onClick={() => handleReact(m._id, emo)}>
                  {emo} {count}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
