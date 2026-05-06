import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import img1 from '../../image/IMG_20260414_230412_668.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: img1, height: "h-64", alt: "1" },
    { id: 2, src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80", height: "h-96", alt: "Tech 2" },
    { id: 3, src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&q=80", height: "h-72", alt: "Linux Setup" },
    { id: 4, src: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=500&q=80", height: "h-80", alt: "Hardware" },
    { id: 5, src: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=500&q=80", height: "h-64", alt: "Network" },
    { id: 6, src: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=500&q=80", height: "h-96", alt: "Coding" }
  ];

  return (
    <section id="gallery" className="min-h-screen py-24 px-8 md:px-[10%] relative z-10">
      <motion.h2 
        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
        className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16"
      >
        My <span className="text-hu-glow drop-shadow-[0_0_15px_rgba(217,56,58,0.4)]">Gallery</span>
      </motion.h2>

      {/* Masonry Grid Simulation with Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            layoutId={`image-${img.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.1 }}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-[rgba(212,175,55,0.15)] ${img.height} break-inside-avoid shadow-lg`}
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,7,7,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-hu-gold font-poppins font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl"
          >
            <motion.button 
              className="absolute top-6 right-6 text-white hover:text-hu-glow bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors z-[10001]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              layoutId={`image-${selectedImage.id}`}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(217,56,58,0.3)] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
