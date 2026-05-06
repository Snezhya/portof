import React from 'react';
import { Github, ChevronUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-[rgba(212,175,55,0.15)] bg-hu-bg-light relative text-center">
      <a href="#hero" className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-hu-red rounded-full text-white shadow-[0_0_15px_rgba(217,56,58,0.6)] hover:bg-hu-glow hover:-translate-y-2 transition-all">
        <ChevronUp size={24} />
      </a>
      
      <div className="flex justify-center gap-6 mb-6 mt-4">
        <a href="https://github.com/Snezhya" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-hu-glow transition-colors">
          <Github size={24} />
        </a>
        <a href="https://www.tiktok.com/@snezhya_" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-hu-glow transition-colors font-bold text-lg leading-none">
          TK1
        </a>
        <a href="https://www.tiktok.com/@snezhyaa" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-hu-glow transition-colors font-bold text-lg leading-none">
          TK2
        </a>
      </div>
      
      <p className="text-gray-500 text-sm font-poppins">
        &copy; {new Date().getFullYear()} Adil Pribadi Abdinusa. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
