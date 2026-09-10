import React, { useState, useEffect } from 'react';
import GlassSurface from './GlassSurface';

const getInitialTheme = (): string => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light'; // ponytail: default to light
};

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    const initial = getInitialTheme();
    if (initial === 'light') document.documentElement.dataset.theme = 'light';
    return initial;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.dataset.theme = 'light';
    } else {
      delete html.dataset.theme;
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent">
      <div className="absolute inset-0 z-0">
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={0}
          backgroundOpacity={0.12}
          saturation={1.2}
          opacity={0.9}
          blur={11}
          brightness={45}
          distortionScale={-80}
          style={{ boxShadow: 'none', border: 'none' }}
        />
      </div>
      <div className="relative z-10 mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={toggleTheme} className="flex items-center gap-2 group">
          <span className="text-mint text-sm">✦</span>
          <span className="text-sm font-bold tracking-tight text-frost">
            @pierrebond
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-frost">
            <a href="#home" className="hover:text-mint transition-colors duration-200">Home</a>
            <a href="#expertise" className="hover:text-mint transition-colors duration-200">Expertise</a>
            <a href="#projects" className="hover:text-mint transition-colors duration-200">Projects</a>
          </div>

          <a
            href="mailto:hello@devgeekz.com"
            className="flex items-center gap-2 text-[14px] font-medium text-frost hover:text-mint transition-colors duration-200"
          >
            Connect
            <span className="material-symbols-outlined text-mint text-xs" aria-hidden="true">arrow_outward</span>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
