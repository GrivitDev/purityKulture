'use client';

import styles from '@/styles/Infographic.module.css';
import { useEffect, useState } from 'react';

export default function RealisticRibbon() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className={`${styles.ribbonContainer} ${animate ? styles.flyIn : ''}`}>
      <svg
        className={styles.ribbonSVG}
        viewBox="896 856 1902 603"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main center gradient */}
          <linearGradient id="ribbonGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#1a002b" />
            <stop offset="10%" stopColor="#dcdcdc" />
            <stop offset="25%" stopColor="#555" />
            <stop offset="50%" stopColor="#0e0e0e" />
            <stop offset="75%" stopColor="#555" />
            <stop offset="90%" stopColor="#dcdcdc" />
            <stop offset="100%" stopColor="#1a002b" />
          </linearGradient>

          {/* Leaf areas (darker) */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e0e0e" />
            <stop offset="100%" stopColor="#1a002b" />
          </linearGradient>
        </defs>

        <g>
          {/* Main ribbon rectangle */}
          <path
            d="M984.504 858.5 L1098.69 858.5 L1098.69 1030.07 L2690.34 1031.46 C2748.43 1031.45 2795.5 1065.76 2795.5 1108.07 L2795.5 1362.67 C2795.5 1418.04 2757.03 1456.5 2709.58 1456.5 L2595.4 1456.5 L2595.4 1286.06 L1003.64 1284.67 C945.572 1284.67 898.5 1250.37 898.5 1208.06 L898.5 953.456 C898.585 896.964 937.052 858.5 984.504 858.5 Z"
            fill="url(#ribbonGradient)"
            className={styles.ribbonPath}
          />

          {/* Leaf top-left */}
          <path
            d="M1098.69 1030.07 L1099 1030 C975 1038 920 1007 910 990 C903 975 898.5 964.034 898.5 953.456 L898 945 C898 955 904 984 910 990 C920 1007 975 1038 1098.69 1030.07 Z"
            fill="url(#leafGradient)"
          />

          {/* Leaf bottom-right */}
          <path
            d="M2595.4 1286.06 C2667 1284 2751 1279 2782 1327 L2789 1341 L2782 1327 L2595.4 1286.06 Z"
            fill="url(#leafGradient)"
          />
        </g>
      </svg>
      <span className={styles.ribbonText}>LOREM IPSUM</span>
    </div>
  );
}
