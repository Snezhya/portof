import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingScreen = ({ onComplete }) => {
  const screenRef = useRef(null);
  const loaderRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Entrance
    tl.fromTo(loaderRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3"
    );

    // Pulse Animation
    gsap.to(loaderRef.current, {
      scale: 1.1,
      opacity: 0.7,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Exit
    const timer = setTimeout(() => {
      const exitTl = gsap.timeline({
        onComplete: onComplete
      });
      
      exitTl.to(screenRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, { dependencies: [onComplete], scope: screenRef });

  return (
    <div 
      ref={screenRef}
      className="fixed inset-0 z-[9999] bg-hu-bg flex flex-col items-center justify-center"
    >
      <div 
        ref={loaderRef}
        className="w-24 h-24 rounded-full border-4 border-hu-red border-t-hu-gold animate-spin shadow-[0_0_30px_rgba(217,56,58,0.5)]"
      ></div>
      <h1 
        ref={titleRef}
        className="mt-8 text-3xl font-poppins font-bold tracking-widest text-hu-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
      >
        ADIL<span className="text-hu-glow">.</span>
      </h1>
      <p
        ref={textRef}
        className="text-gray-400 mt-2 font-fira tracking-widest text-sm uppercase"
      >
        Entering Portfolio...
      </p>
    </div>
  );
};

export default LoadingScreen;
