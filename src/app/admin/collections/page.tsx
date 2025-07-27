'use client';

import Categories from './Categories';
import StylesManager from './Styles';
import styles from '@/styles/adminCollections.module.css';
import type { JSX } from 'react';


export default function CollectionsDashboard(): JSX.Element {
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
