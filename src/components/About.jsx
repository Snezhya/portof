import React, { useRef } from 'react';
import { Github, Mail, Phone, MapPin } from 'lucide-react';
import { useParallax } from '../hooks/useScrollAnimation';

const About = () => {
  const imageRef = useRef(null);
  useParallax(imageRef, 0.5);

  return (
    <section 
      id="about" 
      className="section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white" data-animate data-gsap-type="reveal">
          About <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Me</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div 
            ref={imageRef}
            className="flex-1 flex justify-center w-full"
            data-animate
            data-gsap-type="slide-right"
          >
            <div className="group relative w-72 h-80 md:w-96 md:h-[480px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-hu-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img 
                src="/image/IMG_20260414_230828_784.png" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-hu-gold mb-6" data-animate data-gsap-type="reveal" data-gsap-delay="0.2">
              Adil Pribadi Abdinusa
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:border-hu-gold/30 transition-colors" data-animate data-gsap-type="fade-up" data-gsap-delay="0.3">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Date of Birth</span>
                <span className="text-white font-semibold">24 August 2008</span>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:border-hu-gold/30 transition-colors" data-animate data-gsap-type="fade-up" data-gsap-delay="0.4">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Education</span>
                <span className="text-white font-semibold">SMK TJKT Student</span>
              </div>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-inter" data-animate data-gsap-type="fade-up" data-gsap-delay="0.5">
              I have a deep passion for technology, particularly in networking, Linux environments, and server configurations. I enjoy solving technical challenges with a touch of elegance and exploring the depths of system architecture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 text-gray-300" data-animate data-gsap-type="fade-up" data-gsap-delay="0.6">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Phone size={20} /></div>
                <span className="text-sm font-medium">+62 858 7689 4023</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300" data-animate data-gsap-type="fade-up" data-gsap-delay="0.7">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Mail size={20} /></div>
                <span className="text-sm font-medium">awgrtopls@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300" data-animate data-gsap-type="fade-up" data-gsap-delay="0.8">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Github size={20} /></div>
                <span className="text-sm font-medium">github.com/Snezhya</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300" data-animate data-gsap-type="fade-up" data-gsap-delay="0.9">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><MapPin size={20} /></div>
                <span className="text-sm font-medium">Central Java, Indonesia</span>
              </div>
            </div>

            <a 
              href="#contact" 
              className="inline-flex px-10 py-4 bg-hu-red text-white font-poppins font-bold rounded-full shadow-[0_10px_25px_rgba(107,15,26,0.3)] hover:bg-hu-glow hover:shadow-[0_15px_35px_rgba(217,56,58,0.5)] hover:-translate-y-1 transition-all duration-300" 
              data-animate 
              data-gsap-type="fade-up" 
              data-gsap-delay="1"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
