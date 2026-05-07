import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

const filters = ['All', 'Web', 'Mobile', 'Other'];

const projects = [
  {
    title: 'Project Portofolio',
    desc: 'A full-stack web application built with modern technologies.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'Web',
  },
  {
    title: 'website',
    desc: 'A mobile-first application with smooth animations.',
    tech: ['React Native', 'Firebase'],
    category: 'Mobile',
  },
  {
    title: 'python',
    desc: 'An experimental creative coding project.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    category: 'Other',
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      className="section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10"
    >
      <div data-animate>
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-12 text-white">
          Recent <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Projects</span>
        </h2>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-poppins font-medium transition-all ${filter === f ? 'bg-hu-red text-white shadow-[0_0_15px_rgba(217,56,58,0.5)]' : 'bg-[rgba(20,10,10,0.7)] text-gray-300 border border-[rgba(212,175,55,0.15)] hover:border-hu-gold'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              data-animate
            >
              <TiltCard layoutId={project.title} className="flex flex-col h-full z-10 relative">
                <motion.div
                  layout
                  drag
                  dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                  dragElastic={0.1}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-2xl p-8 hover:border-hu-glow hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(217,56,58,0.15)] transition-shadow duration-300 cursor-grab active:cursor-grabbing flex flex-col h-full"
                >
                  <h3 className="text-2xl font-poppins font-semibold text-hu-gold mb-4 pointer-events-none">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow pointer-events-none">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 pointer-events-none">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-3 py-1 bg-[rgba(212,175,55,0.1)] text-hu-gold border border-[rgba(212,175,55,0.2)] rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="flex items-center justify-center flex-1 gap-2 px-4 py-2 border border-[rgba(212,175,55,0.15)] rounded-lg text-gray-200 hover:border-hu-gold hover:text-hu-gold transition-colors z-20" onPointerDown={(e) => e.stopPropagation()}>
                      <Github size={18} /> Code
                    </a>
                    <a href="#" className="flex items-center justify-center flex-1 gap-2 px-4 py-2 bg-[rgba(107,15,26,0.4)] border border-hu-red rounded-lg text-white hover:bg-hu-glow hover:border-hu-glow hover:shadow-[0_0_15px_rgba(217,56,58,0.5)] transition-all z-20" onPointerDown={(e) => e.stopPropagation()}>
                      <ExternalLink size={18} /> Detail
                    </a>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;