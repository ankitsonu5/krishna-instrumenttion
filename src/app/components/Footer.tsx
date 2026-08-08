'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-steel/10 text-steel relative overflow-hidden">
      {/* Design Line Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="max-w-7xl mx-auto h-full w-full relative">
          <div className="h-full w-px bg-white left-1/4 absolute" />
          <div className="h-full w-px bg-white left-2/4 absolute" />
          <div className="h-full w-px bg-white left-3/4 absolute" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand and Description */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/kiw-logo.png"
                alt="KIW Logo"
                className="h-10 w-auto object-contain"
                style={{width: 220, height: 120}}
              />
            </div>

            {/* <h3 className="font-heading text-xl font-bold text-white leading-tight mt-2">
              Built for Accuracy.<br />Committed to Industry.
            </h3> */}

            <p className="text-sm text-steel/80 font-sans leading-relaxed">
              Krishna Instrumentation Works delivers premium instrumentation, electrical, automation, testing, commissioning, calibration, maintenance, and industrial project execution services across India.
            </p>

            <div>
              <Link
                href="/contact?rfq=true"
                className="inline-flex items-center gap-2 bg-orange text-white px-5 py-3 rounded text-sm font-semibold hover:bg-orange/90 transition-all shadow-md shadow-orange/10 group"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white border-b border-steel/10 pb-2">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">Projects & References</Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white transition-colors">Clients & Partnerships</Link>
              </li>
              <li>
                <Link href="/infrastructure" className="hover:text-white transition-colors">Infrastructure & Resources</Link>
              </li>
              <li>
                <Link href="/quality-safety" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-safety-green" />
                  <span>Quality & Safety</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white border-b border-steel/10 pb-2">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              <li>
                <Link href="/services#instrumentation" className="hover:text-white transition-colors">Instrumentation Installation</Link>
              </li>
              <li>
                <Link href="/services#electrical" className="hover:text-white transition-colors">Electrical Systems</Link>
              </li>
              <li>
                <Link href="/services#automation" className="hover:text-white transition-colors">Automation & SCADA</Link>
              </li>
              <li>
                <Link href="/services#testing" className="hover:text-white transition-colors">Testing & Commissioning</Link>
              </li>
              <li>
                <Link href="/services#calibration" className="hover:text-white transition-colors">Calibration Services</Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="hover:text-white transition-colors">Annual Maintenance Contracts</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Office Addresses */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white border-b border-steel/10 pb-2">
              Contact & Offices
            </h4>
            <div className="flex flex-col gap-4 text-sm font-sans">
              
              {/* Office 1 */}
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-white text-xs">Registered Office:</h5>
                  <p className="text-xs text-steel/80 mt-0.5">
                  5B, Saraswati Vihar Colony, Panipat, HR, 132103
                  </p>
                </div>
              </div>

              {/* Office 2 */}
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-white text-xs">Regional Office (Gujarat):</h5>
                  <p className="text-xs text-steel/80 mt-0.5">
                  10A – Narottampur– Dafi– Lanka - Varanasi - 221011
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="border-t border-steel/10 pt-3 flex flex-col gap-2">
                <a href="tel:+912212345678" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
                  <Phone className="w-4 h-4 text-orange" />
                  <span>+91 8279672089 / +91 9451147479</span>
                </a>
                <a href="mailto:akhileshwar_66@yahoo.co.in" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
                  <Mail className="w-4 h-4 text-orange" />
                  <span>akhileshwar_66@yahoo.co.in</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-steel/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-steel/60">
            &copy; {currentYear} Krishna Instrumentation Works. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
