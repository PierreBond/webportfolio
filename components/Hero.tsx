import React, { Suspense } from 'react';
import Reveal from './Reveal';
import KineticText from './KineticText';
import Shuffle from './Shuffle';

const WaveGrid = React.lazy(() => import('./WaveGrid'));

interface HeroProps {
  className?: string;
  ready?: boolean;
}

const Hero: React.FC<HeroProps> = ({ className = '', ready = true }) => {
  return (
    <section id="home" className={`relative flex flex-col items-center justify-center pt-20 pb-32 md:pb-32 px-6 md:px-12 overflow-hidden min-h-[85vh] lg:min-h-screen ${className}`}>

      {/* 3D Wave Grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <WaveGrid />
        </Suspense>
      </div>

      <div className="max-w-[1440px] w-full mx-auto relative z-10">

        {/* Top Label */}
        <Reveal delay={0} ready={ready}>
            <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-mint"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-mint">
                Web Developer
            </span>
            </div>
        </Reveal>

        {/* Main Headline */}
        <div className="text-3xl sm:text-5xl md:text-8xl lg:text-[clamp(5rem,8vw,120px)] font-bold leading-[0.9] tracking-tight mb-16 md:mb-12 max-w-7xl text-frost">
           <div className="block">
              <KineticText text="WEB" delayOffset={200} ready={ready} />
            </div>
            <div className="block">
              <KineticText text="DEVELOPER" className="text-mint" delayOffset={350} ready={ready} />
            </div>
            <div className="block">
              <KineticText text="FULL-STACK | REACT" delayOffset={500} ready={ready} />
              <span className="sr-only">FULL-STACK | REACT</span>
           </div>
        </div>

        {/* Description & Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <Reveal delay={800} ready={ready}>
                <p className="text-sm md:text-base font-light leading-relaxed text-frost/70">
                Building performant web applications and modern interfaces where
                clean code meets seamless user experiences.
                </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex md:justify-end justify-start">
            <Reveal delay={1000} width="fit-content" ready={ready}>
                <div className="flex flex-col items-start md:items-end gap-2 text-frost">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Location</span>
                <Shuffle
                  text="Remote // Available Worldwide"
                  tag="span"
                  className="text-sm font-medium"
                  shuffleDirection="right"
                  duration={0.3}
                  ease="power3.out"
                  stagger={0.02}
                  threshold={0.1}
                  loop={true}
                  loopDelay={2}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                />
                </div>
            </Reveal>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <Reveal delay={1200} className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2" ready={ready}>
        <div className="flex flex-col items-center gap-4 group cursor-pointer pb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity duration-500 text-frost">
            Scroll to explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-mint to-transparent opacity-50"></div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
