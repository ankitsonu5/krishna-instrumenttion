'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Download, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const companyDropdown = [
  { name: 'About Us', href: '/about-us' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Quality & Safety', href: '/quality-safety' },
  { name: 'Careers', href: '/careers' },
];

const experienceDropdown = [
  { name: 'Projects', href: '/projects' },
  { name: 'Clients', href: '/clients' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                  width={200}
                  height={120}
                  className="h-14 sm:h-20 lg:h-24 xl:h-24 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              
              {/* Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Company</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180 text-orange' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-52 bg-navy/98 backdrop-blur-xl border border-steel/20 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      {companyDropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="font-sans text-sm text-steel hover:text-white hover:bg-orange/15 px-4 py-2.5 block transition-colors border-l-2 border-transparent hover:border-orange"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services */}
              <Link
                href="/services"
                className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Services
              </Link>

              {/* Industries */}
              <Link
                href="/industries"
                className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Industries
              </Link>

              {/* Experience Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('experience')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Experience</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'experience' ? 'rotate-180 text-orange' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'experience' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-48 bg-navy/98 backdrop-blur-xl border border-steel/20 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      {experienceDropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="font-sans text-sm text-steel hover:text-white hover:bg-orange/15 px-4 py-2.5 block transition-colors border-l-2 border-transparent hover:border-orange"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className="font-sans text-sm font-medium text-steel hover:text-white px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Contact
              </Link>

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
            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-3 max-w-md mx-auto w-full relative z-10">
              
              {/* Mobile Company Accordion */}
              <div className="border-b border-steel/10 pb-2">
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="font-heading text-xl font-bold text-steel hover:text-white w-full py-2 flex items-center justify-between"
                >
                  <span>Company</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileCompanyOpen ? 'rotate-180 text-orange' : ''}`} />
                </button>
                {mobileCompanyOpen && (
                  <div className="pl-4 flex flex-col gap-2.5 mt-1 border-l border-orange/40 ml-2 py-1">
                    {companyDropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-sans text-base text-steel hover:text-white py-1 block"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-xl font-bold text-steel hover:text-white py-2 transition-colors border-b border-steel/10"
              >
                Services
              </Link>

              {/* Industries */}
              <Link
                href="/industries"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-xl font-bold text-steel hover:text-white py-2 transition-colors border-b border-steel/10"
              >
                Industries
              </Link>

              {/* Mobile Experience Accordion */}
              <div className="border-b border-steel/10 pb-2">
                <button
                  onClick={() => setMobileExpOpen(!mobileExpOpen)}
                  className="font-heading text-xl font-bold text-steel hover:text-white w-full py-2 flex items-center justify-between"
                >
                  <span>Experience</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpOpen ? 'rotate-180 text-orange' : ''}`} />
                </button>
                {mobileExpOpen && (
                  <div className="pl-4 flex flex-col gap-2.5 mt-1 border-l border-orange/40 ml-2 py-1">
                    {experienceDropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-sans text-base text-steel hover:text-white py-1 block"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-xl font-bold text-steel hover:text-white py-2 transition-colors border-b border-steel/10"
              >
                Contact
              </Link>

            </nav>

            {/* Mobile CTA */}
            <div className="max-w-md mx-auto w-full flex flex-col gap-4 mt-8 relative z-10">
              <Link
                href="/contact?rfq=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-sm font-semibold bg-orange text-white text-center py-3.5 rounded hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}