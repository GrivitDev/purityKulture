'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/order.module.css';
import api from '@/lib/axios';

interface StyleData {
  title: string;
  imageUrl: string;
  mediaType: 'image' | 'video';
  source: 'collection' | 'gallery' | 'client-wall';
}

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function OrderButton({ style }: { style: StyleData }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.post('/orders', {
        fullName: form.fullName,
        address: form.address,
        phoneNumber: form.phoneNumber,
        styleTitle: style.title,
        mediaUrl: style.imageUrl,
        mediaType: style.mediaType,
        source: style.source,
      });
      setMessage('✅ Order sent! We’ll message shortly via WhatsApp.');
      setForm({ fullName: '', address: '', phoneNumber: '' });
    } catch {
      setMessage('❌ Failed to send order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className={styles.orderBtn} onClick={() => setOpen(true)}>
        Order This Style
      </button>

      {open && (
        <ModalPortal>
          <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
            <div className={styles.modal}>
              <h2 className={styles.modalTitle}>Order: {style.title}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
                <input
                  name="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                  pattern="^[0-9+]{11,15}$"
                  title="Enter a valid phone number"
                  required
                  className={styles.input}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? 'Sending...' : 'Send Order'}
                </button>
              </form>

              {message && <p className={styles.feedback}>{message}</p>}

              <button onClick={() => setOpen(false)} className={styles.closeBtn}>
                × Close
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
