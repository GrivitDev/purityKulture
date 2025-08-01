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
          <linearGradient id="ribbonGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#1a002b" />
            <stop offset="10%" stopColor="#e0e0e0" />
            <stop offset="25%" stopColor="#555" />
            <stop offset="50%" stopColor="#0e0e0e" />
            <stop offset="75%" stopColor="#555" />
            <stop offset="90%" stopColor="#e0e0e0" />
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

          {/* Top-left leaf (solid dark color) */}
          <path
            d="M1098.69 1030.07 L1099 1030 C958 1046 926 1015 912 994 C903 976 898.5 964.034 898.5 953.456 L898 945 C898 955 904 984 912 994 C926 1015 958 1046 1098.69 1030.07 Z"
            fill="#1a002b"
          />

          {/* Bottom-right leaf (solid dark color) */}
          <path
            d="M2595.4 1286.06 C2667 1284 2751 1279 2782 1327 L2789 1341 L2786 1334 L2782 1327 L2595.4 1286.06 Z"
            fill="#1a002b"
          />
        </g>
      </svg>
      <span className={styles.ribbonText}>LOREM IPSUM</span>
    </div>
  );
}
