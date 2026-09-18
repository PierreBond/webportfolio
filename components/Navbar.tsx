import React, { useState, useEffect } from 'react';
import GlassSurface from './GlassSurface';

const getInitialTheme = (): string => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
};

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    const initial = getInitialTheme();
    if (initial === 'light') document.documentElement.dataset.theme = 'light';
    return initial;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobile = () => setMobileOpen(false);

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

        {/* Desktop Links */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-frost">
            <a href="#home" className="hover:text-mint transition-colors duration-200">Home</a>
            <a href="#expertise" className="hover:text-mint transition-colors duration-200">Expertise</a>
            <a href="#projects" className="hover:text-mint transition-colors duration-200">Projects</a>
          </div>

          <a
            href="mailto:pierrebondonly@gmail.com"
            className="hidden md:flex items-center gap-2 text-[14px] font-medium text-frost hover:text-mint transition-colors duration-200"
          >
            Connect
            <svg className="w-3 h-3 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-frost transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-frost transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-frost transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="relative z-10 px-6 pb-6 flex flex-col gap-4 text-[14px] font-medium text-frost">
          <a href="#home" onClick={closeMobile} className="hover:text-mint transition-colors duration-200">Home</a>
          <a href="#expertise" onClick={closeMobile} className="hover:text-mint transition-colors duration-200">Expertise</a>
          <a href="#projects" onClick={closeMobile} className="hover:text-mint transition-colors duration-200">Projects</a>
          <a
            href="mailto:pierrebondonly@gmail.com"
            onClick={closeMobile}
            className="flex items-center gap-2 hover:text-mint transition-colors duration-200"
          >
            Connect
            <svg className="w-3 h-3 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;