'use client';

import { JSX } from 'react';
import styles from '@/styles/Home.module.css';

import SectionHero from '@/components/SectionHero';
import SectionAbout from '@/components/SectionAbout';
import SectionSpecialties from '@/components/SectionSpecialties';
import SectionGallery from '@/components/SectionGallery';
import SectionSideBySide from '@/components/SectionSideBySide';
import SectionCollections from '@/components/SectionCollections';
import SectionTestimonials from '@/components/SectionTestimonials';

export default function HomePage(): JSX.Element {
  return (
    <div className={styles.page}>
      <SectionHero />
      <SectionAbout />
      <SectionSpecialties />
      <SectionGallery />
      <SectionSideBySide />
      <SectionCollections />
      <SectionTestimonials />
    </div>
  );
}
