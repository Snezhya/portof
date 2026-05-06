import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Network, Cpu, Code2 } from 'lucide-react';

const Skills = () => {
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
    { icon: <Terminal size={48} />, title: "Linux", desc: "Debian, Arch, Ubuntu. Proficient in command-line operations and server setups." },
    { icon: <Network size={48} />, title: "Networking", desc: "VLAN, Mikrotik, Router configurations. Experience with enterprise topologies." },
    { icon: <Cpu size={48} />, title: "PC Building", desc: "Hardware assembly, troubleshooting, and optimization for performance." },
    { icon: <Code2 size={48} />, title: "Programming", desc: "Python automation scripts, basic web development." }
  ];

  return (
    <section id="skills" className="min-h-screen py-24 px-8 md:px-[10%] relative z-10 overflow-hidden">
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

      <motion.h2 
        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
        className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 relative z-10"
      >
        My <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Skills</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.title}
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group bg-[rgba(20,10,10,0.7)] backdrop-blur-md p-8 rounded-2xl border border-[rgba(212,175,55,0.15)] text-center relative overflow-hidden shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(107,15,26,0.3)] hover:border-[rgba(212,175,55,0.4)] transition-all duration-300"
          >
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-hu-red to-hu-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            
            <div className="text-hu-glow mb-6 flex justify-center group-hover:text-hu-gold group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
              {skill.icon}
            </div>
            <h4 className="text-xl font-poppins font-semibold text-gray-100 mb-4">{skill.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
