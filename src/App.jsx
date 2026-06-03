import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
    window.ScrollSmoother,
    window.SplitText,
    window.Flip,
    window.CustomEase,
    window.ScrambleTextPlugin
  );
}

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const mainRef = useRef(null);
  
  useSectionScrollTriggers();

  useGSAP(() => {
    // Initialize ScrollSmoother
    if (window.ScrollSmoother) {
      window.ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        smoothTouch: 0.1,
        effects: true
      });
    }

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

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div ref={mainRef} className="">
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
        </div>
      </div>
    </>
  );
}

export default App;
