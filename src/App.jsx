import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import InteractiveFire from './components/InteractiveFire';
import SocialMedia from './components/SocialMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSectionScrollTriggers } from './hooks/useSectionScrollTriggers';

function App() {
  const [loading, setLoading] = useState(true);
  useSectionScrollTriggers();

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
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
          <InteractiveFire />
          <SocialMedia />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
