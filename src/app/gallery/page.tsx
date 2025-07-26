import BehindTheScenes from '@/components/BehindTheScenes';
import GallerySection from '@/components/GallerySection';
import styles from '@/styles/Gallery.module.css';

export default function GalleryPage() {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.pageHeader}>
      <div className={styles.brandHeader}>
        <img
          src="/logo.png" // Update this if using a different path
          alt="Purity Kulture Logo"
          className={styles.brandLogo}
        />
        <h2 className={styles.brandName}>Purity Kulture</h2>
      </div>
        <p className={styles.introText}>
          Take a look at some of our stunning designs and behind-the-scenes moments.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Gallery Styles</h2>
        <GallerySection />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Behind the Scenes</h2>
        <BehindTheScenes />
      </section>
    </div>
  );
}
