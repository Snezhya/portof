import React, { useState, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const filters = ['All', 'Web', 'Mobile', 'Other'];

const projectsData = [
  {
    title: 'Project Portofolio',
    desc: 'A full-stack web application built with modern technologies.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'Web',
    image: '/image/dummy.png'
  },
  {
    title: 'Website',
    desc: 'A mobile-first application with smooth animations.',
    tech: ['React Native', 'Firebase'],
    category: 'Mobile',
    image: '/image/dummy.png'
  },
  {
    title: 'Python Experimental',
    desc: 'An experimental creative coding project.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    category: 'Other',
    image: '/image/dummy.png'
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const filterRef = useRef(null);
  const flipStateRef = useRef(null);

  useGSAP(() => {
    // Initial entrance for filter buttons
    gsap.fromTo(filterRef.current.children, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 85%"
        }
      }
    );

    // Scroll reveals for cards
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 80,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (!flipStateRef.current || !window.Flip) return;
    window.Flip.from(flipStateRef.current, {
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: els => gsap.fromTo(els, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.4}),
      onLeave: els => gsap.to(els, {opacity: 0, scale: 0.8, duration: 0.3})
    });
    flipStateRef.current = null;
  }, { dependencies: [filter], scope: gridRef });

  const handleFilterChange = (f) => {
    if (f === filter) return;
    if (window.Flip) {
      flipStateRef.current = window.Flip.getState('.project-card');
    }
    setFilter(f);
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.project-img');
    const info = card.querySelector('.project-info');
    const title = card.querySelector('.project-title');
    gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power2.out" });
    gsap.to(info, { y: -8, duration: 0.4, ease: "power2.out" });
    gsap.to(title, { color: "#d9383a", duration: 0.3 });
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.project-img');
    const info = card.querySelector('.project-info');
    const title = card.querySelector('.project-title');
    gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(info, { y: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(title, { color: "", duration: 0.3 });
  };

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="projects-section section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-6xl font-poppins font-bold mb-6 text-white">
            Recent <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Projects</span>
          </h2>
          
          <div ref={filterRef} className="flex justify-center gap-4 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`magnetic-btn filter-btn px-8 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${filter === f ? 'bg-hu-red text-white shadow-[0_10px_20px_rgba(107,15,26,0.4)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-hu-gold hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project) => (
            <div
              key={project.title}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ display: filter === 'All' || filter === project.category ? 'block' : 'none' }}
              className="project-card group bg-[rgba(15,8,8,0.8)] border border-white/10 rounded-3xl overflow-hidden hover:border-hu-glow/50 transition-colors duration-500"
            >
              <div className="relative h-48 overflow-hidden project-img-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-hu-red/90 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest backdrop-blur-md">
                  {project.category}
                </div>
              </div>
              
              <div className="project-info p-8">
                <h3 className="project-title text-2xl font-poppins font-bold text-hu-gold mb-3 transition-colors">
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
                  <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="magnetic-btn flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-all">
                    <Github size={18} /> Code
                  </a>
                  <a href="#" className="magnetic-btn flex-1 flex items-center justify-center gap-2 py-3 bg-hu-red text-white rounded-xl text-sm font-semibold hover:bg-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.4)] transition-all">
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