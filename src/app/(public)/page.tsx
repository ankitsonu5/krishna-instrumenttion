'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Cpu, 
  Settings, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  Briefcase, 
  Zap, 
  Calendar,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const stats = [
  { value: '13+', label: 'Years of Experience' },
  { value: '200+', label: 'Industrial Projects' },
  { value: 'PAN India', label: 'Presence' },
  { value: '250+', label: 'Skilled Manpower' }
];

const services = [
  {
    title: 'Instrumentation Installation',
    desc: 'Field installation support for accurate measurement, monitoring and control of complex industrial processes.',
    icon: Wrench,
  },
  {
    title: 'Electrical Installation',
    desc: 'Reliable electrical installation, cabling, tray laying, and industrial site execution to international standards.',
    icon: Zap,
  },
  {
    title: 'Mechanical Installation',
    desc: 'Mechanical installation and structural alignments aligned precisely with project and plant requirements.',
    icon: Settings,
  },
  {
    title: 'Control & Instrumentation',
    desc: 'C&I execution connecting field systems with control infrastructure.',
    icon: Layers,
  },
  {
    title: 'PLC, DCS & SCADA Systems',
    desc: 'Automation configuration and integration support for control, monitoring, and overall plant visibility.',
    icon: Cpu,
  },
  {
    title: 'Testing & Commissioning',
    desc: 'Structured testing, loop checking, pre-commissioning, and commissioning for dependable operation.',
    icon: FileCheck,
  },
  {
    title: 'Calibration & Loop Checking',
    desc: 'Calibration of precision field instruments and comprehensive loop verification for absolute measurement reliability.',
    icon: Activity,
  },
  {
    title: 'Operation & Maintenance',
    desc: 'AMC support and technical manpower deployment for stable, round-the-clock plant operations.',
    icon: CheckCircle2,
  },
  {
    title: 'Shutdown & Turnaround',
    desc: 'Expertly planned shutdown execution and maintenance services focused on safety, efficiency, and schedule control.',
    icon: Calendar,
  }
];

const industries = [
  { name: 'Thermal Power', slug: 'thermal-power', desc: 'Critical boiler and turbine instrumentation, control panel installations, and commissioning.' },
  { name: 'Steel Plants', slug: 'steel-plants', desc: 'Heavy automation, high-temp sensor calibration, and power cabling systems.' },
  { name: 'Oil & Gas', slug: 'oil-gas', desc: 'Explosion-proof installations, safety loops, and offshore/onshore service support.' },
  { name: 'Process Industry', slug: 'process-industry', desc: 'Batch control, chemical process automation, and instrumentation loops.' },
  { name: 'Cement', slug: 'cement', desc: 'Kiln automation, material handling control, and dust filter monitoring.' },
  { name: 'Sugar', slug: 'sugar', desc: 'Mill automation, boiling house control loops, and speed regulation system updates.' }
];

const reasons = [
  '13+ years of experience in high-hazard environments',
  '200+ industrial projects executed successfully',
  'PAN India presence with mobile deployment teams',
  '250+ highly skilled and certified technical manpower',
  'Strong HSE (Health, Safety, Environment) culture with zero-incident goals',
  'Strict commitment to on-time project delivery',
  'Specialized experience across power, oil & gas, and process industries'
];

