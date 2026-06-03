import React, { useRef } from 'react';
import { Github, Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal section title
    gsap.from(".section-title", {
      scrollTrigger: { trigger: ".section-title", start: "top 85%" },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out"
    });

    // Reveal image
    gsap.from(".about-img-container", {
      scrollTrigger: { trigger: ".about-img-container", start: "top 80%" },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out"
    });

    // Reveal info blocks
    gsap.from(".info-block", {
      scrollTrigger: { trigger: ".info-block", start: "top 85%" },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });

    // Reveal paragraph
    gsap.from(".about-description", {
      scrollTrigger: { trigger: ".about-description", start: "top 85%" },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });

    // Reveal contact items
    gsap.from(".contact-item", {
      scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });

    // Button magnetic effect handled globally, just reveal it
    gsap.from(".about-btn", {
      scrollTrigger: { trigger: ".about-btn", start: "top 90%" },
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="about-section section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white">
          About <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div data-speed="1.1" className="about-img-container flex-1 flex justify-center md:justify-end w-full">
            <div className="group relative w-64 sm:w-80 md:w-full md:max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
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
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-hu-gold mb-6">
              Adil Pribadi Abdinusa
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="info-block p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:border-hu-gold/30 transition-colors">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Date of Birth</span>
                <span className="text-white font-semibold">24 August 2008</span>
              </div>
              <div className="info-block p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:border-hu-gold/30 transition-colors">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Education</span>
                <span className="text-white font-semibold">SMK TJKT Student</span>
              </div>
            </div>

            <p className="about-description text-lg text-gray-400 leading-relaxed mb-8 font-inter">
              I have a deep passion for technology, particularly in networking, Linux environments, and server configurations. I enjoy solving technical challenges with a touch of elegance and exploring the depths of system architecture.
            </p>

            <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="contact-item flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Phone size={20} /></div>
                <span className="text-sm font-medium">+62 858 7689 4023</span>
              </div>
              <div className="contact-item flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Mail size={20} /></div>
                <span className="text-sm font-medium">awgrtopls@gmail.com</span>
              </div>
              <div className="contact-item flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><Github size={20} /></div>
                <span className="text-sm font-medium">github.com/Snezhya</span>
              </div>
              <div className="contact-item flex items-center gap-4 text-gray-300">
                <div className="p-3 bg-hu-red/10 rounded-lg text-hu-glow"><MapPin size={20} /></div>
                <span className="text-sm font-medium">Central Java, Indonesia</span>
              </div>
            </div>

            <a 
              href="#contact" 
              className="about-btn magnetic-btn inline-flex px-10 py-4 bg-hu-red text-white font-poppins font-bold rounded-full shadow-[0_10px_25px_rgba(107,15,26,0.3)] hover:bg-hu-glow hover:shadow-[0_15px_35px_rgba(217,56,58,0.5)] transition-all duration-300"
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
