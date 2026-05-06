import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../../image/IMG_20260414_230828_784.png';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10 overflow-hidden">
      <motion.h2 
        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16"
      >
        About <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Me</span>
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
          initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="w-72 h-80 md:w-80 md:h-[400px] rounded-2xl border border-[rgba(212,175,55,0.15)] bg-gradient-to-br from-[rgba(20,10,10,0.8)] to-[rgba(107,15,26,0.2)] shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(212,175,55,0.05)] overflow-hidden flex items-center justify-center hover:shadow-[0_20px_40px_rgba(217,56,58,0.2),inset_0_0_30px_rgba(212,175,55,0.1)] transition-shadow duration-500">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h3 className="text-2xl md:text-3xl font-poppins text-hu-gold mb-6">SMK Student majoring in TJKT</h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Hello! I was born on August 24, 2008. Currently, I am a Vocational High School (SMK) student specializing in Teknik Jaringan Komputer dan Telekomunikasi (TJKT). I have a deep passion for technology and continuous learning.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            My primary interests revolve around PC building, Linux environments, computer networking, and exploring the latest tech trends. I enjoy configuring systems and solving technical challenges with a touch of elegance.
          </p>
          <a href="#contact" className="inline-block px-8 py-3 bg-hu-red text-white font-poppins font-semibold rounded-lg shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.7)] hover:-translate-y-1 transition-all">
            Let's Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
