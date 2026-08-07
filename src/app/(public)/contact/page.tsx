'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Upload,
  File,
  X,
  ShieldCheck,
  Building2,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

// Contact & RFQ Form Component that uses Search Params
function ContactFormContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    email: '',
    phone: '',
    projectLocation: '',
    industry: '',
    service: '',
    projectStatus: '',
    startDate: '',
    requirementSummary: '',
    consent: false,
    // Spam protection math captcha
    captchaAnswer: '',
    // Honeypot field (should remain empty)
    website: ''
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Random captcha generation
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, result: 0 });

  // Generate Captcha and parse UTM parameters on mount
  useEffect(() => {
    generateCaptcha();
    
    // Parse UTM Parameters
    if (searchParams) {
      const utm: Record<string, string> = {};
      const params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      params.forEach(param => {
        const val = searchParams.get(param);
        if (val) utm[param] = val;
      });
      // Also pre-fill RFQ toggle if set
      const isRfq = searchParams.get('rfq');
      if (isRfq && formRef.current) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      setUtmParams(utm);
    }
  }, [searchParams]);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({
      num1,
      num2,
      result: num1 + num2
    });
  };

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
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAttachment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Honeypot spam check
    if (formData.website) {
      // Quietly simulate success to spam bots
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
    }

    // Client-side validations
    if (!formData.name.trim()) return setError('Name is required.');
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError('Please enter a valid official email address.');
    if (!formData.phone.match(/^\+?[0-9\s\-]{8,15}$/)) return setError('Please enter a valid phone number.');
    if (!formData.consent) return setError('You must consent to the storage policies to submit an RFQ.');
    if (parseInt(formData.captchaAnswer) !== captcha.result) {
      generateCaptcha();
      return setError('Security Verification answer is incorrect. Please try again.');
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API Submission (client-server validation & mailing)
    try {
      // Simulate endpoint post payload logic
      const submissionPayload = {
        ...formData,
        attachmentName: attachment ? attachment.name : null,
        utm: utmParams,
        submittedAt: new Date().toISOString()
      };

      console.log('Sending RFQ Payload to server:', submissionPayload);
      
      // Simulate server-side processing & mail notifications (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        company: '',
        designation: '',
        email: '',
        phone: '',
        projectLocation: '',
        industry: '',
        service: '',
        projectStatus: '',
        startDate: '',
        requirementSummary: '',
        consent: false,
        captchaAnswer: '',
        website: ''
      });
      setAttachment(null);
      generateCaptcha();
    } catch (err) {
      setErrorMessage('Server error processing your request. Please try again or email directly.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const setError = (msg: string) => {
    setErrorMessage(msg);
    setSubmitStatus('error');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={formRef} className="bg-white border border-steel/20 rounded-xl shadow-md overflow-hidden scroll-mt-24">
      {/* Form Header */}
      <div className="bg-navy px-6 py-6 sm:px-8 sm:py-8 text-white relative">
        <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase">
          PROJECT PROCUREMENT
        </span>
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold mt-1">
          Request a Quote / Proposal
        </h3>
        <p className="font-sans text-xs sm:text-sm text-steel/80 mt-2 max-w-xl">
          Submit your instrumentation, electrical, shutdown support, calibration, or system integration specifications. Our estimation team will respond with a technical proposal.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center text-center gap-4 animate-fade-in"
          >
            <div className="h-16 w-16 rounded-full bg-safety-green/10 text-safety-green flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-heading text-lg font-bold text-navy">
              RFQ Received Successfully
            </h4>
            <p className="font-sans text-sm text-graphite/70 max-w-md leading-relaxed">
              Thank you. Your project request has been logged. An email confirmation has been sent to your address, and our engineering division has been notified. We will review your attachment and requirements within 24-48 business hours.
            </p>
            {Object.keys(utmParams).length > 0 && (
              <div className="text-[10px] font-mono text-steel/80 mt-2">
                Tracking source recorded successfully.
              </div>
            )}
            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-4 font-sans text-xs font-semibold text-orange hover:underline cursor-pointer"
            >
              Submit another RFQ
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitStatus === 'error' && (
              <div className="bg-orange/10 border border-orange/20 text-orange rounded p-3 text-xs font-sans flex items-center gap-2">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Honeypot field (hidden from users) */}
            <div className="hidden">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
                placeholder="Leave this empty"
              />
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="company" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="e.g. Reliance Industries / L&T"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="designation" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="e.g. Procurement Lead / Project Manager"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Official Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  placeholder="e.g. +91 98765 43210"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="projectLocation" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Project Location *
                </label>
                <input
                  type="text"
                  id="projectLocation"
                  name="projectLocation"
                  required
                  value={formData.projectLocation}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="City, State"
                />
              </div>
            </div>

            {/* Scope / Industry Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="industry" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Industry Sector
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-navy transition-all"
                >
                  <option value="">Select industry</option>
                  <option value="Refineries & Petrochemicals">Refineries & Petrochemicals</option>
                  <option value="Chemicals & Fertilizers">Chemicals & Fertilizers</option>
                  <option value="Power Generation">Power Generation</option>
                  <option value="Cement & Metallurgy">Cement & Metallurgy</option>
                  <option value="Water Treatment">Water & Wastewater</option>
                  <option value="Pharmaceuticals & Food">Pharmaceuticals & Food</option>
                  <option value="Other">Other sector</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="service" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Core Service Requested
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-navy transition-all"
                >
                  <option value="">Select service type</option>
                  <option value="Instrumentation Installation">Instrumentation Installation</option>
                  <option value="Electrical & Cabling">Electrical & Cabling</option>
                  <option value="PLC / DCS / SCADA Automation">PLC / DCS / SCADA Automation</option>
                  <option value="Testing & Commissioning Support">Testing & Commissioning</option>
                  <option value="Annual Maintenance / Shutdowns">Annual Maintenance & Shutdowns</option>
                  <option value="Manpower Supply (Deputation)">Technical Manpower Supply</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="projectStatus" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Project Status
                </label>
                <select
                  id="projectStatus"
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-navy transition-all"
                >
                  <option value="">Select status</option>
                  <option value="Planning / Concept Stage">Planning / Concept</option>
                  <option value="Budgeting / Approved Funds">Budgeting & Estimates</option>
                  <option value="Active RFQ / Tendering">Active RFQ / Tendering</option>
                  <option value="Immediate Execution Needed">Immediate Execution</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Expected Start Date */}
              <div className="flex flex-col gap-1">
                <label htmlFor="startDate" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                  Expected Mobilization Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                />
              </div>

              {/* Security Question */}
              <div className="flex flex-col gap-1">
                <label htmlFor="captchaAnswer" className="font-sans text-xs font-bold text-navy uppercase tracking-wider flex items-center justify-between">
                  <span>Security Verification *</span>
                  <span className="font-mono text-orange font-extrabold text-sm">{captcha.num1} + {captcha.num2} = ?</span>
                </label>
                <input
                  type="number"
                  id="captchaAnswer"
                  name="captchaAnswer"
                  required
                  value={formData.captchaAnswer}
                  onChange={handleInputChange}
                  className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all"
                  placeholder="Solve the sum"
                />
              </div>
            </div>

            {/* Requirement Summary */}
            <div className="flex flex-col gap-1">
              <label htmlFor="requirementSummary" className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                Requirement Summary *
              </label>
              <textarea
                id="requirementSummary"
                name="requirementSummary"
                required
                rows={4}
                value={formData.requirementSummary}
                onChange={handleInputChange}
                className="w-full bg-offwhite border border-steel/30 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-navy transition-all resize-none"
                placeholder="Describe your instrumentation layout, quantity loops, safety compliance requirements, or mobilization schedule..."
              />
            </div>

            {/* Attachment */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold text-navy uppercase tracking-wider">
                Specifications / BoQ File Attachment
              </span>
              
              {!attachment ? (
                <label className="border-2 border-dashed border-steel/40 rounded-lg p-5 bg-offwhite flex flex-col items-center justify-center gap-1.5 hover:bg-steel/5 hover:border-orange/40 cursor-pointer transition-all duration-300">
                  <input
                    type="file"
                    accept=".pdf,.xls,.xlsx,.doc,.docx,.zip"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Upload className="w-6 h-6 text-steel" />
                  <span className="font-sans text-xs font-semibold text-navy">
                    Click to attach specifications sheet or BoQ
                  </span>
                  <span className="font-sans text-[9px] text-graphite/50">
                    PDF, EXCEL, WORD, ZIP up to 10MB
                  </span>
                </label>
              ) : (
                <div className="border border-steel/30 rounded-lg p-3.5 bg-white flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-orange/10 text-orange rounded flex items-center justify-center">
                      <File className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-bold text-navy truncate max-w-[200px] sm:max-w-xs">
                        {attachment.name}
                      </span>
                      <span className="font-sans text-[9px] text-graphite/50">
                        {(attachment.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="h-7 w-7 rounded-full hover:bg-offwhite flex items-center justify-center text-steel hover:text-navy cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-0.5 h-4 w-4 text-orange focus:ring-orange border-steel rounded"
              />
              <label htmlFor="consent" className="font-sans text-xs text-graphite/75 leading-relaxed select-none">
                I verify that this request is a technical or commercial procurement inquiry and consent to sharing these project specifications with KIW engineering team. *
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-sans text-sm font-semibold bg-orange text-white px-8 py-3.5 rounded hover:bg-orange/90 transition-all duration-300 shadow-md shadow-orange/20 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing RFQ...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Proposal Request</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
            <div className="max-w-3xl flex flex-col gap-4">
              <span className="font-mono text-xs text-orange font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                GET IN TOUCH
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Start a Technical Conversation
              </h1>
              <p className="font-sans text-base sm:text-lg text-steel/90 leading-relaxed max-w-2xl">
                Share your project requirement, manpower need, shutdown plan, maintenance requirement or automation scope with KIW.
              </p>
            </div>
          </div>
        </section>

        {/* DETAILS & FORM SPLIT */}
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* CONTACT DETAILS (Left Column: 5 Cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest block mb-2">
                    OFFICE LOCATIONS
                  </span>
                  <h2 className="font-heading text-2xl font-extrabold text-navy leading-tight">
                    Establish Connection
                  </h2>
                  <div className="h-1 w-12 bg-orange mt-3 mb-6" />
                  <p className="font-sans text-sm text-graphite/75 leading-relaxed">
                    Our technical offices in Panipat and Varanasi provide regional engineering coordination, site management, calibration lab accessibility, and rapid mobilization support across northern, western, and eastern industrial zones.
                  </p>
                </div>

                {/* Offices Cards */}
                <div className="space-y-4">
                  {/* Head Office */}
                  <div className="bg-white border border-steel/20 rounded-lg p-6 shadow-sm flex gap-4 items-start">
                    <div className="h-9 w-9 rounded bg-navy/5 text-navy flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-sm font-extrabold text-navy">
                          Head Office
                        </h4>
                        <span className="font-mono text-[9px] bg-orange/10 text-orange px-1.5 py-0.5 rounded font-semibold">
                          HQ
                        </span>
                      </div>
                      <p className="font-sans text-xs text-graphite/80 leading-relaxed mt-2">
                        5B, Saraswati Vihar Colony, Panipat, Haryana - 132103
                      </p>
                    </div>
                  </div>

                  {/* Branch Office */}
                  <div className="bg-white border border-steel/20 rounded-lg p-6 shadow-sm flex gap-4 items-start">
                    <div className="h-9 w-9 rounded bg-navy/5 text-navy flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-heading text-sm font-extrabold text-navy">
                        Varanasi Branch
                      </h4>
                      <p className="font-sans text-xs text-graphite/80 leading-relaxed mt-2">
                        10A, Narottampur, Dafi, Lanka, Varanasi - 221011
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Communications */}
                <div className="bg-white border border-steel/20 rounded-lg p-6 shadow-sm space-y-4">
                  <h4 className="font-heading text-sm font-extrabold text-navy mb-2">
                    Direct Contacts
                  </h4>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                    <div className="flex flex-col">
                      <a href="tel:+918279672089" className="font-sans text-xs font-semibold text-graphite hover:text-orange transition-colors">
                        +91 8279672089
                      </a>
                      <a href="tel:+919451147479" className="font-sans text-xs font-semibold text-graphite hover:text-orange transition-colors">
                        +91 9451147479
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-steel/15 w-full my-2" />

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                    <div className="flex flex-col">
                      <a href="mailto:akhileshwar_66@yahoo.co.in" className="font-sans text-xs font-semibold text-graphite hover:text-orange transition-colors break-all">
                        akhileshwar_66@yahoo.co.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Compliance info notice */}
                <div className="bg-white border border-safety-green/20 rounded p-4 flex gap-3 items-start shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-safety-green flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-graphite/75 leading-relaxed">
                    <strong>Secure Transmission:</strong> All submitted design manuals, bill of quantities (BoQ) listings, and project briefs are treated as proprietary and handled under strict confidentiality protocols.
                  </p>
                </div>
              </div>

              {/* RFQ FORM (Right Column: 7 Cols) */}
              <div className="lg:col-span-7">
                <Suspense fallback={
                  <div className="bg-white border border-steel/20 rounded-xl p-8 shadow-md flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-orange" />
                    <span className="font-sans text-xs text-graphite/60 mt-4">Loading application form...</span>
                  </div>
                }>
                  <ContactFormContent />
                </Suspense>
              </div>

            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="bg-white py-16 border-t border-steel/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-2">
              <span className="font-mono text-xs text-orange font-semibold uppercase tracking-widest">
                LOCATE US
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
                Office Map Coordinates
              </h2>
              <div className="h-1 w-12 bg-orange mt-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Panipat Head Office Map */}
              <div className="bg-offwhite border border-steel/20 rounded-xl p-4 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center px-1">
                  <span className="font-heading text-sm sm:text-base font-extrabold text-navy">Head Office (Panipat, Haryana)</span>
                  <span className="font-mono text-[9px] bg-orange/10 text-orange px-1.5 py-0.5 rounded font-semibold">HQ</span>
                </div>
                <div className="w-full h-80 rounded-lg overflow-hidden relative bg-steel/10 border border-steel/20 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.9090623253245!2d76.99341499999999!3d29.402283000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddb1a13a96865%3A0xe54d8f8a846174bb!2sSaraswati%20Vihar%20Colony%2C%20Panipat%2C%20Haryana%20132103!5e0!3m2!1sen!2sin!4v1717585000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Varanasi Branch Office Map */}
              <div className="bg-offwhite border border-steel/20 rounded-xl p-4 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center px-1">
                  <span className="font-heading text-sm sm:text-base font-extrabold text-navy">Branch Office (Varanasi, UP)</span>
                  <span className="font-mono text-[9px] bg-navy/10 text-navy px-1.5 py-0.5 rounded font-semibold">BRANCH</span>
                </div>
                <div className="w-full h-80 rounded-lg overflow-hidden relative bg-steel/10 border border-steel/20 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3846669966144!2d82.981881!3d25.257628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e31eeaaaaaaab%3A0x7dcd12c34d31e9c9!2sDafi%2C%20Varanasi%2C%20Uttar%20Pradesh%20221011!5e0!3m2!1sen!2sin!4v1717585100000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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
