import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ChevronDown } from 'lucide-react';

const Hero = () => {
  const words = ["Student", "Tech Enthusiast", "Linux User", "Network Engineer"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentWord) {
      typeSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typeSpeed);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      typeSpeed = 500;
    } else {
      setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, typeSpeed);
    }
  }, [text, isDeleting, wordIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-32 px-8 relative z-10">
      <div className="max-w-4xl text-center">
        <motion.h3 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-2xl text-hu-gold font-medium mb-3 uppercase tracking-widest"
        >
          Hi, I'm
        </motion.h3>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-poppins font-extrabold mb-5 leading-tight"
        >
          Adil Pribadi Abdinusa <br />
          <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">
            {text}
          </span>
          <span className="text-hu-gold animate-pulse">|</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Building networks, configuring servers, and exploring the mysterious world of technology.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a href="#projects" className="px-8 py-3 bg-hu-red text-white font-poppins font-semibold rounded-lg shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.7)] hover:-translate-y-1 transition-all">
            View My Work
          </a>
          <a href="#contact" className="px-8 py-3 border border-hu-gold text-hu-gold font-poppins font-semibold rounded-lg hover:bg-hu-gold hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all">
            Contact Me
          </a>
        </motion.div>

        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="mt-12 flex justify-center gap-6"
        >
          <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="p-3 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(20,10,10,0.7)] text-gray-200 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.6)] transition-all">
            <Github size={24} />
          </a>
          {/* Using Lucide for icon fallback or text for Tiktok */}
          <a href="https://www.tiktok.com/@snezhya_" target="_blank" rel="noreferrer" className="p-3 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(20,10,10,0.7)] text-gray-200 hover:bg-hu-red hover:text-white hover:border-hu-glow hover:shadow-[0_0_20px_rgba(217,56,58,0.6)] transition-all font-bold">
            TK
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-hu-gold"
      >
        <a href="#about"><ChevronDown size={40} /></a>
      </motion.div>
    </section>
  );
};

export default Hero;
