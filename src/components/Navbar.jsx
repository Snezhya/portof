import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');

  const links = ['Hero', 'About', 'Skills', 'OS-Experience', 'Projects', 'Gallery', 'Contact'];
  const displayNames = {
    'OS-Experience': 'OS'
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => {
        const element = document.getElementById(link.toLowerCase());
        return {
          id: link,
          element,
          rect: element ? element.getBoundingClientRect() : null
        };
      });

      const visibleSection = sections.find(section => {
        if (!section.rect) return false;
        return section.rect.top <= 200 && section.rect.bottom >= 200;
      });

      if (visibleSection) {
        setActiveSection(visibleSection.id);
      } else if (window.scrollY === 0) {
        setActiveSection('Hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full px-8 py-5 md:px-[10%] flex justify-between items-center bg-[rgba(20,10,10,0.7)] backdrop-blur-md z-50 border-b border-[rgba(212,175,55,0.15)] transition-all">
      <a href="#hero" className="text-2xl font-poppins font-bold tracking-wide text-gray-100">
        Adil<span className="text-hu-glow drop-shadow-[0_0_10px_#d9383a]">.</span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 relative">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`relative py-1 text-sm font-poppins font-medium transition-all ${activeSection === link ? 'text-hu-gold' : 'text-gray-300 hover:text-white'}`}
          >
            {displayNames[link] || link}
            {activeSection === link && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-hu-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-hu-gold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[rgba(20,10,10,0.95)] backdrop-blur-xl border-t border-[rgba(212,175,55,0.15)] flex flex-col p-5 shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`py-3 font-poppins text-lg transition-colors border-b border-white/5 ${activeSection === link ? 'text-hu-gold pl-2 border-hu-gold/30' : 'text-gray-300'}`}
              >
                {displayNames[link] || link}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
