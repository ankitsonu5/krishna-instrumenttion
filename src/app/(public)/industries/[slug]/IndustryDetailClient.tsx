'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';
import { 
  Flame, 
  Factory, 
  Compass, 
  Settings, 
  Building2, 
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Layers,
  Wrench,
  CheckCircle2
} from 'lucide-react';

const industriesData: Record<string, {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  challenges: string[];
  services: string[];
  experience: string[];
  approach: string[];
  ctaText: string;
}> = {
  'thermal-power': {
    title: 'Thermal Power Plants',
    subtitle: 'Instrumentation, electrical, automation, testing, commissioning and maintenance support for power generation facilities.',
    icon: Flame,
    challenges: [
      'Maintaining absolute accuracy under extreme boiler temperatures and high pressures.',
      'Integrating heterogeneous control systems during unit modernization cycles.',
      'Adhering to strict grid regulations and zero-shutdown tolerances.'
    ],
    services: [
      'Boiler & turbine instrumentation calibration',
      'SCADA, DCS, and PLC modernization loops',
      'Tray laying, cable dressing, and control room termination panels',
      'Loop checks and hot commissioning execution support'
    ],
    experience: [
      'NTPC Singrauli - Super Thermal Power Station unit modernization, C&I cabling, and boiler instrumentation calibration.',
      'NTPC Sipat - DCS / SCADA upgrade, system loop checking, and integration of smart transmitters.'
    ],
    approach: [
      'Adhere strictly to power plant safety clearances and permit-to-work (PTW) rules.',
      'Utilize highly accurate secondary calibration standards for high-temperature transmitters.',
      'Run sequential loop checks to confirm system readiness before final steam blow down.'
    ],
    ctaText: 'Discuss Power Plant Requirements'
  },
  'steel-plants': {
    title: 'Steel Plants',
    subtitle: 'Multi-discipline execution support for complex steel manufacturing environments.',
    icon: Factory,
    challenges: [
      'Continuous exposure to heavy vibration, slag dust, and high temperatures.',
      'Cabling paths threatened by high heat radiation and mechanical impact.',
      'Complex raw material handling and blast furnace automation dependencies.'
    ],
    services: [
      'Blast furnace instrumentation & control cabling',
      'High-temperature thermocouple and RTD calibration',
      'Marshalling rack installations and control desk setups',
      'Material handling automation panel connections'
    ],
    experience: [
      'JSPL Raigarh - Blast furnace automation, instrumentation cabling, calibration, and loop checking.'
    ],
    approach: [
      'Install armored cables and heavy-duty protective conduit pipes to withstand high-impact zones.',
      'Implement multi-level ground verification systems to mitigate electrical noise from heavy motors.',
      'Coordinate loop checks during scheduled blast furnace shut-down hours.'
    ],
    ctaText: 'Discuss Steel Plant Requirements'
  },
  'oil-gas': {
    title: 'Oil & Gas Sector',
    subtitle: 'Safety-focused instrumentation, control, electrical and commissioning support.',
    icon: Compass,
    challenges: [
      'Strict execution protocols within classified explosive hazard areas (Class I Div 1/2).',
      'Zero-tolerance policy towards safety loop failures (SIS / ESD).',
      'Complex documentation and QA audit pipelines.'
    ],
    services: [
      'Explosion-proof instrument mounting and cable glands fitting',
      'Emergency Shutdown System (ESD) loop testing',
      'Functional calibration of pressure, level, and gas leak sensors',
      'Commissioning support and trace certification loops'
    ],
    experience: [
      'IOCL Panipat - Refinery expansion C&I installation, field instrument mounting, junction box cabling, and automation testing.',
      'Chevron Bangladesh - Gas plant commissioning support, calibration of safety valves, transmitter verification, and loop checks.'
    ],
    approach: [
      'Deploy only ATEX/IECEx certified tools and intrinsically safe test equipment on site.',
      'Strict compliance with refinery safety audits, gas testing, and hazard area permits.',
      'Validate safety instrumented loops separately from basic control loops.'
    ],
    ctaText: 'Discuss Oil & Gas Requirements'
  },
  'process-industry': {
    title: 'Process Industry',
    subtitle: 'Control, measurement, automation and maintenance support for process operations.',
    icon: Settings,
    challenges: [
      'Precise chemical batching control and liquid mass flow tracking.',
      'Corrosive environments affecting sensor integrity.',
      'High accuracy required for sanitary and pharmaceutical lines.'
    ],
    services: [
      'Mass flow meter mounting and loop checks',
      'Control valve calibration and actuator alignments',
      'Batch controller configuration and SCADA interface integration',
      'Routine AMC diagnostic testing and validation'
    ],
    experience: [
      'RIL Malaysia - Petrochemical control system installation, DCS integration assistance, and loop checks.'
    ],
    approach: [
      'Conduct detailed chemical compatibility reviews before mounting impulse pipelines.',
      'Execute smart control valve positioner calibrations using HART communicators.',
      'Verify SCADA graphic animation accuracy against physical field states.'
    ],
    ctaText: 'Discuss Process Industry Requirements'
  },
  'cement': {
    title: 'Cement Plants',
    subtitle: 'Engineering execution and technical support for cement plant systems.',
    icon: Building2,
    challenges: [
      'Heavy clinker dust affecting optical sensors and physical connections.',
      'Extreme kiln vibrations threatening structural alignments.',
      'Large distance runs between sensor nodes and primary PLC units.'
    ],
    services: [
      'Kiln control loop instrumentation and cooling fan motor cabling',
      'Dust filter monitor sensors installation and loop checks',
      'Material transport automation sensor arrays calibration',
      'Sub-station panels cabling and panel interfaces'
    ],
    experience: [
      'Integrated field automation checks and heavy-duty cabling for leading Indian cement manufacturers.'
    ],
    approach: [
      'Use high-grade ingress-protected (IP67/68) enclosures and junction boxes.',
      'Enforce robust mechanical brackets and vibration-damping mount points.',
      'Deploy fiber-optic convertors to prevent signal drop across extended cable runs.'
    ],
    ctaText: 'Discuss Cement Plant Requirements'
  },
  'sugar': {
    title: 'Sugar Plants',
    subtitle: 'Instrumentation, electrical, automation and maintenance support for sugar facilities.',
    icon: Activity,
    challenges: [
      'High humidity, acidic vapor, and seasonal crushing stress.',
      'Tight off-season maintenance windows.',
      'Syncing crushing motor speeds with boiler output parameters.'
    ],
    services: [
      'Boiler instrumentation calibration and mill level sensors installation',
      'Evaporator control loops and juice pump speed control integration',
      'Off-season maintenance diagnostics and calibration loops verification',
      'DCS panel upgrades and control cabling tray support'
    ],
    experience: [
      'C&I loop testing and calibration for Balrampur Chini Mills plants during crushing and maintenance seasons.'
    ],
    approach: [
      'Execute deep off-season preventive maintenance and recalibrations to ensure maximum reliability during operations.',
      'Apply anti-corrosive coatings on terminal boards and panels.',
      'Integrate VFD (Variable Frequency Drive) speed sensors with main PLC loops.'
    ],
    ctaText: 'Discuss Sugar Plant Requirements'
  }
};

