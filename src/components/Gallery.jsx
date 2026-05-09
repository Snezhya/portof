import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, src: '/image/gallery/image-1.jpg', title: 'Command Center', category: 'Setup', cols: 'col-span-2 md:col-span-2 xl:col-span-2', rows: 'row-span-2' },
  { id: 2, src: '/image/gallery/image-2.jpg', title: 'Terminal Flow', category: 'Linux', cols: 'col-span-2 md:col-span-1 xl:col-span-1', rows: 'row-span-2' },
  { id: 3, src: '/image/gallery/image-3.jpg', title: 'Interface Design', category: 'UI Design', cols: 'col-span-2 md:col-span-2 xl:col-span-2', rows: 'row-span-1' },
  { id: 4, src: '/image/gallery/image-4.jpg', title: 'Network Grid', category: 'Networking', cols: 'col-span-2 md:col-span-1 xl:col-span-1', rows: 'row-span-2' },
  { id: 5, src: '/image/gallery/image-5.png', title: 'Server Suite', category: 'Server', cols: 'col-span-2 md:col-span-2 xl:col-span-2', rows: 'row-span-1' },
  { id: 6, src: '/image/gallery/image-6.png', title: 'Studio Angle', category: 'Photography', cols: 'col-span-2 md:col-span-1 xl:col-span-1', rows: 'row-span-2' },
  { id: 7, src: '/image/gallery/image-7.jpg', title: 'Minimal Setup', category: 'Setup', cols: 'col-span-2 md:col-span-1 xl:col-span-1', rows: 'row-span-1' },
  { id: 8, src: '/image/gallery/image-8.jpg', title: 'System Vision', category: 'Linux', cols: 'col-span-2 md:col-span-1 xl:col-span-1', rows: 'row-span-1' },
];

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const containerRef = useRef(null);
  const lightboxRef = useRef(null);
  const lightboxImgRef = useRef(null);

  useGSAP(() => {
    // Parallax effect for gallery images
    const images = gsap.utils.toArray('.gallery-img');
    images.forEach((img) => {
      gsap.to(img, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (selectedImageIndex !== null) {
      const tl = gsap.timeline();
      tl.fromTo(lightboxRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      ).fromTo(lightboxImgRef.current,
        { scale: 0.9, y: 20, filter: 'blur(10px)' },
        { scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }
  }, [selectedImageIndex]);

  const closeLightbox = () => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedImageIndex(null)
    });
    tl.to(lightboxImgRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(lightboxRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const handleNext = (e) => {
    e.stopPropagation();
    gsap.to(lightboxImgRef.current, {
      opacity: 0, x: -20, duration: 0.2, onComplete: () => {
        setSelectedImageIndex((prev) => (prev + 1) % galleryItems.length);
        gsap.fromTo(lightboxImgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 });
      }
    });
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    gsap.to(lightboxImgRef.current, {
      opacity: 0, x: 20, duration: 0.2, onComplete: () => {
        setSelectedImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
        gsap.fromTo(lightboxImgRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 });
      }
    });
  };

  return (
    <section ref={containerRef} id="gallery" className="section relative overflow-hidden py-24 px-6 sm:px-8 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white" data-animate data-gsap-type="reveal">
          Visual <span className="text-hu-glow drop-shadow-[0_0_20px_rgba(217,56,58,0.5)]">Gallery</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400" data-animate data-gsap-delay="0.2">
          A collection of system setups, network environments, and technical inspirations.
        </p>
      </div>

      <div className="relative mx-auto mt-20 grid gap-6 md:grid-cols-3 xl:grid-cols-6 max-w-7xl">
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            data-animate
            data-gsap-type="blur-in"
            data-gsap-delay={idx * 0.05}
            className={`${item.cols} ${item.rows} relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(10,5,5,0.9)] shadow-2xl group cursor-pointer h-[300px] md:h-auto`}
            onClick={() => setSelectedImageIndex(idx)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-10" />
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="gallery-img h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 scale-110"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="mb-3 w-fit rounded-full border border-hu-glow/30 bg-hu-red/20 px-4 py-1 text-[10px] uppercase tracking-widest text-hu-glow backdrop-blur-md">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-hu-gold transition-colors">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 bg-black/98 backdrop-blur-2xl"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-hu-glow bg-white/5 p-4 rounded-full backdrop-blur-xl transition-all z-[10001] border border-white/10"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button className="hidden md:flex absolute left-8 text-white hover:text-hu-gold p-6 bg-white/5 rounded-full backdrop-blur-xl transition-all z-[10001] border border-white/10" onClick={handlePrev}>
            <ChevronLeft size={48} />
          </button>

          <div className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(217,56,58,0.2)] border border-white/10">
            <img
              ref={lightboxImgRef}
              src={galleryItems[selectedImageIndex].src}
              alt={galleryItems[selectedImageIndex].title}
              className="h-full w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button className="hidden md:flex absolute right-8 text-white hover:text-hu-gold p-6 bg-white/5 rounded-full backdrop-blur-xl transition-all z-[10001] border border-white/10" onClick={handleNext}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
