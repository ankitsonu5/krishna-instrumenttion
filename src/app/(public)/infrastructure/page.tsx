'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Wrench, 
  FileText, 
  Info, 
  ArrowRight,
  TrendingUp,
  Activity,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

const manpowerCategories = [
  { name: 'Experienced Engineers', count: '45+', desc: 'Degree/Diploma holders specializing in Control & Instrumentation (C&I) and Industrial Automation.' },
  { name: 'Site Supervisors', count: '30+', desc: 'Field-experienced supervisors managing day-to-day site installation, cable tray layouts, and safety.' },
  { name: 'Skilled Technicians', count: '120+', desc: 'Certified technicians executing physical mounts, impulse piping, and electrical gland terminations.' },
  { name: 'QA/QC Team', count: '15+', desc: 'Independent quality assurance engineers verifying calibration trace logs, loop continuity, and punch points.' },
  { name: 'Safety Officers', count: '20+', desc: 'HSE certified officers overseeing permit-to-work compliance, gas audits, and zero-accident policies.' },
  { name: 'Support Staff', count: '20+', desc: 'Dedicated logistics, tools coordination, and project document administrators.' }
];

// Equipment Registry conforming to the data model. 
// Features verified equipment and placeholder rows for validation.
const equipmentRegistry = [
  // 1. Calibration Equipment
  {
    name: 'Multi-Function Process Calibrator',
    category: 'Calibration Equipment',
    manufacturer: 'Fluke Corporation',
    model: 'Fluke 754 / HART',
    qty: '12 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-03-12',
    useCase: 'Bench and field calibration of pressure, temperature and electrical transmitter loops.',
    availability: 'Available'
  },
  {
    name: 'Dry-Block Temperature Calibrator',
    category: 'Calibration Equipment',
    manufacturer: 'Ametek / Jofra',
    model: 'CTC-650',
    qty: '6 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-04-05',
    useCase: 'High-temperature RTD & Thermocouple loops checking and sensor calibration.',
    availability: 'Available'
  },
  
  // 2. Electrical Testing Equipment
  {
    name: 'Digital Insulation Tester (Megger)',
    category: 'Electrical Testing Equipment',
    manufacturer: 'Megger Group',
    model: 'MIT515',
    qty: '15 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-01-20',
    useCase: 'HV/LV insulation resistance checks on control cables and tray systems.',
    availability: 'Available'
  },
  {
    name: 'True-RMS Digital Multimeter',
    category: 'Electrical Testing Equipment',
    manufacturer: 'Fluke Corporation',
    model: 'Fluke 87V',
    qty: '35 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-05-10',
    useCase: 'Continuity, voltage, current, and loop resistance diagnostics.',
    availability: 'Available'
  },
  {
    name: 'Digital Earth Resistance Tester',
    category: 'Electrical Testing Equipment',
    manufacturer: 'Megger Group',
    model: 'DET4TC',
    qty: '8 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-02-18',
    useCase: 'Soil resistivity and plant earthing loop compliance testing.',
    availability: 'Available'
  },

  // 3. Loop and Signal Tools
  {
    name: 'HART Field Communicator',
    category: 'Loop and Signal Tools',
    manufacturer: 'Emerson Process Management',
    model: 'TREX Device Communicator',
    qty: '10 Units',
    calibrationStatus: 'Verified Active',
    lastCalDate: '2026-03-28',
    useCase: 'Configuration and signal calibration of smart transmitters in refinery and power loops.',
    availability: 'Available'
  },

  // 4. Proposed / Verification Required Placeholders (No details published yet)
  {
    name: 'Proposed Automation Tools (PLC Programming)',
    category: 'Automation Tools',
    manufacturer: 'Pending KIW Verification',
    model: 'Verification Required',
    qty: 'Awaiting Validation',
    calibrationStatus: 'Verification Required',
    lastCalDate: 'N/A',
    useCase: 'Do not publish specific details until verified by KIW supervisors.',
    availability: 'Pending Audit'
  },
  {
    name: 'Proposed Mechanical / Installation Tools',
    category: 'Mechanical / Installation Tools',
    manufacturer: 'Pending KIW Verification',
    model: 'Verification Required',
    qty: 'Awaiting Validation',
    calibrationStatus: 'Verification Required',
    lastCalDate: 'N/A',
    useCase: 'Do not publish specific details until verified by KIW supervisors.',
    availability: 'Pending Audit'
  },
  {
    name: 'Proposed Safety Equipment (Gas Detectors & Fall Protection)',
    category: 'Safety Equipment',
    manufacturer: 'Pending KIW Verification',
    model: 'Verification Required',
    qty: 'Awaiting Validation',
    calibrationStatus: 'Verification Required',
    lastCalDate: 'N/A',
    useCase: 'Do not publish specific details until verified by KIW supervisors.',
    availability: 'Pending Audit'
  }
];

