import React from 'react';
import Reveal from './Reveal';

const Quote: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 relative bg-obsidian">
      <div className="max-w-[1440px] mx-auto border-y border-silver/20 py-16">
        <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-frost">
                "Great web development is the art of turning complex problems into simple, elegant interfaces."
                </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end md:text-right h-full min-h-[160px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-frost">
                Development Philosophy
                </span>
                
                <div className="w-16 h-16 border border-silver/20 rounded-full flex items-center justify-center mt-auto hover:bg-frost/5 transition-colors duration-300">
                <span className="material-symbols-outlined text-mint text-2xl">
                    code
                </span>
                </div>
            </div>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Quote;
