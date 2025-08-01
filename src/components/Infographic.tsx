'use client';

import styles from '@/styles/Infographic.module.css';
import { motion } from 'framer-motion';

const data = [
  { letter: 'A', title: 'Time Management', description: 'Master the clock, own the day.', icon: '⏰' },
  { letter: 'B', title: 'Creativity', description: 'Unleash your inner melody.', icon: '🎵' },
  { letter: 'C', title: 'Cloud Sync', description: 'Stay connected everywhere.', icon: '☁️' },
  { letter: 'D', title: 'Crypto Ready', description: 'Future of finance is here.', icon: '₿' },
];

export default function Infographic() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centerStrip}></div>
      {data.map((item, index) => (
        <motion.div
          key={item.letter}
          className={styles.ribbonContainer}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          <div className={styles.ribbon}>
            <div className={styles.ribbonCapLeft}></div>
            <div className={styles.ribbonBody}>
              <span className={styles.letter}>{item.letter}</span>
              <div>
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.description}>{item.description}</p>
              </div>
              <span className={styles.icon}>{item.icon}</span>
            </div>
            <div className={styles.ribbonCapRight}></div>
          </div>
          <div className={styles.ribbonTailLeft}></div>
          <div className={styles.ribbonTailRight}></div>
        </motion.div>
      ))}
    </div>
  );
}
