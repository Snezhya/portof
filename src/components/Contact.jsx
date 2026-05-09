import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const formRef = useRef(null);
  const successRef = useRef(null);

  const handleFocus = (e) => {
    const parent = e.target.parentElement;
    gsap.to(parent.querySelector('.focus-line'), { width: '100%', duration: 0.4, ease: "power2.out" });
    gsap.to(parent.querySelector('label'), { color: '#d9383a', y: -20, scale: 0.85, duration: 0.4, ease: "power2.out" });
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      const parent = e.target.parentElement;
      gsap.to(parent.querySelector('.focus-line'), { width: '0%', duration: 0.4, ease: "power2.in" });
      gsap.to(parent.querySelector('label'), { color: '#6b7280', y: 0, scale: 1, duration: 0.4, ease: "power2.in" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send('service_igb1r6o', 'template_91o46pq', {
      name: formData.name,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
    }, 'B0_w_KnQrwEDRpRJK')
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Success animation
        gsap.fromTo(successRef.current, 
          { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" }
        );
      })
      .catch((error) => {
        setErrorMessage(error.text || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white" data-animate data-gsap-type="reveal">
          Get In <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Touch</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info Column */}
          <div className="flex-1 space-y-10" data-animate data-gsap-type="slide-right">
            <div>
              <h3 className="text-3xl font-poppins font-bold text-hu-gold mb-6">Let's start a conversation</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Interested in working together or have a question about my technical background? I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <a href="https://wa.me/6285876894023" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-hu-gold/30 hover:bg-white/10 transition-all group">
                <div className="p-4 bg-hu-red/10 text-hu-glow rounded-2xl group-hover:scale-110 transition-transform">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <p className="text-lg font-bold text-white">+62 858 7689 4023</p>
                </div>
              </a>

              <a href="mailto:awgrtopls5@gmail.com" className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-hu-gold/30 hover:bg-white/10 transition-all group">
                <div className="p-4 bg-hu-red/10 text-hu-glow rounded-2xl group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-bold text-white">awgrtopls5@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="flex-1" data-animate data-gsap-type="slide-left">
            <div className="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-12 backdrop-blur-xl shadow-2xl">
              {isSuccess && (
                <div ref={successRef} className="absolute inset-0 z-30 bg-hu-bg/95 flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem]">
                  <div className="w-20 h-20 bg-hu-gold/10 text-hu-gold rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h4 className="text-3xl font-poppins font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button onClick={() => setIsSuccess(false)} className="mt-8 text-hu-gold font-bold hover:underline">Send another message</button>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                    <AlertCircle size={20} /> {errorMessage}
                  </div>
                )}
                
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all"
                  />
                  <label className="absolute left-0 top-4 text-gray-500 pointer-events-none transition-all origin-left">Your Name</label>
                  <div className="focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow w-0 transition-all" />
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all"
                  />
                  <label className="absolute left-0 top-4 text-gray-500 pointer-events-none transition-all origin-left">Email Address</label>
                  <div className="focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow w-0 transition-all" />
                </div>

                <div className="relative">
                  <textarea 
                    required 
                    rows="4"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all resize-none"
                  ></textarea>
                  <label className="absolute left-0 top-4 text-gray-500 pointer-events-none transition-all origin-left">Your Message</label>
                  <div className="focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow w-0 transition-all" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative w-full py-5 bg-hu-red text-white font-poppins font-bold rounded-2xl overflow-hidden shadow-2xl transition-all hover:bg-hu-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? 'Sending...' : <>Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                  </div>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;