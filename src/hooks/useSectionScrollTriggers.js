import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useSectionScrollTriggers = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      // Desktop
      isDesktop: "(min-width: 1024px)",
      // Mobile/Tablet
      isMobile: "(max-width: 1023px)",
      // High Performance
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      let { isDesktop, reduceMotion } = context.conditions;

      if (reduceMotion) return;

      const sections = gsap.utils.toArray('.section');
      
      sections.forEach((section) => {
        const targets = section.querySelectorAll('[data-animate]');
        if (!targets.length) return;

        targets.forEach((el) => {
          const type = el.dataset.gsapType || 'fade-up';
          const delay = parseFloat(el.dataset.gsapDelay) || 0;
          const duration = parseFloat(el.dataset.gsapDuration) || 1.2;

          let fromVars = { opacity: 0 };
          let toVars = { 
            opacity: 1, 
            duration, 
            ease: "power4.out", 
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          };

          switch (type) {
            case 'reveal':
              fromVars = { ...fromVars, clipPath: 'inset(100% 0 0 0)' };
              toVars = { ...toVars, clipPath: 'inset(0% 0 0 0)' };
              break;
            case 'scale-up':
              fromVars = { ...fromVars, scale: 0.8, y: 40 };
              toVars = { ...toVars, scale: 1, y: 0 };
              break;
            case 'blur-in':
              fromVars = { ...fromVars, filter: 'blur(10px)', y: 30 };
              toVars = { ...toVars, filter: 'blur(0px)', y: 0 };
              break;
            case 'slide-left':
              fromVars = { ...fromVars, x: -50 };
              toVars = { ...toVars, x: 0 };
              break;
            case 'slide-right':
              fromVars = { ...fromVars, x: 50 };
              toVars = { ...toVars, x: 0 };
              break;
            default: // fade-up
              fromVars = { ...fromVars, y: 50 };
              toVars = { ...toVars, y: 0 };
          }

          // Mobile adjustments: simplify animations
          if (!isDesktop) {
            toVars.duration *= 0.8;
            if (type === 'reveal') {
              // Revert to simple fade-up on mobile if clip-path is too heavy
              fromVars = { opacity: 0, y: 30 };
              toVars = { ...toVars, y: 0, clipPath: 'none' };
            }
          }

          gsap.fromTo(el, fromVars, toVars);
        });
      });
    });

    return () => mm.revert();
  });
};
