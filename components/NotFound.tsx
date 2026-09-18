import React from 'react';
import KineticText from './KineticText';

const NotFound: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-obsidian">
      <div className="relative z-10 text-center">
        <div className="text-[clamp(6rem,15vw,160px)] font-bold leading-none tracking-tight text-frost mb-4">
          <KineticText text="404" />
        </div>

        <p className="text-lg md:text-xl font-light text-frost/60 mb-12">
          Page not found
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-mint hover:text-frost transition-colors duration-300"
        >
          <span>Back to home</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </a>
      </div>
    </section>
  );
};

export default NotFound;