import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80", height: "h-64", alt: "Server Configuration" },
    { id: 2, src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", height: "h-96", alt: "Network Cabling" },
    { id: 3, src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80", height: "h-72", alt: "Linux Terminal Setup" },
    { id: 4, src: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&q=80", height: "h-80", alt: "Hardware Building" },
    { id: 5, src: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&q=80", height: "h-64", alt: "Data Center" },
    { id: 6, src: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&q=80", height: "h-96", alt: "Code Editor" }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(galleryRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    } else if (swipe > 50) {
      setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (Math.abs(offset.y) > 100) {
      setSelectedImageIndex(null); // Swipe up/down to close
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="min-h-screen py-24 px-8 md:px-[10%] relative z-10">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-white">
        My <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Gallery</span>
      </h2>

      {/* Masonry Grid Simulation with Columns */}
      <div ref={galleryRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-[rgba(212,175,55,0.15)] ${img.height} break-inside-avoid shadow-lg bg-[rgba(20,10,10,0.5)]`}
            onClick={() => setSelectedImageIndex(idx)}
          >
            {/* Lazy Load standard via loading attribute */}
            <img 
              src={img.src} 
              alt={img.alt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,7,7,0.9)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-hu-gold font-poppins font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-hu-glow bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors z-[10001]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
            >
              <X size={32} />
            </button>

            {/* Desktop Navigation */}
            <button className="hidden md:block absolute left-8 text-white hover:text-hu-gold p-4 transition-colors z-[10001]" onClick={handlePrev}>
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
            >
              <motion.img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(217,56,58,0.3)] object-contain select-none"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <button className="hidden md:block absolute right-8 text-white hover:text-hu-gold p-4 transition-colors z-[10001]" onClick={handleNext}>
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
