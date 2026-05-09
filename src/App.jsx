import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TechnicalSkills from './components/TechnicalSkills';
import OSExperience from './components/OSExperience';
import Projects from './components/Projects';
import Gallery from './components/Gallery';

import SocialMedia from './components/SocialMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSectionScrollTriggers } from './hooks/useSectionScrollTriggers';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const mainRef = useRef(null);
  
  useSectionScrollTriggers();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useEffect(() => {
    if (!showLoading) {
      gsap.to(mainRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  }, [showLoading]);

  return (
    <>
      <CustomCursor />
      
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

      <div ref={mainRef} className="opacity-0">
        <div className="bg-shape w-[400px] h-[400px] bg-hu-red fixed top-[-100px] left-[-100px] opacity-40"></div>
        <div className="bg-shape w-[300px] h-[300px] bg-hu-gold fixed bottom-[-100px] right-[-100px] opacity-15"></div>

        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <TechnicalSkills />
          <OSExperience />
          <Projects />
          <Gallery />

          <SocialMedia />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
