import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    src: '/image/gallery/image-1.jpg',
    title: 'Command Center',
    category: 'Setup',
    cols: 'col-span-2 md:col-span-2 xl:col-span-2',
    rows: 'row-span-2',
    parallax: true,
  },
  {
    id: 2,
    src: '/image/gallery/image-2.jpg',
    title: 'Terminal Flow',
    category: 'Linux',
    cols: 'col-span-2 md:col-span-1 xl:col-span-1',
    rows: 'row-span-2',
    parallax: true,
  },
  {
    id: 3,
    src: '/image/gallery/image-3.jpg',
    title: 'Interface Design',
    category: 'UI Design',
    cols: 'col-span-2 md:col-span-2 xl:col-span-2',
    rows: 'row-span-1',
  },
  {
    id: 4,
    src: '/image/gallery/image-4.jpg',
    title: 'Network Grid',
    category: 'Networking',
    cols: 'col-span-2 md:col-span-1 xl:col-span-1',
    rows: 'row-span-2',
    parallax: true,
  },
  {
    id: 5,
    src: '/image/gallery/image-5.png',
    title: 'Server Suite',
    category: 'Server',
    cols: 'col-span-2 md:col-span-2 xl:col-span-2',
    rows: 'row-span-1',
  },
  {
    id: 6,
    src: '/image/gallery/image-6.png',
    title: 'Studio Angle',
    category: 'Photography',
    cols: 'col-span-2 md:col-span-1 xl:col-span-1',
    rows: 'row-span-2',
  },
  {
    id: 7,
    src: '/image/gallery/image-7.jpg',
    title: 'Minimal Setup',
    category: 'Setup',
    cols: 'col-span-2 md:col-span-1 xl:col-span-1',
    rows: 'row-span-1',
  },
  {
    id: 8,
    src: '/image/gallery/image-8.jpg',
    title: 'System Vision',
    category: 'Linux',
    cols: 'col-span-2 md:col-span-1 xl:col-span-1',
    rows: 'row-span-1',
  },
];

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.gallery-parallax');
    cards.forEach((card) => {
      gsap.to(card, {
        y: '12%',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev + 1) % galleryItems.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    }
  };

  const handleDragEnd = (e, { offset }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      setSelectedImageIndex((prev) => (prev + 1) % galleryItems.length);
    } else if (swipe > 50) {
      setSelectedImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    } else if (Math.abs(offset.y) > 100) {
      setSelectedImageIndex(null);
    }
  };

  return (
    <section id="gallery" className="section relative overflow-hidden py-24 px-6 sm:px-8 lg:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-0 top-1/4 h-44 w-44 rounded-full bg-[#d32d2d]/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-56 w-56 rounded-full bg-[#ff3a4e]/20 blur-3xl" />
        <div className="absolute left-1/2 top-3/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8b1010]/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="mb-12 inline-flex items-center justify-center rounded-full bg-black/60 px-5 py-2 text-sm uppercase tracking-[0.35em] text-red-300 ring-1 ring-red-500/20 shadow-[0_0_40px_rgba(217,56,58,0.12)]">
          GALLERY
        </div>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl" data-animate>
          Gallery
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
          {/* A premium visual study of environment, network systems, and creative interface concepts. */}
        </p>
      </div>

      <div className="relative mx-auto mt-16 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            data-animate
            className={`${item.cols} ${item.rows} relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(10,5,5,0.9)] shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-2 max-h-[500px] group cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImageIndex(idx)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.parallax ? 'gallery-parallax' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <span className="mb-2 inline-flex rounded-full border border-red-500/20 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.35em] text-red-200 backdrop-blur-sm">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            </div>
          </motion.div>
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
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-hu-glow bg-black/50 p-3 rounded-full backdrop-blur-md transition-colors z-[10001]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
            >
              <X size={32} />
            </button>

            <button className="hidden md:block absolute left-8 text-white hover:text-hu-gold p-4 transition-colors z-[10001]" onClick={handlePrev}>
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-[2rem] shadow-[0_0_120px_rgba(217,56,58,0.18)]"
            >
              <motion.img
                src={galleryItems[selectedImageIndex].src}
                alt={galleryItems[selectedImageIndex].title}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="h-full w-full object-cover"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>

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
