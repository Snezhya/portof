import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const words = ["Student", "Tech Enthusiast", "Linux User", "Network Engineer"];
  const [wordIndex, setWordIndex] = useState(0);
  const textRef = useRef(null);

  // Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.parallax-bg', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing Effect with GSAP
  useEffect(() => {
    let currentWord = words[wordIndex];
    if (textRef.current) {
      // Split text into spans
      textRef.current.innerHTML = currentWord.split('').map(char => `<span class="letter inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      
      const tl = gsap.timeline({
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      });
      
      // Animate In
      tl.fromTo(textRef.current.children, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" }
      )
      // Wait
      .to({}, { duration: 0.2 })
      // Animate Out
      .to(textRef.current.children, 
        { opacity: 0, y: -10, duration: 0.5, stagger: 0.03, ease: "power2.in" }
      );
    }
  }, [wordIndex]);

  return (
    <section 
      id="hero" 
      className="section min-h-screen flex items-center justify-center pt-20 sm:pt-32 px-4 sm:px-8 relative z-10 overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div className="parallax-bg absolute bg-hu-red w-32 h-32 sm:w-72 sm:h-72 rounded-full mix-blend-screen filter blur-[100px] opacity-20 top-1/4 left-1/4"></div>
      <div className="parallax-bg absolute bg-hu-gold w-48 h-48 sm:w-96 sm:h-96 rounded-full mix-blend-screen filter blur-[120px] opacity-10 bottom-1/4 right-1/4"></div>

      <div className="max-w-4xl text-center relative z-20">
        <h3 className="text-2xl text-hu-gold font-medium mb-3 uppercase tracking-widest" data-animate>
          Hi, I'm
        </h3>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-poppins font-extrabold mb-5 leading-tight" data-animate>
          Adil Pribadi Abdinusa <br />
          <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)] flex justify-center items-center h-12 sm:h-16 md:h-20" ref={textRef}>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10" data-animate>
          Building networks, configuring servers, and exploring the mysterious world of technology.
        </p>

        <div className="flex flex-wrap justify-center gap-5" data-animate>
          <a href="#projects" className="px-8 py-3 bg-hu-red text-white font-poppins font-semibold rounded-lg shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.7)] hover:-translate-y-1 transition-all">
            View My Work
          </a>
          <a href="#contact" className="px-8 py-3 border border-hu-gold text-hu-gold font-poppins font-semibold rounded-lg hover:bg-hu-gold hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all">
            Contact Me
          </a>
        </div>

        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mt-12 flex justify-center gap-4 sm:gap-6"
          data-animate
        >
          <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="p-3 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(20,10,10,0.7)] text-gray-200 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.6)] transition-all">
            <Github size={24} />
          </a>
          <a href="https://www.tiktok.com/@snezhya_" target="_blank" rel="noreferrer" className="p-3 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(20,10,10,0.7)] text-gray-200 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.6)] transition-all">
            <img src="/image/tiktok-logo.webp" alt="TikTok" className="h-6 w-6 object-contain" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 text-hu-gold"
      >
        <a href="#about"><ChevronDown size={40} /></a>
      </motion.div>
    </section>
  ); 
};

export default Hero;
