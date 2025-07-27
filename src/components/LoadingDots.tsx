import { JSX } from 'react';

export default function LoadingDots(): JSX.Element {
  return (
    <span className="loading-dots" aria-label="Loading...">
      <span className="dot one">.</span>
      <span className="dot two">.</span>
      <span className="dot three">.</span>
      <style jsx>{`
        .loading-dots {
          display: inline-flex;
          gap: 4px;
          margin-left: 8px;
          font-size: 1.5rem;
          line-height: 1;
        }

        .dot {
          animation: blink 1.2s infinite;
          font-weight: bold;
          color: var(--text-color, #6b4c3b);
        }

        .dot.one {
          animation-delay: 0s;
        }

        .dot.two {
          animation-delay: 0.2s;
        }

        .dot.three {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
