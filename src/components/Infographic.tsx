'use client';

import styles from '@/styles/Infographic.module.css';

export default function RibbonMock() {
  return (
    <div className={styles.ribbonContainer}>
      <div className={styles.ribbon}>
      <div className={styles.ribbonTailLeft}></div>
        <div className={styles.ribbonCapLeft}></div>
        <div className={styles.ribbonBody}>
          <span className={styles.text}>LOREM IPSUM</span>
        </div>
        <div className={styles.ribbonCapRight}></div>
        <div className={styles.ribbonTailRight}></div>
      </div>
    </div>
  );
}
