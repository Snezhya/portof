import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useGSAP(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Hover effect for cursor scaling
    const handleHover = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.magnetic-btn')) {
        gsap.to(dotRef.current, { scale: 3, opacity: 0.5, duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 1.5, borderColor: '#d9383a', backgroundColor: 'rgba(217, 56, 58, 0.1)', duration: 0.3 });
      } else {
        gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 1, borderColor: '#d9383a', backgroundColor: 'transparent', duration: 0.3 });
      }
    };

    // Magnetic Buttons - Event Delegation
    const handleMouseOver = (e) => {
      handleHover(e);
      const btn = e.target.closest('.magnetic-btn');
      if (btn) {
        if (!btn._isMagnetic) {
          btn._isMagnetic = true;
          const onMove = (moveEvent) => {
            const rect = btn.getBoundingClientRect();
            const relX = moveEvent.clientX - rect.left - rect.width / 2;
            const relY = moveEvent.clientY - rect.top  - rect.height / 2;
            gsap.to(btn, { x: relX * 0.4, y: relY * 0.4, duration: 0.3, ease: "power2.out" });
          };
          const onLeave = () => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
            btn._isMagnetic = false;
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            
            // reset cursor scale
            gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, borderColor: '#d9383a', backgroundColor: 'transparent', duration: 0.3 });
          };
          btn.addEventListener('mousemove', onMove);
          btn.addEventListener('mouseleave', onLeave);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', (e) => {
      if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.magnetic-btn')) {
         handleHover(e);
      }
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={cursorRef} className="cursor" />
    </>
  );
};

export default CustomCursor;
