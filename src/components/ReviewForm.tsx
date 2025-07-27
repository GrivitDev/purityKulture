'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import styles from '@/styles/reviewForm.module.css';
import LoadingDots from './LoadingDots';
import Image from 'next/image';
import { JSX } from 'react';

export default function ReviewForm({ onSuccess }: { onSuccess: () => void }): JSX.Element {
  const [form, setForm] = useState({
    name: '',
    title: '',
    style: '',
    description: '',
    rating: 5,
    consent: false,
  });

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setMediaFiles(files);
  };

  useEffect(() => {
    const urls = mediaFiles.map((file) => URL.createObjectURL(file));
    setMediaPreview(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [mediaFiles]);

  const handleRemoveMedia = (index: number) => {
    const updated = [...mediaFiles];
    updated.splice(index, 1);
    setMediaFiles(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.title || !form.style || !form.description) return;

    setSubmitting(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
    mediaFiles.forEach((f) => data.append('media', f));

    try {
      await api.post('/client-reviews', data);
      alert('Thank you! Your review will be visible once approved.');
      setForm({ name: '', title: '', style: '', description: '', rating: 5, consent: false });
      setMediaFiles([]);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h2 className={styles.formHeading}>Share Your Experience</h2>

      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Name (optional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={styles.inputField}
        />

        <input
          type="text"
          placeholder="Title*"
          value={form.title}
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={styles.inputField}
        />

        <input
          type="text"
          placeholder="Style*"
          value={form.style}
          required
          onChange={(e) => setForm({ ...form, style: e.target.value })}
          className={styles.inputField}
        />
      </div>

      <div className={styles.ratingBlock}>
        <label>Rating:</label>
        <div className={styles.starRow}>
          {[1, 2, 3, 4, 5].map((r) => (
            <span
              key={r}
              className={`${styles.star} ${form.rating >= r ? styles.starFilled : ''}`}
              onClick={() => setForm({ ...form, rating: r })}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <textarea
        placeholder="How did it feel?*"
        value={form.description}
        required
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className={styles.textArea}
      />

      <div className={styles.fileBlock}>
        <label>Upload Images or Videos (Max: 5)</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>

      {mediaPreview.length > 0 && (
        <div className={styles.previewGrid}>
          {mediaPreview.map((url, index) => {
            const type = mediaFiles[index]?.type.startsWith('video') ? 'video' : 'image';
            return (
              <div key={index} className={styles.previewCard}>
                {type === 'image' ? (
                  <Image src={url} alt={`preview-${index}`} />
                ) : (
                  <video src={url} controls />
                )}
                <button
                  type="button"
                  className={styles.removePreviewBtn}
                  onClick={() => handleRemoveMedia(index)}
                >
                  ❌
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.checkboxWrapper}>
        <label>
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />{' '}
          I agree to have my review and media published publicly.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting || !form.consent}
        className={styles.submitButton}
      >
        {submitting ? <>Submitting <LoadingDots /></> : 'Submit Review'}
      </button>
    </form>
  );
}
