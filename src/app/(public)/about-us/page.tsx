'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Compass, 
  Target, 
  ShieldAlert, 
  Award, 
  HeartHandshake, 
  Briefcase, 
  Leaf, 
  CheckCircle2, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const coreValues = [
  {
    title: 'Integrity',
    desc: 'Honest communication and responsible execution in every project phase.',
    icon: Compass,
  },
  {
    title: 'Safety',
    desc: 'Safe planning and safe execution treated as absolute, non-negotiable requirements.',
    icon: ShieldAlert,
  },
  {
    title: 'Quality',
    desc: 'Technical accuracy, superior workmanship, and dependable industrial outcomes.',
    icon: Award,
  },
  {
    title: 'Commitment',
    desc: 'Complete ownership of operational responsibilities, deadlines, and client expectations.',
    icon: HeartHandshake,
  },
  {
    title: 'Sustainability',
    desc: 'Dedicated support for highly efficient and environmentally responsible industrial operations.',
    icon: Leaf,
  }
];

const strengths = [
  'Experienced engineers managing complex systems',
  'Dedicated site supervisors ensuring coordination',
  'Skilled and certified technicians for field execution',
  'Independent QA/QC team verifying all parameters',
  'Certified safety officers implementing strict HSE standards',
  'Responsive support staff for seamless logistical coordination'
];

const trusts = [
  'Deep technical expertise in high-hazard zones',
  'Consistently reliable and disciplined execution',
  'Transparent, technical client communication',
  'Absolute compliance with national & international standards',
  'Focus on establishing long-term, supportive client relationships',
  'Culture of continuous improvement and engineering refinement'
];

