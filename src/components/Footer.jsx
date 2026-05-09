import React, { useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -5,
      backgroundColor: '#6b0f1a',
      borderColor: '#d9383a',
      boxShadow: '0 0 20px rgba(217,56,58,0.6)',
      duration: 0.3
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      backgroundColor: 'rgba(20,10,10,0.9)',
      borderColor: 'rgba(212,175,55,0.3)',
      boxShadow: '0 0 15px rgba(212,175,55,0.2)',
      duration: 0.3
    });
  };

  return (
    <footer className="py-20 border-t border-white/5 bg-hu-bg relative text-center z-10">
      <div className="max-w-6xl mx-auto px-8">
        <button 
          onClick={scrollToTop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute -top-7 left-1/2 -translate-x-1/2 p-4 bg-[rgba(10,5,5,0.9)] border border-hu-gold/30 rounded-full text-hu-gold shadow-2xl backdrop-blur-xl transition-colors z-20"
        >
          <ChevronUp size={28} />
        </button>
        
        <div data-animate data-gsap-type="fade-up">
          <h2 className="text-2xl font-poppins font-bold text-white mb-6">
            ADIL<span className="text-hu-glow">.</span>
          </h2>
          
          <div className="flex justify-center gap-8 mb-10 text-gray-500 text-sm font-medium uppercase tracking-[0.2em]">
            <a href="#hero" className="hover:text-hu-gold transition-colors">Home</a>
            <a href="#projects" className="hover:text-hu-gold transition-colors">Projects</a>
            <a href="#contact" className="hover:text-hu-gold transition-colors">Contact</a>
          </div>

          <p className="text-gray-600 text-xs font-fira tracking-widest">
            &copy; {new Date().getFullYear()} ADIL PRIBADI ABDINUSA. <br className="md:hidden" />
            <span className="hidden md:inline mx-2">•</span> 
            DESIGNED WITH PRECISION & ELEGANCE.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;