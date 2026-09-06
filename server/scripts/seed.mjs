import { db } from "../db.mjs";

console.log("🌱 Starting full database seeding with real Krishna Instrumentation website content...");

// 1. Clear existing tables
db.exec(`
  DELETE FROM hero_banners;
  DELETE FROM services;
  DELETE FROM industries;
  DELETE FROM projects;
  DELETE FROM clients;
  DELETE FROM infrastructure_manpower;
  DELETE FROM infrastructure_equipment;
  DELETE FROM careers;
  DELETE FROM gallery;
  DELETE FROM page_contents;
  DELETE FROM categories;
  DELETE FROM products;
  DELETE FROM sqlite_sequence;
`);

// 2. Seed Hero Banner
const insertBanner = db.prepare(`
  INSERT INTO hero_banners (title, subtitle, media_type, media_url, cta_text, cta_link, sort_order, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)
`);
insertBanner.run(
  "Engineering Precision for Mission-Critical Industries",
  "Krishna Instrumentation Works delivers instrumentation, electrical, automation, testing, commissioning, calibration and industrial execution solutions across India.",
  "video",
  "/kiw-hero-video.mp4",
  "Discuss Your Project",
  "/contact",
  1
);

// 3. Seed Services
const insertService = db.prepare(`
  INSERT INTO services (title, slug, icon_name, short_desc, bullets_json, sort_order)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const servicesList = [
  {
    title: 'Instrumentation Installation',
    slug: 'instrumentation-installation',
    icon_name: 'Wrench',
    short_desc: 'Field instrument mounting, cabling, junction box installation, and impulse piping works.',
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
    icon_name: 'Zap',
    short_desc: 'Power and control cabling, panel positioning, tray laying, and earthing execution support.',
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
    icon_name: 'Settings',
    short_desc: 'Coordinating mechanical assembly, site alignment, and structural support systems.',
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
    icon_name: 'Layers',
    short_desc: 'Connecting critical field sensors with main plant controllers and control rooms.',
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
    icon_name: 'Cpu',
    short_desc: 'System loop checks, panel configurations, and communication link testing.',
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
    icon_name: 'FileCheck',
    short_desc: 'Pre-commissioning checks, loop testing, functional runs, and punch-point clearance.',
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
    icon_name: 'Activity',
    short_desc: 'Precision field/bench calibration and full I/O loop testing with master instruments.',
    bullets: [
      'Field instrument calibration',
      'Loop continuity verification',
      'Signal accuracy checks',
      'Master instrument calibration',
      'Documentation records'
    ]
  },
  {
    title: 'Site Supervision & QA/QC',
    slug: 'site-supervision-qa-qc',
    icon_name: 'ShieldCheck',
    short_desc: 'Full-time site engineers ensuring adherence to safety norms, P&ID standards, and schedules.',
    bullets: [
      'Site supervision',
      'Quality checks and verification',
      'Safety and compliance checks',
      'Schedule coordination',
      'Inspection reports'
    ]
  },
  {
    title: 'Annual Maintenance (AMC)',
    slug: 'annual-maintenance-contracts',
    icon_name: 'Calendar',
    short_desc: 'Comprehensive round-the-clock plant maintenance, calibration audits, and turnaround support.',
    bullets: [
      'Routine maintenance support',
      'Shutdown/turnaround support',
      'Preventive inspection visits',
      'Rapid breakdown response',
      'Maintenance reporting'
    ]
  }
];

servicesList.forEach((s, idx) => {
  insertService.run(s.title, s.slug, s.icon_name, s.short_desc, JSON.stringify(s.bullets), idx + 1);
});

// 4. Seed Industries
const insertIndustry = db.prepare(`
  INSERT INTO industries (title, slug, icon_name, short_desc, challenge, image_url, logo_url, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const industriesList = [
  {
    title: 'Thermal Power',
    slug: 'thermal-power',
    icon_name: 'Flame',
    short_desc: 'Instrumentation, electrical, automation, testing, commissioning and maintenance support for power generation facilities.',
    challenge: 'High steam temperature, pressure fluctuations, and compliance with grid guidelines.',
    image_url: '/industries/thermal-power.png',
    logo_url: '/industries/thermal-power-logo.png'
  },
  {
    title: 'Steel Plants',
    slug: 'steel-plants',
    icon_name: 'Factory',
    short_desc: 'Multi-discipline execution support for complex steel manufacturing environments.',
    challenge: 'Continuous high heat, heavy dust loads, and complex automation sequences.',
    image_url: '/industries/steel-plants.png',
    logo_url: '/industries/steel-plants-logo.png'
  },
  {
    title: 'Oil & Gas',
    slug: 'oil-gas',
    icon_name: 'Compass',
    short_desc: 'Safety-focused instrumentation, control, electrical and commissioning support.',
    challenge: 'Hazardous environments, explosive atmospheres, and strict safety loops.',
    image_url: '/industries/oil-gas.png',
    logo_url: '/industries/oil-gas-logo.png'
  },
  {
    title: 'Process Industry',
    slug: 'process-industry',
    icon_name: 'Settings',
    short_desc: 'Control, measurement, automation and maintenance support for process operations.',
    challenge: 'Batch control consistency, precision chemical flow, and calibration alignment.',
    image_url: '/industries/process-industry.png',
    logo_url: '/industries/process-industry-logo.png'
  },
  {
    title: 'Cement',
    slug: 'cement',
    icon_name: 'Building2',
    short_desc: 'Engineering execution and technical support for cement plant systems.',
    challenge: 'Extreme vibration, abrasive dust, and kiln rotation alignment tracking.',
    image_url: '/industries/cement.png',
    logo_url: '/industries/cement-logo.png'
  },
  {
    title: 'Sugar',
    slug: 'sugar',
    icon_name: 'Activity',
    short_desc: 'Instrumentation, electrical, automation and maintenance support for sugar facilities.',
    challenge: 'High moisture, seasonal operations pressure, and speed controls.',
    image_url: '/industries/sugar.png',
    logo_url: '/industries/sugar-logo.png'
  },
  {
    title: 'Smart Water Management System',
    slug: 'smart-water-management',
    icon_name: 'Droplets',
    short_desc: 'Real-time telemetry, ultrasonic flowmeters, pressure control loops, and SCADA automation for municipal and industrial water distribution.',
    challenge: 'Unaccounted water loss tracking, remote telemetry link reliability, and flow balancing.',
    image_url: '/industries/smart-water-management.webp',
    logo_url: '/kiw-logo-1.png'
  },
  {
    title: 'Smart Drainage Management System',
    slug: 'smart-drainage-system',
    icon_name: 'Waves',
    short_desc: 'Automated stormwater level sensors, overflow alarm telemetry, pump station controllers, and environmental compliance logging.',
    challenge: 'Peak monsoon runoff surge handling, hazardous gas detection, and sensor submergence durability.',
    image_url: '/industries/drainage-system.jpeg',
    logo_url: '/kiw-logo-1.png'
  },
  {
    title: 'Smart Barrage System',
    slug: 'smart-barrage-system',
    icon_name: 'Layers',
    short_desc: 'Automated radial gate positioning, ultrasonic water head measurement, silt discharge automation, and SCADA control panels.',
    challenge: 'High hydrological silt stress, remote solar power backup reliability, and precision sluice gate synchronization.',
    image_url: '/industries/Smart Barrage System.webp',
    logo_url: '/kiw-logo-1.png'
  }
];

industriesList.forEach((ind, idx) => {
  insertIndustry.run(ind.title, ind.slug, ind.icon_name, ind.short_desc, ind.challenge, ind.image_url, ind.logo_url, idx + 1);
});

// 5. Seed Projects (All Verified Completed & Ongoing)
const insertProject = db.prepare(`
  INSERT INTO projects (slug, title, client, location, industry, status, service, period, scope, outcome, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const projectsList = [
  {
    slug: 'iocl-panipat',
    title: 'Refinery Expansion C&I Installation',
    client: 'Indian Oil Corporation Ltd. (IOCL)',
    location: 'Panipat, Haryana',
    industry: 'Oil & Gas',
    status: 'Completed',
    service: 'Instrumentation Installation',
    period: '2023 - 2024',
    scope: 'Installation of high-pressure field transmitters, laying of signal cables, junction box dress-up, and loop checking.',
    outcome: 'Successfully synchronized 500+ control loops with primary DCS without delay.'
  },
  {
    slug: 'chevron-bangladesh',
    title: 'Gas Field Commissioning & Calibration',
    client: 'Chevron Bangladesh',
    location: 'Bibiyana, Bangladesh',
    industry: 'Oil & Gas',
    status: 'Completed',
    service: 'Testing & Commissioning',
    period: '2023',
    scope: 'Bench calibration of pressure & temperature loops, safety interlock verification, and loop continuity.',
    outcome: 'Verified all ESD (Emergency Shutdown) loops ensuring zero-leak validation.'
  },
  {
    slug: 'ril-malaysia',
    title: 'Petrochemical Complex C&I Support',
    client: 'RIL Malaysia',
    location: 'Melaka, Malaysia',
    industry: 'Oil & Gas',
    status: 'Completed',
    service: 'PLC, DCS & SCADA',
    period: '2022 - 2023',
    scope: 'DCS marshalling cabinet installation, field termination checks, and loop signal verification.',
    outcome: 'Completed pre-commissioning check loops ahead of the plant turnaround schedule.'
  },
  {
    slug: 'ntpc-singrauli',
    title: 'Super Thermal Power Unit Modernization',
    client: 'NTPC',
    location: 'Singrauli, Uttar Pradesh',
    industry: 'Thermal Power',
    status: 'Completed',
    service: 'Calibration & Loop Checking',
    period: '2022',
    scope: 'Full recalibration of boiler transmitters, pulse pipe laychecks, and local panel cabling.',
    outcome: 'Enhanced measurement reliability of critical turbine parameters by 15%.'
  },
  {
    slug: 'ntpc-darlipalli-completed',
    title: 'Boiler C&I Installation Support',
    client: 'NTPC',
    location: 'Darlipalli, Odisha',
    industry: 'Thermal Power',
    status: 'Completed',
    service: 'Control & Instrumentation',
    period: '2021 - 2022',
    scope: 'Mounted draft gauges, level transmitters, temperature elements, and associated cable trays.',
    outcome: 'Completed all trial run loop checks with zero fatal audit punch-points.'
  },
  {
    slug: 'pcbl-chennai',
    title: 'Carbon Black Plant Expansion Execution',
    client: 'PCBL',
    location: 'Chennai, Tamil Nadu',
    industry: 'Process Industry',
    status: 'Completed',
    service: 'Electrical & Instrumentation',
    period: '2022',
    scope: 'Installation of flameproof field junction boxes, thermocouple runs, and flow transmitter setups.',
    outcome: 'Commissioned reactor loop instrumentation safely ahead of client deadline.'
  },
  {
    slug: 'balrampur-chini-kumbhi',
    title: 'Boiler C&I Automation & Maintenance',
    client: 'Balrampur Chini Mills Limited',
    location: 'Kumbhi, Uttar Pradesh',
    industry: 'Sugar',
    status: 'Completed',
    service: 'Annual Maintenance (AMC)',
    period: '2023',
    scope: 'Seasonal overhaul, recalibration of all steam drum level transmitters, and DCS loop verification.',
    outcome: 'Zero downtime during peak crushing season.'
  },
  {
    slug: 'ntpc-talcher-ongoing',
    title: 'Thermal Power Expansion Unit C&I Works',
    client: 'NTPC',
    location: 'Talcher, Odisha',
    industry: 'Thermal Power',
    status: 'Ongoing',
    service: 'Instrumentation Installation',
    period: '2024 - Present',
    scope: 'Laying of 30,000+ meters of signal cable, installation of local instrument racks, and DCS marshalling integration.',
    outcome: 'Execution progressing strictly according to the critical path timeline.'
  },
  {
    slug: 'iocl-paradip-ongoing',
    title: 'Polypropylene Unit Instrumentation Support',
    client: 'Indian Oil Corporation Ltd. (IOCL)',
    location: 'Paradip, Odisha',
    industry: 'Oil & Gas',
    status: 'Ongoing',
    service: 'Control & Instrumentation',
    period: '2024 - Present',
    scope: 'C&I execution for catalytic cracking and polymerization unit loops.',
    outcome: 'Deployment of 45+ certified technicians on-site with full safety compliance.'
  }
];

projectsList.forEach((p, idx) => {
  insertProject.run(p.slug, p.title, p.client, p.location, p.industry, p.status, p.service, p.period, p.scope, p.outcome, idx + 1);
});

// 6. Seed Clients & Technology Partners
const insertClient = db.prepare(`
  INSERT INTO clients (name, role, description, status, logo_url, image_url, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const clientsList = [
  {
    name: 'Indian Oil Corporation Ltd. (IOCL)',
    role: 'Site Owner & Direct Client',
    description: 'KIW has executed multiple instrumentation setups, cabling, and loop checks directly for refinery units and pipeline networks under direct service contracts.',
    status: 'Verified Scope',
    logo_url: '/indianoil-logo.png',
    image_url: ''
  },
  {
    name: 'NTPC Limited',
    role: 'Site Owner & Project Stakeholder',
    description: 'Delivered boiler, turbine, and C&I loop checking services at super thermal power stations, coordinating with main automation contractors and local operators.',
    status: 'Verified Scope',
    logo_url: '/ntpc-logo.png',
    image_url: ''
  },
  {
    name: 'PCBL (Phillips Carbon Black Ltd.)',
    role: 'Site Owner & Direct Client',
    description: 'Executed end-to-end field cabling, junction box installations, and instrumentation loop testing under direct industrial execution orders.',
    status: 'Verified Scope',
    logo_url: '/pcbl-logo.png',
    image_url: ''
  },
  {
    name: 'Balrampur Chini Mills Limited',
    role: 'Site Owner & Direct Client',
    description: 'Performed off-season boiler maintenance calibration loops and field testing to ensure stable steam outputs during crushing runs.',
    status: 'Verified Scope',
    logo_url: '/balarampur-chini-mills-logo.png',
    image_url: ''
  },
  {
    name: 'Yokogawa India Ltd.',
    role: 'Technology Provider & Principal Contractor',
    description: 'Collaborated on DCS loop checking, marshalling panel terminal checks, and control logic checks as a subcontractor executing local works.',
    status: 'Verified Scope',
    logo_url: '/yokogawa-logo.png',
    image_url: ''
  },
  {
    name: 'Emerson Process Management',
    role: 'Technology Provider & Principal Contractor',
    description: 'Assisted in validating Ovation DCS signal loops and calibrating smart HART control valve positioners on critical boiler steam paths.',
    status: 'Verified Scope',
    logo_url: '/emerson-logo.png',
    image_url: ''
  },
  {
    name: 'ABB',
    role: 'Technology Provider & Principal Contractor',
    description: 'Supported substation control installations, telemetry configurations, and signal tests for local electrical systems.',
    status: 'Verified Scope',
    logo_url: '/abb-logo.png',
    image_url: ''
  },
  {
    name: 'Siemens Energy',
    role: 'Technology Provider & Principal Contractor',
    description: 'Executed cable tray setups, sensor mountings, and panel terminations under Siemens commissioning teams at turbine halls.',
    status: 'Verified Scope',
    logo_url: '/siemens-logo.png',
    image_url: ''
  },
  {
    name: 'Honeywell',
    role: 'Technology Provider & Principal Contractor',
    description: 'Assisted in field routing verification, signal integrity checking, and loop verification for Honeywell automation installations.',
    status: 'Verified Scope',
    logo_url: '/honeywell-logo.png',
    image_url: ''
  }
];

clientsList.forEach((c, idx) => {
  insertClient.run(c.name, c.role, c.description, c.status, c.logo_url, c.image_url, idx + 1);
});

// 7. Seed Infrastructure Manpower & Equipment
const insertManpower = db.prepare("INSERT INTO infrastructure_manpower (name, count_label, description, sort_order) VALUES (?, ?, ?, ?)");
const manpowerList = [
  { name: 'Experienced Engineers', count_label: '45+', description: 'Degree/Diploma holders specializing in Control & Instrumentation (C&I) and Industrial Automation.' },
  { name: 'Site Supervisors', count_label: '30+', description: 'Field-experienced supervisors managing day-to-day site installation, cable tray layouts, and safety.' },
  { name: 'Skilled Technicians', count_label: '120+', description: 'Certified technicians executing physical mounts, impulse piping, and electrical gland terminations.' },
  { name: 'QA/QC Team', count_label: '15+', description: 'Independent quality assurance engineers verifying calibration trace logs, loop continuity, and punch points.' },
  { name: 'Safety Officers', count_label: '20+', description: 'HSE certified officers overseeing permit-to-work compliance, gas audits, and zero-accident policies.' },
  { name: 'Support Staff', count_label: '20+', description: 'Dedicated logistics, tools coordination, and project document administrators.' }
];
manpowerList.forEach((m, idx) => insertManpower.run(m.name, m.count_label, m.description, idx + 1));

const insertEquipment = db.prepare(`
  INSERT INTO infrastructure_equipment (name, category, manufacturer, model, qty, calibration_status, last_cal_date, use_case, availability, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const equipmentList = [
  {
    name: 'Multi-Function Process Calibrator',
    category: 'Calibration Equipment',
    manufacturer: 'Fluke Corporation',
    model: 'Fluke 754 / HART',
    qty: '12 Units',
    calibration_status: 'Verified Active',
    last_cal_date: '2026-03-12',
    use_case: 'Bench and field calibration of pressure, temperature and electrical transmitter loops.',
    availability: 'Available'
  },
  {
    name: 'Dry-Block Temperature Calibrator',
    category: 'Calibration Equipment',
    manufacturer: 'Ametek / Jofra',
    model: 'CTC-650',
    qty: '6 Units',
    calibration_status: 'Verified Active',
    last_cal_date: '2026-04-05',
    use_case: 'High-temperature RTD & Thermocouple loops checking and sensor calibration.',
    availability: 'Available'
  },
  {
    name: 'Precision Pressure Calibrator',
    category: 'Calibration Equipment',
    manufacturer: 'Druck (Baker Hughes)',
    model: 'DPI 620 Genii',
    qty: '8 Units',
    calibration_status: 'Verified Active',
    last_cal_date: '2026-01-20',
    use_case: 'Very high accuracy pressure transmitter tests, differential pressure checks.',
    availability: 'Available'
  },
  {
    name: 'Insulation & Continuity Tester',
    category: 'Electrical Testing',
    manufacturer: 'Megger',
    model: 'MIT515 5kV',
    qty: '10 Units',
    calibration_status: 'Verified Active',
    last_cal_date: '2026-02-18',
    use_case: 'Power & control cable insulation resistance checking prior to termination.',
    availability: 'Available'
  },
  {
    name: 'Industrial Hydraulic Tube Bender',
    category: 'Installation Machinery',
    manufacturer: 'Swagelok',
    model: 'MS-HTB-4',
    qty: '14 Units',
    calibration_status: 'Verified Active',
    last_cal_date: '2026-05-10',
    use_case: 'SS316L impulse line precision bending for high-pressure transmitter manifolds.',
    availability: 'Available'
  }
];
equipmentList.forEach((eq, idx) => {
  insertEquipment.run(eq.name, eq.category, eq.manufacturer, eq.model, eq.qty, eq.calibration_status, eq.last_cal_date, eq.use_case, eq.availability, idx + 1);
});

// 8. Seed Careers
const insertCareer = db.prepare(`
  INSERT INTO careers (title, department, experience, location, job_type, description, requirements_json, icon_name, role_value)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const careersList = [
  {
    title: 'Instrumentation Engineers',
    icon_name: 'Cpu',
    role_value: 'Instrumentation Engineer',
    department: 'Control & Instrumentation',
    experience: '2 - 8 Years',
    location: 'PAN India Project Sites',
    job_type: 'Full-time',
    description: 'C&I graduates/diploma holders experienced in loop checks, sensor calibration, and detail engineering.',
    requirements: [
      'B.Tech / Diploma in Instrumentation & Control or Electronics Engineering',
      'Extensive experience with HART, Foundation Fieldbus, and Modbus protocol checks',
      'Ability to lead a team of 15+ supervisors and technicians at site'
    ]
  },
  {
    title: 'Electrical Engineers',
    icon_name: 'Zap',
    role_value: 'Electrical Engineer',
    department: 'Electrical Engineering',
    experience: '2 - 6 Years',
    location: 'PAN India Sites & Substations',
    job_type: 'Full-time',
    description: 'Electrical power systems, cabling schemes, switchgear operations, and motor control center setups.',
    requirements: [
      'B.Tech / Diploma in Electrical Engineering',
      'Experience in HT/LT cable laying, termination, panel positioning & earthing',
      'Adherence to plant electrical safety standards'
    ]
  },
  {
    title: 'Automation Professionals',
    icon_name: 'Sliders',
    role_value: 'Automation / PLC / DCS Professional',
    department: 'Automation & SCADA Systems',
    experience: '3 - 8 Years',
    location: 'Control Rooms & Site Offices',
    job_type: 'Full-time',
    description: 'PLC / DCS / SCADA programming, HMI designing, control system logic integration, and commissioning.',
    requirements: [
      'Hands-on with Siemens, ABB, Honeywell, Yokogawa, or Rockwell PLCs/DCS',
      'Experience in loop logic checks, FAT/SAT, and graphics integration',
      'Troubleshooting communication interfaces and telemetry'
    ]
  },
  {
    title: 'Site Supervisors',
    icon_name: 'Users',
    role_value: 'Site Supervisor',
    department: 'Site Management & Execution',
    experience: '3 - 7 Years',
    location: 'Refinery, Power & Process Plants',
    job_type: 'Full-time',
    description: 'Managing cable tray runs, field mounts, site safety protocols, and daily contractor coordinate updates.',
    requirements: [
      'Diploma/Degree in Engineering or strong industrial site background',
      'Supervision of field technicians, tray fitters, and cabling crews',
      'Daily progress logging, DPR reporting, and client site coordination'
    ]
  },
  {
    title: 'Technicians',
    icon_name: 'Briefcase',
    role_value: 'Technician',
    department: 'Field Operations & Tooling',
    experience: '1 - 5 Years',
    location: 'Active Site Deployments',
    job_type: 'Full-time',
    description: 'Expertise in impulse piping, tubing, glanding, termination, and primary instrument installations.',
    requirements: [
      'ITI in Instrumentation, Electrical, or Fitter trade',
      'Expertise in impulse tubing, SS tube bending, compression fittings & glanding',
      'Field instrument mounting and loop wiring'
    ]
  },
  {
    title: 'QA/QC Professionals',
    icon_name: 'Award',
    role_value: 'QA/QC Professional',
    department: 'Quality Assurance & Control',
    experience: '3 - 6 Years',
    location: 'Regional Labs & On-site',
    job_type: 'Full-time',
    description: 'Managing calibration logs, verifying QA/QC trace compliance, standard checklist records, and punch-lists.',
    requirements: [
      'Diploma in Instrumentation Engineering with NABL calibration awareness',
      'Hands-on experience with Fluke, Druck, and Ametek master instruments',
      'Rigorous documentation and test report generation proficiency'
    ]
  },
  {
    title: 'Safety Officers',
    icon_name: 'ShieldCheck',
    role_value: 'Safety Officer',
    department: 'Health, Safety & Environment (HSE)',
    experience: '3 - 5 Years',
    location: 'Thermal / Oil & Gas Sites',
    job_type: 'Full-time',
    description: 'HSE inspection, permit to work controls, toolbox talks compliance, and Zero LTI field execution.',
    requirements: [
      'Certified in Industrial Safety (NEBOSH / IOSH / State Safety Diploma)',
      'Experience handling hot-work and height permits in refinery/power plants',
      'Strong communication and crisis mitigation capabilities'
    ]
  },
  {
    title: 'Project Support Staff',
    icon_name: 'FileText',
    role_value: 'Project Support Staff',
    department: 'Project Logistics & Support',
    experience: '1 - 4 Years',
    location: 'Project Site Offices & Headquarters',
    job_type: 'Full-time',
    description: 'Project coordination, stores logistics, instrumentation tool maintenance ledger, and documentation.',
    requirements: [
      'Graduate / Diploma in Commerce, Science, or Engineering',
      'Experience in stores inventory, tool room tracking & dispatch billing',
      'Proficiency in MS Office / Excel & site material ledgers'
    ]
  }
];
careersList.forEach((c) => {
  insertCareer.run(c.title, c.department, c.experience, c.location, c.job_type, c.description, JSON.stringify(c.requirements), c.icon_name, c.role_value);
});

// 9. Seed Categories and Instruments for Catalog
const insertCategory = db.prepare("INSERT INTO categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)");
const categoryRows = [
  { name: 'Pressure Instruments', slug: 'pressure-instruments', description: 'Transmitters, Differential Pressure gauges, Diaphragm seals & switches' },
  { name: 'Level Instruments', slug: 'level-instruments', description: 'Radar 80GHz, Ultrasonic, Magnetic Level Gauges, Float & RF Admittance' },
  { name: 'Flow Instruments', slug: 'flow-instruments', description: 'Electromagnetic, Vortex, Thermal Mass, Coriolis & Variable Area Rotameters' },
  { name: 'Temperature Instruments', slug: 'temperature-instruments', description: 'RTD Pt100/Pt1000, Thermocouples (J, K, R, S), Thermowells & Transmitters' },
  { name: 'Valves & Automation', slug: 'valves-automation', description: 'Control valves, Actuators, Positioners and Solenoid control panels' },
  { name: 'Calibration & Testing', slug: 'calibration-testing', description: 'Dead weight testers, Portable pressure calibrators & Temperature baths' }
];
categoryRows.forEach((c, idx) => insertCategory.run(c.name, c.slug, c.description, idx + 1));

console.log("✅ Seeding finished successfully! All website pages are now populated in SQLite DB.");