const projects = [
  {
    client: 'Indian Oil Corporation Ltd. (IOCL)',
    location: 'Panipat, India',
    scope: 'Refinery expansion C&I installation, field instrument mounting, junction box cabling, and automation testing.',
    year: '2024',
    logo: '/indianoil-logo.png',
    image: '/about-us/1.jpeg'
  },
  {
    client: 'Chevron Bangladesh',
    location: 'Bibiyana Gas Field',
    scope: 'Gas plant commissioning support, calibration of safety valves, transmitter verification, and loop checks.',
    year: '2023',
    logo: '/chevron-logo.png',
    image: '/about-us/2.jpeg'
  },
  {
    client: 'RIL Malaysia',
    location: 'Melaka Petrochemical Complex',
    scope: 'Petrochemical control system installation, DCS integration assistance, and loop checks.',
    year: '2023',
    logo: '/ril-logo.png',
    image: '/about-us/3.jpeg'
  },
  {
    client: 'NTPC Singrauli',
    location: 'Singrauli, India',
    scope: 'Super Thermal Power Station unit modernization, C&I cabling, and boiler instrumentation calibration.',
    year: '2022',
    logo: '/ntpc-logo.png',
    image: '/about-us/4.jpeg'
  },
  {
    client: 'NTPC Sipat',
    location: 'Sipat, India',
    scope: 'DCS / SCADA upgrade, system loop checking, and integration of smart transmitters.',
    year: '2022',
    logo: '/ntpc-logo.png',
    image: '/about-us/5.jpeg'
  },
  {
    client: 'Jindal Steel & Power Ltd. (JSPL)',
    location: 'Raigarh, India',
    scope: 'Blast furnace automation, instrumentation cabling, calibration, and loop checking.',
    year: '2021',
    logo: '/jspl-logo.png',
    image: '/about-us/7.jpeg'
  }
];

const clients = [
  'Yokogawa',
  'Siemens Energy',
  'NTPC',
  'Emerson',
  'ABB',
  'Honeywell',
  'PCBL',
  'IndianOil',
  'Balrampur Chini Mills'
];

// Custom Counter Component for stats section count-up animation
function Counter({ value, duration = 1500 }: { value: string; duration?: number }) {
  // Check if value has a number at the start (e.g., "13+", "250+")
  const numericMatch = React.useMemo(() => value.match(/^(\d+)(.*)$/), [value]);
  const [count, setCount] = React.useState<number | string>(() => (numericMatch ? 0 + (numericMatch[2] || '') : value));
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (!numericMatch) return;

    const target = parseInt(numericMatch[1], 10);
    const suffix = numericMatch[2] || '';

    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = target;
          if (start === end) return;

          const totalMilliseconds = duration;
          const steps = Math.min(end, 50); // maximum number of updates
          const increment = Math.ceil(end / steps);
          const stepTime = totalMilliseconds / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            start = Math.min(currentStep * increment, end);
            setCount(start + suffix);
            
            if (start >= end) {
              clearInterval(timer);
              setCount(end + suffix);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
      observer.disconnect();
    };
  }, [value, duration, numericMatch, hasAnimated]);

  return <span ref={elementRef}>{count}</span>;
}

