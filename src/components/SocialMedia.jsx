import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialMedia = () => {
  const sectionRef = useRef(null);
  const iconsRef = useRef(null);

  const socials = [
    { name: 'GitHub', icon: <Github size={32} />, link: 'https://github.com/Snezhya', color: '#ffffff' },
    { name: 'TikTok', icon: <span className="font-bold text-2xl">TK</span>, link: 'https://www.tiktok.com/@snezhya_', color: '#ff0050' },
    { name: 'WhatsApp', icon: <Phone size={32} />, link: 'https://wa.me/6285876894023', color: '#25D366' },
    { name: 'Email', icon: <Mail size={32} />, link: 'mailto:awgrtopls@gmail.com', color: '#EA4335' }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(iconsRef.current.children,
      { scale: 0, opacity: 0, y: 50 },
      {
        scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section id="socials" ref={sectionRef} className="py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-white">
        Connect <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">With Me</span>
      </h2>

      <div ref={iconsRef} className="flex flex-wrap justify-center gap-8 md:gap-16">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col items-center gap-4 outline-none"
          >
            <div 
              className="w-20 h-20 rounded-full bg-[rgba(20,10,10,0.8)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center text-gray-300 transition-all duration-300 group-hover:scale-110 group-focus:scale-110"
              style={{ 
                '--hover-color': social.color 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = social.color;
                e.currentTarget.style.color = social.color;
                e.currentTarget.style.boxShadow = `0 0 25px ${social.color}80, inset 0 0 10px ${social.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                e.currentTarget.style.color = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {social.icon}
            </div>
            <span className="font-poppins font-medium text-gray-400 group-hover:text-white transition-colors">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMedia;
