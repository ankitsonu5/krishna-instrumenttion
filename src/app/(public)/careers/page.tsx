'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Zap,
  Sliders,
  Users,
  ShieldCheck,
  Award,
  FileText,
  Briefcase,
  Upload,
  CheckCircle,
  File,
  X,
  Send,
  Loader2,
  MapPin,
  Clock,
  Calendar,
  Building
} from 'lucide-react';

const candidateCategories = [
  {
    title: 'Instrumentation Engineers',
    icon: Cpu,
    desc: 'C&I graduates/diploma holders experienced in loop checks, sensor calibration, and detail engineering.',
    roleValue: 'Instrumentation Engineer'
  },
  {
    title: 'Electrical Engineers',
    icon: Zap,
    desc: 'Electrical power systems, cabling schemes, switchgear operations, and motor control center setups.',
    roleValue: 'Electrical Engineer'
  },
  {
    title: 'Automation Professionals',
    icon: Sliders,
    desc: 'PLC / DCS / SCADA programming, HMI designing, control system logic integration, and commissioning.',
    roleValue: 'Automation / PLC / DCS Professional'
  },
  {
    title: 'Site Supervisors',
    icon: Users,
    desc: 'Managing cable tray runs, field mounts, site safety protocols, and daily contractor coordinate updates.',
    roleValue: 'Site Supervisor'
  },
  {
    title: 'Technicians',
    icon: Briefcase,
    desc: 'Expertise in impulse piping, tubing, glanding, termination, and primary instrument installations.',
    roleValue: 'Technician'
  },
  {
    title: 'QA/QC Professionals',
    icon: Award,
    desc: 'Managing calibration logs, verifying QA/QC trace compliance, standard checklist records, and punch-lists.',
    roleValue: 'QA/QC Professional'
  },
  {
    title: 'Safety Officers',
    icon: ShieldCheck,
    desc: 'HSE inspection, permit to work controls, toolbox talks compliance, and Zero LTI field execution.',
    roleValue: 'Safety Officer'
  },
  {
    title: 'Project Support Staff',
    icon: FileText,
    desc: 'Project coordination, stores logistics, instrumentation tool maintenance ledger, and documentation.',
    roleValue: 'Project Support Staff'
  }
];

