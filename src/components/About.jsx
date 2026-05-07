import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../../public/image/IMG_20260414_230828_784.png';
import { Github, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(imageRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-white">
        About <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Me</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          ref={imageRef}
          drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
          className="flex-1 flex justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="w-72 h-80 md:w-80 md:h-[400px] rounded-2xl border border-[rgba(212,175,55,0.15)] bg-gradient-to-br from-[rgba(20,10,10,0.8)] to-[rgba(107,15,26,0.2)] shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(212,175,55,0.05)] overflow-hidden flex items-center justify-center hover:shadow-[0_20px_40px_rgba(217,56,58,0.2),inset_0_0_30px_rgba(212,175,55,0.1)] transition-shadow duration-500">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <div ref={textRef} className="flex-1">
          <h3 className="text-2xl md:text-3xl font-poppins text-hu-gold mb-4">Adil Pribadi Abdinusa</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-[rgba(20,10,10,0.5)] border border-[rgba(212,175,55,0.1)] rounded-lg backdrop-blur-sm">
              <span className="text-gray-400 text-sm block">Date of Birth</span>
              <span className="text-white font-medium">24 August 2008</span>
            </div>
            <div className="p-4 bg-[rgba(20,10,10,0.5)] border border-[rgba(212,175,55,0.1)] rounded-lg backdrop-blur-sm">
              <span className="text-gray-400 text-sm block">Education</span>
              <span className="text-white font-medium">SMK TJKT Student</span>
            </div>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            I have a deep passion for technology, particularly in networking, Linux environments, and server configurations. I enjoy solving technical challenges with a touch of elegance.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3 text-gray-300">
              <Phone size={18} className="text-hu-gold" />
              <span>+62 858 7689 4023</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={18} className="text-hu-gold" />
              <span>awgrtopls@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Github size={18} className="text-hu-gold" />
              <span>github.com/Snezhya</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="font-bold text-hu-gold w-[18px] text-center">TK</span>
              <span>@snezhya_ / @snezhyaa</span>
            </div>
          </div>

          <a href="#contact" className="inline-block px-8 py-3 bg-hu-red text-white font-poppins font-semibold rounded-lg shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.7)] hover:-translate-y-1 transition-all">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
