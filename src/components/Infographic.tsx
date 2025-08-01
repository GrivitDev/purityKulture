import styles from '@/styles/RealisticRibbon.module.css';

export default function RealisticRibbon() {
  return (
    <div className={styles.ribbonWrapper}>
      <div className={styles.leafLeft} />
      <div className={styles.extensionLeft} />
      <div className={styles.ribbonBody}>
        <span className={styles.text}>LOREM IPSUM</span>
      </div>
      <div className={styles.extensionRight} />
      <div className={styles.leafRight} />
    </div>
  );
}
