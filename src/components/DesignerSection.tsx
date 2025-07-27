import styles from '@/styles/About.module.css';
import Image from 'next/image';
import { JSX } from 'react';

export default function DesignerSection(): JSX.Element {
  return (
    <section className={styles.designerSection}>
      <Image
        src="/about/designer.jpg"
        alt="Portrait of the lead designer at Purity Kulture"
        width={500}
        height={600}
        className={styles.designerImage}
        priority // Optional: improves LCP if this section appears high in viewport
      />
      <div>
        <h2>Meet the Designer</h2>
        <p>
          With a passion for women’s fashion and a heart for creativity, our lead designer founded
          Purity Kulture to give every woman the chance to wear her identity with pride.
        </p>
        <p>
          Her unique eye for fabrics, patterns, and fit has made Purity Kulture stand out as a brand
          that truly understands the African woman — bold, classy, and graceful.
        </p>
      </div>
    </section>
  );
}
