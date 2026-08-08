'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Download, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  // { name: 'Home', href: '/' },
  { name: 'About', href: '/about-us' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Projects', href: '/projects' },
  { name: 'Clients', href: '/clients' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Quality & Safety', href: '/quality-safety' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check in case page is refreshed while scrolled down
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md border-b border-steel/10 shadow-lg py-3'
            : 'bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/kiw-logo.png"
                  alt="KIW Logo"
                  width={150}
                  height={100}
                  className="h-12 sm:h-16 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact?rfq=true"
                className="font-sans text-sm font-semibold bg-orange text-white px-5 py-2.5 rounded hover:bg-orange/90 transition-all duration-300 shadow-md shadow-orange/20 flex items-center gap-2 group border border-orange/10 hover:border-orange/20 whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center gap-4">
              <Link
                href="/contact?rfq=true"
                className="xl:hidden font-sans text-xs font-semibold bg-orange text-white px-3 py-2 rounded hover:bg-orange/90 transition-colors shadow-sm"
              >
                RFQ
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-steel hover:text-white p-2 rounded-md focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Full-screen Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-navy/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-10 px-6 overflow-y-auto"
          >
            {/* Design Grid Line Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="h-full w-px bg-white left-1/4 absolute" />
              <div className="h-full w-px bg-white left-2/4 absolute" />
              <div className="h-full w-px bg-white left-3/4 absolute" />
              <div className="w-full h-px bg-white top-1/3 absolute" />
              <div className="w-full h-px bg-white top-2/3 absolute" />
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-4 max-w-md mx-auto w-full relative z-10">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading text-2xl font-bold text-steel hover:text-white block py-2 transition-colors border-b border-steel/10"
                  >
                    <span className="text-xs font-mono text-orange mr-3">0{index + 1}.</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA and Footer info */}
            <div className="max-w-md mx-auto w-full flex flex-col gap-6 mt-8 relative z-10">
              <div className="flex flex-col gap-4">
                <a
                  href="/documents/company-profile.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm font-medium text-steel hover:text-white flex items-center justify-center gap-2 py-3 border border-steel/20 rounded hover:bg-white/5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Company Profile</span>
                </a>
                <Link
                  href="/contact?rfq=true"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm font-semibold bg-orange text-white text-center py-4 rounded hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20"
                >
                  Request a Quote
                </Link>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-mono text-steel/40 uppercase tracking-widest">
                  Krishna Instrumentation Works
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}