import React, { useRef } from 'react';
import { useStaggerAnimation, useParallax } from '../hooks/useScrollAnimation';

const osList = [
  { iconSrc: '/image/linux-logo.webp', name: 'Linux', color: '#6cc24a', subtitle: 'Arch Linux, Debian, Ubuntu, Fedora, Linux Mint, Ubuntu Server, OpenMediaVault, and TrueNAS.' },
  { iconSrc: '/image/routerOS.webp', name: 'RouterOS', color: '#ff6b35', subtitle: 'MikroTik RouterOS for networking, routing, firewall, and VPN management.' },
  { iconSrc: '/image/windows-logo.png', name: 'Windows', color: '#0078d4', subtitle: 'Windows desktop environments, software compatibility, gaming, and productivity workflows.' },
];

const OSExperience = () => {
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  
  useStaggerAnimation(containerRef, '.os-card', { y: 40, stagger: 0.15 });
  useParallax(blobRef, 0.6);

  return (
    <section
      id="os-experience"
      className="section py-24 px-8 md:px-[10%] relative z-10 bg-[rgba(5,5,5,0.8)] border-y border-white/5 overflow-hidden"
    >
      {/* Parallax Background Shape */}
      <div ref={blobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hu-red opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white" data-animate data-gsap-type="reveal">
          OS <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Landscape</span>
        </h2>

        <div ref={containerRef} className="grid gap-8 md:grid-cols-3">
          {osList.map((os) => (
            <article
              key={os.name}
              className="os-card group relative rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center shadow-2xl transition-all duration-500 hover:border-hu-gold/30 hover:-translate-y-3"
            >
              <div
                className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: `${os.color}15`, boxShadow: `0 0 30px ${os.color}20` }}
              >
                <img
                  src={os.iconSrc}
                  alt={`${os.name} logo`}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-white mb-4 group-hover:text-hu-gold transition-colors">{os.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{os.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OSExperience;
