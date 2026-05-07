import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isFocused, setIsFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
      title: 'Contact Us',
    };

    emailjs.send('service_igb1r6o', 'template_91o46pq', templateParams, 'B0_w_KnQrwEDRpRJK')
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setErrorMessage('');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        const message = error?.text || error?.message || 'Unable to send email. Please check EmailJS settings.';
        console.error('EmailJS error:', error);
        setErrorMessage(message);
        setIsSubmitting(false);
      });
  };

  const waMessage = "Halo Adil, saya melihat portfolio Anda dan tertarik untuk berdiskusi!";

  return (
    <motion.section 
      id="contact" 
      className="section min-h-screen py-24 px-8 md:px-[10%] relative z-10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.25 }}
    >
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-white" data-animate>
        Get In <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Touch</span>
      </h2>

      <div data-animate className="flex flex-col lg:flex-row gap-16 justify-center max-w-6xl mx-auto">
        <div className="flex-1 space-y-8">
          <h3 className="text-3xl font-poppins font-semibold text-hu-gold mb-6">Let's Connect</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Whether you have a project in mind, a question about networking, or just want to say hi, feel free to drop a message.
          </p>

          <a href={`https://wa.me/6285876894023?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-2xl hover:border-hu-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all group">
            <div className="p-4 bg-[rgba(107,15,26,0.3)] text-hu-glow rounded-full group-hover:bg-hu-glow group-hover:text-white transition-colors shadow-[0_0_10px_rgba(217,56,58,0.3)]">
              <Phone size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">WhatsApp (Direct)</p>
              <p className="text-lg font-semibold text-gray-200">085876894023</p>
            </div>
          </a>

          <a href="mailto:awgrtopls5@gmail.com" className="flex items-center gap-6 p-6 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-2xl hover:border-hu-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all group">
            <div className="p-4 bg-[rgba(107,15,26,0.3)] text-hu-glow rounded-full group-hover:bg-hu-glow group-hover:text-white transition-colors shadow-[0_0_10px_rgba(217,56,58,0.3)]">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-200">awgrtopls5@gmail.com</p>
            </div>
          </a>
        </div>

        <div className="flex-1 bg-[rgba(20,10,10,0.7)] border border-[rgba(212,175,55,0.15)] rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-[rgba(20,10,10,0.95)] z-20 flex flex-col items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle size={64} className="text-hu-gold mb-4" />
                </motion.div>
                <h4 className="text-2xl font-poppins text-white">Message Sent!</h4>
                <p className="text-gray-400 mt-2">I will get back to you soon.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
                <p className="font-semibold">Unable to send message</p>
                <p>{errorMessage}</p>
                <p className="mt-2 text-xs text-red-200">If you are using Gmail API in EmailJS, make sure the Gmail API project has the proper `gmail.send` scope enabled and that the service account is authorized.</p>
              </div>
            )}
            <div className="relative">
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-4 font-poppins font-semibold rounded-lg transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-hu-red/50 text-white/50 cursor-not-allowed' : 'bg-hu-red text-white shadow-[0_0_15px_rgba(107,15,26,0.6)] hover:bg-hu-glow hover:shadow-[0_0_25px_rgba(217,56,58,0.8)]'}`}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>Send Message <Send size={20} /></>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;