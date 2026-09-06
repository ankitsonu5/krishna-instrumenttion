'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';
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
  Info,
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

const detailIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

const servicesData: Record<string, {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  bullets: string[];
  ctaText: string;
}> = {
  'instrumentation-installation': {
    title: 'Instrumentation Installation',
    subtitle: 'Field installation support for accurate measurement, monitoring and control.',
    icon: Wrench,
    description: 'KIW provides complete field-level installation support for precision instruments. We ensure sensors, transmitters, and local valves are mounted securely and aligned precisely with plant metrics to prevent vibrations, moisture ingress, or false loops.',
    bullets: [
      'Instrument mounting and installation',
      'Cable and termination support',
      'Junction box and panel interfaces',
      'Impulse tubing and field work',
      'Documentation and coordination'
    ],
    ctaText: 'Request a Quote for Instrumentation Installation'
  },
  'electrical-installation': {
    title: 'Electrical Installation',
    subtitle: 'Reliable electrical installation and industrial site execution.',
    icon: Zap,
    description: 'Our electrical installation teams execute complex cabling, tray layout, and panel position operations with extreme technical discipline. We make sure all grounding and power junctions comply fully with safety norms.',
    bullets: [
      'Cable routing and laying',
      'Panel/equipment connections',
      'Termination and testing',
      'Earthing-related support',
      'Site documentation'
    ],
    ctaText: 'Request a Quote for Electrical Installation'
  },
  'mechanical-installation': {
    title: 'Mechanical Installation',
    subtitle: 'Mechanical installation aligned with project and plant requirements.',
    icon: Settings,
    description: 'Providing crucial support for mechanical mounting, structural frames, alignments, and alignment checks. We bridge the interface boundaries between mechanical structures and electrical/instrumentation systems.',
    bullets: [
      'Equipment installation support',
      'Mechanical coordination',
      'Alignment and site assistance',
      'Multi-discipline interface coordination',
      'Execution documentation'
    ],
    ctaText: 'Request a Quote for Mechanical Installation'
  },
  'control-instrumentation': {
    title: 'Control & Instrumentation',
    subtitle: 'C&I execution connecting field systems with control infrastructure.',
    icon: Layers,
    description: 'We connect field sensors and transmitters to centralized control rooms. Our technical team oversees junction cabling, field marshalling rack inputs, and ensures loops are ready for high-fidelity control runs.',
    bullets: [
      'Field instrument execution',
      'Control panel interface',
      'Signal and cable coordination',
      'Loop documentation',
      'System readiness support'
    ],
    ctaText: 'Request a Quote for Control & Instrumentation'
  },
  'plc-dcs-scada': {
    title: 'PLC, DCS & SCADA',
    subtitle: 'Automation support for control, monitoring and plant visibility.',
    icon: Cpu,
    description: 'Supporting logic configuration, signal verification, and graphics validation across DCS, PLC, and SCADA systems. We crosscheck controller communication link statuses to ensure maximum visibility.',
    bullets: [
      'PLC integration support',
      'DCS execution support',
      'SCADA support',
      'I/O and signal verification',
      'System testing and coordination'
    ],
    ctaText: 'Request a Quote for PLC, DCS & SCADA'
  },
  'testing-commissioning': {
    title: 'Testing & Commissioning',
    subtitle: 'Structured testing and commissioning for dependable readiness.',
    icon: FileCheck,
    description: 'Bringing systems online with a structured pre-commissioning checklist. We execute loop checks, verification runs, interlock testing, and coordinate punch-point closures to transition your plant into safe operations.',
    bullets: [
      'Pre-commissioning checks',
      'Functional testing',
      'Readiness verification',
      'Punch-point coordination',
      'Commissioning documentation'
    ],
    ctaText: 'Request a Quote for Testing & Commissioning'
  },
  'calibration-loop-checking': {
    title: 'Calibration & Loop Checking',
    subtitle: 'Calibration and loop verification for measurement reliability.',
    icon: Activity,
    description: 'Ensuring instrument drift is within tolerance limits. We run bench calibrations on pressure, level, temperature, and flow transmitters, providing detailed trace logs and checking loop continuity back to the DCS panel.',
    bullets: [
      'Field instrument calibration',
      'Loop continuity checks',
      'Signal verification',
      'Calibration records',
      'Issue closure support'
    ],
    ctaText: 'Request a Quote for Calibration & Loop Checking'
  },
  'operation-maintenance': {
    title: 'Operation & Maintenance',
    subtitle: 'Technical manpower and maintenance support for stable operation.',
    icon: CheckCircle2,
    description: 'Providing routine preventive checks, troubleshooting, and manpower placement for uninterrupted plant runs. We design preventive AMCs to reduce breakdowns and keep instrumentation aligned.',
    bullets: [
      'Routine inspection support',
      'Preventive maintenance',
      'Breakdown support',
      'Technical manpower',
      'Maintenance reporting'
    ],
    ctaText: 'Request a Quote for Operation & Maintenance'
  },
  'shutdown-turnaround': {
    title: 'Shutdown & Turnaround',
    subtitle: 'Planned shutdown execution focused on safety and schedule control.',
    icon: Calendar,
    description: 'Executing planned maintenance during tight shutdown windows. We coordinate multi-disciplinary crews, recalibrate transmitters, execute loop diagnostic tests, and verify system integration before plant startup.',
    bullets: [
      'Planning support',
      'Manpower mobilisation',
      'Multi-discipline execution',
      'Testing and restoration',
      'Progress and closure reporting'
    ],
    ctaText: 'Request a Quote for Shutdown & Turnaround'
  }
};

