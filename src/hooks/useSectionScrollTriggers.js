import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTION_SELECTOR = '.section';
const CHILD_SELECTOR = '[data-animate], .section-child';

export const useSectionScrollTriggers = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray(SECTION_SELECTOR);
    if (sections.length === 0) return;

    sections.forEach((section) => {
      const targets = section.querySelectorAll(CHILD_SELECTOR);
      if (!targets.length) return;

      gsap.set(targets, {
        opacity: 0,
        y: 80,
        willChange: 'transform, opacity',
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
          markers: false,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
