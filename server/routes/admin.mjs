import { Router } from "express";
import * as repo from "../repo.mjs";
import { uploadBannerMedia, uploadMedia } from "../upload.mjs";
import { verifyPassword, hashPassword, signToken } from "../auth.mjs";

const router = Router();

// ================= AUTHENTICATION =================
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Email and password are required." });
  }
  const user = repo.findUserByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ ok: false, error: "Invalid email or password." });
  }
  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

router.get("/auth/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "Not authenticated" });
  }
  const user = repo.getUserById(req.user.id);
  if (!user) return res.status(401).json({ ok: false, error: "User not found" });
  res.json({ ok: true, user });
});

router.post("/auth/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ ok: true, message: "Logged out successfully" });
});

router.post("/auth/change-password", (req, res) => {
  const { current_password, new_password, email } = req.body;
  if (!current_password || !new_password) {
    return res.status(400).json({ ok: false, error: "Current and new password required." });
  }
  if (new_password.length < 6) {
    return res.status(400).json({ ok: false, error: "Password must be at least 6 characters." });
  }
  let user = req.user ? repo.getUserById(req.user.id) : null;
  if (!user && email) user = repo.findUserByEmail(email);
  if (!user) {
    const all = repo.getAllUsers();
    if (all.length > 0) user = repo.findUserByEmail(all[0].email);
  }
  if (!user || !verifyPassword(current_password, user.password_hash)) {
    return res.status(400).json({ ok: false, error: "Current password is incorrect." });
  }
  repo.updateUserPassword(user.id, hashPassword(new_password));
  res.json({ ok: true, message: "Password updated successfully." });
});

// ================= GENERAL MEDIA UPLOAD =================
router.post("/upload", uploadMedia.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file selected" });
  }
  const fileUrl = `/uploads/media/${req.file.filename}`;
  res.json({
    ok: true,
    fileUrl: fileUrl,
    size: req.file.size,
    originalName: req.file.originalname,
  });
});

// ================= HERO BANNERS =================
router.post("/banners/upload", uploadBannerMedia.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file selected" });
  }
  const fileUrl = `/uploads/banners/${req.file.filename}`;
  const isVideo = req.file.mimetype.startsWith("video/");
  res.json({
    ok: true,
    fileUrl: fileUrl,
    mediaType: isVideo ? "video" : "image",
    size: req.file.size,
    originalName: req.file.originalname,
  });
});

router.get("/banners", (_req, res) => {
  res.json({ ok: true, data: repo.getAllBanners() });
});

router.post("/banners", (req, res) => {
  const { title, subtitle, media_type, media_url, cta_text, cta_link } = req.body;
  if (!media_url) {
    return res.status(400).json({ ok: false, error: "Media URL is required." });
  }
  const created = repo.createBanner({
    title,
    subtitle,
    media_type,
    media_url,
    cta_text,
    cta_link,
  });
  res.status(201).json({ ok: true, data: created });
});

router.put("/banners/:id", (req, res) => {
  const updated = repo.updateBanner(Number(req.params.id), req.body);
  res.json({ ok: true, data: updated });
});

router.delete("/banners/:id", (req, res) => {
  repo.deleteBanner(Number(req.params.id));
  res.json({ ok: true, message: "Banner deleted successfully." });
});

// ================= SERVICES =================
router.get("/services", (_req, res) => {
  res.json({ ok: true, data: repo.getServices(false) });
});

router.post("/services", (req, res) => {
  const service = repo.createService(req.body);
  res.status(201).json({ ok: true, data: service });
});

router.put("/services/:id", (req, res) => {
  const service = repo.updateService(Number(req.params.id), req.body);
  res.json({ ok: true, data: service });
});

router.delete("/services/:id", (req, res) => {
  repo.deleteService(Number(req.params.id));
  res.json({ ok: true, message: "Service deleted successfully." });
});

// ================= INDUSTRIES =================
router.get("/industries", (_req, res) => {
  res.json({ ok: true, data: repo.getIndustries(false) });
});

router.post("/industries", (req, res) => {
  const industry = repo.createIndustry(req.body);
  res.status(201).json({ ok: true, data: industry });
});

router.put("/industries/:id", (req, res) => {
  const industry = repo.updateIndustry(Number(req.params.id), req.body);
  res.json({ ok: true, data: industry });
});

router.delete("/industries/:id", (req, res) => {
  repo.deleteIndustry(Number(req.params.id));
  res.json({ ok: true, message: "Industry deleted successfully." });
});

// ================= PROJECTS =================
router.get("/projects", (_req, res) => {
  res.json({ ok: true, data: repo.getAllProjects() });
});

router.post("/projects", (req, res) => {
  const project = repo.createProject(req.body);
  res.status(201).json({ ok: true, data: project });
});