export default function HomePage() {
  const [trackIndex, setTrackIndex] = React.useState(1);
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  const nextService = () => {
    if (!isTransitioning) setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  const prevService = () => {
    if (!isTransitioning) setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (trackIndex >= services.length + 1) {
      setIsTransitioning(false);
      setTrackIndex(1);
    } else if (trackIndex <= 0) {
      setIsTransitioning(false);
      setTrackIndex(services.length);
    }
  };

  const activeServiceIdx = ((trackIndex - 1) % services.length + services.length) % services.length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION - Responsive Height (min-h-screen on mobile, 100vh on desktop) */}
        <section className="relative bg-navy text-white min-h-screen lg:h-screen flex items-center pt-24 sm:pt-28 lg:pt-20 pb-12 lg:pb-8 overflow-hidden border-b border-steel/10">
          
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/kiw-hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay with black gradient for maximum video clarity and visual contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-0" />

          {/* Blueprint Grid Texture Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px), linear-gradient(to right, rgba(215,224,232,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(215,224,232,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px, 48px 48px, 48px 48px'
            }} />
          </div>

          {/* Cinematic Overlay Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="#D7E0E8" strokeWidth="1" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#D7E0E8" strokeWidth="0.5" strokeDasharray="5,5" />
              <line x1="90%" y1="0%" x2="90%" y2="100%" stroke="#D7E0E8" strokeWidth="1" />
              <motion.line 
                x1="0%" y1="30%" x2="100%" y2="30%" 
                stroke="#E76F00" 
                strokeWidth="1"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />
              <motion.circle 
                r="4" 
                fill="#E76F00"
                initial={{ cx: '10%', cy: '30%' }}
                animate={{ cx: ['10%', '90%', '10%'], cy: ['30%', '80%', '30%'] }}
                transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Hero Content */}
              <div className="lg:col-span-8 flex flex-col gap-5">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-mono text-xs sm:text-sm text-orange font-semibold tracking-widest uppercase flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                  INDUSTRIAL ENGINEERING & AUTOMATION PARTNER
                </motion.span>

                <motion.h1 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                >
                  Engineering Precision for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel to-white/90">
                    Mission-Critical Industries.
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sans text-sm sm:text-base text-steel/90 max-w-2xl leading-relaxed"
                >
                  Krishna Instrumentation Works delivers instrumentation, electrical, automation, testing, commissioning, calibration and industrial execution solutions for power plants, oil and gas facilities and process industries across India.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mt-2"
                >
                  <Link
                    href="/contact"
                    className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all text-center shadow-lg shadow-orange/20 border border-orange/10 hover:border-orange/20"
                  >
                    Discuss Your Project
                  </Link>
                  <a
                    href="#services"
                    className="font-sans text-sm font-semibold border border-steel/30 text-white px-8 py-3.5 rounded hover:bg-white/5 transition-all text-center"
                  >
                    Explore Our Capabilities
                  </a>
                </motion.div>
              </div>

              {/* Technical Data Overlay Panel */}
              <div className="lg:col-span-4 hidden lg:block bg-graphite/40 border border-steel/10 rounded-lg p-5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-steel/20 uppercase tracking-widest">
                  SYS_STATUS: ACTIVE
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-3 uppercase tracking-wider border-b border-steel/10 pb-1.5">
                  Calibration Loop Check
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-steel/5 pb-1">
                    <span className="text-steel/60">SYSTEM FREQ</span>
                    <span className="text-safety-green">50.02 Hz</span>
                  </div>
                  <div className="flex justify-between border-b border-steel/5 pb-1">
                    <span className="text-steel/60">FLOW VALVE INPUT</span>
                    <span className="text-orange">4-20 mA</span>
                  </div>
                  <div className="flex justify-between border-b border-steel/5 pb-1">
                    <span className="text-steel/60">PRESSURE VERIFIED</span>
                    <span className="text-white">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel/60">HSE SAFETY LOG</span>
                    <span className="text-safety-green">COMPLIANT</span>
                  </div>
                </div>
                {/* Tech Drawing Accents */}
                <div className="mt-4 h-16 border-t border-dashed border-steel/20 relative">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange/30" />
                  <div className="absolute top-4 left-4 w-4 h-4 rounded-full border border-orange/20 animate-ping" />
                  <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-orange" />
                  <div className="absolute top-1/2 left-10 text-[9px] font-mono text-steel/40">INSTRUMENTATION ALIGNED</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STANDALONE STATS STRIP SECTION */}
        <section className="bg-navy border-b border-steel/15 py-10 lg:py-12 relative z-10 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col p-4 bg-graphite/20 border border-steel/10 rounded-lg hover:border-orange/30 transition-all">
                  <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                    <Counter value={stat.value} />
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-orange uppercase tracking-wider mt-1.5 font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORPORATE INTRODUCTION */}
        <section className="py-24 bg-offwhite overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Introduction Text */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col gap-6"
              >
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                  WHO WE ARE
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
                  Engineering Capability. <br />Execution Confidence.
                </h2>
                <div className="h-1 w-20 bg-orange" />
                <p className="font-sans text-base sm:text-lg text-graphite/90 leading-relaxed mt-2">
                  KIW is an engineering organization specializing in instrumentation, electrical, automation, testing and commissioning, calibration, maintenance and industrial project execution.
                </p>
                <p className="font-sans text-base text-graphite/80 leading-relaxed">
                  Our experience across thermal power, oil and gas, steel, cement, sugar and process industries enables us to support complex projects with technical discipline, site coordination and a commitment to safe, timely delivery. We focus on bridging the gap between design engineering and ground-level execution, ensuring that systems operate reliably from day one.
                </p>
              </motion.div>

              {/* Graphic/Visual Block */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 relative"
              >
                <div className="aspect-[4/3] rounded-lg shadow-xl overflow-hidden relative border border-steel/20 bg-navy group">
                  <motion.img 
                    src="/about-us.png" 
                    alt="Who We Are - Krishna Instrumentation Works" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  {/* Subtle technical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Accenting border shapes */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-orange" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-navy" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* CORE SERVICES CAROUSEL SECTION */}
        <section id="services" className="py-24 bg-white border-t border-b border-steel/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header with Navigation Arrows */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-2"
              >
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                  WHAT WE DO
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
                  Our Core Services
                </h2>
                <div className="h-1 w-16 bg-orange mt-1" />
                <p className="font-sans text-sm sm:text-base text-graphite/80 mt-2 max-w-xl">
                  Providing specialized engineering and hands-on installation support across the plant lifecycle.
                </p>
              </motion.div>

              {/* Navigation Controls */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 self-start md:self-end"
              >
                {/* Counter indicator */}
                <div className="font-mono text-xs text-navy font-bold bg-offwhite px-3.5 py-2 rounded border border-steel/20">
                  <span className="text-orange">{String(activeServiceIdx + 1).padStart(2, '0')}</span>
                  <span className="text-steel/40 px-1">/</span>
                  <span className="text-navy/60">{String(services.length).padStart(2, '0')}</span>
                </div>

                {/* Left & Right Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevService}
                    className="p-3 rounded-full bg-navy/5 text-navy hover:bg-orange hover:text-white transition-all shadow-sm border border-steel/20 cursor-pointer active:scale-95"
                    aria-label="Previous Service"
                    title="Previous Service"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextService}
                    className="p-3 rounded-full bg-navy/5 text-navy hover:bg-orange hover:text-white transition-all shadow-sm border border-steel/20 cursor-pointer active:scale-95"
                    aria-label="Next Service"
                    title="Next Service"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Continuous Hardware-Accelerated 3-Card Carousel Track */}
            <div className="overflow-hidden py-6 -mx-2 px-2 relative">
              <div 
                onTransitionEnd={handleTransitionEnd}
                className={`flex gap-6 lg:[transform:translateX(calc(-1*(var(--track-idx)-1)*(100%+1.5rem)/3))] md:[transform:translateX(calc(-1*(var(--track-idx)-1)*(100%+1.5rem)/2))] [transform:translateX(calc(-1*var(--track-idx)*(100%+1.5rem)))] ${
                  isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'
                }`}
                style={{ '--track-idx': trackIndex } as React.CSSProperties}
              >
                {(() => {
                  // Buffer clones at start and end for smooth endless scrolling
                  const extendedServices = [
                    { ...services[services.length - 1], realIndex: services.length - 1 }, // extIndex = 0
                    ...services.map((s, idx) => ({ ...s, realIndex: idx })),              // extIndex = 1 to 9
                    { ...services[0], realIndex: 0 },                                     // extIndex = 10
                    { ...services[1], realIndex: 1 },                                     // extIndex = 11
                    { ...services[2], realIndex: 2 }                                      // extIndex = 12
                  ];

                  return extendedServices.map((svc, extIdx) => {
                    const IconComponent = svc.icon;
                    const isCenter = extIdx === trackIndex;

                    return (
                      <div
                        key={extIdx}
                        onClick={() => {
                          if (!isCenter) {
                            setIsTransitioning(true);
                            setTrackIndex(extIdx);
                          }
                        }}
                        className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 border rounded-xl p-8 transition-all duration-500 flex flex-col justify-between min-h-[320px] ${
                          isCenter
                            ? 'bg-navy text-white border-orange/50 shadow-2xl scale-[1.04] z-10'
                            : 'bg-white text-navy border-steel/20 shadow-sm opacity-85 hover:opacity-100 hover:border-steel/40 cursor-pointer'
                        }`}
                      >
                        <div>
                          {/* Card Header & Icon */}
                          <div className="flex justify-between items-start mb-6">
                            <div className={`p-3.5 rounded transition-all duration-300 ${
                              isCenter
                                ? 'bg-orange text-white shadow-md'
                                : 'bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white'
                            }`}>
                              <IconComponent className="w-6 h-6" />
                            </div>

                            <span className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                              isCenter ? 'bg-orange/20 text-orange' : 'bg-steel/10 text-steel/70'
                            }`}>
                              Service {String(svc.realIndex + 1).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className={`font-heading text-xl font-bold mb-3 transition-colors ${
                            isCenter ? 'text-white' : 'text-navy'
                          }`}>
                            {svc.title}
                          </h3>

                          {/* Description */}
                          <p className={`font-sans text-sm leading-relaxed ${
                            isCenter ? 'text-steel/90' : 'text-graphite/80'
                          }`}>
                            {svc.desc}
                          </p>
                        </div>

                        {/* Footer Action */}
                        <div className={`mt-8 pt-4 border-t flex justify-between items-center ${
                          isCenter ? 'border-white/10' : 'border-steel/10'
                        }`}>
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${
                            isCenter ? 'text-steel/70' : 'text-steel/60'
                          }`}>
                            {isCenter ? '● Active Focus' : 'Click to Focus'}
                          </span>

                          <Link
                            href="/services"
                            className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                              isCenter
                                ? 'text-orange font-extrabold hover:underline'
                                : 'text-navy hover:text-orange'
                            }`}
                          >
                            <span>Details</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Bottom Dots Indicator */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {services.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTrackIndex(dotIdx + 1);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeServiceIdx === dotIdx ? 'w-8 bg-orange' : 'w-2 bg-steel/30 hover:bg-steel/60'
                  }`}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="py-24 bg-navy text-white relative overflow-hidden">
          {/* Subtle grid line accents */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="h-full w-px bg-white left-1/3 absolute" />
            <div className="h-full w-px bg-white left-2/3 absolute" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3"
            >
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                SECTORS WE SERVE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                Experience Across Critical Industrial Sectors
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group relative h-80 rounded-xl overflow-hidden border border-steel/20 shadow-lg cursor-pointer bg-navy"
                >
                  {/* Full Width Background Image */}
                  <img 
                    src={`/industries/${ind.slug}.png`} 
                    alt={ind.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent transition-opacity duration-300 group-hover:from-navy/95 group-hover:via-navy/80" />

                  {/* Content Container with Hover Animation */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                    <div className="transition-transform duration-500 ease-out transform translate-y-8 group-hover:translate-y-0">
                      {/* Title */}
                      <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange transition-colors duration-300">
                        {ind.name}
                      </h3>

                      {/* Description - Hidden initially, smooth opacity/slide reveal on hover */}
                      <p className="font-sans text-sm text-steel/90 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        {ind.desc}
                      </p>
                    </div>
                  </div>

                  {/* Top Right Subtle Accent Badge */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[10px] uppercase font-bold text-orange bg-navy/80 backdrop-blur-md px-2.5 py-1 rounded border border-orange/30">
                      Sector
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Industries Button */}
            <div className="mt-14 text-center flex justify-center">
              <Link
                href="/industries"
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all duration-300 shadow-lg shadow-orange/20 flex items-center gap-2.5 group border border-orange/20"
              >
                <span>View All Industries</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY KIW */}
        <section className="py-24 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image / Stats block */}
              <div className="lg:col-span-5 relative order-last lg:order-first">
                <div className="bg-navy p-8 rounded-lg shadow-xl text-white relative overflow-hidden border border-steel/10">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-2xl pointer-events-none" />

                  <h3 className="font-heading text-lg font-bold mb-6 text-white uppercase tracking-wider border-b border-steel/10 pb-2">
                    Operational Highlights
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="font-heading text-3xl font-extrabold text-orange">
                        <Counter value="13+" /> Years
                      </div>
                      <div className="text-xs text-steel/80 font-mono mt-1">PROVEN FIELD RECORD</div>
                    </div>
                    <div>
                      <div className="font-heading text-3xl font-extrabold text-white">
                        <Counter value="200+" />
                      </div>
                      <div className="text-xs text-steel/80 font-mono mt-1">COMPLETED PROJECT ITERATIONS</div>
                    </div>
                    <div>
                      <div className="font-heading text-3xl font-extrabold text-white">
                        Zero
                      </div>
                      <div className="text-xs text-steel/80 font-mono mt-1">LTI (LOST TIME INJURY) INCIDENTS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reasons Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                  OUR ADVANTAGE
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
                  Why Partners Choose KIW
                </h2>
                <div className="h-1 w-20 bg-orange" />
                
                <ul className="flex flex-col gap-4 mt-4 font-sans text-sm sm:text-base text-graphite/90">
                  {reasons.map((reason, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20, 
                          delay: i * 0.08 
                        }}
                        className="flex-shrink-0 mt-0.5"
                      >
                        <CheckCircle2 className="w-5 h-5 text-safety-green" />
                      </motion.div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* SELECTED PROJECTS */}
        <section className="py-24 bg-white border-t border-steel/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                OUR TRACK RECORD
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
                Selected Projects
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
              <p className="font-sans text-base text-graphite/80 mt-2">
                Demonstrated capability through successfully delivered scopes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-offwhite border border-steel/20 rounded-lg overflow-hidden hover:shadow-md hover:border-steel/40 transition-all flex flex-col justify-between relative group z-0"
                >
                  {/* Card Top Site Image */}
                  {proj.image && (
                    <div className="h-44 w-full relative overflow-hidden bg-navy/10 border-b border-steel/15">
                      <img 
                        src={proj.image} 
                        alt={proj.client} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="font-mono text-xs text-white font-semibold uppercase tracking-wider bg-navy/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                          {proj.year}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-base font-bold text-navy">
                          {proj.client}
                        </h3>
                        <Briefcase className="w-4 h-4 text-orange flex-shrink-0 mt-1" />
                      </div>

                      <p className="font-mono text-[10px] text-orange font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
                        <span>📍</span> {proj.location}
                      </p>
                      <p className="font-sans text-xs text-graphite/85 leading-relaxed">
                        {proj.scope}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-steel/10 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-safety-green font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-safety-green" />
                        Scope Verified
                      </span>
                    </div>
                  </div>

                  {/* Faint background logo on hover */}
                  {proj.logo && (
                    <div className="absolute right-4 bottom-4 w-24 h-24 opacity-0 group-hover:opacity-[0.15] transition-all duration-500 pointer-events-none transform translate-y-3 group-hover:translate-y-0 select-none z-0">
                      <img 
                        src={proj.logo} 
                        alt="" 
                        className="w-full h-full object-contain filter grayscale" 
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE EXECUTE */}
        <section className="py-24 bg-navy text-white relative overflow-hidden border-t border-steel/15">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                EXECUTION CAPABILITIES
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                What We Execute
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
              <p className="font-sans text-base text-steel/85 mt-2">
                Turnkey technical services and specialized execution scopes delivered across critical plant operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Instrumentation */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 border border-steel/20 rounded-xl p-6 hover:bg-white/10 hover:border-orange/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-lg bg-orange/15 text-orange w-fit mb-5 group-hover:bg-orange group-hover:text-white transition-colors">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors">
                    Instrumentation
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-steel/80 leading-relaxed">
                    Field instruments, JB installation, cable laying, cable termination, impulse piping, instrument tubing and loop checking.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-steel/10 flex items-center gap-2 font-mono text-[10px] text-orange uppercase tracking-wider font-bold">
                  <span>Field Execution</span>
                </div>
              </motion.div>

              {/* 2. Electrical */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border border-steel/20 rounded-xl p-6 hover:bg-white/10 hover:border-orange/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-lg bg-orange/15 text-orange w-fit mb-5 group-hover:bg-orange group-hover:text-white transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors">
                    Electrical
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-steel/80 leading-relaxed">
                    Cable tray, power & control cables, termination, earthing, lighting and electrical testing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-steel/10 flex items-center gap-2 font-mono text-[10px] text-orange uppercase tracking-wider font-bold">
                  <span>Power & Distribution</span>
                </div>
              </motion.div>

              {/* 3. Automation */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-steel/20 rounded-xl p-6 hover:bg-white/10 hover:border-orange/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-lg bg-orange/15 text-orange w-fit mb-5 group-hover:bg-orange group-hover:text-white transition-colors">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors">
                    Automation
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-steel/80 leading-relaxed">
                    PLC, DCS, SCADA, HMI, control panels and system integration.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-steel/10 flex items-center gap-2 font-mono text-[10px] text-orange uppercase tracking-wider font-bold">
                  <span>System Control</span>
                </div>
              </motion.div>

              {/* 4. Commissioning */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 border border-steel/20 rounded-xl p-6 hover:bg-white/10 hover:border-orange/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-lg bg-orange/15 text-orange w-fit mb-5 group-hover:bg-orange group-hover:text-white transition-colors">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors">
                    Commissioning
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-steel/80 leading-relaxed">
                    Pre-commissioning, functional testing, calibration, loop checking, commissioning and shutdown support.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-steel/10 flex items-center gap-2 font-mono text-[10px] text-orange uppercase tracking-wider font-bold">
                  <span>Plant Startup Support</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAJOR CLIENTS - CONTINUOUS INFINITE AUTO-SCROLL MARQUEE */}
        <section className="py-16 bg-offwhite border-t border-b border-steel/20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h4 className="font-mono text-sm sm:text-base text-navy uppercase tracking-widest font-bold">
                TRUSTED BY MAJOR INDUSTRIAL MANUFACTURERS & OPERATORS
              </h4>
            </div>
          </div>

          {/* Marquee Container with Gradient Mask on Edges */}
          <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee flex gap-6 items-center py-4">
              {/* Duplicate array twice for seamless infinite looping */}
              {[...clients, ...clients].map((client, i) => {
                const clientLogos: Record<string, string> = {
                  'Yokogawa': '/yokogawa-logo.png',
                  'Siemens Energy': '/siemens-logo.png',
                  'NTPC': '/ntpc-logo.png',
                  'Emerson': '/emerson-logo.png',
                  'ABB': '/abb-logo.png',
                  'Honeywell': '/honeywell-logo.png',
                  'PCBL': '/pcbl-logo.png',
                  'IndianOil': '/indianoil-logo.png',
                  'Balrampur Chini Mills': '/balarampur-chini-mills-logo.png'
                };
                const logoUrl = clientLogos[client];

                return (
                  <div 
                    key={i} 
                    className="bg-white border border-steel/20 hover:border-orange/40 shadow-sm hover:shadow-[0_20px_30px_-10px_rgba(11,43,76,0.22)] px-8 py-5 rounded-lg flex items-center justify-center h-20 w-48 flex-shrink-0 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-105"
                  >
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={`${client} Logo`} 
                        className="max-h-12 max-w-full object-contain transition-all duration-300" 
                      />
                    ) : (
                      <span className="text-xs font-heading font-extrabold text-navy/70 tracking-wider">
                        {client}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUALITY & SAFETY */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-6">
            <div className="bg-safety-green/10 text-safety-green p-4 rounded-full inline-block">
              <ShieldCheck className="w-12 h-12" />
            </div>
            
            <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
              QA/QC & HSE COMMITMENT
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight max-w-2xl">
              Safety Is Part of Every Execution Decision
            </h2>

            <div className="h-1 w-16 bg-orange" />

            <p className="font-sans text-base sm:text-lg text-graphite/85 leading-relaxed max-w-3xl">
              Our approach combines technical expertise, QA/QC discipline, safety supervision, transparent communication, and absolute compliance with applicable project and environmental requirements. We maintain rigorous standards to ensure all operations reflect our commitment to a zero-accident execution model.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-navy text-white py-20 relative overflow-hidden border-t border-steel/10">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-3xl">
              Planning an Industrial Project, Shutdown or Automation Requirement?
            </h2>
            <p className="font-sans text-base text-steel/80 max-w-2xl">
              Share your project scope or tender requirements with our engineering team, and let&nbsp;s start a technical discussion today.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-4 rounded hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 inline-block border border-orange/10 hover:border-orange/20"
              >
                Discuss Your Requirement
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}