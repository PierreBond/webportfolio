import React from 'react';
import Reveal from './Reveal';
import KineticText from './KineticText';

interface Skill {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

const skills: Skill[] = [
  {
    id: "01",
    category: "FRAMEWORK",
    title: "React / Next.js",
    description: "Building performant, component-driven interfaces with server-side rendering, static generation, and optimized bundle splitting.",
    tags: ["TypeScript", "SSR"]
  },
  {
    id: "02",
    category: "BACKEND",
    title: "Node.js",
    description: "Designing RESTful APIs and real-time services with Express and Fastify, focused on scalability and clean architecture.",
    tags: ["Express", "PostgreSQL"]
  },
  {
    id: "03",
    category: "STYLING",
    title: "CSS / Tailwind",
    description: "Crafting responsive layouts and design systems with modern CSS, utility-first frameworks, and component libraries.",
    tags: ["Tailwind", "Sass"]
  },
  {
    id: "04",
    category: "PERFORMANCE",
    title: "Web Optimization",
    description: "Core Web Vitals, lazy loading, code splitting, and caching strategies for lightning-fast load times.",
    tags: ["Lighthouse", "CDN"]
  },
  {
    id: "05",
    category: "DEVOPS",
    title: "CI/CD & Cloud",
    description: "Automating deployments with GitHub Actions, Docker, and cloud platforms for reliable, zero-downtime releases.",
    tags: ["Docker", "AWS"]
  },
  {
    id: "06",
    category: "DATABASE",
    title: "Data & APIs",
    description: "Integrating SQL and NoSQL databases, GraphQL, and third-party APIs for full-stack data flows.",
    tags: ["GraphQL", "MongoDB"]
  }
];

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="bg-obsidian border-t border-silver/20 py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-mint mb-6">
                02 / Core Skills
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-frost">
                  <KineticText text="Technical proficiency across the modern web stack." />
                </h3>
            </div>
            <div className="flex items-center gap-4 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 italic text-frost">
                Modern stack
                </span>
            </div>
            </div>
        </Reveal>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-silver/20">
          {skills.map((skill, index) => (
            <Reveal key={skill.id} delay={index * 100} className="border-r border-b border-silver/20">
                <div 
                className="group p-10 flex flex-col min-h-[320px] transition-colors duration-500 hover:bg-mint/10 h-full"
                >
                <span className="text-xs font-bold text-mint mb-12">
                    {skill.id} / {skill.category}
                </span>
                <h4 className="text-2xl font-bold mb-4 group-hover:text-mint transition-colors duration-300 text-frost">
                    {skill.title}
                </h4>
                <p className="text-sm leading-relaxed mb-8 max-w-sm text-frost/70">
                    {skill.description}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                    <span 
                        key={tag}
                        className="text-[10px] px-3 py-1.5 border border-mint/40 rounded-full font-bold uppercase tracking-wider bg-obsidian text-frost group-hover:border-mint/60 transition-colors"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;
