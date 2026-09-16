import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  ready?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "100%", 
  className = "",
  delay = 0,
  duration = 1000,
  ready = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ready]);

  return (
    <div
      ref={ref}
      style={{ 
        width,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`
        relative ${className} 
        transition-all ease-premium 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}
      `}
    >
      {children}
    </div>
  );
};

export default Reveal;