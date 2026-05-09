import React, { useRef, useEffect } from 'react';
import { Github, Mail, Phone, Instagram, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const socials = [
  { name: 'GitHub', link: 'https://github.com/Snezhya', icon: Github, color: '#ffffff' },
  { name: 'Email', link: 'mailto:awgrtopls5@gmail.com', icon: Mail, color: '#D4AF37' },
  { name: 'WhatsApp', link: 'https://wa.me/6285876894023', icon: Phone, color: '#25D366' },
];

const SocialMedia = () => {
  const containerRef = useRef(null);
  const tilesRef = useRef([]);

  useStaggerAnimation(containerRef, '.social-tile', { y: 30, stagger: 0.1 });

  const handleMouseEnter = (index, color) => {
    const tile = tilesRef.current[index];
    const icon = tile.querySelector('.social-icon');
    
    gsap.to(tile, {
      y: -10,
      borderColor: color,
      backgroundColor: 'rgba(255,255,255,0.08)',
      boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${color}30`,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(icon, {
      color: color,
      scale: 1.2,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = (index) => {
    const tile = tilesRef.current[index];
    const icon = tile.querySelector('.social-icon');

    gsap.to(tile, {
      y: 0,
      borderColor: 'rgba(255,255,255,0.1)',
      backgroundColor: 'rgba(255,255,255,0.05)',
      boxShadow: 'none',
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(icon, {
      color: '#9ca3af',
      scale: 1,
      duration: 0.4
    });
  };

  return (
    <section id="socials" className="section py-24 px-8 md:px-[10%] bg-hu-bg relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white" data-animate data-gsap-type="reveal">
          Let's <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Connect</span>
        </h2>

        <div ref={containerRef} className="flex flex-wrap justify-center gap-8 md:gap-12">
          {socials.map((social, idx) => (
            <a
              key={social.name}
              ref={el => tilesRef.current[idx] = el}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => handleMouseEnter(idx, social.color)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="social-tile group relative flex flex-col items-center gap-6 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-300 w-full sm:w-64"
            >
              <div className="social-icon text-gray-400 group-hover:text-white transition-colors duration-300">
                <social.icon size={48} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <span className="block font-poppins font-bold text-xl text-white mb-1">{social.name}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Connect</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;