import React from 'react';

const osList = [
  {
    icon: '🐧',
    name: 'Linux',
    color: '#6cc24a',
    subtitle: 'Arch Linux, Debian, Ubuntu, Fedora, Linux Mint, Ubuntu Server, OpenMediaVault, and TrueNAS.',
  },
  {
    icon: '🔄',
    name: 'RouterOS',
    color: '#ff6b35',
    subtitle: 'MikroTik RouterOS for networking, routing, firewall, and VPN management.',
  },
  {
    icon: '🪟',
    name: 'Windows',
    color: '#0078d4',
    subtitle: 'Windows desktop environments, software compatibility, gaming, and productivity workflows.',
  },
];

const OSExperience = () => {
  return (
    <section
      id="os-experience"
      className="section py-24 px-8 md:px-[10%] relative z-10 bg-[rgba(10,5,5,0.8)] border-y border-[rgba(212,175,55,0.1)] overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 relative z-10 text-white" data-animate>
        OS <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Experience</span>
      </h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {osList.map((os) => (
          <article
            key={os.name}
            className="group rounded-3xl border border-[rgba(212,175,55,0.12)] bg-[rgba(20,10,10,0.7)] p-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-hu-gold hover:shadow-[0_20px_45px_rgba(217,56,58,0.25)]"
            data-animate
          >
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-[0_0_20px_rgba(217,56,58,0.2)]"
              style={{ backgroundColor: `${os.color}15`, color: os.color }}
            >
              {os.icon}
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-white mb-3">{os.name}</h3>
            <p className="text-gray-400 leading-relaxed">{os.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OSExperience;
