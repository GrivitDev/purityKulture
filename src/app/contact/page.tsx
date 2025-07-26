'use client';

import styles from '@/styles/Contact.module.css';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className={styles.contactContainer}>
      {/* 1. Hero */}
      <section className={styles.contactHero}>
        <div className={styles.heroOverlay}>
          <h1>Let’s Connect</h1>
          <p>We’d love to hear from you — whether it's a question, idea, or collaboration.</p>
        </div>
      </section>

      {/* 2. Contact Info (in cards) */}
      <section className={styles.contactDetails}>
        <div className={styles.contactCard}>
          <FaMapMarkerAlt />
          <p>Bishop's House, St John’s Mission Compound,<br /> PO Box 14, Bida, Niger State, Nigeria</p>
        </div>
        <div className={styles.contactCard}>
          <FaPhoneAlt />
          <p>+234 812 345 6789</p>
        </div>
        <div className={styles.contactCard}>
          <FaEnvelope />
          <p>info@puritykulture.com</p>
        </div>
      </section>

      {/* 3. Map */}
      <section className={styles.mapSection}>
      <h2>Visit Us</h2>
      <p>We’re located in the heart of Benin City. You’re welcome anytime.</p>
      <iframe
        title="Purity Kulture Location – Benin"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753.2614134053857!2d5.624900626776345!3d6.329971371094525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d39f4891cb4d%3A0x63a425fb66daba17!2sAsoro%20Primary%20School%2C%20Sakpoba%20Rd%2C%20Benin%20City%20300102%2C%20Edo!5e1!3m2!1sen!2sng!4v1752438197345!5m2!1sen!2sng"
        width="100%"
        height="600"
        style={{
            border: 0,
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* 4. WhatsApp CTA */}
      <section className={styles.ctaSection}>
        <h2>Join Our Community</h2>
        <p>Be the first to see our latest releases and behind-the-scenes stories.</p>
        <div className={styles.joinButtons}>
          <Link
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            className={styles.whatsappBtn}
          >
            Join Our WhatsApp Group
          </Link>
          <Link
            href="https://whatsapp.com/channel/your-channel-id"
            target="_blank"
            className={styles.whatsappBtnSecondary}
          >
            Join Our WhatsApp Channel
          </Link>
        </div>
      </section>

      {/* 5. Footer Icons */}
      <footer className={styles.footer}>
        <div className={styles.socialIcons}>
          <Link href="https://facebook.com/yourhandle" target="_blank">
            <FaFacebookF />
          </Link>
          <Link href="https://tiktok.com/@yourhandle" target="_blank">
            <FaTiktok />
          </Link>
          <Link href="https://instagram.com/yourhandle" target="_blank">
            <FaInstagram />
          </Link>
          <Link href="https://wa.me/yourphonenumber" target="_blank">
            <FaWhatsapp />
          </Link>
        </div>
      </footer>
    </main>
  );
}
