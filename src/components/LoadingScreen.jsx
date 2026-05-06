import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-hu-bg flex flex-col items-center justify-center"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full border-4 border-hu-red border-t-hu-gold animate-spin shadow-[0_0_30px_rgba(217,56,58,0.5)]"
      ></motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-3xl font-poppins font-bold tracking-widest text-hu-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
      >
        ADIL<span className="text-hu-glow">.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-400 mt-2 font-fira tracking-widest text-sm"
      >
        ENTERING PORTOFOLIO...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
