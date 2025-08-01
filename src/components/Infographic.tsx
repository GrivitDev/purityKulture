'use client';

import styles from '@/styles/Infographic.module.css';
import { useEffect, useState } from 'react';

export default function RealisticRibbon() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.backgroundCard} />

      <div className={`${styles.ribbonContainer} ${animate ? styles.flyIn : ''}`}>
        <svg
          className={styles.ribbonSVG}
          viewBox="896 856 1902 603"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ribbonGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#1a002b" />
              <stop offset="40%" stopColor="#a9a9a9" />
              <stop offset="60%" stopColor="#f0f0f0" />
              <stop offset="100%" stopColor="#1a002b" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M2782.13 1327.33 2788.2 1336.34 2787.24 1332.85ZM984.504 858.5 1098.69 858.5 1098.69 1030.07 1108.78 1030.07 1108.78 1031.46 2690.34 1031.46 2690.36 1031.45C2748.43 1031.45 2795.5 1065.76 2795.5 1108.07L2795.5 1362.67 2789.61 1341.41 2795.5 1370.59C2795.5 1418.04 2757.03 1456.5 2709.58 1456.5L2595.4 1456.5 2595.4 1286.06 2585.22 1286.06 2585.22 1284.67 1003.64 1284.67 1003.64 1284.67C945.572 1284.67 898.5 1250.37 898.5 1208.06L898.5 953.456C898.5 964.034 901.442 974.112 906.762 983.278L914.994 992.175 905.337 977.854C900.99 967.575 898.585 956.275 898.585 944.412 898.585 896.964 937.052 858.5 984.504 858.5Z"
              className={styles.ribbonPath}
              fill="url(#ribbonGradient)"
            />
          </g>
        </svg>
        <span className={styles.ribbonText}>LOREM IPSUM</span>
      </div>
    </div>
  );
}
