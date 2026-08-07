'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';
import { projectsData } from '../data';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Briefcase, 
  FileText, 
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Wrench,
  AlertCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface ProjectDetailClientProps {
  slug: string;
}

export default function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Derive related projects in same industry
  const relatedProjects = projectsData
    .filter(p => p.industry === project.industry && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
            <div className="max-w-4xl flex flex-col gap-4">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                VERIFIED PROJECT SPECIFICATION SHEET
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {project.title}
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed font-semibold">
                Principal Client: {project.client}
              </p>

              {/* Technical tag line */}
              <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-steel">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                  <MapPin className="w-3.5 h-3.5 text-orange" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                  <Calendar className="w-3.5 h-3.5 text-orange" />
                  Period: {project.period}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                  <Briefcase className="w-3.5 h-3.5 text-orange" />
                  Sector: {project.industry}
                </span>
                <span className={`flex items-center gap-1.5 border px-3 py-1.5 rounded uppercase font-bold tracking-wider ${
                  project.status === 'Completed'
                    ? 'bg-safety-green/10 border-safety-green/20 text-safety-green'
                    : 'bg-orange/10 border-orange/20 text-orange'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS GRID LAYOUT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Report Contents */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                
                {/* 2. OVERVIEW */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    01. Project Overview
                  </h2>
                  <p className="font-sans text-base text-graphite/85 leading-relaxed">
                    This document summarizes the engineering services, installation scope, and QA/QC loop checks executed by Krishna Instrumentation Works for the {project.title} project at {project.location}. Execution coordinates were planned alongside client supervisors to meet specific plant uptime targets.
                  </p>
                </div>

                {/* 3. PROJECT CONTEXT */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    02. Project Context
                  </h2>
                  <p className="font-sans text-sm text-graphite/80 leading-relaxed">
                    Industrial sites operating in the {project.industry} sector demand extreme measurement stability under volatile physical parameters. For this project, {project.client} required a disciplined execution team capable of mounting field transmitters, configuring signals, and testing control cabinet terminations under strict site safety guidelines.
                  </p>
                </div>

                {/* 4. KIW SCOPE */}
                <div className="flex flex-col gap-4 bg-offwhite border border-steel/30 rounded-lg p-6">
                  <h2 className="font-heading text-lg font-bold text-navy uppercase tracking-wide mb-3">
                    03. KIW Verified Scope
                  </h2>
                  <p className="font-sans text-sm text-graphite/85 leading-relaxed mb-4">
                    {project.scope}
                  </p>
                  <div className="bg-white border border-steel/20 rounded p-4 flex gap-3 items-center">
                    <ShieldCheck className="w-5 h-5 text-safety-green flex-shrink-0" />
                    <span className="font-mono text-xs text-navy font-semibold uppercase tracking-wider">
                      VERIFIED SCOPE REGISTERED & STAMPED BY QA/QC
                    </span>
                  </div>
                </div>

                {/* 5. SERVICES AND SYSTEMS */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    04. Services & Systems Delivered
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-sm text-graphite/85">
                    <li className="flex gap-2 items-center">
                      <CheckCircle2 className="w-4 h-4 text-orange flex-shrink-0" />
                      <span>{project.service}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <CheckCircle2 className="w-4 h-4 text-orange flex-shrink-0" />
                      <span>Cabling & Gland Termination Support</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <CheckCircle2 className="w-4 h-4 text-orange flex-shrink-0" />
                      <span>Instrument Mounting & Bracket Alignment</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <CheckCircle2 className="w-4 h-4 text-orange flex-shrink-0" />
                      <span>Loop Continuity Checks</span>
                    </li>
                  </ul>
                </div>

                {/* 6. EXECUTION APPROACH */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    05. Execution Approach
                  </h2>
                  <p className="font-sans text-sm text-graphite/80 leading-relaxed">
                    KIW deployed a structured team consisting of certified instrumentation engineers, mechanical alignment technicians, and safety coordinators. The workflow followed three main phases:
                  </p>
                  <ol className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-graphite/85 mt-2">
                    <li className="flex gap-3">
                      <span className="font-mono font-bold text-orange">Phase A:</span>
                      <span>Bench calibration and health diagnostics of transmitters before structural mounting.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono font-bold text-orange">Phase B:</span>
                      <span>Tray installations, cable dressing, connection points routing, and flameproof gland terminations.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono font-bold text-orange">Phase C:</span>
                      <span>Cold loop checking, hot signal verification, and formal hand-over certificate preparation.</span>
                    </li>
                  </ol>
                </div>

                {/* 7. SAFETY & QUALITY CONTROLS */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    06. Safety & Quality Controls
                  </h2>
                  <p className="font-sans text-sm text-graphite/80 leading-relaxed">
                    Safety protocols were managed under a zero-incident objective. Our safety officers conducted daily Tool Box Talks (TBT), verified area hot-work permits, and checked testing equipment calibration validation dates.
                  </p>
                </div>

                {/* 8. STATUS / RESULT */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    07. Status & Outcome
                  </h2>
                  <div className="bg-safety-green/5 border border-safety-green/20 rounded p-6 flex gap-4">
                    <TrendingUp className="w-8 h-8 text-safety-green flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading text-base font-bold text-navy mb-1">Key Operational Outcome:</h4>
                      <p className="font-sans text-sm text-graphite/80 leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 9. GALLERY (Technical Draft Layout) */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy uppercase tracking-wide border-b border-steel/15 pb-2">
                    08. Technical Gallery & Layouts
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-offwhite aspect-video rounded border border-steel/20 flex flex-col items-center justify-center text-center p-4">
                      <Wrench className="w-6 h-6 text-steel/60 mb-2" />
                      <span className="font-mono text-[10px] text-steel">INSTRUMENTATION DRAFT LOG</span>
                      <span className="font-mono text-[8px] text-steel/40 uppercase mt-0.5">IMAGE_UNPUBLISHED_PENDING_PERMISSION</span>
                    </div>
                    <div className="bg-offwhite aspect-video rounded border border-steel/20 flex flex-col items-center justify-center text-center p-4">
                      <FileCheck className="w-6 h-6 text-steel/60 mb-2" />
                      <span className="font-mono text-[10px] text-steel">CALIBRATION LOOP REPORT</span>
                      <span className="font-mono text-[8px] text-steel/40 uppercase mt-0.5">IMAGE_UNPUBLISHED_PENDING_PERMISSION</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: QA & Project Meta */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Permission status metadata */}
                <div className="bg-offwhite border border-steel/30 rounded-lg p-6 flex flex-col gap-4">
                  <h3 className="font-heading text-sm font-bold text-navy uppercase tracking-wider border-b border-steel/10 pb-2">
                    Document Metadata
                  </h3>
                  <div className="space-y-3 font-mono text-[11px] text-steel">
                    <div className="flex justify-between border-b border-steel/5 pb-1">
                      <span>DOC ID:</span>
                      <span className="text-navy font-bold">{slug.toUpperCase()}-SPEC-01</span>
                    </div>
                    <div className="flex justify-between border-b border-steel/5 pb-1">
                      <span>QC STATUS:</span>
                      <span className="text-safety-green font-bold">VERIFIED</span>
                    </div>
                    <div className="flex justify-between border-b border-steel/5 pb-1">
                      <span>PERM STATUS:</span>
                      <span className="text-orange font-bold">INTERNAL VERIFICATION ONLY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AUDIT STAMP:</span>
                      <span className="text-navy font-bold">KIW-HSE-QA</span>
                    </div>
                  </div>
                </div>

                {/* 11. RFQ CTA */}
                <div className="bg-navy text-white rounded-lg p-8 flex flex-col gap-6 relative overflow-hidden border border-steel/10">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange/10 rounded-full blur-xl" />
                  
                  <h3 className="font-heading text-lg font-bold">
                    Need Similar Capabilities?
                  </h3>

                  <p className="font-sans text-xs text-steel/85 leading-relaxed">
                    Submit your tender documentation or operational scope parameters directly to our engineers.
                  </p>

                  <div>
                    <Link
                      href={`/contact?rfq=true&project=${slug}`}
                      className="font-sans text-xs font-semibold bg-orange text-white px-5 py-3.5 rounded hover:bg-orange/90 transition-all shadow-md shadow-orange/10 flex items-center justify-center gap-2 group w-full text-center"
                    >
                      <span>Initiate Technical Discussion</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>

            {/* 10. RELATED PROJECTS */}
            {relatedProjects.length > 0 && (
              <div className="mt-20 pt-10 border-t border-steel/15">
                <h3 className="font-heading text-xl font-bold text-navy mb-8 uppercase tracking-wide">
                  Related Projects in {project.industry}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedProjects.map((p, idx) => (
                    <div key={idx} className="bg-offwhite border border-steel/20 rounded p-6 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] text-orange font-bold uppercase tracking-widest">{p.period}</span>
                        <h4 className="font-heading text-base font-bold text-navy mt-2 mb-1">{p.title}</h4>
                        <p className="font-sans text-xs text-steel/80 mb-3">{p.client}</p>
                      </div>
                      <Link 
                        href={`/projects/${p.slug}`}
                        className="font-mono text-xs font-bold text-navy hover:text-orange flex items-center gap-1 uppercase tracking-wider mt-4"
                      >
                        <span>View Specs</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
