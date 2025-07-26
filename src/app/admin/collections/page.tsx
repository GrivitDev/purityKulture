'use client';

import Categories from './Categories';
import StylesManager from './Styles';
import styles from '@/styles/adminCollections.module.css';

export default function CollectionsDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.headingMain}>Collections Admin</h1>
      <div className={styles.section}>
        <Categories />
      </div>
      <div className={styles.section}>
        <StylesManager />
      </div>
    </div>
  );
}
