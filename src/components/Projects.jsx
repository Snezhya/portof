import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const filters = ['All', 'Web', 'Mobile', 'Other'];

const projectsData = [
  {
    title: 'Project Portofolio',
    desc: 'A full-stack web application built with modern technologies.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'Web',
    image: '/image/routerOS.webp'
  },
  {
    title: 'Website',
    desc: 'A mobile-first application with smooth animations.',
    tech: ['React Native', 'Firebase'],
    category: 'Mobile',
    image: '/image/tiktok-logo.webp'
  },
  {
    title: 'Python Experimental',
    desc: 'An experimental creative coding project.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    category: 'Other',
    image: '/image/linux-logo.webp'
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const gridRef = useRef(null);
  const filterRef = useRef(null);

  useStaggerAnimation(gridRef, '.project-card', { y: 40, stagger: 0.1 });

  useEffect(() => {
    // Initial entrance for filter buttons
    gsap.fromTo(filterRef.current.children, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  const handleFilterChange = (f) => {
    if (f === filter) return;
    
    // Fade out current grid
    gsap.to('.project-card', {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setFilter(f);
        const next = f === 'All' ? projectsData : projectsData.filter(p => p.category === f);
        setFilteredProjects(next);
        
        // Fade in new grid
        gsap.fromTo('.project-card', 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
      }
    });
  };

  return (
    <section 
      id="projects" 
      className="section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white" data-animate data-gsap-type="reveal">
            Recent <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Projects</span>
          </h2>
          
          <div ref={filterRef} className="flex justify-center gap-4 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-8 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${filter === f ? 'bg-hu-red text-white shadow-[0_10px_20px_rgba(107,15,26,0.4)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-hu-gold hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="project-card group bg-[rgba(15,8,8,0.8)] border border-white/10 rounded-3xl overflow-hidden hover:border-hu-glow/50 transition-colors duration-500"
              data-animate
              data-gsap-type="scale-up"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-hu-red/90 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest backdrop-blur-md">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-poppins font-bold text-hu-gold mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-md uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-all">
                    <Github size={18} /> Code
                  </a>
                  <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 bg-hu-red text-white rounded-xl text-sm font-semibold hover:bg-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.4)] transition-all">
                    <ExternalLink size={18} /> Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;