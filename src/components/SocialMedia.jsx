import React from 'react';
import { Github, Mail, Phone } from 'lucide-react';

const socials = [
  {
    name: 'GitHub',
    link: 'https://github.com/',
    icon: <Github size={32} />,
    color: '#ffffff',
  },
  {
    name: 'Email',
    link: 'mailto:awgrtopls5@gmail.com',
    icon: <Mail size={32} />,
    color: '#D4AF37',
  },
  {
    name: 'WhatsApp',
    link: 'https://wa.me/6285876894023',
    icon: <Phone size={32} />,
    color: '#25D366',
  },
];

const SocialMedia = () => {

  return (
    <section 
      id="socials" 
      className="section py-24 px-8 md:px-[10%] bg-hu-bg-light relative z-10"
    >
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-white" data-animate>
        Connect <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">With Me</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {socials.map((social) => (
          <a
            key={social.name}
            data-animate
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col items-center gap-4 outline-none"
          >
            <div 
              className="w-20 h-20 rounded-full bg-[rgba(20,10,10,0.8)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center text-gray-300 transition-all duration-300 group-hover:scale-110 group-focus:scale-110"
              style={{ '--hover-color': social.color }}
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