export default function InfrastructurePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Calibration Equipment', 'Electrical Testing Equipment', 'Loop and Signal Tools', 'Automation Tools', 'Mechanical / Installation Tools', 'Safety Equipment'];

  const filteredEquipment = selectedCategory === 'All' 
    ? equipmentRegistry 
    : equipmentRegistry.filter(e => e.category === selectedCategory);

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
                KIW RESOURCE REGISTER
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Equipped for Accurate, Safe and Scalable Execution
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                KIW maintains a trained technical workforce and a certified equipment inventory. All test kits undergo routine recalibration checks prior to plant deployment.
              </p>
            </div>
          </div>
        </section>

        {/* VERIFIED MANPOWER */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                HUMAN RESOURCES
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Verified Manpower Categories
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {manpowerCategories.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-offwhite border border-steel/20 rounded-lg p-6 flex gap-4 hover:shadow-sm transition-all"
                >
                  <div className="bg-navy/5 text-navy p-3 rounded h-fit flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-heading text-base font-bold text-navy">{item.name}</h3>
                      <span className="font-mono text-xs text-orange font-semibold bg-orange/5 px-2 py-0.5 rounded">{item.count}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-graphite/75 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ON-SITE ENGINEERING TEAM EXPERTISE */}
        <section className="py-20 bg-navy text-white relative overflow-hidden border-t border-b border-steel/15">
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Image (/about-us/6.jpeg) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-steel/20 bg-navy/40 group">
                  <img 
                    src="/about-us/6.jpeg" 
                    alt="KIW On-Site Engineering Team" 
                    className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-700 block"
                  />
                  
                  {/* Floating Experience Badge */}
                  <div className="mt-4 bg-navy/95 backdrop-blur-md p-4 rounded-xl border border-steel/20 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-orange font-bold uppercase tracking-wider block">DELEGATED FIELD FORCE</span>
                      <span className="font-heading text-sm font-bold text-white">250+ Certified On-Site Specialists</span>
                    </div>
                    <span className="font-mono text-xs text-safety-green font-bold bg-safety-green/20 px-2.5 py-1 rounded border border-safety-green/30">100% HSE Compliant</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Content */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex flex-col gap-5"
              >
                <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                  FIELD EXECUTION STRENGTH
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Experienced Engineering & Technical Workforce
                </h2>
                <div className="h-1 w-20 bg-orange" />

                <p className="font-sans text-sm sm:text-base text-steel/90 leading-relaxed">
                  At Krishna Instrumentation Works (KIW), our field operations are driven by a dedicated team of site engineers, QA/QC inspectors, safety officers, and skilled instrument technicians. Every team member undergoes project-specific HSE inductions and technical bench training prior to plant deployment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white/5 border border-steel/10 p-4 rounded-lg">
                    <h4 className="font-heading text-sm font-bold text-white mb-1">Continuous Training</h4>
                    <p className="font-sans text-xs text-steel/70">Regular calibration bench drills and safety permit verification standards.</p>
                  </div>
                  <div className="bg-white/5 border border-steel/10 p-4 rounded-lg">
                    <h4 className="font-heading text-sm font-bold text-white mb-1">Turnkey Supervision</h4>
                    <p className="font-sans text-xs text-steel/70">Seamless coordination with main consultants and plant operation leads.</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* EQUIPMENT REGISTRY */}
        <section className="py-20 bg-offwhite border-t border-b border-steel/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                HARDWARE INVENTORY
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Equipment & Tooling Ledger
              </h2>
              <div className="h-1 w-16 bg-orange mt-1" />
            </div>

            {/* Compliance Alert */}
            <div className="mb-8 bg-white border border-orange/20 rounded p-4 flex gap-3 items-start shadow-sm">
              <Info className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-graphite/75 leading-relaxed">
                <strong>Inventory Verification Compliance:</strong> The list below displays verified equipment names, models, quantities, and calibration statuses. Non-verified proposed tools are locked and labeled as <em>&quot;Verification Required&quot;</em> to comply with KIW accuracy guidelines.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 font-sans text-xs justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border rounded transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-navy text-white border-navy font-semibold' 
                      : 'bg-white text-graphite/85 hover:bg-navy/5 border-steel/30'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            {/* Equipment Ledger Table */}
            <div className="bg-white border border-steel/20 rounded-lg overflow-x-auto shadow-sm">
              <table className="min-w-full divide-y divide-steel/15 text-left font-sans text-xs">
                <thead className="bg-navy text-white font-mono text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Equipment / Model</th>
                    <th className="px-6 py-4">Manufacturer</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Last Calibration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel/10 text-graphite bg-white">
                  {filteredEquipment.map((item, idx) => (
                    <tr key={idx} className="hover:bg-offwhite/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          item.calibrationStatus === 'Verified Active' 
                            ? 'bg-safety-green/10 text-safety-green' 
                            : 'bg-orange/15 text-orange border border-orange/10'
                        }`}>
                          {item.calibrationStatus === 'Verified Active' ? (
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          ) : (
                            <Clock className="w-2.5 h-2.5" />
                          )}
                          {item.calibrationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-sm text-navy">{item.name}</div>
                        <div className="text-xs text-graphite/75 font-medium mt-0.5">Model: {item.model}</div>
                        <div className="text-[10px] text-graphite/70 italic mt-1 font-sans max-w-sm">{item.useCase}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-graphite/85">
                        {item.manufacturer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-graphite/85">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-graphite/85">
                        {item.qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-graphite/85">
                        {item.lastCalDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy text-white py-16 border-t border-steel/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-2xl">
              Initiate Technical Resource Allocations
            </h2>
            <p className="font-sans text-sm sm:text-base text-steel/85 max-w-2xl">
              Discuss specific test kits, calibrators, and technicians required for your on-site shutdown or installation.
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
