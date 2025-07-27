'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

type ReactPlayerProps = {
  url: string | string[];
  playing?: boolean;
  loop?: boolean;
  controls?: boolean;
  light?: boolean | string;
  volume?: number;
  muted?: boolean;
  playbackRate?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  config?: Record<string, unknown>; // ✅ FIXED
  playsinline?: boolean;
  fallback?: React.ReactNode;
  onReady?: () => void;
  onStart?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onBuffer?: () => void;
  onSeek?: (seconds: number) => void;
  onEnded?: () => void;
  onError?: (error: unknown) => void;
  onDuration?: (duration: number) => void;
  onProgress?: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
};

const ReactPlayer = dynamic(
  () =>
    import('react-player').then(mod => mod as unknown as ComponentType<ReactPlayerProps>),
  { ssr: false }
);

export default ReactPlayer;
