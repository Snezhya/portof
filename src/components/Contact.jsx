import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Send, ThumbsUp, ThumbsDown, Share2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', botcheck: false });
  
  // Persistent Counters State
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  // API Namespace for the global counters
  const COUNTER_NAMESPACE = 'adilpribadi';
  
  useEffect(() => {
    // Load initial local states
    const localLiked = localStorage.getItem('portfolio_has_liked') === 'true';
    const localDisliked = localStorage.getItem('portfolio_has_disliked') === 'true';
    setHasLiked(localLiked);
    setHasDisliked(localDisliked);

    // Fetch and Initialize Counters
    const initCounters = async () => {
      try {
        // Increment view only once per session using sessionStorage
        const hasViewed = sessionStorage.getItem('portfolio_has_viewed');
        if (!hasViewed) {
          const viewRes = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_views/up`);
          const viewData = await viewRes.json();
          setViews(viewData.count || 0);
          sessionStorage.setItem('portfolio_has_viewed', 'true');
        } else {
          const viewRes = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_views/`);
          const viewData = await viewRes.json();
          setViews(viewData.count || 0);
        }

        const likesRes = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_likes/`);
        const likesData = await likesRes.json();
        setLikes(likesData.count || 0);

        const dislikesRes = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_dislikes/`);
        const dislikesData = await dislikesRes.json();
        setDislikes(dislikesData.count || 0);
      } catch (err) {
        console.error("Failed to load counters:", err);
      }
    };
    initCounters();
  }, []);

  // Cinematic GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".contact-char", {
      opacity: 0,
      y: 50,
      rotateY: 90,
      stagger: 0.04,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    // Info Column
    tl.from('.info-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.2)'
    }, "-=0.4");

    // Form Fields Entrance
    tl.from('.form-container input:not([type="checkbox"]), .form-container textarea', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4")
    .from('.contact-submit', {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.2");

    // Floating Parallax for Social Card
    gsap.to('.social-card', {
      y: -15,
      ease: 'sine.inOut',
      duration: 2.5,
      yoyo: true,
      repeat: -1,
    });
  }, { scope: containerRef });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submit
    
    // Honeypot check
    if (formData.botcheck) {
      toast.error("Spam detected.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message globally...');

    try {
      const payload = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!', {
          id: toastId,
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: false });
        
        // Reset form labels manually using GSAP
        if (formRef.current) {
          const inputs = formRef.current.querySelectorAll('input:not([name="botcheck"]), textarea');
          inputs.forEach(input => {
            const parent = input.parentElement;
            gsap.to(parent.querySelector('.focus-line'), { width: '0%', duration: 0.4, ease: "power2.in" });
            gsap.to(parent.querySelector('label'), { color: '#6b7280', y: 0, scale: 1, duration: 0.4, ease: "power2.in" });
          });
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Failed to send message.', {
        id: toastId,
        description: error.message || 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animate counter logic
  const animateCounter = (elementClass) => {
    gsap.fromTo(elementClass, 
      { y: -10, opacity: 0, scale: 1.5 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }
    );
  };

  const handleLike = async () => {
    gsap.fromTo('.like-btn', { scale: 1.1 }, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
    
    if (hasLiked) {
      // Remove Like
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.setItem('portfolio_has_liked', 'false');
      animateCounter('.likes-count');
      fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_likes/down`).catch(() => {});
    } else {
      // Add Like
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem('portfolio_has_liked', 'true');
      animateCounter('.likes-count');
      fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_likes/up`).catch(() => {});
      
      // If was disliked, remove dislike
      if (hasDisliked) {
        setDislikes(prev => prev - 1);
        setHasDisliked(false);
        localStorage.setItem('portfolio_has_disliked', 'false');
        animateCounter('.dislikes-count');
        fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_dislikes/down`).catch(() => {});
      }
    }
  };

  const handleDislike = async () => {
    gsap.fromTo('.dislike-btn', { scale: 1.1 }, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
    
    if (hasDisliked) {
      // Remove Dislike
      setDislikes(prev => prev - 1);
      setHasDisliked(false);
      localStorage.setItem('portfolio_has_disliked', 'false');
      animateCounter('.dislikes-count');
      fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_dislikes/down`).catch(() => {});
    } else {
      // Add Dislike
      setDislikes(prev => prev + 1);
      setHasDisliked(true);
      localStorage.setItem('portfolio_has_disliked', 'true');
      animateCounter('.dislikes-count');
      fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_dislikes/up`).catch(() => {});
      
      // If was liked, remove like
      if (hasLiked) {
        setLikes(prev => prev - 1);
        setHasLiked(false);
        localStorage.setItem('portfolio_has_liked', 'false');
        animateCounter('.likes-count');
        fetch(`https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/portfolio_likes/down`).catch(() => {});
      }
    }
  };

  const handleShare = async () => {
    gsap.fromTo('.share-btn svg', { rotate: -45, scale: 1.2 }, { rotate: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Adil Pribadi - Portfolio',
          text: 'Check out this awesome interactive portfolio!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const renderTitleChars = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="contact-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section id="contact" ref={containerRef} className="section min-h-screen py-24 px-8 md:px-[10%] bg-hu-bg-light relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-hu-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-hu-glow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="contact-header text-4xl md:text-6xl font-poppins font-bold text-center mb-20 text-white">
          {renderTitleChars("Get In ")}
          <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">
            {renderTitleChars("Touch")}
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info & Social Column */}
          <div className="info-col flex-1 space-y-10">
            <div className="info-item">
              <h3 className="text-3xl font-poppins font-bold text-hu-gold mb-6">Let's start a conversation</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Interested in working together or have a question about my technical background? I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <a href="https://wa.me/6285876894023" target="_blank" rel="noreferrer" className="info-item flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-hu-gold/30 hover:bg-white/10 transition-all duration-500 group shadow-lg hover:shadow-[0_0_30px_rgba(217,56,58,0.15)]">
                <div className="p-4 bg-hu-red/10 text-hu-glow rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <p className="text-lg font-bold text-white group-hover:text-hu-gold transition-colors">+62 858 7689 4023</p>
                </div>
              </a>

              <a href="mailto:awgrtopls5@gmail.com" className="info-item flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-hu-gold/30 hover:bg-white/10 transition-all duration-500 group shadow-lg hover:shadow-[0_0_30px_rgba(217,56,58,0.15)]">
                <div className="p-4 bg-hu-red/10 text-hu-glow rounded-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-bold text-white group-hover:text-hu-gold transition-colors">awgrtopls5@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Premium Social Interactions Card */}
            <div className="info-item social-card bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mt-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-hu-glow/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-sm text-hu-gold uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-hu-glow animate-pulse"></span>
                  Live Portfolio Stats
                </h4>
                <div className="flex items-center gap-2 text-gray-400 bg-black/20 px-3 py-1.5 rounded-full text-sm">
                  <Eye size={14} className="text-hu-glow" />
                  <span className="font-mono">{views}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`like-btn flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 font-medium ${hasLiked ? 'bg-hu-red/20 text-hu-glow border border-hu-red/50 shadow-[0_0_20px_rgba(217,56,58,0.2)]' : 'bg-black/20 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'}`}
                >
                  <ThumbsUp size={22} className={hasLiked ? "fill-hu-glow" : ""} />
                  <span className="text-xl font-bold font-mono likes-count inline-block">{likes}</span>
                </button>
                
                <button 
                  onClick={handleDislike}
                  className={`dislike-btn flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 font-medium ${hasDisliked ? 'bg-gray-800 text-gray-200 border border-gray-500 shadow-[0_0_20px_rgba(156,163,175,0.2)]' : 'bg-black/20 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'}`}
                >
                  <ThumbsDown size={22} className={hasDisliked ? "fill-gray-400" : ""} />
                  <span className="text-xl font-bold font-mono dislikes-count inline-block">{dislikes}</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="share-btn flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black/20 text-gray-400 border border-white/5 hover:bg-hu-gold/20 hover:text-hu-gold hover:border-hu-gold/30 transition-all duration-300 font-medium"
                >
                  <Share2 size={22} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="form-col flex-1 relative z-20">
            <div className="form-container relative bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] before:content-[''] before:absolute before:inset-0 before:border before:border-white/20 before:rounded-[2.5rem] before:pointer-events-none before:transition-opacity hover:before:opacity-100 before:opacity-0">
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Web3Forms Honeypot field */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  className="hidden" 
                  style={{ display: 'none' }}
                  checked={formData.botcheck}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                />

                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all"
                  />
                  <label className={`absolute left-0 top-4 pointer-events-none transition-all origin-left ${formData.name ? 'text-hu-red -translate-y-5 scale-[0.85]' : 'text-gray-500'}`}>Your Name</label>
                  <div className={`focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow transition-all ${formData.name ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all"
                  />
                  <label className={`absolute left-0 top-4 pointer-events-none transition-all origin-left ${formData.email ? 'text-hu-red -translate-y-5 scale-[0.85]' : 'text-gray-500'}`}>Email Address</label>
                  <div className={`focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow transition-all ${formData.email ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    value={formData.subject}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all"
                  />
                  <label className={`absolute left-0 top-4 pointer-events-none transition-all origin-left ${formData.subject ? 'text-hu-red -translate-y-5 scale-[0.85]' : 'text-gray-500'}`}>Subject</label>
                  <div className={`focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow transition-all ${formData.subject ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="relative">
                  <textarea 
                    required 
                    rows="4"
                    value={formData.message}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none transition-all resize-none"
                  ></textarea>
                  <label className={`absolute left-0 top-4 pointer-events-none transition-all origin-left ${formData.message ? 'text-hu-red -translate-y-5 scale-[0.85]' : 'text-gray-500'}`}>Your Message</label>
                  <div className={`focus-line absolute bottom-0 left-0 h-0.5 bg-hu-glow transition-all ${formData.message ? 'w-full' : 'w-0'}`} />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="contact-submit group relative w-full py-5 bg-gradient-to-r from-hu-red to-hu-glow text-white font-poppins font-bold rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(217,56,58,0.3)] transition-all hover:shadow-[0_0_40px_rgba(217,56,58,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-8 hover:-translate-y-1"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deploying Message...
                      </span>
                    ) : (
                      <>
                        <span className="tracking-widest uppercase">Send Transmission</span> 
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
                      </>
                    )}
                  </div>
                  {/* Button Glare Effect */}
                  <div className="absolute top-0 -left-[100%] h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
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