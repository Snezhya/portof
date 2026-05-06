import React from 'react';
import { motion } from 'framer-motion';

const OSExperience = () => {
  const osList = [
    { name: "Arch Linux", color: "#1793d1", icon: "A" },
    { name: "Ubuntu", color: "#E95420", icon: "U" },
    { name: "Debian", color: "#A80030", icon: "D" },
    { name: "Fedora", color: "#51A2DA", icon: "F" },
    { name: "Nobara", color: "#FFFFFF", icon: "N" },
  ];

  return (
    <section id="os-experience" className="py-24 px-8 md:px-[10%] relative z-10 bg-[rgba(10,5,5,0.8)] border-y border-[rgba(212,175,55,0.1)]">
      <motion.h2 
        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
        className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 relative z-10"
      >
        OS <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Experience</span>
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {osList.map((os, index) => (
          <motion.div
            key={os.name}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex items-center gap-4 bg-[rgba(20,10,10,0.9)] px-6 py-4 rounded-xl border border-[rgba(212,175,55,0.15)] shadow-lg hover:border-[rgba(212,175,55,0.5)] transition-colors cursor-default relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: os.color }}></div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 group-hover:scale-110"
              style={{ color: os.color, textShadow: `0 0 10px ${os.color}80`, border: `1px solid ${os.color}40` }}
            >
              {os.icon}
            </div>
            <span className="font-poppins font-medium text-gray-200">{os.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OSExperience;
