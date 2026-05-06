import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [isFocused, setIsFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Mock)");
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-8 md:px-[10%] relative z-10 overflow-hidden">
      <motion.h2 
        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
        className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16"
      >
        Get In <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Touch</span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-16 justify-center max-w-6xl mx-auto">
        <motion.div 
          initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
          className="flex-1 space-y-8"
        >
          <h3 className="text-3xl font-poppins font-semibold text-hu-gold mb-6">Let's Connect</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Whether you have a project in mind, a question about networking, or just want to say hi, feel free to drop a message.
          </p>

          <a href="https://wa.me/6285876894023" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-2xl hover:border-hu-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all group">
            <div className="p-4 bg-[rgba(107,15,26,0.3)] text-hu-glow rounded-full group-hover:bg-hu-glow group-hover:text-white transition-colors">
              <Phone size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
              <p className="text-lg font-semibold text-gray-200">085876894023</p>
            </div>
          </a>

          <a href="mailto:awgrtopls@gmail.com" className="flex items-center gap-6 p-6 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-2xl hover:border-hu-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all group">
            <div className="p-4 bg-[rgba(107,15,26,0.3)] text-hu-glow rounded-full group-hover:bg-hu-glow group-hover:text-white transition-colors">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-200">awgrtopls@gmail.com</p>
            </div>
          </a>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
          className="flex-1 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                id="name"
                required
                onFocus={() => setIsFocused('name')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent border-b-2 border-[rgba(212,175,55,0.3)] py-3 text-gray-200 focus:outline-none focus:border-hu-glow transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFocused === 'name' ? '-top-5 text-xs text-hu-glow' : 'top-3 text-base text-gray-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-hu-gold'}`}>
                Your Name
              </label>
            </div>

            <div className="relative">
              <input 
                type="email" 
                id="email"
                required
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent border-b-2 border-[rgba(212,175,55,0.3)] py-3 text-gray-200 focus:outline-none focus:border-hu-glow transition-colors peer placeholder-transparent"
                placeholder="Email"
              />
              <label htmlFor="email" className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFocused === 'email' ? '-top-5 text-xs text-hu-glow' : 'top-3 text-base text-gray-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-hu-gold'}`}>
                Your Email
              </label>
            </div>

            <div className="relative pt-4">
              <textarea 
                id="message"
                required
                rows="4"
                onFocus={() => setIsFocused('message')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(212,175,55,0.3)] p-4 text-gray-200 focus:outline-none focus:border-hu-glow transition-colors peer placeholder-transparent resize-none"
                placeholder="Message"
              ></textarea>
              <label htmlFor="message" className={`absolute left-4 transition-all duration-300 pointer-events-none bg-[rgba(20,10,10,1)] px-1 ${isFocused === 'message' ? '-top-2 text-xs text-hu-glow' : 'top-8 text-base text-gray-500 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-hu-gold'}`}>
                Message
              </label>
            </div>

            <button type="submit" className="w-full py-4 bg-hu-red text-white font-poppins font-semibold rounded-lg shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.8)] transition-all flex items-center justify-center gap-3">
              Send Message <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
