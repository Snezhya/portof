import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook untuk menghandle GSAP ScrollTrigger animations pada elemen
 * Animasi akan di-replay ketika scroll kembali ke atas
 * @param {React.RefObject} ref - Ref ke section element
 * @param {Object} options - Konfigurasi animasi
 */
export const useScrollAnimation = (ref, options = {}) => {
  const {
    selector = '[data-animate]', // Selector untuk elemen yang akan dianimasi
    fromVars = { opacity: 0, y: 80 }, // state awal
    toVars = { opacity: 1, y: 0 }, // state akhir
    duration = 1,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 80%',
    toggleActions = 'play reverse play reverse', // play ketika masuk, reverse ketika keluar
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Ambil semua elemen yang akan dianimasi
    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Buat timeline untuk setiap elemen secara individual
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        fromVars,
        {
          ...toVars,
          duration,
          ease,
          delay: index * stagger,
          scrollTrigger: {
            trigger: el,
            start,
            end: 'bottom top',
            toggleActions,
            markers: false, // Set true untuk debugging
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      // Cleanup ScrollTrigger ketika component unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

/**
 * Hook untuk menghandle section header animation
 */
export const useSectionHeaderAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

/**
 * Hook untuk menghandle multiple element animations dengan stagger
 */
export const useStaggerAnimation = (ref, elements, options = {}) => {
  const {
    fromVars = { opacity: 0, y: 80 },
    toVars = { opacity: 1, y: 0 },
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 80%',
    toggleActions = 'play reverse play reverse',
  } = options;

  useEffect(() => {
    if (!ref.current || !elements || elements.length === 0) return;

    gsap.fromTo(
      elements,
      fromVars,
      {
        ...toVars,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [elements, duration, stagger]);
};
