// src/app/admin/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import styles from '@/styles/adminOrder.module.css';

interface Order {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  styleTitle: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  source: 'collection' | 'gallery' | 'client-review';
  approved: boolean;
  createdAt: string;
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | Order['source']>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get('/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await api.post(`/orders/${id}/approve`);
  
      if (res.data?.success && res.data?.waLink) {
        // Update the UI
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, approved: true } : o))
        );
  
        // Open WhatsApp chat link in new tab
        window.open(res.data.waLink, '_blank');
      } else {
        console.error('Approval success but no wa.me link returned.');
      }
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };
  

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.source === filter);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Customer Orders</h1>


      <div className={styles.filters}>
        {['all', 'collection', 'gallery', 'client-review'].map((src) => (
          <button
            key={src}
            onClick={() => setFilter(src as any)}
            className={filter === src ? styles.active : ''}
          >
            {src.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.orderList}>
        {filtered.map((order) => (
          <div key={order._id} className={styles.card}>
            <h3>{order.name}</h3>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Style:</strong> {order.styleTitle}</p>
            {order.mediaType === 'image' ? (
              <img src={order.mediaUrl} alt="Style" className={styles.media} />
            ) : (
              <video src={order.mediaUrl} controls className={styles.media} />
            )}
            <p><strong>Source:</strong> {order.source}</p>
            <p><strong>Status:</strong> {order.approved ? '✅ Approved' : '⏳ Pending'}</p>

            {!order.approved && (
              <button onClick={() => handleApprove(order._id)} className={styles.approveBtn}>
                Approve and Notify
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
