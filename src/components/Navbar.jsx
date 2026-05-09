import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const activeIndicatorRef = useRef(null);
  const navLinksRef = useRef([]);

  const links = ['Hero', 'About', 'Skills', 'OS-Experience', 'Projects', 'Gallery', 'Socials', 'Contact'];
  const displayNames = { 'OS-Experience': 'OS' };

  // Section Tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => {
        const element = document.getElementById(link.toLowerCase());
        return {
          id: link,
          rect: element ? element.getBoundingClientRect() : null
        };
      });

      const visibleSection = sections.find(section => {
        if (!section.rect) return false;
        return section.rect.top <= 300 && section.rect.bottom >= 300;
      });

      if (visibleSection) setActiveSection(visibleSection.id);
      else if (window.scrollY === 0) setActiveSection('Hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Indicator Animation
  useEffect(() => {
    const activeLink = navLinksRef.current.find(link => link?.dataset.link === activeSection);
    if (activeLink && activeIndicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeLink;
      gsap.to(activeIndicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.6,
        ease: "elastic.out(1, 0.75)"
      });
    }
  }, [activeSection]);

  // Mobile Menu Animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.fromTo(mobileMenuRef.current.querySelectorAll('a'), 
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.2 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        });
      }
    }
  }, [isOpen]);

  // Navbar Scroll Behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const showNav = ScrollTrigger.create({
      start: 'top top',
      onUpdate: (self) => {
        if (self.direction === -1) { // Scrolling up
          gsap.to(headerRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
        } else if (self.direction === 1 && window.scrollY > 100) { // Scrolling down
          gsap.to(headerRef.current, { y: '-100%', duration: 0.4, ease: "power2.in" });
        }
      }
    });

    return () => showNav.kill();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${targetId.toLowerCase()}`, offsetY: 0 },
      ease: "power3.inOut"
    });
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full px-8 py-5 md:px-[10%] flex justify-between items-center bg-[rgba(10,5,5,0.8)] backdrop-blur-xl z-50 border-b border-[rgba(212,175,55,0.1)] shadow-2xl transition-all"
    >
      <a 
        href="#hero" 
        onClick={(e) => handleNavClick(e, 'hero')}
        className="text-2xl font-poppins font-bold tracking-wide text-gray-100 group"
      >
        ADIL<span className="text-hu-glow group-hover:drop-shadow-[0_0_15px_#d9383a] transition-all duration-300">.</span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 relative">
        {links.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            data-link={link}
            ref={el => navLinksRef.current[i] = el}
            onClick={(e) => handleNavClick(e, link)}
            className={`relative py-1 text-sm font-poppins font-medium transition-all ${activeSection === link ? 'text-hu-gold' : 'text-gray-400 hover:text-white'}`}
          >
            {displayNames[link] || link}
          </a>
        ))}
        {/* Sliding Indicator */}
        <div 
          ref={activeIndicatorRef}
          className="absolute bottom-[-4px] left-0 h-[2px] bg-hu-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          style={{ width: 0 }}
        />
      </nav>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-hu-gold p-2 hover:bg-white/5 rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav */}
      <nav 
        ref={mobileMenuRef}
        className="absolute top-full left-0 w-full bg-[rgba(10,5,5,0.98)] backdrop-blur-3xl border-t border-[rgba(212,175,55,0.1)] flex flex-col px-8 py-4 shadow-2xl md:hidden overflow-hidden h-0 opacity-0"
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, link)}
            className={`py-4 font-poppins text-lg transition-all border-b border-white/5 ${activeSection === link ? 'text-hu-gold pl-4 bg-white/5' : 'text-gray-400 hover:text-white hover:pl-2'}`}
          >
            {displayNames[link] || link}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
