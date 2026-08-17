'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Camera, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

const galleryCategories = [
  'All',
  'Site Execution',
  'Calibration & Bench Work',
  'Safety & Team Drills',
  'Substation & Controls'
];

const galleryImages = [
  {
    id: 1,
    title: 'Site Execution & Field Instrumentation',
    category: 'Site Execution',
    src: '/about-us/1.jpeg',
    desc: 'Refinery expansion field instrument mounting, junction box terminations, and cable tray routing.'
  },
  {
    id: 2,
    title: 'Control Room & Automation Testing',
    category: 'Substation & Controls',
    src: '/about-us/2.jpeg',
    desc: 'DCS marshalling panel logic checks and signal loop verification.'
  },
  {
    id: 3,
    title: 'Field Installation & Mounting',
    category: 'Site Execution',
    src: '/about-us/3.jpeg',
    desc: 'Heavy industrial cable lay, sensor mounting, and structural supports.'
  },
  {
    id: 4,
    title: 'Thermal Power Plant Loop Check',
    category: 'Site Execution',
    src: '/about-us/4.jpeg',
    desc: 'Boiler C&I loop check and high-pressure steam transmitter setup.'
  },
  {
    id: 5,
    title: 'Calibration Bench & Tool Testing',
    category: 'Calibration & Bench Work',
    src: '/about-us/5.jpeg',
    desc: 'Pre-deployment bench calibration using master calibrators and HART communicators.'
  },
  {
    id: 6,
    title: 'On-Site Team Safety Induction',
    category: 'Safety & Team Drills',
    src: '/about-us/6.jpeg',
    desc: 'Mandatory daily HSE toolbox meeting and permit-to-work compliance drill.'
  },
  {
    id: 7,
    title: 'Blast Furnace & Steel Mill Instrumentation',
    category: 'Site Execution',
    src: '/about-us/7.jpeg',
    desc: 'Extreme temperature thermocouple wiring and heavy industrial control panels.'
  },
  {
    id: 8,
    title: 'Pressure & Flow Valve Bench Audit',
    category: 'Calibration & Bench Work',
    src: '/about-us/8.jpeg',
    desc: 'Precision pressure testing and control valve positioner zero/span alignment.'
  },
  {
    id: 9,
    title: 'Substation Control & Wiring Audit',
    category: 'Substation & Controls',
    src: '/about-us/9.jpeg',
    desc: 'Substation switchgear control cabling, relay testing, and telemetry verification.'
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
  };

  const handleNextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages]);

  return (
    <div className="flex flex-col min-h-screen bg-offwhite">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative bg-navy text-white min-h-[40vh] flex items-center overflow-hidden pt-28 pb-12 border-b border-steel/10">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-65" 
            style={{ backgroundImage: "url('/infrastructure-hero-bg.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50 z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-4">
              <span className="font-mono text-xs sm:text-sm text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                PROJECT VISUAL ARCHIVE
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Project Execution & Site Gallery
              </h1>

              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                Explore real field installations, calibration bench setups, safety induction drills, and turnkey project execution across industrial sites in India.
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                    selectedCategory === cat 
                      ? 'bg-orange text-white border-orange shadow-md shadow-orange/20' 
                      : 'bg-white text-navy/80 hover:bg-navy/5 border-steel/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleOpenLightbox(index)}
                    className="group relative bg-white border border-steel/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="h-72 w-full relative overflow-hidden bg-navy/10">
                      <img 
                        src={img.src} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Dark Overlay with Zoom Icon on Hover */}
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-orange/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

      </main>

      {/* FULLSCREEN LIGHTBOX MODAL WITH PREVIOUS, NEXT & CLOSE BUTTONS */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-navy/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={handleCloseLightbox}
          >
            {/* Close (Cut) Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer group"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-3 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-3 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer group"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Main Modal Content Box - Pure Full Image Container */}
            <div 
              className="relative max-w-6xl w-full h-full max-h-[88vh] flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredImages[activeImageIndex].src} 
                alt="" 
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-steel/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
