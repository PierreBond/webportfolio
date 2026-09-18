import React from 'react';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 relative bg-obsidian">
      <div className="max-w-[1440px] mx-auto border-y border-silver/20 py-16">
        <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-frost">
                I'm PierreBond ; a fullstack engineer and I build everything.
                </h2>
                <p className="mt-10 text-sm md:text-base text-frost/50 ">
                "Everything in life has the next step in common." — Michael Beasley
                </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end md:text-right h-full min-h-[100px] md:min-h-[160px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-frost">
                About Me
                </span>

                <div className="w-16 h-16 border border-silver/20 rounded-full flex items-center justify-center mt-auto hover:bg-frost/5 transition-colors duration-300">
                <svg className="w-6 h-6 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
            </div>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
