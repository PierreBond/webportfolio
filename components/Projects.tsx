import React from 'react';
import Reveal from './Reveal';
import KineticText from './KineticText';

interface Project {
  id: string;
  title: string;
  metricLabel: string;
  metricValue: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "INFINITY GYM",
    metricLabel: "TYPE",
    metricValue: "Gym Landing Page"
  },
  {
    id: "02",
    title: "FACENEED",
    metricLabel: "TYPE",
    metricValue: "E-Commerce Platform"
  },
  {
    id: "03",
    title: "SPORTANALYST",
    metricLabel: "TYPE",
    metricValue: "Sports Prediction Dashboard"
  },
  {
    id: "04",
    title: "SILO",
    metricLabel: "TYPE",
    metricValue: "Mobile App"
  },
  {
    id: "05",
    title: "INVENTORY ADVISOR",
    metricLabel: "TYPE",
    metricValue: "Mobile App"
  },
  {
    id: "06",
    title: "PLACEPAL",
    metricLabel: "TYPE",
    metricValue: "Mobile App"
  }
];

const Projects: React.FC = () => {
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
                className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-t border-silver/20 hover:border-mint/50 transition-all duration-300 cursor-pointer"
                >
                
                {/* Left: ID & Title */}
                <div className="flex items-baseline gap-8 md:gap-16">
                    <span className="text-xs font-bold text-mint opacity-80 font-mono">
                    {project.id}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:text-mint transition-colors duration-300 text-frost">
                    {project.title}
                    </h3>
                </div>

                {/* Right: Metrics */}
                <div className="flex flex-col md:items-end mt-4 md:mt-0 pl-12 md:pl-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1 text-frost">
                    {project.metricLabel}
                    </span>
                    <span className="text-lg md:text-xl font-bold font-mono text-frost group-hover:text-mint transition-colors duration-300">
                    {project.metricValue}
                    </span>
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
