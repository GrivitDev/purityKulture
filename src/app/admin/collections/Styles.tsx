'use client';

import { useEffect, useState, FormEvent } from 'react';
import api from '@/lib/axios';
import styles from '@/styles/adminCollections.module.css';
import Image from 'next/image';
import type { JSX } from 'react';


interface Category {
  _id: string;
  name: string;
}

interface Style {
  _id: string;
  title: string;
  description: string;
  priceMin: number;
  priceMax: number;
  imageUrl?: string;
  category: Category;
}

export default function StylesManager(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stylesList, setStylesList] = useState<Style[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priceMin: '',
    priceMax: '',
    category: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const cats = await api.get('/admin/categories'); // ✅ matches your backend
    setCategories(cats.data);
  
    const stylesRes = await api.get('/admin/styles'); // ✅
    setStylesList(stylesRes.data);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('priceMin', form.priceMin);
    formData.append('priceMax', form.priceMax);
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);
  
    await api.post('/admin/styles', formData); // ✅
    setForm({ title: '', description: '', priceMin: '', priceMax: '', category: '', image: null });
    fetchAll();
  };
  
  const handleDelete = async (id: string) => {
    await api.delete(`/admin/styles/${id}`); // ✅
    fetchAll();
  };  

  return (
    <div>
      <h2 className={styles.headingSection}>Styles</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Min Price"
          value={form.priceMin}
          onChange={(e) => setForm({ ...form, priceMin: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Max Price"
          value={form.priceMax}
          onChange={(e) => setForm({ ...form, priceMax: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />
        <button type="submit">Add Style</button>
      </form>

      <div className={styles.list}>
        {stylesList.map((style) => (
          <div key={style._id} className={styles.card}>
            <strong>{style.title}</strong>
            <p className={styles.clampDescription}>{style.description}</p>
            <p>
              ₦{style.priceMin} - ₦{style.priceMax}
            </p>
            {style.imageUrl && (
              <Image src={style.imageUrl} alt={style.title} className={styles.thumb} />
            )}
            <p><em>{style.category?.name}</em></p>
            <button onClick={() => handleDelete(style._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
