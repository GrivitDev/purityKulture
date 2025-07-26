'use client';

import { useState, useEffect, FormEvent } from 'react';
import styles from '@/styles/adminCollections.module.css';
import api from '@/lib/axios';

interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get('/admin/categories'); // ✅ Matches your NestJS controller
    setCategories(res.data);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    if (image) form.append('image', image);
  
    await api.post('/admin/categories', form); // ✅
    setName('');
    setImage(null);
    fetchCategories();
  };
  
  const handleDelete = async (id: string) => {
    await api.delete(`/admin/categories/${id}`); // ✅
    fetchCategories();
  };
  

  return (
    <div>
      <h2 className={styles.headingSection}>Categories</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button type="submit">Add Category</button>
      </form>

      <div className={styles.list}>
        {categories.map((cat) => (
          <div key={cat._id} className={styles.card}>
            <strong>{cat.name}</strong>
            {cat.imageUrl && (
              <img src={cat.imageUrl} alt={cat.name} className={styles.thumb} />
            )}
            <button onClick={() => handleDelete(cat._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
