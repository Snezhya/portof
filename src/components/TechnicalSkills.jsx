import React, { useRef } from 'react';
import { Cpu, Terminal, ShieldCheck, Server, GitBranch, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const skills = [
  { icon: Cpu, title: 'Linux', description: 'CLI workflows, package management, shell environments, and Linux-based development.', tone: 'from-[#ff4d4d] via-[#c1272d] to-[#8e0a10]' },
  { icon: Terminal, title: 'Python', description: 'Automation, scripting, backend utilities, and CLI tooling.', tone: 'from-[#f8b400] via-[#dd5f1c] to-[#b7241d]' },
  { icon: ShieldCheck, title: 'MikroTik', description: 'Routing, VLAN, firewall, VPN, and networking configuration.', tone: 'from-[#d946ef] via-[#c026d3] to-[#8b25a0]' },
  { icon: Server, title: 'Home Server', description: 'Self-hosted services, monitoring, storage, and infrastructure setup.', tone: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]' },
  { icon: GitBranch, title: 'Git & GitHub', description: 'Version control, deployment workflows, and repository management.', tone: 'from-[#4f46e5] via-[#7c3aed] to-[#9333ea]' },
  { icon: Monitor, title: 'Frontend', description: 'React, TailwindCSS, GSAP, and responsive UI systems.', tone: 'from-[#f97316] via-[#ea580c] to-[#c2410c]' },
];

const TechnicalSkills = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Reveal section title and subtitle
    gsap.from(".tech-title", {
      scrollTrigger: { trigger: ".tech-title", start: "top 85%" },
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(".tech-subtitle", {
      scrollTrigger: { trigger: ".tech-subtitle", start: "top 85%" },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });

    // Stagger reveal skill cards
    gsap.from(".tech-card", {
      scrollTrigger: {
        trigger: ".tech-grid",
        start: "top 80%"
      },
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.7,
      ease: "back.out(1.5)"
    });

  }, { scope: sectionRef });

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(card.querySelector('.spotlight'), {
      opacity: 1,
      x: x,
      y: y,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(card, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    gsap.to(card.querySelector('.spotlight'), {
      opacity: 0,
      duration: 0.4
    });

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <section id="technical-skills" ref={sectionRef} className="section relative overflow-hidden py-24 px-6 sm:px-8 lg:px-16 bg-hu-bg-light">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="tech-title text-4xl md:text-6xl font-poppins font-bold mb-6 text-white">
            Technical <span className="text-hu-glow">Arsenal</span>
          </h2>
          <p className="tech-subtitle max-w-2xl mx-auto text-gray-400">
            The core technologies and tools that power my technical workflows and developments.
          </p>
        </div>

        <div className="tech-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                ref={el => cardsRef.current[index] = el}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="tech-card group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition-all duration-500 hover:border-hu-glow/30"
              >
                {/* Mouse Spotlight */}
                <div className="spotlight pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 rounded-[2.5rem]" 
                     style={{ background: 'radial-gradient(600px circle at 0px 0px, rgba(217,56,58,0.15), transparent 40%)', transform: 'translate(-50%, -50%)' }} />

                <div className="relative z-10">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-hu-red/10 border border-hu-glow/20 text-hu-glow shadow-[0_0_30px_rgba(217,56,58,0.1)] group-hover:scale-110 transition-transform duration-500">
                    <Icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-hu-gold transition-colors">{skill.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {skill.description}
                  </p>
                </div>
                
                <div className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${skill.tone} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;