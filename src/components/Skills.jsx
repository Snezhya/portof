import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Skills = () => {
  const sectionRef = useRef(null);
  const codeBgRef = useRef(null);
  const [codeLines, setCodeLines] = useState([]);

  useEffect(() => {
    const snippets = [
      "sudo apt-get update && sudo apt-get upgrade -y",
      "systemctl status nginx.service",
      "ip route add 192.168.1.0/24 via 10.0.0.1",
      "interface vlan add name=VLAN10 vlan-id=10 interface=ether1",
      "def configure_router(ip, user, pw):",
      "iptables -A INPUT -p tcp --dport 22 -j ACCEPT",
      "chmod 755 script.sh && ./script.sh",
      "ping 8.8.8.8 -c 4",
      "ssh user@192.168.100.5 -p 2222"
    ];
    let lines = [];
    for(let i=0; i<40; i++) {
      lines.push(snippets[Math.floor(Math.random() * snippets.length)]);
    }
    setCodeLines(lines);
  }, []);

  useGSAP(() => {
    // Infinite scrolling code background using GSAP
    if (codeBgRef.current) {
      gsap.to(codeBgRef.current, {
        y: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1
      });
    }

    // Reveal section title
    gsap.from(".section-title", {
      scrollTrigger: { trigger: ".skills-section", start: "top 85%" },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out"
    });

    // Reveal skill cards
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 75%"
      },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Animate progress bars and counters
    const progressFills = gsap.utils.toArray(".skill-bar-fill");
    progressFills.forEach((fill) => {
      const target = parseInt(fill.dataset.level);
      const counterEl = fill.closest('.skill-card').querySelector('.counter');
      
      gsap.fromTo(fill, 
        { width: "0%" },
        { 
          width: `${target}%`, 
          duration: 2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: fill,
            start: "top 95%",
            once: true,
          }
        }
      );

      // Counter animation
      if (counterEl) {
        gsap.from({ val: 0 }, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counterEl,
            start: "top 95%",
            once: true
          },
          onUpdate: function() {
            counterEl.textContent = Math.round(this.targets()[0].val) + "%";
          }
        });
      }
    });

  }, { dependencies: [codeLines], scope: sectionRef });

  const skills = [
    { title: "Linux Administration", level: 30 },
    { title: "Network Routing & Mikrotik", level: 30 },
    { title: "Hardware & PC Building", level: 30 },
    { title: "Python & Bash Automation", level: 30 },
    { title: "React & Next.js", level: 30 },
    { title: "Server Configuration", level: 30 }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="skills-section section min-h-screen py-24 px-8 md:px-[10%] relative z-10 overflow-hidden bg-hu-bg"
    >
      {/* Code Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] text-hu-glow font-fira text-sm leading-relaxed pointer-events-none select-none overflow-hidden">
        <div ref={codeBgRef} className="flex flex-col">
          {codeLines.map((line, i) => <div key={i}>{line}</div>)}
          {codeLines.map((line, i) => <div key={i+'dup'}>{line}</div>)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-title text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white">
          My <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Skill</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div 
              key={skill.title}
              className="skill-card group bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-hu-gold/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-xl font-poppins font-bold text-gray-200 group-hover:text-hu-gold transition-colors">{skill.title}</h4>
                <span className="counter text-sm text-hu-gold font-fira font-bold">0%</span>
              </div>
              
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                <div 
                  className="skill-bar-fill h-full bg-gradient-to-r from-hu-red via-hu-glow to-hu-gold rounded-full relative"
                  data-level={skill.level}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[4px]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
