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

// Inline portal component — no new file
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setMessage('Order sent! We’ll message you shortly.');
      setForm({ fullName: '', address: '', phoneNumber: '' });
    } catch {
      setMessage('Failed to send order.');
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
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <h2>Order: {style.title}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Order'}
                </button>
              </form>
              {message && <p>{message}</p>}
              <button onClick={() => setOpen(false)} className={styles.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
