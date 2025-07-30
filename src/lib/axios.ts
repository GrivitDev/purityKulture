// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optional: Global response/error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Customize error logging if needed
    console.error('API Error:', error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default api;
