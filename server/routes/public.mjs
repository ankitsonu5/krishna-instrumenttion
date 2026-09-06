import { Router } from "express";
import * as repo from "../repo.mjs";

const router = Router();

// ================= HERO BANNERS =================
router.get("/banners", (_req, res) => {
  res.json({ ok: true, data: repo.getActiveBanners() });
});

// ================= SERVICES =================
router.get("/services", (_req, res) => {
  res.json({ ok: true, data: repo.getServices(true) });
});

// ================= INDUSTRIES =================
router.get("/industries", (_req, res) => {
  res.json({ ok: true, data: repo.getIndustries(true) });
});

// ================= PROJECTS =================
router.get("/projects", (req, res) => {
  const { status, industry, service, search } = req.query;
  res.json({ ok: true, data: repo.getProjects({ status, industry, service, search }) });
});

// ================= CLIENTS =================
router.get("/clients", (_req, res) => {
  res.json({ ok: true, data: repo.getClients(true) });
});

// ================= INFRASTRUCTURE =================
router.get("/infrastructure", (_req, res) => {
  res.json({ ok: true, data: repo.getInfrastructure() });
});

// ================= CAREERS =================
router.get("/careers", (_req, res) => {
  res.json({ ok: true, data: repo.getCareers(true) });
});

// ================= GALLERY =================
router.get("/gallery", (_req, res) => {
  res.json({ ok: true, data: repo.getGallery() });
});

// ================= PAGE CONTENTS (About Us, Contact, etc.) =================
router.get("/page-contents/:page", (req, res) => {
  res.json({ ok: true, data: repo.getPageContent(req.params.page) });
});

// ================= PRODUCTS & CATEGORIES =================
router.get("/products", (req, res) => {
  const { category, search } = req.query;
  const products = repo.getProducts({ category, status: "Active", search });
  res.json({ ok: true, data: products });
});

router.get("/products/:slug", (req, res) => {
  const product = repo.getProductBySlug(req.params.slug);
  if (!product) return res.status(404).json({ ok: false, error: "Product not found" });
  res.json({ ok: true, data: product });
});

router.get("/categories", (_req, res) => {
  res.json({ ok: true, data: repo.getCategories() });
});

// ================= INQUIRY / RFQ / CAREER APPLICATION SUBMISSION =================
router.post("/inquiries", (req, res) => {
  const { 
    type, client_name, company, designation, email, phone, 
    product_interest, quantity, application, location, experience,
    notice_period, project_status, start_date, message, 
    attachment_url, attachment_name, attachment_size 
  } = req.body;

  if (!client_name || !email || !phone) {
    return res.status(400).json({ ok: false, error: "Name, email and phone number are required." });
  }

  const inquiry = repo.createInquiry({
    type: type || (product_interest?.startsWith("Position:") ? "career" : "contact"),
    client_name,
    company: company || (type === "career" ? "Candidate" : "Individual Client"),
    designation: designation || "",
    email,
    phone,
    product_interest,
    quantity,
    application,
    location: location || "",
    experience: experience || "",
    notice_period: notice_period || "",
    project_status: project_status || "",
    start_date: start_date || "",
    message,
    attachment_url,
    attachment_name,
    attachment_size,
  });

  res.status(201).json({ 
    ok: true, 
    message: inquiry.type === "career" ? "Application submitted successfully." : "Quotation request submitted successfully.", 
    data: inquiry 
  });
});

// ================= SETTINGS =================
router.get("/settings", (_req, res) => {
  res.json({ ok: true, data: repo.getSettings() });
});

export default router;
