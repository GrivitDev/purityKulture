'use client';

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

export default function BtsAdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);
  

  const fetchVideos = async () => {
    const res = await api.get('/bts');
    setVideos(res.data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !caption || !description) {
      setMessage('All fields are required.');
      return;
    }

    const form = new FormData();
    form.append('video', file);
    form.append('caption', caption);
    form.append('description', description);

    const res = await api.post('/bts', form);
    if (res.status === 201 || res.status === 200) {
      setMessage('Video uploaded!');
      setCaption('');
      setDescription('');
      setFile(null);
      fetchVideos();
    } else {
      setMessage('Upload failed.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this BTS video?')) return;
    await api.delete(`/bts/${id}`);
    fetchVideos();
  };

  const handleReplace = async (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async () => {
      if (!input.files?.[0]) return;
      const form = new FormData();
      form.append('video', input.files[0]);
      await api.patch(`/bts/${id}/replace-video`, form);
      fetchVideos();
    };
    input.click();
  };

  const handleUpdateText = async (id: string) => {
    const newCaption = prompt('Update caption:', videos.find(v => v._id === id)?.caption);
    const newDescription = prompt('Update description:', videos.find(v => v._id === id)?.description);

    if (newCaption !== null && newDescription !== null) {
      await api.patch(`/bts/${id}`, { caption: newCaption, description: newDescription });
      fetchVideos();
    }
  };

  const handleReact = async (id: string, emoji: string) => {
    await api.patch(`/bts/${id}/react/${emoji}`);
    fetchVideos();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Behind the Scenes Manager</h1>


      <form onSubmit={handleUpload} className={styles.form}>
        <input 
          type="file" 
          accept="video/*" 
          onChange={e => setFile(e.target.files?.[0] || null)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Caption (title)" 
          value={caption} 
          onChange={e => setCaption(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description (story)" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Upload BTS Video</button>
        {message && <p className={styles.msg}>{message}</p>}
      </form>

      <div className={styles.grid}>
        {videos.map(v => (
          <div key={v._id} className={styles.card}>
            <video src={v.videoUrl} controls />
            <h3>{v.caption}</h3>
            <p>{v.description}</p>
            <div className={styles.controls}>
              <button onClick={() => handleReplace(v._id)}>Replace Video</button>
              <button onClick={() => handleUpdateText(v._id)}>Edit Text</button>
              <button onClick={() => handleDelete(v._id)}>Delete</button>
            </div>
            <div className={styles.reactions}>
              {['smile','thumbsUp','heart','wow','sad'].map(e => (
                <button key={e} onClick={() => handleReact(v._id, e)}>
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

const emojiMap: Record<string, string> = {
  smile: '😊',
  thumbsUp: '👍',
  heart: '❤️',
  wow: '😮',
  sad: '😢'
};
