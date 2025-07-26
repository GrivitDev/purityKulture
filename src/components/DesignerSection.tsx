import styles from '@/styles/About.module.css';

export default function DesignerSection() {
  return (
    <section className={styles.designerSection}>
      <img src="/about/designer.jpg" alt="The Designer" />
      <div>
        <h2>Meet the Designer</h2>
        <p>
          With a passion for women’s fashion and a heart for creativity, our lead designer founded Purity Kulture to give every woman the chance to wear her identity with pride.
        </p>
        <p>
          Her unique eye for fabrics, patterns, and fit has made Purity Kulture stand out as a brand that truly understands the African woman — bold, classy, and graceful.
        </p>
      </div>
    </section>
  );
}
