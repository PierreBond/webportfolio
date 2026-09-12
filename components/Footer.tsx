import React from 'react';
import Clock from './Clock';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-silver/20 py-12 px-6 md:px-12 bg-obsidian">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-frost">
          © 2026  @PierreBond  — All Rights Reserved
        </span>

        <Clock />

        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-frost">
          <a href="https://github.com/PierreBond" className="hover:text-mint transition-colors duration-300">GitHub</a>
          <a href="https://www.linkedin.com/in/perry-antwi-a13b49265/" className="hover:text-mint transition-colors duration-300">LinkedIn</a>
          <a href="https://x.com/404nullerr" className="hover:text-mint transition-colors duration-300">Twitter (X)</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
