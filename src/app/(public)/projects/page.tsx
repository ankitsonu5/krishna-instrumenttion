'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  List, 
  Grid, 
  Calendar, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

import { projectsData } from './data';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'ledger'>('ledger'); // Ledger view by default for a technical distinct look

  // Extract unique filters
  const industries = useMemo(() => {
    const set = new Set(projectsData.map(p => p.industry));
    return ['All', ...Array.from(set)];
  }, []);

  const services = useMemo(() => {
    const set = new Set(projectsData.map(p => p.service));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter projects logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesIndustry = selectedIndustry === 'All' || project.industry === selectedIndustry;
      const matchesService = selectedService === 'All' || project.service === selectedService;

      return matchesSearch && matchesStatus && matchesIndustry && matchesService;
    });
  }, [searchTerm, selectedStatus, selectedIndustry, selectedService]);

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
            <div className="max-w-3xl flex flex-col gap-4">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                KIW TRACK RECORD
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Industrial Projects & Deliverables
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed">
                Explore our project ledger displaying completed and active installations, loops checking, and calibration operations across India.
              </p>
            </div>
          </div>
        </section>

        {/* CONTROLS & FILTER SECTION */}
        <section className="bg-white border-b border-steel/20 sticky top-[73px] z-20 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black-800 w-4.5 h-4.5" />
                <input 
                  type="text"
                  placeholder="Search by client, title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-steel/30 rounded text-sm font-sans focus:outline-none focus:border-orange bg-offwhite/50 text-graphite"
                />
              </div>

              {/* Filters list */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
                
                {/* Status Filter */}
                <div className="flex items-center gap-1.5 bg-offwhite border border-steel/20 px-3 py-2 rounded">
                  <span className="text-black-800/80">Status:</span>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent font-semibold text-navy focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>

                {/* Industry Filter */}
                <div className="flex items-center gap-1.5 bg-offwhite border border-steel/20 px-3 py-2 rounded">
                  <span className="text-black-800/80">Industry:</span>
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="bg-transparent font-semibold text-navy focus:outline-none cursor-pointer"
                  >
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
                    ))}
                  </select>
                </div>

                {/* Service Filter */}
                <div className="flex items-center gap-1.5 bg-offwhite border border-steel/20 px-3 py-2 rounded">
                  <span className="text-black-800/80">Service:</span>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="bg-transparent font-semibold text-navy focus:outline-none cursor-pointer max-w-[150px]"
                  >
                    {services.map(svc => (
                      <option key={svc} value={svc}>{svc === 'All' ? 'All Services' : svc}</option>
                    ))}
                  </select>
                </div>

                {/* View toggles */}
                <div className="hidden sm:flex border border-steel/20 rounded overflow-hidden">
                  <button 
                    onClick={() => setLayoutMode('ledger')}
                    className={`p-2 transition-colors ${layoutMode === 'ledger' ? 'bg-navy text-white' : 'bg-offwhite text-black-800 hover:bg-steel/10'}`}
                    title="Ledger (Table) View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setLayoutMode('grid')}
                    className={`p-2 transition-colors ${layoutMode === 'grid' ? 'bg-navy text-white' : 'bg-offwhite text-black-800 hover:bg-steel/10'}`}
                    title="Technical Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* LEDGER/GRID VIEW CONTAINER */}
        <section className="py-12 bg-offwhite min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter count header */}
            <div className="mb-6 flex justify-between items-center font-mono text-xs text-black-800">
              <span>LEDGER REPORT: {filteredProjects.length} RECORDS FOUND</span>
              <span className="text-orange font-bold">QA/QC APPROVED</span>
            </div>

            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-dashed border-steel/40 rounded-lg p-12 text-center text-sm font-sans text-black-800"
                >
                  No projects match your filter criteria. Try resetting search parameters.
                </motion.div>
              ) : layoutMode === 'ledger' ? (
                
                /* LEDGER (TABLE) VIEW - Distinct Technical Look */
                <motion.div 
                  key="ledger"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-steel/20 rounded-lg overflow-x-auto shadow-sm"
                >
                  <table className="min-w-full divide-y divide-steel/15 text-left font-sans text-xs">
                    <thead className="bg-navy text-white font-mono text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Project Title & Principal Client</th>
                        <th className="px-6 py-4">Sector</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Period</th>
                        <th className="px-6 py-4 text-right">Technical Spec</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel/10 text-graphite bg-white">
                      {filteredProjects.map((proj, idx) => (
                        <tr key={idx} className="hover:bg-offwhite/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              proj.status === 'Completed' 
                                ? 'bg-safety-green/10 text-safety-green' 
                                : 'bg-orange/10 text-orange'
                            }`}>
                              {proj.status === 'Completed' ? (
                                <CheckCircle2 className="w-2.5 h-2.5" />
                              ) : (
                                <Clock className="w-2.5 h-2.5" />
                              )}
                              {proj.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-sm text-navy">{proj.title}</div>
                            <div className="text-xs text-black-800/80 font-medium mt-0.5">{proj.client}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-black-800">
                            {proj.industry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-black-800 flex items-center gap-1 mt-1.5">
                            <MapPin className="w-3 h-3 text-orange" />
                            <span>{proj.location}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-black-800">
                            {proj.period}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link 
                              href={`/projects/${proj.slug}`}
                              className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-orange hover:text-navy uppercase tracking-wider transition-colors"
                            >
                              <span>View Specs</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>

              ) : (
                
                /* TECHNICAL GRID VIEW */
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((proj, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-steel/20 rounded-lg p-6 hover:shadow-md hover:border-steel/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Header Status */}
                        <div className="flex justify-between items-start mb-4">
                          <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            proj.status === 'Completed' 
                              ? 'bg-safety-green/10 text-safety-green' 
                              : 'bg-orange/10 text-orange'
                          }`}>
                            {proj.status}
                          </span>
                          <span className="font-mono text-[10px] text-black-800/80">{proj.period}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-base font-bold text-navy mb-1 leading-snug">
                          {proj.title}
                        </h3>
                        <p className="font-sans text-xs text-black-800/80 font-medium mb-3">{proj.client}</p>

                        {/* Scope preview */}
                        <p className="font-sans text-xs text-graphite/80 leading-relaxed mb-4 line-clamp-2">
                          {proj.scope}
                        </p>

                        {/* Meta */}
                        <div className="border-t border-steel/10 pt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono text-black-800">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-orange" />
                            {proj.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3 text-navy" />
                            {proj.industry}
                          </span>
                        </div>
                      </div>

                      {/* Detail CTA */}
                      <div className="mt-6 pt-4 border-t border-steel/10 flex justify-end">
                        <Link 
                          href={`/projects/${proj.slug}`}
                          className="font-mono text-xs font-bold text-orange hover:text-navy uppercase tracking-wider flex items-center gap-1 transition-colors"
                        >
                          <span>Detailed Scope</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
