import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
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

  const skills = [
    { title: "Linux Administration", level: 50 },
    { title: "Network Routing & Mikrotik", level: 50 },
    { title: "Hardware & PC Building", level: 50 },
    { title: "Python & Bash Automation", level: 50 },
    { title: "React & Next.js", level: 50 },
    { title: "Server Configuration (Apache/Nginx)", level: 30 }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    
    // Animate progress bars
    gsap.fromTo(".progress-fill", 
      { width: "0%" },
      { 
        width: (i, target) => `${target.dataset.level}%`, 
        duration: 1.5, 
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );

    // Animate cards
    gsap.fromTo(containerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );

  }, []);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-24 px-8 md:px-[10%] relative z-10 overflow-hidden">
      {/* Code Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] text-hu-glow font-fira text-sm leading-relaxed pointer-events-none select-none overflow-hidden">
        <motion.div 
          animate={{ y: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex flex-col"
        >
          {codeLines.map((line, i) => <div key={i}>{line}</div>)}
          {codeLines.map((line, i) => <div key={i+'dup'}>{line}</div>)}
        </motion.div>
      </div>

      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 relative z-10 text-white">
        My <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Skills</span>
      </h2>

      <div ref={containerRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {skills.map((skill, index) => (
          <div 
            key={skill.title}
            className="group bg-[rgba(20,10,10,0.7)] backdrop-blur-md p-6 rounded-xl border border-[rgba(212,175,55,0.15)] relative overflow-hidden shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(107,15,26,0.3)] hover:border-[rgba(212,175,55,0.4)] transition-all duration-300"
          >
            <div className="flex justify-between items-end mb-3">
              <h4 className="text-lg font-poppins font-semibold text-gray-200 group-hover:text-hu-gold transition-colors">{skill.title}</h4>
              <span className="text-sm text-gray-400 font-fira">{skill.level}%</span>
            </div>
            
            {/* Custom Progress Bar matching shadcn style but with Hu Tao theme */}
            <div className="h-2 w-full bg-[rgba(212,175,55,0.1)] rounded-full overflow-hidden relative">
              <div 
                className="progress-fill h-full bg-gradient-to-r from-hu-red to-hu-glow rounded-full shadow-[0_0_10px_rgba(217,56,58,0.8)] relative"
                data-level={skill.level}
                style={{ width: "0%" }}
              >
                {/* Glow effect at the tip */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px] opacity-50"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
