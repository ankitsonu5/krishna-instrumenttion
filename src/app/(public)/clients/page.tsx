'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  ShieldCheck, 
  Info, 
  Workflow,
} from 'lucide-react';

const clientPartners = [
  {
    name: 'Indian Oil Corporation Ltd. (IOCL)',
    role: 'Site Owner & Direct Client',
    desc: 'KIW has executed multiple instrumentation setups, cabling, and loop checks directly for refinery units and pipeline networks under direct service contracts.',
    status: 'Verified Scope',
    logo: '/indianoil-logo.png',
    image: '/about-us/1.jpeg'
  },
  {
    name: 'NTPC Limited',
    role: 'Site Owner & Project Stakeholder',
    desc: 'Delivered boiler, turbine, and C&I loop checking services at super thermal power stations, coordinating with main automation contractors and local operators.',
    status: 'Verified Scope',
    logo: '/ntpc-logo.png',
    image: '/about-us/4.jpeg'
  },
  {
    name: 'PCBL (Phillips Carbon Black Ltd.)',
    role: 'Site Owner & Direct Client',
    desc: 'Executed end-to-end field cabling, junction box installations, and instrumentation loop testing under direct industrial execution orders.',
    status: 'Verified Scope',
    logo: '/pcbl-logo.png',
    image: '/about-us/3.jpeg'
  },
  {
    name: 'Balrampur Chini Mills Limited',
    role: 'Site Owner & Direct Client',
    desc: 'Performed off-season boiler maintenance calibration loops and field testing to ensure stable steam outputs during crushing runs.',
    status: 'Verified Scope',
    logo: '/balarampur-chini-mills-logo.png',
    image: '/about-us/5.jpeg'
  },
  {
    name: 'Yokogawa India Ltd.',
    role: 'Technology Provider & Principal Contractor',
    desc: 'Collaborated on DCS loop checking, marshalling panel terminal checks, and control logic checks as a subcontractor executing local works.',
    status: 'Verified Scope',
    logo: '/yokogawa-logo.png',
    image: '/about-us/7.jpeg'
  },
  {
    name: 'Emerson Process Management',
    role: 'Technology Provider & Principal Contractor',
    desc: 'Assisted in validating Ovation DCS signal loops and calibrating smart HART control valve positioners on critical boiler steam paths.',
    status: 'Verified Scope',
    logo: '/emerson-logo.png',
    image: '/about-us/8.jpeg'
  },
  {
    name: 'ABB',
    role: 'Technology Provider & Principal Contractor',
    desc: 'Supported substation control installations, telemetry configurations, and signal tests for local electrical systems.',
    status: 'Verified Scope',
    logo: '/abb-logo.png',
    image: '/about-us/9.jpeg'
  },
  {
    name: 'Siemens Energy',
    role: 'Technology Provider & Principal Contractor',
    desc: 'Executed cable tray setups, sensor mountings, and panel terminations under Siemens commissioning teams at turbine halls.',
    status: 'Verified Scope',
    logo: '/siemens-logo.png',
    image: '/about-us/2.jpeg'
  },
  {
    name: 'Honeywell',
    role: 'Technology Provider & Principal Contractor',
    desc: 'Assisted in field routing verification, signal integrity checking, and loop verification for Honeywell automation installations.',
    status: 'Verified Scope',
    logo: '/honeywell-logo.png',
    image: '/about-us/6.jpeg'
  }
];

export default function ClientsPage() {
  const [clientsList, setClientsList] = useState(clientPartners);

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) return;
        const ct = res.headers.get('content-type');
        if (!ct || !ct.includes('application/json')) return;
        const data = await res.json();
        if (data.ok && Array.isArray(data.data) && data.data.length > 0) {
          setClientsList(
            data.data.map((c: any) => ({
              name: c.name,
              role: c.role,
              desc: c.description,
              status: c.status,
              logo: c.logo_url || '/kiw-logo-1.png',
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load dynamic clients:', err);
      }
    }
    loadClients();
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
              backgroundImage: "url('/infrastructure-hero-bg.png')"
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
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                KIW INDUSTRIAL ECOSYSTEM
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Trusted in Complex Industrial Environments
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                KIW has delivered project work within industrial ecosystems involving leading organizations and technology providers across India.
              </p>
            </div>
          </div>
        </section>

        {/* LOGO COMPLIANCE & INFO SECTION */}
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Logo Compliance Banner */}
            <div className="mb-12 bg-white border border-steel/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex gap-4 items-start">
                <Info className="w-6 h-6 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-navy">Relationship Wording & Logo Compliance</h4>
                  <p className="font-sans text-xs text-graphite/75 leading-relaxed mt-1">
                    Logos and brand names are displayed to truthfully represent the industrial site owners, facilities, and main contractor ecosystems where KIW personnel have executed work.
                  </p>
                </div>
              </div>
              <div className="bg-navy/5 text-navy px-4 py-2 rounded font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-safety-green" />
                Verified Registry
              </div>
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientsList.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-white border border-steel/25 rounded-2xl p-6 hover:shadow-xl hover:border-orange/40 transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top Row: Client Logo & Role Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-steel/15">
                      <div className="w-14 h-14 bg-offwhite rounded-xl p-2 border border-steel/20 flex items-center justify-center shadow-xs group-hover:border-orange/30 transition-colors">
                        <img 
                          src={item.logo || '/kiw-logo-1.png'} 
                          alt={`${item.name} logo`} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-navy/5 text-navy group-hover:bg-orange/10 group-hover:text-orange px-3 py-1.5 rounded-lg border border-navy/10 group-hover:border-orange/20 transition-colors text-right">
                        {item.role}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-navy mb-2 leading-snug group-hover:text-navy">
                      {item.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-sans text-xs text-graphite/80 leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Stamp Footer */}
                  <div className="mt-6 pt-4 border-t border-steel/10 flex justify-between items-center text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 text-graphite/90">
                      <span className="w-2 h-2 rounded-full bg-safety-green" />
                      HSE Compliant
                    </span>
                    <span className="font-semibold text-navy bg-navy/5 px-2.5 py-1 rounded-md border border-navy/10">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy text-white py-16 border-t border-steel/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-2xl">
              Collaborating for Safe & Timely Plant Startups
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/85 max-w-2xl">
              We align with major instrumentation vendors and site owners to coordinate execution schedules, clearances, and loop check documentation.
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