router.put("/projects/:id", (req, res) => {
  const project = repo.updateProject(Number(req.params.id), req.body);
  res.json({ ok: true, data: project });
});

router.delete("/projects/:id", (req, res) => {
  repo.deleteProject(Number(req.params.id));
  res.json({ ok: true, message: "Project deleted successfully." });
});

// ================= CLIENTS =================
router.get("/clients", (_req, res) => {
  res.json({ ok: true, data: repo.getClients(false) });
});

router.post("/clients", (req, res) => {
  const client = repo.createClient(req.body);
  res.status(201).json({ ok: true, data: client });
});

router.put("/clients/:id", (req, res) => {
  const client = repo.updateClient(Number(req.params.id), req.body);
  res.json({ ok: true, data: client });
});

router.delete("/clients/:id", (req, res) => {
  repo.deleteClient(Number(req.params.id));
  res.json({ ok: true, message: "Client deleted successfully." });
});

// ================= INFRASTRUCTURE =================
router.get("/infrastructure", (_req, res) => {
  res.json({ ok: true, data: repo.getInfrastructure() });
});

router.post("/infrastructure/manpower", (req, res) => {
  const mp = repo.createManpower(req.body);
  res.status(201).json({ ok: true, data: mp });
});

router.post("/infrastructure/equipment", (req, res) => {
  const eq = repo.createEquipment(req.body);
  res.status(201).json({ ok: true, data: eq });
});

router.put("/infrastructure/equipment/:id", (req, res) => {
  const eq = repo.updateEquipment(Number(req.params.id), req.body);
  res.json({ ok: true, data: eq });
});

router.delete("/infrastructure/equipment/:id", (req, res) => {
  repo.deleteEquipment(Number(req.params.id));
  res.json({ ok: true, message: "Equipment deleted successfully." });
});

// ================= CAREERS =================
router.get("/careers", (_req, res) => {
  res.json({ ok: true, data: repo.getCareers(false) });
});

router.post("/careers", (req, res) => {
  const career = repo.createCareer(req.body);
  res.status(201).json({ ok: true, data: career });
});

router.put("/careers/:id", (req, res) => {
  const career = repo.updateCareer(Number(req.params.id), req.body);
  res.json({ ok: true, data: career });
});

router.delete("/careers/:id", (req, res) => {
  repo.deleteCareer(Number(req.params.id));
  res.json({ ok: true, message: "Career opening deleted successfully." });
});

// ================= PAGE CONTENTS =================
router.get("/page-contents/:page", (req, res) => {
  res.json({ ok: true, data: repo.getPageContent(req.params.page) });
});

router.post("/page-contents/:page", (req, res) => {
  const { section_key, title, subtitle, content } = req.body;
  const saved = repo.setPageContent(req.params.page, section_key, title, subtitle, content);
  res.json({ ok: true, data: saved });
});

// ================= PRODUCTS & CATEGORIES =================
router.get("/products", (req, res) => {
  const products = repo.getProducts(req.query);
  res.json({ ok: true, data: products });
});

router.post("/products", (req, res) => {
  const product = repo.createProduct(req.body);
  res.status(201).json({ ok: true, data: product });
});

router.put("/products/:id", (req, res) => {
  const product = repo.updateProduct(Number(req.params.id), req.body);
  res.json({ ok: true, data: product });
});

router.delete("/products/:id", (req, res) => {
  repo.deleteProduct(Number(req.params.id));
  res.json({ ok: true, message: "Product deleted successfully." });
});

router.get("/categories", (_req, res) => {
  res.json({ ok: true, data: repo.getCategories() });
});

router.post("/categories", (req, res) => {
  const cat = repo.createCategory(req.body);
  res.status(201).json({ ok: true, data: cat });
});

router.delete("/categories/:id", (req, res) => {
  repo.deleteCategory(Number(req.params.id));
  res.json({ ok: true, message: "Category deleted successfully." });
});

// ================= INQUIRIES =================
router.get("/inquiries", (req, res) => {
  res.json({ ok: true, data: repo.getInquiries(req.query) });
});

router.get("/inquiries/:id", (req, res) => {
  const inq = repo.getInquiryById(Number(req.params.id));
  if (!inq) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true, data: inq });
});

router.patch("/inquiries/:id/status", (req, res) => {
  const inq = repo.updateInquiryStatus(Number(req.params.id), req.body.status);
  res.json({ ok: true, data: inq });
});

router.delete("/inquiries/:id", (req, res) => {
  repo.deleteInquiry(Number(req.params.id));
  res.json({ ok: true, message: "Inquiry deleted successfully" });
});

// ================= SETTINGS =================
router.get("/settings", (_req, res) => {
  res.json({ ok: true, data: repo.getSettings() });
});

router.post("/settings", (req, res) => {
  const { key, value } = req.body;
  repo.setSetting(key, value);
  res.json({ ok: true, message: "Setting saved." });
});

export default router;
