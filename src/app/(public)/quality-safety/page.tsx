'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Eye, 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight,
  Download,
  AlertTriangle,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Heart,
  Sparkles
} from 'lucide-react';

const corePillars = [
  {
    title: 'HSE Culture',
    desc: 'Safety-focused planning, responsible site behaviour, hazard mitigation, and project-specific safety compliance.',
    icon: ShieldCheck,
    image: '/quality/hse-culture.png',
    badge: 'SAFETY FIRST',
    colorClass: 'border-safety-green/30 bg-safety-green/5 text-safety-green'
  },
  {
    title: 'Quality Assurance',
    desc: 'Structured inspection, loop checking verification, precise site documentation, and rapid punch-point closure.',
    icon: Award,
    image: '/quality/quality-assurance.png',
    badge: 'QA/QC STANDARD',
    colorClass: 'border-navy/25 bg-navy/5 text-navy'
  },
  {
    title: 'Competent Teams',
    desc: 'Staffed by certified engineers, experienced supervisors, skilled technicians, independent QA/QC staff, and certified safety officers.',
    icon: Users,
    image: '/quality/competent -teams.png',
    badge: 'CERTIFIED STAFF',
    colorClass: 'border-steel/40 bg-steel/10 text-navy'
  },
  {
    title: 'Communication',
    desc: 'Clear, milestone-based progress reporting, active hazard logs, and transparent coordination with main contractors.',
    icon: MessageSquare,
    image: '/quality/communication.png',
    badge: 'TRANSPARENCY',
    colorClass: 'border-orange/20 bg-orange/5 text-navy'
  },
  {
    title: 'Continuous Improvement',
    desc: 'Strengthening field procedures through operational review meetings, site audits, and continuous technical training.',
    icon: TrendingUp,
    image: '/quality/continuous-improvement.png',
    badge: 'OPTIMIZATION',
    colorClass: 'border-navy/25 bg-navy/5 text-navy'
  },
  {
    title: 'Cleanlness',
    desc: 'Maintaining 5S workplace organization, orderly cable tray routes, clean bench testing areas, and spotless site housekeeping.',
    icon: Sparkles,
    image: '/quality/cleanliness.png',
    badge: '5S HOUSEKEEPING',
    colorClass: 'border-safety-green/30 bg-safety-green/5 text-safety-green'
  }
];

const documents = [
  { name: 'HSE Policy Document', desc: 'Core Health, Safety, and Environment execution rules and safety instructions.', file: 'hse-policy.pdf' },
  { name: 'Quality Policy Manual', desc: 'QA/QC guidelines, loop checking criteria, and site calibration rules.', file: 'quality-policy.pdf' },
  { name: 'Safety Statistics (Zero LTI Log)', desc: 'Historical safety index records and continuous zero-incident log reports.', file: 'safety-stats.pdf' },
  { name: 'ISO 9001:2015 Certification', desc: 'Registered Quality Management System certificate copy.', file: 'iso-certification.pdf' },
  { name: 'Technical Training Records', desc: 'HSE site induction logs and technician calibration certificate registers.', file: 'training-records.pdf' },
  { name: 'Insurance & Statutory Compliance Pack', desc: 'Workmen compensation, site liability covers, and statutory audit compliance documents.', file: 'statutory-compliance.pdf' },
  { name: 'Standard QA/QC Procedures Register', desc: 'Method statements, calibration bench protocols, and loop check sheets.', file: 'qaqc-procedures.pdf' }
];

export default function QualitySafetyPage() {
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
              backgroundImage: "url('/quality-safety-hero-bg.png')"
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-4">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-safety-green animate-pulse" />
                HSE & QA/QC COMPLIANCE
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Quality in Every Detail. <br />Safety in Every Action.
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                KIW operates under a strict, non-negotiable health, safety, and environmental protection framework. We verify every loop, calibrate every sensor, and safeguard every technician.
              </p>
            </div>
          </div>
        </section>

        {/* PILLARS OF COMPLIANCE */}
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                EXECUTION VALUES
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Our QA/QC & Safety Framework
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corePillars.map((item, idx) => {
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-steel/20 rounded-lg overflow-hidden hover:shadow-lg hover:border-steel/30 transition-all flex flex-col group"
                  >
                    {/* Top Image */}
                    <div className="h-48 w-full overflow-hidden relative bg-navy/5">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Bottom Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Badge below image */}
                        <div className="mb-3">
                          <span className={`font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded shadow-sm ${item.colorClass}`}>
                            {item.badge}
                          </span>
                        </div>

                        <h3 className="font-heading text-lg font-bold text-navy mb-2">
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-graphite/80 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
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
              Start Your Next Safe Project Execution
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/85 max-w-2xl">
              Partner with an engineering team that aligns technical accuracy with safe field execution.
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
