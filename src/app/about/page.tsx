'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import WhatSetsUsApart from '@/components/WhatSetsUsApart';
import styles from '@/styles/About.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      {/* 1. Hero Banner */}
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroOverlay}>
          <h1>Crafted for Queens. Designed from the Soul.</h1>
          <p>
            Purity Kulture is more than fashion—it's identity, dignity, and divine design.
          </p>
        </div>
      </section>

      {/* 2. Brand Story */}
      <section className={styles.story}>
        <div className={styles.storyText}>
          <h2>Our Story</h2>
          <p>
            Born from a faith-driven vision, Purity Kulture was started to redefine African femininity
            through Christ-centered elegance. We blend ancestral traditions with modern sophistication,
            weaving garments that honor culture and convey grace.
          </p>
          <p>
            Our founder began the journey in a humble studio, inspired by scripture and the beauty of
            hand-crafted fabric. Each design reflects spiritual integrity and devotion to artistic excellence.
          </p>
        </div>
        <div className={styles.storyImage}>
          <Image
            src="/images/about.jpg"
            alt="Purity Kulture Story"
            width={600}
            height={400}
            className={styles.curvedImage}
          />
        </div>
      </section>




      {/* 4. Meet the Designer */}
      <section className={styles.team}>
        <div className={styles.teamImage}>
          <Image
            src="/images/team1.jpg"
            alt="Grivit — Designer"
            width={300}
            height={300}
            className={styles.portraitImage}
          />
        </div>
        <div className={styles.teamBio}>
          <h2>Meet Genius </h2>
          <p>
            Gift Onofu is the creative heart behind Purity Kulture. With deep faith and devotion
            to elegance, she fashions garments that empower and inspire.
          </p>
          <p>
            For her, fashion is spiritual expression—each stitch is a prayer, each design a proclamation of divine worth.
          </p>
        </div>
      </section>
      
      <section className={styles.mvValues}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Image src="/images/mission-icon.jpg" alt="Mission Icon" width={280} height={280} />
          </div>
          <h3>Mission</h3>
          <p>To clothe women in purpose, dignity, and divine confidence.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Image src="/images/vision-icon.jpg" alt="Vision Icon" width={280} height={280} />
          </div>
          <h3>Vision</h3>
          <p>To be Africa’s leading Christ‑centered fashion brand globally.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Image src="/images/values-icon.jpg" alt="Values Icon" width={280} height={280} />
          </div>
          <h3>Core Values</h3>
          <ul>
            <li>Modesty</li>
            <li>Creativity</li>
            <li>Excellence</li>
            <li>Integrity</li>
            <li>Cultural Pride</li>
            <li>Faith</li>
          </ul>
        </div>
      </section>

      {/* 5. Faith & Fashion */}
      <section className={styles.sectionWithImage}>
        <div className={styles.textBlock}>
          <h2>Faith & Fashion</h2>
          <p>
            We believe fashion can glorify God, empower women, and preserve cultural beauty.<br />
            <em>“She is clothed in strength and dignity and laughs without fear of the future.”</em> – Proverbs 31:25
          </p>
        </div>
        <div className={styles.imageBlock}>
          <Image
            src="/images/faith.jpg"
            alt="Faith and Fashion"
            width={500}
            height={400}
            className={styles.bannerImage}
          />
        </div>
      </section>

      {/* 7. What Sets Us Apart (Progress Bars) */}
      <WhatSetsUsApart />

      {/* 6. Sustainability & Craftsmanship */}
      <section className={styles.sectionWithImageAlt}>
        <div className={styles.imageBlock}>
          <Image
            src="/images/sustain.jpg"
            alt="Craftsmanship"
            width={500}
            height={400}
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.textBlock}>
          <h2>Sustainability & Craftsmanship</h2>
          <p>
            Every piece is ethically hand-stitched using locally sourced fabrics and skilled artisans.
            Our process ensures purity—not just in name, but in conscience and quality.
          </p>
        </div>
      </section>


    </main>
  );
}

