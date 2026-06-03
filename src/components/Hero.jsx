import React, { useRef } from 'react';
import { Github, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  const socialRef = useRef(null);
  const name = "Adil Pribadi Abdinusa";

  // Mouse Reactive Effect
  useGSAP(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 60;

      gsap.to('.parallax-blob', {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  // Entrance Timeline
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from('.hero-char', {
      opacity: 0,
      y: 80,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.8,
      transformOrigin: "0% 50% -50"
    })
    .from('.hero-subtitle', { 
      opacity: 0, 
      y: 30, 
      duration: 0.6 
    }, "-=0.4")
    .from('.hero-desc', {
      opacity: 0,
      y: 20,
      duration: 1
    }, "-=0.2")
    .from('.hero-btn', {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .from(socialRef.current.children, {
      opacity: 0,
      scale: 0,
      rotate: -45,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from('.scroll-indicator', {
      opacity: 0,
      y: -20,
      duration: 1,
      repeat: -1,
      yoyo: true
    }, "-=0.2");

    // TextPlugin Setup for Roles (Typewriter effect)
    const roles = ["Student", "Tech Enthusiast", "Linux User", "Network Engineer"];
    let current = 0;

    function typeNext() {
      const nextText = roles[current % roles.length];
      
      // Erase
      gsap.to(".hero-role", {
        duration: 0.5,
        text: "",
        ease: "none",
        onComplete: () => {
          // Type new
          gsap.to(".hero-role", {
            duration: 1,
            text: nextText,
            ease: "none",
            onComplete: () => {
              current++;
              gsap.delayedCall(2.5, typeNext);
            }
          });
        }
      });
    }

    // Start Typewriter after entrance
    gsap.delayedCall(2, typeNext);

  }, { scope: containerRef });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="section min-h-screen flex items-center justify-center pt-20 sm:pt-32 px-4 sm:px-8 relative z-10 overflow-hidden"
    >
      {/* Parallax Background Blobs */}
      <div data-speed="1.2" className="parallax-blob absolute bg-hu-red w-32 h-32 sm:w-[500px] sm:h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 top-[-10%] left-[-10%]"></div>
      <div data-speed="0.8" className="parallax-blob absolute bg-hu-gold w-48 h-48 sm:w-[400px] sm:h-[400px] rounded-full mix-blend-screen filter blur-[150px] opacity-10 bottom-[-10%] right-[-10%]"></div>

      <div className="max-w-4xl text-center relative z-20">
        <h3 className="hero-subtitle text-xl sm:text-2xl text-hu-gold font-medium mb-4 uppercase tracking-[0.2em]">
          Hi, I'm
        </h3>
        
        <h1 className="hero-name text-4xl sm:text-6xl md:text-8xl font-poppins font-extrabold mb-6 leading-tight">
          <span className="hero-name-text inline-block">
            {name.split('').map((char, index) => (
              <span key={index} className="hero-char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </span> <br />
          <span className="hero-role text-hu-glow drop-shadow-[0_0_30px_rgba(217,56,58,0.4)] flex justify-center items-center h-12 sm:h-20 md:h-24">
            Student
          </span>
        </h1>

        <p className="hero-desc text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-inter leading-relaxed">
          Building networks, configuring servers, and exploring the mysterious world of technology.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href="#projects" className="hero-btn magnetic-btn px-10 py-4 bg-hu-red text-white font-poppins font-semibold rounded-full shadow-[0_10px_30px_rgba(107,15,26,0.4)] hover:bg-hu-glow hover:shadow-[0_15px_40px_rgba(217,56,58,0.5)] transition-colors duration-300">
            View My Work
          </a>
          <a href="#contact" className="hero-btn magnetic-btn px-10 py-4 border-2 border-hu-gold text-hu-gold font-poppins font-semibold rounded-full hover:bg-hu-gold hover:text-black hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-colors duration-300">
            Contact Me
          </a>
        </div>

        <div ref={socialRef} className="flex justify-center gap-6">
          <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="magnetic-btn p-4 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.4)] transition-colors duration-300">
            <Github size={28} />
          </a>
          <a href="https://www.tiktok.com/@snezhya_" target="_blank" rel="noreferrer" className="magnetic-btn p-4 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.4)] transition-colors duration-300">
            <img src="/image/tiktok-logo.webp" alt="TikTok" className="h-7 w-7 object-contain" />
          </a>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 text-hu-gold">
        <a href="#about" className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  ); 
};

export default Hero;
