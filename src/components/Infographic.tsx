'use client';

import styles from '@/styles/Infographic.module.css';
import { motion } from 'framer-motion';

const data = [
  { letter: 'A', color: 'ribbonPurple', icon: '⏰' },
  { letter: 'B', color: 'ribbonOrange', icon: '🎵' },
  { letter: 'C', color: 'ribbonGreen', icon: '☁️' },
  { letter: 'D', color: 'ribbonBlue', icon: '₿' },
];

export default function Infographic() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centerStrip}></div>
      {data.map((item, index) => (
        <motion.div
          key={item.letter}
          className={`${styles.ribbon} ${styles[item.color]}`}
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.25, duration: 0.6 }}
        >
          <span className={styles.letter}>{item.letter}</span>
          <div className={styles.text}>
            <h4>LOREM IPSUM</h4>
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <span className={styles.icon}>{item.icon}</span>
        </motion.div>
      ))}
    </div>
  );
}
