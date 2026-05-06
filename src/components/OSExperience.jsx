import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OSExperience = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const osList = [
    { name: "Arch Linux", color: "#1793d1", icon: "A" },
    { name: "Ubuntu", color: "#E95420", icon: "U" },
    { name: "Debian", color: "#A80030", icon: "D" },
    { name: "Fedora", color: "#51A2DA", icon: "F" },
    { name: "Nobara", color: "#FFFFFF", icon: "N" },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    const cards = cardsRef.current.children;

    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="os-experience" ref={sectionRef} className="py-24 px-8 md:px-[10%] relative z-10 bg-[rgba(10,5,5,0.8)] border-y border-[rgba(212,175,55,0.1)]">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 relative z-10 text-white">
        OS <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Experience</span>
      </h2>

      <div ref={cardsRef} className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {osList.map((os) => (
          <div
            key={os.name}
            className="group flex items-center gap-4 bg-[rgba(20,10,10,0.9)] px-6 py-4 rounded-xl border border-[rgba(212,175,55,0.15)] shadow-lg hover:border-[rgba(212,175,55,0.5)] transition-all duration-300 cursor-default relative overflow-hidden hover:-translate-y-2 hover:scale-105"
            style={{ boxShadow: `0 0 0 ${os.color}00` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 30px ${os.color}40, inset 0 0 20px ${os.color}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`;
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: os.color }}></div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 group-hover:scale-110"
              style={{ color: os.color, textShadow: `0 0 10px ${os.color}80`, border: `1px solid ${os.color}40` }}
            >
              {os.icon}
            </div>
            <span className="font-poppins font-medium text-gray-200 group-hover:text-white transition-colors">{os.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OSExperience;
