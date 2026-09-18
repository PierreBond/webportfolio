import React, { useState } from 'react';
import Reveal from './Reveal';
import KineticText from './KineticText';

interface Project {
  id: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  techStack: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "INFINITY GYM",
    metricLabel: "TYPE",
    metricValue: "Immersive Gym Website",
    description: "Immersive gym website with 3D graphics, smooth scrolling, and AI integration.",
    techStack: ["React", "Three.js", "GSAP", "Tailwind", "Express"],
    link: "https://gym-template.pierrebond.workers.dev/"
  },
  {
    id: "02",
    title: "FACENEED",
    metricLabel: "TYPE",
    metricValue: "Beauty E-Commerce Platform",
    description: "Luxury beauty e-commerce platform for premium skincare and makeup products.",
    techStack: ["React", "Vite", "Tailwind", "Framer Motion", "Zustand"],
    link: "https://faceneed-production.up.railway.app/"
  },
  {
    id: "03",
    title: "SPORTANALYST",
    metricLabel: "TYPE",
    metricValue: "Sports Prediction Dashboard",
    description: "Sports prediction dashboard with real-time data and ML explainability.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Jest"],
    link: "https://github.com/PierreBond/sportanalyst"
  },
  {
    id: "04",
    title: "SILO",
    metricLabel: "TYPE",
    metricValue: "Barter Trading Mobile App",
    description: "Mobile-first barter trading app. List items, find trades, chat with partners.",
    techStack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Vitest"],
    link: "https://silo-sand.vercel.app/#/"
  },
  {
    id: "05",
    title: "INVENTORY ADVISOR",
    metricLabel: "TYPE",
    metricValue: "Offline Inventory Management PWA",
    description: "Offline-first inventory management progressive web app.",
    techStack: ["React", "Vite", "PouchDB", "Tailwind", "PWA"],
    link: "https://inventory-advisor.vercel.app/"
  },
  {
    id: "06",
    title: "PLACEPAL",
    metricLabel: "TYPE",
    metricValue: "Apartment Search Platform",
    description: "Full-stack apartment search platform with map-based discovery.",
    techStack: ["React", "Express", "Prisma", "PostgreSQL", "Leaflet", "Docker"],
    link: "https://aptsearch.pierrebond.workers.dev/"
  }
];

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="projects" className="bg-obsidian py-24 px-6 md:px-12 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-mint mb-6 block">
                03 / Selected Projects
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9] text-frost">
                  <KineticText text="Production-grade" />
                  <br />
                  <KineticText text="deployments." delayOffset={150} />
                </h2>
            </div>
            
            <div className="pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-frost/60">
                Archive V2.0 // Active
                </span>
            </div>
            </div>
        </Reveal>

        {/* Projects List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 150}>
                <div
                className="border-t border-silver/20 cursor-pointer"
                onMouseEnter={() => setExpandedId(project.id)}
                onMouseLeave={() => setExpandedId(null)}
                onClick={() => toggleExpand(project.id)}
                >
                <div className="flex flex-col md:flex-row md:items-center justify-between py-12">
                
                {/* Left: ID & Title */}
                <div className="flex items-baseline gap-4 md:gap-16">
                    <span className="text-xs font-bold text-mint opacity-80 font-mono">
                    {project.id}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-frost hover:text-mint transition-colors duration-300"
                    >
                      {project.title}
                    </a>
                </div>

                {/* Right: Metrics */}
                <div className="flex flex-col md:items-end mt-4 md:mt-0 pl-8 md:pl-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1 text-frost">
                    {project.metricLabel}
                    </span>
                    <span className="text-base md:text-xl font-bold font-mono text-frost">
                    {project.metricValue}
                    </span>
                </div>

                </div>

                {/* Expanded Content */}
                <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                    maxHeight: expandedId === project.id ? '200px' : '0px',
                    opacity: expandedId === project.id ? 1 : 0,
                }}
                >
                <div className="pb-8 pl-8 md:pl-[72px]">
                    <p className="text-sm text-frost/60 mb-4 max-w-xl">
                    {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                        key={tech}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 border border-mint/30 text-mint rounded-pill"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>
                </div>
                </div>
                </div>
            </Reveal>
          ))}
          {/* Bottom Border */}
          <Reveal delay={450}>
            <div className="w-full h-[1px] bg-silver/20"></div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Projects;