import React, { useEffect, useRef, useState } from 'react';

interface KineticTextProps {
  text: string;
  tag?: React.ElementType;
  className?: string;
  duration?: number;
  stagger?: number;
  delayOffset?: number;
  ready?: boolean;
}

const KineticText: React.FC<KineticTextProps> = ({
  text,
  tag: Tag = 'span',
  className = '',
  duration = 800,
  stagger = 20,
  delayOffset = 0,
  ready = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!ready || prefersReduced) {
      if (prefersReduced) setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ready, prefersReduced]);

  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.LegacyRef<HTMLElement>}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span 
            className="inline-block overflow-hidden align-top"
            aria-hidden="true"
          >
            <span
              className={`
                inline-block will-change-transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[150%]'}
              `}
              style={{
                transition: `transform ${duration}ms cubic-bezier(0.2, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.2, 0, 0.2, 1)`,
                transitionDelay: `${delayOffset + (i * stagger)}ms`
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && ' '} 
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default KineticText;