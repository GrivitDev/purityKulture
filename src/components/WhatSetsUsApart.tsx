'use client';

import { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/About.module.css';

interface BarItem {
  label: string;
  percentage: number;
  description: string;
}

const barData: BarItem[] = [
  {
    label: 'Custom Fittings',
    percentage: 95,
    description: 'Tailored designs made to embrace your body perfectly.',
  },
  {
    label: 'Cultural Innovation',
    percentage: 90,
    description: 'Blending heritage with modern aesthetics.',
  },
  {
    label: 'Artistry & Elegance',
    percentage: 98,
    description: 'Every design drips with divine creativity and detail.',
  },
  {
    label: 'Spirit-led Creativity',
    percentage: 100,
    description: 'Inspired by faith and filled with spiritual essence.',
  },
  {
    label: 'Personal Styling Consultations',
    percentage: 85,
    description: 'We walk with you to express your best self through fashion.',
  },
];

export default function WhatSetsUsApart(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.4 }
    );

    const refCurrent = sectionRef.current;
    if (refCurrent) observer.observe(refCurrent);
    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
    };
  }, []);

  return (
    <section className={styles.diff} ref={sectionRef}>
      <h2>What Sets Us Apart</h2>
      <div className={styles.barsContainer}>
        {barData.map((item) => (
          <div className={styles.barGroup} key={item.label}>
            <span>{item.label}</span>
            <div className={styles.progressBar}>
              <div
                className={`${styles.barFill} ${visible ? styles.animate : ''}`}
                style={{
                  width: visible ? `${item.percentage}%` : '0%',
                }}
              >
                <span className={styles.percentText}>
                  {visible ? `${item.percentage}%` : ''}
                </span>
              </div>
            </div>
            <p className={styles.barDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
