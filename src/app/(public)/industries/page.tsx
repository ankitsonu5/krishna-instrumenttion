'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Factory, 
  Compass, 
  Settings, 
  Building2, 
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const industries = [
  {
    title: 'Thermal Power',
    slug: 'thermal-power',
    icon: Flame,
    desc: 'Instrumentation, electrical, automation, testing, commissioning and maintenance support for power generation facilities.',
    challenge: 'High steam temperature, pressure fluctuations, and compliance with grid guidelines.'
  },
  {
    title: 'Steel Plants',
    slug: 'steel-plants',
    icon: Factory,
    desc: 'Multi-discipline execution support for complex steel manufacturing environments.',
    challenge: 'Continuous high heat, heavy dust loads, and complex automation sequences.'
  },
  {
    title: 'Oil & Gas',
    slug: 'oil-gas',
    icon: Compass,
    desc: 'Safety-focused instrumentation, control, electrical and commissioning support.',
    challenge: 'Hazardous environments, explosive atmospheres, and strict safety loops.'
  },
  {
    title: 'Process Industry',
    slug: 'process-industry',
    icon: Settings,
    desc: 'Control, measurement, automation and maintenance support for process operations.',
    challenge: 'Batch control consistency, precision chemical flow, and calibration alignment.'
  },
  {
    title: 'Cement',
    slug: 'cement',
    icon: Building2,
    desc: 'Engineering execution and technical support for cement plant systems.',
    challenge: 'Extreme vibration, abrasive dust, and kiln rotation alignment tracking.'
  },
  {
    title: 'Sugar',
    slug: 'sugar',
    icon: Activity,
    desc: 'Instrumentation, electrical, automation and maintenance support for sugar facilities.',
    challenge: 'High moisture, seasonal operations pressure, and speed controls.'
  }
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative bg-navy text-white min-h-[45vh] flex items-center overflow-hidden pt-28 pb-12 border-b border-steel/10">
          
          {/* Industrial Background Image with overlay */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-65" 
            style={{
              backgroundImage: "url('/industries-hero-bg.png')"
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50 z-0" />

          {/* Grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px), linear-gradient(to right, rgba(215,224,232,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(215,224,232,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px, 48px 48px, 48px 48px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-5">
              <span className="font-mono text-xs sm:text-sm text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                OUR INDUSTRIES
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Sectors & Industries We Serve
              </h1>

              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                KIW supports India&apos;s core sectors with reliable execution, field installations, and calibration services tailored for high-hazard and high-precision zones.
              </p>
            </div>
          </div>
        </section>

        {/* INDUSTRIES GRID WITH 3D FLIP CARDS */}
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind, i) => {
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    className="group [perspective:1000px] h-[400px]"
                  >
                    {/* Entire Card wrapped in Link for 100% reliable navigation */}
                    <Link href={`/industries/${ind.slug}`} className="block w-full h-full">
                      {/* 3D Inner Card Container */}
                      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md group-hover:shadow-2xl">
                        
                        {/* FRONT OF CARD */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] border border-steel/20 bg-navy flex flex-col justify-end p-8">
                          {/* Background Image */}
                          <img 
                            src={`/industries/${ind.slug}.png`} 
                            alt={ind.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Subtle Dark Overlay for Text Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />

                          {/* Front Content */}
                          <div className="relative z-10 flex flex-col gap-2">
                            <span className="font-mono text-[10px] uppercase font-bold text-orange tracking-widest">
                              INDUSTRY SECTOR
                            </span>
                            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                              {ind.title}
                            </h2>
                            <div className="flex items-center gap-2 text-steel/80 text-xs font-mono mt-1">
                              <span>Hover to Flip & Details</span>
                              <ArrowRight className="w-3.5 h-3.5 text-orange" />
                            </div>
                          </div>
                        </div>

                        {/* BACK OF CARD (Flipped State) */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl p-8 bg-white border border-steel/30 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between shadow-2xl">
                          <div>
                            {/* Logo Image & Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="bg-white border border-steel/20 shadow-sm p-2 rounded inline-block">
                                <img 
                                  src={`/industries/${ind.slug}-logo.png`} 
                                  alt={`${ind.title} logo`} 
                                  className="w-9 h-9 object-contain"
                                />
                              </div>
                              <span className="font-mono text-[10px] uppercase font-bold text-orange bg-orange/10 px-2.5 py-1 rounded">
                                Overview
                              </span>
                            </div>

                            {/* Heading */}
                            <h2 className="font-heading text-xl font-bold text-navy mb-2">
                              {ind.title}
                            </h2>
                            <p className="font-sans text-xs sm:text-sm text-graphite/75 mb-4 leading-relaxed">
                              {ind.desc}
                            </p>

                            {/* Technical Challenge */}
                            <div className="bg-offwhite border-l-2 border-orange p-3 rounded-r">
                              <h4 className="font-mono text-[10px] font-bold text-navy uppercase tracking-wider mb-1">
                                Key Sector Challenge:
                              </h4>
                              <p className="font-sans text-xs text-graphite/80 leading-relaxed">
                                {ind.challenge}
                              </p>
                            </div>
                          </div>

                          {/* Action Link */}
                          <div className="pt-4 border-t border-steel/10">
                            <div className="font-sans text-sm font-semibold text-navy group-hover:text-orange flex items-center justify-between transition-colors group/link p-2 rounded hover:bg-orange/5">
                              <span>View Execution Approach</span>
                              <ArrowRight className="w-4 h-4 text-orange group-hover/link:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy text-white py-16 border-t border-steel/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-2xl">
              Partnering for Long-Term Industrial Stability
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/85 max-w-2xl">
              We coordinate site operations, documentation, and safety clearances directly with your main consultants and project supervisors.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 inline-block border border-orange/10 hover:border-orange/20"
              >
                Start a Technical Discussion
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
