import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveFire = () => {
  const [butterflies, setButterflies] = useState([]);

  const spawnButterfly = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newButterfly = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle: Math.random() * 360,
    };

    setButterflies(prev => [...prev, newButterfly]);
    setTimeout(() => {
      setButterflies(prev => prev.filter(b => b.id !== newButterfly.id));
    }, 2000);
  };

  return (
    <section className="py-24 px-8 md:px-[10%] bg-hu-bg relative overflow-hidden z-10 flex flex-col items-center justify-center border-y border-[rgba(212,175,55,0.1)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="max-w-3xl text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-hu-gold mb-4">
          Guide to the Afterlife
        </h2>
        <p className="text-gray-300 text-lg">
          Click inside the box below to summon spirit butterflies.
        </p>
        
        <div 
          onClick={spawnButterfly}
          className="relative w-full max-w-2xl mx-auto h-64 mt-10 rounded-2xl border-2 border-dashed border-hu-glow/50 bg-[rgba(107,15,26,0.1)] cursor-crosshair overflow-hidden shadow-[inset_0_0_30px_rgba(217,56,58,0.2)] hover:border-hu-gold/50 transition-colors"
        >
          <AnimatePresence>
            {butterflies.map(b => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: b.x, y: b.y, scale: 0, rotate: b.angle }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.5, 0.8], 
                  y: b.y - 150, 
                  x: b.x + (Math.random() > 0.5 ? 50 : -50),
                  rotate: b.angle + 90
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-8 h-8 pointer-events-none"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 5 8 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 8 12 2 12 2Z" fill="#d9383a" fillOpacity="0.8" />
                  <path d="M12 2C12 2 8 8 8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13C16 8 12 2 12 2Z" fill="#d4af37" />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-hu-glow font-fira text-sm">
            [ Click to Interact ]
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InteractiveFire;
