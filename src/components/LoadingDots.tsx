// components/LoadingDots.tsx
export default function LoadingDots() {
    return (
      <span style={{ display: 'inline-block', marginLeft: '8px' }}>
        <span className="dot one">.</span>
        <span className="dot two">.</span>
        <span className="dot three">.</span>
        <style jsx>{`
          .dot {
            animation: blink 1.2s infinite;
            font-weight: bold;
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
  