'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Zap, 
  Settings, 
  Layers, 
  Cpu, 
  FileCheck, 
  Activity, 
  CheckCircle2, 
  Calendar,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Gauge,
  Factory,
  Building2,
  HardHat,
  Flame,
  Droplets,
  Waves,
  Compass,
  SlidersHorizontal,
  CircuitBoard,
  Radio,
  Cog,
  Server,
  Box,
  FileText,
  Briefcase
} from 'lucide-react';

const services = [
  {
    title: 'Instrumentation Installation',
    slug: 'instrumentation-installation',
    icon: Wrench,
    desc: 'Field instrument mounting, cabling, junction box installation, and impulse piping works.',
    bullets: [
      'Instrument mounting and installation',
      'Cable and termination support',
      'Junction box and panel interfaces',
      'Impulse tubing and field work',
      'Documentation and coordination'
    ]
  },
  {
    title: 'Electrical Installation',
    slug: 'electrical-installation',
    icon: Zap,
    desc: 'Power and control cabling, panel positioning, tray laying, and earthing execution support.',
    bullets: [
      'Cable routing and laying',
      'Panel/equipment connections',
      'Termination and testing',
      'Earthing-related support',
      'Site documentation'
    ]
  },
  {
    title: 'Mechanical Installation',
    slug: 'mechanical-installation',
    icon: Settings,
    desc: 'Coordinating mechanical assembly, site alignment, and structural support systems.',
    bullets: [
      'Equipment installation support',
      'Mechanical coordination',
      'Alignment and site assistance',
      'Multi-discipline interface coordination',
      'Execution documentation'
    ]
  },
  {
    title: 'Control & Instrumentation',
    slug: 'control-instrumentation',
    icon: Layers,
    desc: 'Connecting critical field sensors with main plant controllers and control rooms.',
    bullets: [
      'Field instrument execution',
      'Control panel interface',
      'Signal and cable coordination',
      'Loop documentation',
      'System readiness support'
    ]
  },
  {
    title: 'PLC, DCS & SCADA',
    slug: 'plc-dcs-scada',
    icon: Cpu,
    desc: 'System loop checks, panel configurations, and communication link testing.',
    bullets: [
      'PLC integration support',
      'DCS execution support',
      'SCADA support',
      'I/O and signal verification',
      'System testing and coordination'
    ]
  },
  {
    title: 'Testing & Commissioning',
    slug: 'testing-commissioning',
    icon: FileCheck,
    desc: 'Pre-commissioning checks, loop testing, functional runs, and punch-point clearance.',
    bullets: [
      'Pre-commissioning checks',
      'Functional testing',
      'Readiness verification',
      'Punch-point coordination',
      'Commissioning documentation'
    ]
  },
  {
    title: 'Calibration & Loop Checking',
    slug: 'calibration-loop-checking',
    icon: Activity,
    desc: 'Precise bench calibration, loop continuity checks, and verification certificates.',
    bullets: [
      'Field instrument calibration',
      'Loop continuity checks',
      'Signal verification',
      'Calibration records',
      'Issue closure support'
    ]
  },
  {
    title: 'Operation & Maintenance',
    slug: 'operation-maintenance',
    icon: CheckCircle2,
    desc: 'Continuous operations manpower, routine preventive inspections, and AMC execution.',
    bullets: [
      'Routine inspection support',
      'Preventive maintenance',
      'Breakdown support',
      'Technical manpower',
      'Maintenance reporting'
    ]
  },
  {
    title: 'Shutdown & Turnaround',
    slug: 'shutdown-turnaround',
    icon: Calendar,
    desc: 'Fast-track manpower deployment, planned repairs, re-commissioning, and startup checks.',
    bullets: [
      'Planning support',
      'Manpower mobilisation',
      'Multi-discipline execution',
      'Testing and restoration',
      'Progress and closure reporting'
    ]
  }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Zap,
  Settings,
  Layers,
  Cpu,
  FileCheck,
  Activity,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Gauge,
  Factory,
  Building2,
  HardHat,
  Flame,
  Droplets,
  Waves,
  Compass,
  Sliders: SlidersHorizontal,
  CircuitBoard,
  Radio,
  Cog,
  Server,
  Box,
  FileText,
  Briefcase,
};

export default function ServicesPage() {
  const [servicesData, setServicesData] = React.useState(services);

  React.useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) return;
        const ct = res.headers.get('content-type');
        if (!ct || !ct.includes('application/json')) return;
        const data = await res.json();
        if (data.ok && Array.isArray(data.data) && data.data.length > 0) {
          setServicesData(
            data.data.map((item: any) => ({
              title: item.title,
              slug: item.slug,
              icon: iconMap[item.icon_name] || Wrench,
              desc: item.short_desc,
              bullets: item.bullets || [],
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load dynamic services:', err);
      }
    }
    loadServices();
  }, []);

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
              backgroundImage: "url('/services-hero-bg.png')"
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50 z-0" />

          {/* Blueprint Grid Texture Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px), linear-gradient(to right, rgba(215,224,232,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(215,224,232,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px, 48px 48px, 48px 48px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs text-orange font-bold uppercase tracking-widest block mb-2"
              >
                Comprehensive Execution Services
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
              >
                End-to-End Instrumentation, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel to-white/90">
                  Electrical & Automation Services.
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-sm sm:text-base text-steel/90 leading-relaxed mb-6"
              >
                From initial site mobilization and impulse pipe fitting to multi-loop testing, HART calibration and DCS integration, we deliver execution reliability across major industrial sectors.
              </motion.p>
            </div>
          </div>
        </section>

        {/* SERVICES GRID SECTION */}
        <section className="py-16 sm:py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-steel/20 gap-4">
              <div>
                <span className="font-mono text-xs text-orange font-bold uppercase tracking-widest block mb-1">
                  Our Capabilities
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                  Specialized Industrial Service Disciplines
                </h2>
              </div>
              <div className="bg-safety-green/10 text-safety-green px-3.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
                QA/QC Certified
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-steel/30 rounded-lg p-8 hover:border-orange/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon */}
                      <div className="bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white p-3.5 rounded inline-block transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Header */}
                      <h2 className="font-heading text-xl font-bold text-navy mt-6 mb-3 group-hover:text-orange transition-colors">
                        {svc.title}
                      </h2>
                      <p className="font-sans text-sm text-graphite/70 mb-6 leading-relaxed">
                        {svc.desc}
                      </p>

                      {/* Bullets */}
                      <h3 className="font-mono text-xs font-semibold text-black/80 uppercase tracking-widest mb-3 border-b border-steel/10 pb-1">
                        Core Capabilities
                      </h3>
                      <ul className="flex flex-col gap-2 font-sans text-xs text-graphite/80">
                        {svc.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0 mt-1.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action link */}
                    <div className="mt-8 pt-6 border-t border-steel/10">
                      <Link 
                        href={`/services/${svc.slug}`}
                        className="font-sans text-sm font-semibold text-navy group-hover:text-orange flex items-center gap-1.5 transition-colors group/link"
                      >
                        <span>Explore Technical Specs</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* FAQ/CTA */}
        <section className="bg-navy text-white py-16 border-t border-steel/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-2xl">
              Need Turnkey Site Integration or AMC Support?
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/85 max-w-2xl">
              Our engineering supervisors and QA/QC teams are ready to support your complex project parameters. Start a discussion now.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 inline-block border border-orange/10 hover:border-orange/20"
              >
                Request a Custom Quote
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