export default function AboutUsPage() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform left card (starts centered at x: 50% or offset, then moves left to 0%)
  const leftCardX = useTransform(scrollYProgress, [0, 0.7], ["50%", "0%"]);
  // Transform right card (starts stacked under left card at x: -50%, then moves right to 0%)
  const rightCardX = useTransform(scrollYProgress, [0, 0.7], ["-50%", "0%"]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative bg-navy text-white min-h-[45vh] flex items-center overflow-hidden pt-28 pb-12 border-b border-steel/10">
          
          {/* Industrial Background Image with overlay for high-end aesthetic */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-65" 
            style={{
              backgroundImage: "url('/about-hero-bg.png')"
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

          {/* Blueprint-style line accents */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="#D7E0E8" strokeWidth="1" />
              <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="#D7E0E8" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-5">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs sm:text-sm text-orange font-semibold tracking-widest uppercase flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                ABOUT KRISHNA INSTRUMENTATION WORKS
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                An Engineering Partner Built for Industrial Reliability
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed"
              >
                Krishna Instrumentation Works combines technical expertise, skilled manpower, and disciplined project execution to support India&apos;s critical industries.
              </motion.p>
            </div>
          </div>
        </section>

        {/* COMPANY OVERVIEW */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Text */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                  OVERVIEW
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy leading-tight">
                  A Proven Legacy in Instrumentation & Electrical Execution
                </h2>
                <div className="h-1 w-20 bg-orange" />
                <p className="font-sans text-base text-graphite/90 leading-relaxed">
                  Krishna Instrumentation Works (KIW) is an engineering organization specializing in instrumentation, electrical, automation, testing and commissioning, calibration, maintenance, and industrial project execution.
                </p>
                <p className="font-sans text-base text-graphite/80 leading-relaxed">
                  With extensive experience across thermal power plants, oil and gas plants, and process industries, KIW has successfully executed critical projects for leading industrial organizations while maintaining a strong, consistent focus on quality, safety, and on-time delivery. We stand as a dependable partner for engineering support, troubleshooting, and turnkey site integration.
                </p>
              </div>

              {/* Right Column: Visual Box */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-lg shadow-xl overflow-hidden relative border border-steel/20 bg-navy group">
                  <motion.img 
                    src="/about-us.png" 
                    alt="Proven Legacy - Krishna Instrumentation Works" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  {/* Subtle technical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-20 bg-navy text-white border-t border-b border-steel/15 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Vision Card */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="group relative rounded-2xl overflow-hidden border border-steel/20 bg-navy shadow-xl flex flex-col justify-end min-h-[340px] p-8 cursor-default"
              >
                {/* Full Width & Full Height Background Image */}
                <img 
                  src="/about-us/our-vision.png" 
                  alt="Our Vision" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Slight Transparent Shadow Gradient behind text for maximum readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent z-0" />

                {/* Content Box directly over Image */}
                <div className="flex flex-col gap-3 relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider group-hover:text-orange transition-colors duration-300">
                    Our Vision
                  </h3>
                  <p className="font-sans text-base text-steel/90 leading-relaxed">
                    To become India&apos;s most trusted engineering partner by delivering innovative, safe, and highly reliable industrial solutions that build operational confidence.
                  </p>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="group relative rounded-2xl overflow-hidden border border-steel/20 bg-navy shadow-xl flex flex-col justify-end min-h-[340px] p-8 cursor-default"
              >
                {/* Full Width & Full Height Background Image */}
                <img 
                  src="/about-us/our-mission.png" 
                  alt="Our Mission" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Slight Transparent Shadow Gradient behind text for maximum readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent z-0" />

                {/* Content Box directly over Image */}
                <div className="flex flex-col gap-3 relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider group-hover:text-orange transition-colors duration-300">
                    Our Mission
                  </h3>
                  <p className="font-sans text-base text-steel/90 leading-relaxed">
                    To deliver world-class engineering services through technical excellence, quality workmanship, client transparency, and complete customer satisfaction.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                FOUNDATIONAL PILLARS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Our Core Values
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-white border border-steel/30 rounded-lg p-6 flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden group"
                  >
                    {/* Drawing border lines on hover */}
                    {/* Path 1: Top-Left -> Top-Right -> Bottom-Right */}
                    <span className="absolute top-0 left-0 h-[2px] bg-orange w-0 group-hover:w-full transition-all duration-300 ease-out z-20" />
                    <span className="absolute top-0 right-0 w-[2px] bg-orange h-0 group-hover:h-full transition-all duration-300 ease-out delay-300 z-20" />

                    {/* Path 2: Top-Left -> Bottom-Left -> Bottom-Right */}
                    <span className="absolute top-0 left-0 w-[2px] bg-orange h-0 group-hover:h-full transition-all duration-300 ease-out z-20" />
                    <span className="absolute bottom-0 left-0 h-[2px] bg-orange w-0 group-hover:w-full transition-all duration-300 ease-out delay-300 z-20" />

                    <div className="absolute top-0 right-0 w-12 h-12 bg-orange/5 rotate-45 translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div>
                      <div className="p-2.5 rounded w-fit bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-navy mt-4 mb-2">
                        {val.title}
                      </h3>
                      <p className="font-sans text-xs text-graphite/80 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STRENGTH & WHY TRUST US (PINNED SCROLL SPLIT ANIMATION SECTION) */}
        <section ref={targetRef} className="relative h-[220vh] bg-white border-t border-steel/15">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
              
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                  ENGINEERING ADVANTAGE
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mt-1">
                  Our Capabilities & Trust
                </h2>
                <div className="h-1 w-16 bg-orange mx-auto mt-2" />
              </div>

              {/* Animated Cards Wrapper */}
              <div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-stretch"
              >
                
                {/* Left Card: Our Strength (Animated from center to left) */}
                <motion.div 
                  style={{ x: leftCardX }}
                  className="bg-offwhite border border-steel/30 rounded-2xl p-8 lg:p-10 flex flex-col gap-6 shadow-xl relative z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-navy/10 p-3 rounded-xl text-navy">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy uppercase tracking-wider">
                      Our Strength
                    </h3>
                  </div>
                  <div className="h-0.5 w-16 bg-navy/20" />
                  
                  <ul className="flex flex-col gap-4 font-sans text-sm text-graphite/85">
                    {strengths.map((strength, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-safety-green" />
                        </div>
                        <span className="font-medium">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Right Card: Why Clients Trust Us (Animated from center under left card to right) */}
                <motion.div 
                  style={{ x: rightCardX }}
                  className="bg-navy border border-steel/10 rounded-2xl p-8 lg:p-10 text-white flex flex-col gap-6 shadow-2xl relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange/10 p-3 rounded-xl text-orange">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                      Why Clients Trust Us
                    </h3>
                  </div>
                  <div className="h-0.5 w-16 bg-orange/40" />
                  
                  <ul className="flex flex-col gap-4 font-sans text-sm text-steel/85">
                    {trusts.map((trust, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-orange" />
                        </div>
                        <span className="font-medium text-white/95">{trust}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-navy text-white py-16 relative overflow-hidden border-t border-steel/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-3xl">
              Ready to Collaborate with a Professional Engineering Team?
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/80 max-w-2xl">
              Start a technical discussion with our engineers today to outline scope, timelines, and safety configurations.
            </p>
            <div className="mt-4">
              <a
                href="/contact"
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 inline-block border border-orange/10 hover:border-orange/20"
              >
                Start Discussion
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
