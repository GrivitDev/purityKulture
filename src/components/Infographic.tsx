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
    <div className={styles.container}>
      {data.map((item, index) => (
        <motion.div
          key={item.letter}
          className={`${styles.ribbon} ${styles[item.color]}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3, duration: 0.6 }}
        >
          <span className={styles.letter}>{item.letter}</span>
          <div>
            <h4>LOREM IPSUM</h4>
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <span className={styles.icon}>{item.icon}</span>
        </motion.div>
      ))}
    </div>
  );
}
