import React, { useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        }
      }
    );
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power3.inOut" });
  };

  return (
    <footer ref={footerRef} className="py-10 border-t border-[rgba(212,175,55,0.15)] bg-hu-bg-light relative text-center z-10">
      <button 
        onClick={scrollToTop} 
        className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-[rgba(20,10,10,0.9)] border border-[rgba(212,175,55,0.3)] rounded-full text-hu-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.6)] hover:-translate-y-2 transition-all"
      >
        <ChevronUp size={24} />
      </button>
      
      <p className="text-gray-500 text-sm font-poppins mt-4">
        &copy; {new Date().getFullYear()} Adil Pribadi Abdinusa. Crafted with passion & elegance.
      </p>
    </footer>
  );
};

export default Footer;
