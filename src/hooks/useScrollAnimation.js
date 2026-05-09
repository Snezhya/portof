import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for smooth scroll-driven parallax effects
 */
export const useParallax = (ref, speed = 1) => {
  useGSAP(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      gsap.to(ref.current, {
        y: () => -ScrollTrigger.maxScroll(window) * (speed * 0.1),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => mm.revert();
  }, { dependencies: [speed], scope: ref });
};

/**
 * Hook for text reveal animations (split-text style)
 */
export const useTextReveal = (ref, options = {}) => {
  const {
    type = 'chars',
    stagger = 0.02,
    duration = 1,
    delay = 0
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    // Only split text once
    if (!ref.current.querySelector('.reveal-item')) {
      const text = ref.current.innerText;
      ref.current.innerHTML = text.split('').map(char => 
        `<span class="inline-block overflow-hidden"><span class="reveal-item inline-block">${char === ' ' ? '&nbsp;' : char}</span></span>`
      ).join('');
    }

    const items = ref.current.querySelectorAll('.reveal-item');
    
    gsap.fromTo(items, 
      { y: '100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration, 
        stagger, 
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: ref });
};

/**
 * Hook for staggered grid/list animations
 */
export const useStaggerAnimation = (ref, selector, options = {}) => {
  const {
    stagger = 0.1,
    duration = 0.8,
    y = 50,
    opacity = 0
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (!elements.length) return;
    
    gsap.fromTo(elements,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { dependencies: [selector], scope: ref });
};