interface ServiceDetailClientProps {
  slug: string;
}

export default function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const [data, setData] = React.useState(servicesData[slug] || null);

  React.useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) return;
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) return;
        const resJson = await res.json();
        if (resJson.ok && Array.isArray(resJson.data)) {
          const found = resJson.data.find((item: any) => item.slug === slug);
          if (found) {
            setData({
              title: found.title,
              subtitle: found.short_desc,
              icon: detailIconMap[found.icon_name] || Wrench,
              description: found.short_desc,
              bullets: found.bullets || [],
              ctaText: `Request a Quote for ${found.title}`,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic service detail:", err);
      }
    }
    loadService();
  }, [slug]);

  if (!data) {
    notFound();
  }

  const Icon = data.icon || Wrench;

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
                INDUSTRIAL SERVICE DETAILS
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {data.title}
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                {data.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Description & Capabilities */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-2xl font-bold text-navy">
                    Technical Scope & Execution
                  </h2>
                  <div className="h-1 w-16 bg-orange" />
                  <p className="font-sans text-base text-graphite/85 leading-relaxed mt-2">
                    {data.description}
                  </p>
                </div>

                <div className="bg-offwhite border border-steel/30 rounded-lg p-8">
                  <h3 className="font-heading text-lg font-bold text-navy mb-6 uppercase tracking-wider border-b border-steel/10 pb-2">
                    Core Action Deliverables
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm text-graphite/90">
                    {data.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: QA Box & Contact CTA */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Scope Validation Alert */}
                <div className="bg-offwhite border border-orange/20 rounded-lg p-6 flex flex-col gap-4">
                  <div className="flex gap-2 items-center text-orange font-bold font-heading text-sm">
                    <Info className="w-5 h-5" />
                    <span>Scope Validation</span>
                  </div>
                  <p className="font-sans text-xs text-graphite/75 leading-relaxed">
                    All detailed technical claims and on-site capability assertions must be verified and approved by KIW project supervisors before final contract publication.
                  </p>
                  <div className="border-t border-steel/20 pt-3 text-[10px] font-mono text-black/80 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-safety-green" />
                    QA/QC STANDARDS COMPLIANT
                  </div>
                </div>

                {/* RFQ CTA panel */}
                <div className="bg-navy text-white rounded-lg p-8 flex flex-col gap-6 relative overflow-hidden border border-steel/10">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange/10 rounded-full blur-xl" />
                  
                  <div className="text-orange">
                    <Icon className="w-10 h-10" />
                  </div>

                  <h3 className="font-heading text-lg font-bold">
                    Start a Technical Discussion
                  </h3>

                  <p className="font-sans text-xs text-steel/80 leading-relaxed">
                    Ready to schedule resources, calibration parameters, or lay outline paths? Reach out to our field office.
                  </p>

                  <div>
                    <Link
                      href={`/contact?rfq=true&service=${slug}`}
                      className="font-sans text-xs font-semibold bg-orange text-white px-5 py-3.5 rounded hover:bg-orange/90 transition-all shadow-md shadow-orange/10 flex items-center justify-center gap-2 group w-full"
                    >
                      <span>{data.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
