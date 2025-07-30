'use client';

import { useState, useEffect } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/hero.module.css';
import Image from 'next/image';
import { JSX } from 'react';

const slides = [
  {
    image: '/no-bg/hero4.png',
    heading: 'Ankara Royalty',
    subtext: 'Bold, vibrant, and rooted in tradition.',
    font: "'Playfair Display', serif",
    color: '#6b4c3b', // deep brown
    animation: styles.typewriterLeft,
    subAnimation: styles.subFloatUp,
    position: 'right',
    bgColor: 'var(--dusty-pink)',
  },
  {
    image: '/no-bg/home5.png',
    heading: 'Bridal Elegance',
    subtext: 'Purity and grace in every detail.',
    font: "'Great Vibes', cursive",
    color: '#a4696a', // rosewood
    animation: styles.fadeInRight,
    subAnimation: styles.subFadeInDelay,
    position: 'left',
    bgColor: 'var(--light-ivory)',
  },
  {
    image: '/no-bg/home2.png',
    heading: 'Everyday Chic',
    subtext: 'Style that speaks comfort and confidence.',
    font: "'Oswald', sans-serif",
    color: '#9d7ba6', // mauve
    animation: styles.zoomIn,
    subAnimation: styles.subSlideIn,
    position: 'left',
    bgColor: 'var(--cream)',
  },
];

export default function SectionHero(): JSX.Element {
  const [ref, visible] = useInView({ threshold: 0.4 });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.heroSection} ${visible ? styles.visible : styles.hidden}`}
      style={{ backgroundColor: slides[currentSlide].bgColor }}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div key={index} className={`${styles.slide} ${isActive ? styles.active : ''}`}>
            <div className={styles.imageBlock}>
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                className={`${styles.heroImage} ${isActive ? styles.imageFloat : ''}`}
              />
              <div
                className={`${styles.textBlock} ${
                  slide.position === 'left' ? styles.textLeft : styles.textRight
                }`}
                style={{
                  fontFamily: slide.font,
                  color: slide.color,
                }}
              >
                <h1 className={`${styles.heroHeading} ${isActive ? slide.animation : ''}`}>
                  {slide.heading}
                </h1>
                <p className={`${styles.heroSubtext} ${isActive ? slide.subAnimation : ''}`}>
                  {slide.subtext}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
