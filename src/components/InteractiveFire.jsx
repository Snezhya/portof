import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveFire = () => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  const createParticle = (x, y) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 15 + 5,
      angle: (Math.random() - 0.5) * 60,
    };
    setParticles(prev => [...prev.slice(-20), newParticle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (Math.random() > 0.5) {
      createParticle(x, y);
    }
  };

  const handleDrag = (e, info) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const y = info.point.y - rect.top;
    createParticle(x, y);
  };

  return (
    <motion.section
      className="section py-24 px-8 md:px-[10%] bg-hu-bg relative overflow-hidden z-10 flex flex-col items-center justify-center border-y border-[rgba(212,175,55,0.1)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="max-w-3xl text-center space-y-6 w-full"
        data-animate
      >
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-hu-gold mb-4">
          Spirit <span className="text-hu-glow">Realm</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Hover over or drag the artifact to ignite the spirit flame.
        </p>
        
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full max-w-2xl mx-auto h-80 mt-10 rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[rgba(10,5,5,0.8)] overflow-hidden shadow-[inset_0_0_30px_rgba(217,56,58,0.1)] flex items-center justify-center"
        >
          {/* Particles */}
          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0.8, x: p.x, y: p.y, scale: 1, rotate: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0, 
                  y: p.y - 100 - Math.random() * 50, 
                  x: p.x + p.angle,
                  rotate: p.angle * 2
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute pointer-events-none rounded-full blur-[2px]"
                style={{
                  width: p.size,
                  height: p.size,
                  background: Math.random() > 0.5 ? '#d9383a' : '#d4af37',
                  boxShadow: `0 0 ${p.size * 2}px ${Math.random() > 0.5 ? '#d9383a' : '#d4af37'}`,
                }}
              />
            ))}
          </AnimatePresence>

          {/* Draggable Card */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            onDrag={handleDrag}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(217,56,58,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="w-48 h-64 bg-gradient-to-br from-[rgba(107,15,26,0.8)] to-[rgba(20,10,10,0.9)] border border-hu-gold rounded-xl cursor-grab active:cursor-grabbing flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4">
              <path d="M12 2C12 2 5 8 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 8 12 2 12 2Z" fill="#d9383a" fillOpacity="0.8" />
              <path d="M12 2C12 2 8 8 8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13C16 8 12 2 12 2Z" fill="#d4af37" />
            </svg>
            <span className="font-poppins font-medium text-hu-gold">Drag Me</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default InteractiveFire;