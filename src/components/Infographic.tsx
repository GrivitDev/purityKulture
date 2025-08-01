import styles from '@/styles/Infographic.module.css';

export default function Infographic() {
  return (
    <div className={styles.ribbonContainer}>
      <div className={styles.ribbon}>
        {/* Left Leaf */}
        <div className={styles.ribbonTailLeft} />
        {/* Left Curve */}
        <div className={styles.ribbonCapLeft} />

        {/* Body */}
        <div className={styles.ribbonBody}>
          <span className={styles.text}>LOREM IPSUM</span>
        </div>

        {/* Right Curve */}
        <div className={styles.ribbonCapRight} />
        {/* Right Leaf */}
        <div className={styles.ribbonTailRight} />
      </div>
    </div>
  );
}
