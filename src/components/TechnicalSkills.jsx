import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, ShieldCheck, Server, GitBranch, Monitor } from 'lucide-react';

const skills = [
  {
    icon: Cpu,
    title: 'Linux',
    description: 'CLI workflows, package management, shell environments, and Linux-based development.',
    tone: 'from-[#ff4d4d] via-[#c1272d] to-[#8e0a10]',
  },
  {
    icon: Terminal,
    title: 'Python',
    description: 'Automation, scripting, backend utilities, and CLI tooling.',
    tone: 'from-[#f8b400] via-[#dd5f1c] to-[#b7241d]',
  },
  {
    icon: ShieldCheck,
    title: 'MikroTik',
    description: 'Routing, VLAN, firewall, VPN, and networking configuration.',
    tone: 'from-[#d946ef] via-[#c026d3] to-[#8b25a0]',
  },
  {
    icon: Server,
    title: 'Home Server',
    description: 'Self-hosted services, monitoring, storage, and infrastructure setup.',
    tone: 'from-[#ef4444] via-[#dc2626] to-[#991b1b]',
  },
  {
    icon: GitBranch,
    title: 'Git & GitHub',
    description: 'Version control, deployment workflows, and repository management.',
    tone: 'from-[#4f46e5] via-[#7c3aed] to-[#9333ea]',
  },
  {
    icon: Monitor,
    title: 'Frontend',
    description: 'React, TailwindCSS, GSAP, Framer Motion, and responsive UI systems.',
    tone: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
  },
];

const TechnicalSkills = () => {
  const handleCardMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="technical-skills"
      className="section relative overflow-hidden py-24 px-6 sm:px-8 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-red-500/20 blur-3xl animate-[float_18s_infinite_alternate_ease-in-out]" />
        <div className="absolute right-8 top-28 h-56 w-56 rounded-full bg-[#d32029]/25 blur-3xl animate-[float_22s_infinite_alternate_ease-in-out]" />
        <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff2c4b]/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative mb-12 overflow-hidden rounded-full bg-[rgba(255,255,255,0.03)] px-6 py-4 text-center shadow-[0_0_50px_rgba(217,56,58,0.1)]">
          <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(217,56,58,0.16),transparent_45%)] opacity-80 blur-2xl" />
          <div className="relative inline-flex flex-col items-center gap-4">
            <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm uppercase tracking-[0.35em] text-red-200 shadow-[0_0_40px_rgba(217,56,58,0.12)]">
            ???
            </div>
            <h2 className="relative text-4xl font-semibold tracking-tight text-white sm:text-5xl" data-animate>
              Technical <span className="text-hu-glow">Skills</span>
            </h2>
          </div>
          <p className="relative mt-4 max-w-3xl text-sm text-gray-300 sm:text-base">
            {/* Technologies, infrastructure, and tools I use for development and networking. */}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(10,5,5,0.95)] p-px shadow-[0_25px_90px_rgba(217,56,58,0.12)]"
                data-animate
              >
                <motion.article
                  whileHover={{ y: -8, scale: 1.01, rotate: 0.5 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 20 }}
                  onMouseMove={handleCardMove}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.setProperty('--mouse-x', '50%');
                    event.currentTarget.style.setProperty('--mouse-y', '50%');
                  }}
                  style={{
                    '--mouse-x': '50%',
                    '--mouse-y': '50%',
                    backgroundImage: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(217,56,58,0.16), transparent 35%)`,
                  }}
                  className="relative overflow-hidden rounded-3xl bg-[#090606] px-6 py-8 text-left backdrop-blur-sm transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-6 top-6 h-24 rounded-[2rem] bg-gradient-to-br from-[#ff4d4d]/10 via-transparent to-transparent blur-3xl opacity-90" />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-[#140909] shadow-[0_0_35px_rgba(217,56,58,0.18)]">
                    <Icon className="h-8 w-8 text-red-300" />
                  </div>
                  <h3 className="relative z-10 mt-8 text-xl font-semibold text-white">{skill.title}</h3>
                  <p className="relative z-10 mt-4 text-sm leading-7 text-gray-300">
                    {skill.description}
                  </p>
                  <div className={`absolute -bottom-8 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${skill.tone} opacity-40 blur-3xl`} />
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;