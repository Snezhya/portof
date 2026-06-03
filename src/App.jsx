import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    Flip,
    TextPlugin
  );
}

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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (!showLoading) {
      gsap.fromTo(mainRef.current, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    }
  }, { dependencies: [showLoading] });

  return (
    <>
      <CustomCursor />
      
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

      <div ref={mainRef} className="">
        <div className="bg-shape w-[400px] h-[400px] bg-hu-red fixed top-[-100px] left-[-100px] opacity-40 pointer-events-none"></div>
        <div className="bg-shape w-[300px] h-[300px] bg-hu-gold fixed bottom-[-100px] right-[-100px] opacity-15 pointer-events-none"></div>

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
