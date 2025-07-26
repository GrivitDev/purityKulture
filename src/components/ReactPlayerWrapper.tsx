'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// SAFELY cast using `unknown` first
const ReactPlayer = dynamic(() => import('react-player').then(mod => mod as unknown as ComponentType<any>), {
  ssr: false,
});

export default ReactPlayer;
