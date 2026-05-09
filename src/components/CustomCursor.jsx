import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dotSetterX = gsap.quickSetter(dotRef.current, "x", "px");
    const dotSetterY = gsap.quickSetter(dotRef.current, "y", "px");
    const ringSetterX = gsap.quickSetter(ringRef.current, "x", "px");
    const ringSetterY = gsap.quickSetter(ringRef.current, "y", "px");

    const moveCursor = (e) => {
      dotSetterX(e.clientX);
      dotSetterY(e.clientY);
      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHover = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        gsap.to(dotRef.current, { scale: 3, opacity: 0.5, duration: 0.3 });
        gsap.to(ringRef.current, { scale: 1.5, borderColor: '#d9383a', backgroundColor: 'rgba(217, 56, 58, 0.1)', duration: 0.3 });
      } else {
        gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(ringRef.current, { scale: 1, borderColor: '#d4af37', backgroundColor: 'transparent', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-hu-glow rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#d9383a] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-hu-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;
