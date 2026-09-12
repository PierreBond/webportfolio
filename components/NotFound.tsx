import React from 'react';
import KineticText from './KineticText';
import WaveGrid from './WaveGrid';

const NotFound: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <WaveGrid />
      </div>

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
          <span className="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </section>
  );
};

export default NotFound;