interface IndustryDetailClientProps {
  slug: string;
}

export default function IndustryDetailClient({ slug }: IndustryDetailClientProps) {
  const data = industriesData[slug];

  if (!data) {
    notFound();
  }

  const Icon = data.icon;

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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-4">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                INDUSTRIES WE SERVE
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
              
              {/* Left Column: Challenges, Services, Approach, Experience */}
              <div className="lg:col-span-8 flex flex-col gap-10">
                
                {/* Sector Challenges */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 uppercase tracking-wide">
                    <AlertTriangle className="w-5 h-5 text-orange" />
                    Sector-Specific Challenges
                  </h2>
                  <div className="h-0.5 w-16 bg-orange" />
                  <ul className="flex flex-col gap-3 font-sans text-sm text-graphite/85 mt-2">
                    {data.challenges.map((chal, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0 mt-2" />
                        <span>{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Services */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 uppercase tracking-wide">
                    <Layers className="w-5 h-5 text-navy" />
                    Our Relevant Services
                  </h2>
                  <div className="h-0.5 w-16 bg-navy/20" />
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans text-sm text-graphite/85 mt-2">
                    {data.services.map((svc, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-safety-green flex-shrink-0 mt-0.5" />
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Execution Approach */}
                <div className="flex flex-col gap-4 bg-offwhite border border-steel/30 rounded-lg p-6">
                  <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 uppercase tracking-wide">
                    <Wrench className="w-5 h-5 text-navy" />
                    Technical Execution Approach
                  </h2>
                  <div className="h-0.5 w-16 bg-navy/20" />
                  <ul className="flex flex-col gap-3 font-sans text-sm text-graphite/85 mt-2">
                    {data.approach.map((appr, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="font-mono text-xs text-orange font-bold mt-0.5">0{idx + 1}.</span>
                        <span>{appr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Experience */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-safety-green" />
                    Verified Project Experience
                  </h2>
                  <div className="h-0.5 w-16 bg-safety-green/30" />
                  <ul className="flex flex-col gap-3 font-sans text-sm text-graphite/85 mt-2">
                    {data.experience.map((exp, idx) => (
                      <li key={idx} className="flex gap-3 items-start p-4 bg-offwhite border border-steel/20 rounded">
                        <span className="font-bold text-navy mt-0.5">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: QA Box & Contact CTA */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* QA Box */}
                <div className="bg-offwhite border border-steel/30 rounded-lg p-6 flex flex-col gap-4">
                  <div className="flex gap-2 items-center text-navy font-bold font-heading text-sm">
                    <Info className="w-5 h-5 text-orange" />
                    <span>HSE Compliance</span>
                  </div>
                  <p className="font-sans text-xs text-graphite/75 leading-relaxed">
                    All operations within high-demand plant units are backed by professional QA/QC loop approvals, site coordinator checks, and pre-commissioning certifications.
                  </p>
                  <div className="border-t border-steel/20 pt-3 text-[10px] font-mono text-steel/80 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-safety-green" />
                    ZERO INCIDENT CULTURE
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
                    Ready to schedule resources, lay layout cables, or deploy engineering technicians to your plant site? Reach out.
                  </p>

                  <div>
                    <Link
                      href={`/contact?rfq=true&industry=${slug}`}
                      className="font-sans text-xs font-semibold bg-orange text-white px-5 py-3.5 rounded hover:bg-orange/90 transition-all shadow-md shadow-orange/10 flex items-center justify-center gap-2 group w-full text-center"
                    >
                      <span>{data.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform animate-pulse" />
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