export default function CareersPage() {
  const formRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentLocation: '',
    role: '',
    experience: '',
    preferredLocation: '',
    noticePeriod: '',
    consent: false
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
  };

  const handleApplyNow = (roleValue: string) => {
    setFormData(prev => ({ ...prev, role: roleValue }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setErrorMessage('Please upload your resume.');
      setSubmitStatus('error');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('You must accept the storage consent to apply.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API Submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        currentLocation: '',
        role: '',
        experience: '',
        preferredLocation: '',
        noticePeriod: '',
        consent: false
      });
      setResume(null);
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Design Grid Line Accents */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, #D7E0E8 1px, transparent 1px), linear-gradient(to right, rgba(215,224,232,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(215,224,232,0.05) 1px, transparent 1px)',
                backgroundSize: '24px 24px, 48px 48px, 48px 48px'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-5">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                CAREERS & GROWTH
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Build Industrial Systems. <br />Build Your Career.
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed max-w-2xl">
                Join a project-driven engineering organization working across instrumentation, electrical, automation, commissioning, maintenance and industrial execution.
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="font-sans text-sm font-semibold bg-orange text-white px-6 py-3 rounded hover:bg-orange/90 transition-all duration-300 shadow-md shadow-orange/20 cursor-pointer"
                >
                  Apply Online
                </button>
                <a
                  href="#categories"
                  className="font-sans text-sm font-semibold border border-steel/30 text-white px-6 py-3 rounded hover:bg-white/5 transition-all duration-300"
                >
                  Explore Roles
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CANDIDATE CATEGORIES SECTION */}
        <section id="categories" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                TALENT SEGMENTS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Who We Look For
              </h2>
              <p className="font-sans text-sm text-graphite/60 max-w-lg">
                We regularly hire skilled professionals across major engineering streams. Select a category below to pre-fill your application form.
              </p>
              <div className="h-1 w-16 bg-orange mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {candidateCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="border border-steel/20 rounded-lg p-6 bg-offwhite hover:bg-white hover:border-orange/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-10 w-10 rounded bg-navy/5 flex items-center justify-center text-navy mb-4 group-hover:bg-orange/10 group-hover:text-orange transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-base font-extrabold text-navy mb-2">
                        {cat.title}
                      </h3>
                      <p className="font-sans text-xs text-graphite/75 leading-relaxed mb-6">
                        {cat.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApplyNow(cat.roleValue)}
                      className="font-sans text-xs font-semibold text-orange hover:text-navy flex items-center gap-1 mt-auto cursor-pointer transition-colors duration-200"
                    >
                      <span>Apply for this Role</span>
                      <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section ref={formRef} className="py-24 bg-offwhite border-t border-steel/15 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-steel/20 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy px-8 py-8 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Building className="w-24 h-24" />
                </div>
                <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase">
                  SUBMIT PROFILE
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold mt-1">
                  Join Krishna Instrumentation Works
                </h3>
                <p className="font-sans text-xs sm:text-sm text-steel/80 mt-2 max-w-xl">
                  Please complete the form below. Our HR and technical selection panels review submissions weekly for ongoing and upcoming industrial project works.
                </p>
              </div>

              <div className="px-8 py-8">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-safety-green/10 text-safety-green flex items-center justify-center">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-heading text-lg font-bold text-navy">
                      Application Submitted Successfully!
                    </h4>
                    <p className="font-sans text-sm text-graphite/70 max-w-md">
                      Thank you for applying. Your profile details and resume have been securely registered in our career database. Our recruitment team will get in touch if your experience matches our current project openings.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-4 font-sans text-xs font-semibold text-orange hover:underline cursor-pointer"
                    >
                      Submit another application
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitStatus === 'error' && (
                      <div className="bg-orange/10 border border-orange/20 text-orange rounded p-3 text-xs font-sans">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                          placeholder="johndoe@example.com"
                        />
                      </div>

                      {/* Current Location */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="currentLocation" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Current Location *
                        </label>
                        <input
                          type="text"
                          id="currentLocation"
                          name="currentLocation"
                          required
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Role */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="role" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Applied Role *
                        </label>
                        <select
                          id="role"
                          name="role"
                          required
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                        >
                          <option value="">Select applied role</option>
                          <option value="Instrumentation Engineer">Instrumentation Engineer</option>
                          <option value="Electrical Engineer">Electrical Engineer</option>
                          <option value="Automation / PLC / DCS Professional">Automation / PLC / DCS Professional</option>
                          <option value="Site Supervisor">Site Supervisor</option>
                          <option value="Technician">Technician</option>
                          <option value="QA/QC Professional">QA/QC Professional</option>
                          <option value="Safety Officer">Safety Officer</option>
                          <option value="Project Support Staff">Project Support Staff</option>
                          <option value="Other">Other / General Application</option>
                        </select>
                      </div>

                      {/* Experience */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="experience" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Years of Experience *
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          required
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                        >
                          <option value="">Select experience level</option>
                          <option value="0-2 Years">0-2 Years (Entry/Junior)</option>
                          <option value="2-5 Years">2-5 Years (Mid-level)</option>
                          <option value="5-10 Years">5-10 Years (Senior)</option>
                          <option value="10+ Years">10+ Years (Lead / Expert)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Preferred Location */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="preferredLocation" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Preferred Work Location / Mobilization
                        </label>
                        <input
                          type="text"
                          id="preferredLocation"
                          name="preferredLocation"
                          value={formData.preferredLocation}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                          placeholder="e.g. Any, Jamnagar, Mundra, Mumbai"
                        />
                      </div>

                      {/* Notice Period */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="noticePeriod" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                          Notice Period *
                        </label>
                        <select
                          id="noticePeriod"
                          name="noticePeriod"
                          required
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                        >
                          <option value="">Select notice period</option>
                          <option value="Immediate">Immediate / Serving Notice</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="45-60 Days">45-60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                        Resume Upload *
                      </span>
                      
                      {!resume ? (
                        <label className="border-2 border-dashed border-steel/40 rounded-lg p-6 bg-offwhite flex flex-col items-center justify-center gap-2 hover:bg-steel/5 hover:border-orange/40 cursor-pointer transition-all duration-300">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileChange}
                            required
                          />
                          <Upload className="w-8 h-8 text-steel" />
                          <span className="font-sans text-sm font-semibold text-navy">
                            Click to upload or drag & drop
                          </span>
                          <span className="font-sans text-[10px] text-graphite/50">
                            PDF, DOC, DOCX up to 5MB
                          </span>
                        </label>
                      ) : (
                        <div className="border border-steel/30 rounded-lg p-4 bg-white flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-orange/10 text-orange rounded flex items-center justify-center">
                              <File className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans text-xs font-bold text-navy truncate max-w-[200px] sm:max-w-xs">
                                {resume.name}
                              </span>
                              <span className="font-sans text-[10px] text-graphite/50">
                                {(resume.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="h-8 w-8 rounded-full hover:bg-offwhite flex items-center justify-center text-steel hover:text-navy cursor-pointer transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 mt-4">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-orange focus:ring-orange border-steel rounded"
                      />
                      <label htmlFor="consent" className="font-sans text-xs text-graphite/75 leading-relaxed select-none">
                        I consent to Krishna Instrumentation storing my details and resume for current and future industrial project mobilization requirements. *
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all duration-300 shadow-md shadow-orange/20 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
