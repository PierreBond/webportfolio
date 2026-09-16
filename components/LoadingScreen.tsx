import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'erasing' | 'fading' | 'done'>('typing');
  const overlayRef = useRef<HTMLDivElement>(null);
  const fullText = 'pierrebond';

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setPhase('erasing'), 600);
      }
    }, 120);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (phase !== 'erasing') return;

    let i = fullText.length;
    const eraseInterval = setInterval(() => {
      if (i > 0) {
        i--;
        setText(fullText.slice(0, i));
      } else {
        clearInterval(eraseInterval);
        setTimeout(() => setPhase('fading'), 300);
      }
    }, 120);

    return () => clearInterval(eraseInterval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fading' || !overlayRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setPhase('done');
        onComplete?.();
      },
    });
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        fontWeight: 700,
        color: '#000000',
        letterSpacing: '-0.02em',
      }}>
        {text}
        <span style={{
          display: 'inline-block',
          width: '3px',
          height: '1em',
          backgroundColor: '#000000',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: phase === 'fading' ? 'none' : 'blink 1s step-end infinite',
          opacity: phase === 'fading' ? 0 : 1,
        }} />
      </span>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;