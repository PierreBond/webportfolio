import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number; // Delay in ms
  duration?: number; // Duration in ms
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "100%", 
  className = "",
  delay = 0,
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: "0px 0px -50px 0px" // Slight bottom offset trigger
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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