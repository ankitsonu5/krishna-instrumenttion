import { db } from "./db.mjs";

// Helper to sanitize parameters for node:sqlite (convert undefined to null)
function n(val) {
  return val === undefined ? null : val;
}

// ================= USERS =================
export function findUserByEmail(email) {
  if (!email) return null;
  const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND is_active = 1");
  return stmt.get(email.trim());
}

export function getUserById(id) {
  const stmt = db.prepare("SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?");
  return stmt.get(id);
}

export function getAllUsers() {
  const stmt = db.prepare("SELECT id, name, email, role, is_active, created_at FROM users ORDER BY id ASC");
  return stmt.all();
}

export function createUser({ name, email, password_hash, role = "admin" }) {
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?) RETURNING id, name, email, role"
  );
  return stmt.get(name, email.toLowerCase().trim(), password_hash, role);
}

export function updateUserPassword(id, password_hash) {
  const stmt = db.prepare("UPDATE users SET password_hash = ? WHERE id = ? RETURNING id, name, email, role");
  return stmt.get(password_hash, id);
}

export function updateUserProfile(id, { name, email }) {
  const stmt = db.prepare(
    "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ? RETURNING id, name, email, role"
  );
  return stmt.get(name, email ? email.toLowerCase().trim() : null, id);
}

// ================= HERO BANNERS =================
export function getActiveBanners() {
  return db.prepare("SELECT * FROM hero_banners WHERE is_active = 1 ORDER BY sort_order ASC, id DESC").all();
}

export function getAllBanners() {
  return db.prepare("SELECT * FROM hero_banners ORDER BY sort_order ASC, id DESC").all();
}

export function createBanner(data) {
  const stmt = db.prepare(`
    INSERT INTO hero_banners (title, subtitle, media_type, media_url, thumbnail_url, cta_text, cta_link, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.title) || "",
    n(data.subtitle) || "",
    n(data.media_type) || "image",
    n(data.media_url),
    n(data.thumbnail_url) || "",
    n(data.cta_text) || "Explore Instruments",
    n(data.cta_link) || "/products",
    n(data.sort_order) || 0,
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
}

export function updateBanner(id, data) {
  const stmt = db.prepare(`
    UPDATE hero_banners SET
      title = COALESCE(?, title),
      subtitle = COALESCE(?, subtitle),
      media_type = COALESCE(?, media_type),
      media_url = COALESCE(?, media_url),
      thumbnail_url = COALESCE(?, thumbnail_url),
      cta_text = COALESCE(?, cta_text),
      cta_link = COALESCE(?, cta_link),
      sort_order = COALESCE(?, sort_order),
      is_active = COALESCE(?, is_active),
      updated_at = datetime('now')
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.title),
    n(data.subtitle),
    n(data.media_type),
    n(data.media_url),
    n(data.thumbnail_url),
    n(data.cta_text),
    n(data.cta_link),
    n(data.sort_order),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
}

export function deleteBanner(id) {
  return db.prepare("DELETE FROM hero_banners WHERE id = ?").run(id);
}

// ================= PRODUCTS =================
export function getProducts({ category = null, status = null, search = "" } = {}) {
  let query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE 1=1
  `;
  const params = [];

  if (category && category !== "All") {
    query += " AND (c.name = ? OR c.slug = ?)";
    params.push(category, category);
  }
  if (status && status !== "All") {
    query += " AND p.status = ?";
    params.push(status);
  }
  if (search) {
    query += " AND (p.name LIKE ? OR p.sku LIKE ? OR p.industry LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  query += " ORDER BY p.id DESC";

  return db.prepare(query).all(...params);
}

export function getProductBySlug(slug) {
  return db.prepare("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?").get(slug);
}

export function createProduct(data) {
  const stmt = db.prepare(`
    INSERT INTO products (
      category_id, slug, sku, name, industry, measuring_range, 
      accuracy, output_signal, description, datasheet_url, image_url, stock_status, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.category_id),
    n(data.slug),
    n(data.sku),
    n(data.name),
    n(data.industry) || "",
    n(data.measuring_range) || "",
    n(data.accuracy) || "",
    n(data.output_signal) || "",
    n(data.description) || "",
    n(data.datasheet_url) || "",
    n(data.image_url) || "",
    n(data.stock_status) || "In Stock",
    n(data.status) || "Active"
  );
}

export function updateProduct(id, data) {
  const stmt = db.prepare(`
    UPDATE products SET
      name = COALESCE(?, name),
      category_id = COALESCE(?, category_id),
      industry = COALESCE(?, industry),
      measuring_range = COALESCE(?, measuring_range),
      accuracy = COALESCE(?, accuracy),
      output_signal = COALESCE(?, output_signal),
      description = COALESCE(?, description),
      datasheet_url = COALESCE(?, datasheet_url),
      image_url = COALESCE(?, image_url),
      stock_status = COALESCE(?, stock_status),
      status = COALESCE(?, status),
      updated_at = datetime('now')
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.name),
    n(data.category_id),
    n(data.industry),
    n(data.measuring_range),
    n(data.accuracy),
    n(data.output_signal),
    n(data.description),
    n(data.datasheet_url),
    n(data.image_url),
    n(data.stock_status),
    n(data.status),
    id
  );
}

export function deleteProduct(id) {
  return db.prepare("DELETE FROM products WHERE id = ?").run(id);
}

// ================= CATEGORIES =================
export function getCategories() {
  return db.prepare(`
    SELECT c.*, COUNT(p.id) as product_count 
    FROM categories c 
    LEFT JOIN products p ON c.id = p.category_id 
    GROUP BY c.id 
    ORDER BY c.sort_order ASC, c.name ASC
  `).all();
}

export function createCategory({ name, slug, description = "", icon = "Gauge", sort_order = 0 }) {
  const stmt = db.prepare("INSERT INTO categories (name, slug, description, icon, sort_order) VALUES (?, ?, ?, ?, ?) RETURNING *");
  return stmt.get(name, slug, description, icon, sort_order);
}

export function deleteCategory(id) {
  return db.prepare("DELETE FROM categories WHERE id = ?").run(id);
}

// ================= SERVICES =================
export function getServices(onlyActive = true) {
  const query = onlyActive 
    ? "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC" 
    : "SELECT * FROM services ORDER BY sort_order ASC, id ASC";
  const rows = db.prepare(query).all();
  return rows.map(r => ({
    ...r,
    bullets: JSON.parse(r.bullets_json || "[]")
  }));
}

export function createService(data) {
  const stmt = db.prepare(`
    INSERT INTO services (title, slug, icon_name, short_desc, bullets_json, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  const row = stmt.get(
    n(data.title),
    n(data.slug),
    n(data.icon_name) || "Wrench",
    n(data.short_desc ?? data.description),
    JSON.stringify(data.bullets || []),
    n(data.sort_order) || 0,
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
  return { ...row, bullets: JSON.parse(row.bullets_json || "[]") };
}

export function updateService(id, data) {
  const stmt = db.prepare(`
    UPDATE services SET
      title = COALESCE(?, title),
      slug = COALESCE(?, slug),
      icon_name = COALESCE(?, icon_name),
      short_desc = COALESCE(?, short_desc),
      bullets_json = COALESCE(?, bullets_json),
      sort_order = COALESCE(?, sort_order),
      is_active = COALESCE(?, is_active)
    WHERE id = ? RETURNING *
  `);
  const row = stmt.get(
    n(data.title),
    n(data.slug),
    n(data.icon_name),
    n(data.short_desc ?? data.description),
    data.bullets ? JSON.stringify(data.bullets) : null,
    n(data.sort_order),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
  if (!row) return null;
  return { ...row, bullets: JSON.parse(row.bullets_json || "[]") };
}

export function deleteService(id) {
  return db.prepare("DELETE FROM services WHERE id = ?").run(id);
}

// ================= INDUSTRIES =================
export function getIndustries(onlyActive = true) {
  const query = onlyActive 
    ? "SELECT * FROM industries WHERE is_active = 1 ORDER BY sort_order ASC, id ASC" 
    : "SELECT * FROM industries ORDER BY sort_order ASC, id ASC";
  return db.prepare(query).all();
}

export function createIndustry(data) {
  const stmt = db.prepare(`
    INSERT INTO industries (title, slug, icon_name, short_desc, challenge, image_url, logo_url, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.title),
    n(data.slug),
    n(data.icon_name) || "Factory",
    n(data.short_desc),
    n(data.challenge) || "",
    n(data.image_url) || "",
    n(data.logo_url) || "",
    n(data.sort_order) || 0,
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
}

export function updateIndustry(id, data) {
  const stmt = db.prepare(`
    UPDATE industries SET
      title = COALESCE(?, title),
      slug = COALESCE(?, slug),
      icon_name = COALESCE(?, icon_name),
      short_desc = COALESCE(?, short_desc),
      challenge = COALESCE(?, challenge),
      image_url = COALESCE(?, image_url),
      logo_url = COALESCE(?, logo_url),
      sort_order = COALESCE(?, sort_order),
      is_active = COALESCE(?, is_active)
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.title),
    n(data.slug),
    n(data.icon_name),
    n(data.short_desc),
    n(data.challenge),
    n(data.image_url),
    n(data.logo_url),
    n(data.sort_order),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
}

export function deleteIndustry(id) {
  return db.prepare("DELETE FROM industries WHERE id = ?").run(id);
}

// ================= PROJECTS =================
export function getProjects({ status = null, industry = null, service = null, search = "" } = {}) {
  let query = "SELECT * FROM projects WHERE is_active = 1";
  const params = [];

  if (status && status !== "All") {
    query += " AND status = ?";
    params.push(status);
  }
  if (industry && industry !== "All") {
    query += " AND industry = ?";
    params.push(industry);
  }
  if (service && service !== "All") {
    query += " AND service = ?";
    params.push(service);
  }
  if (search) {
    query += " AND (title LIKE ? OR client LIKE ? OR location LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  query += " ORDER BY sort_order ASC, id DESC";

  return db.prepare(query).all(...params);
}

export function getAllProjects() {
  return db.prepare("SELECT * FROM projects ORDER BY sort_order ASC, id DESC").all();
}

export function createProject(data) {
  const stmt = db.prepare(`
    INSERT INTO projects (slug, title, client, location, industry, status, service, period, scope, outcome, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.slug),
    n(data.title),
    n(data.client),
    n(data.location),
    n(data.industry),
    n(data.status) || "Completed",
    n(data.service),
    n(data.period),
    n(data.scope),
    n(data.outcome) || "",
    n(data.sort_order) || 0,
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
}

export function updateProject(id, data) {
  const stmt = db.prepare(`
    UPDATE projects SET
      title = COALESCE(?, title),
      slug = COALESCE(?, slug),
      client = COALESCE(?, client),
      location = COALESCE(?, location),
      industry = COALESCE(?, industry),
      status = COALESCE(?, status),
      service = COALESCE(?, service),
      period = COALESCE(?, period),
      scope = COALESCE(?, scope),
      outcome = COALESCE(?, outcome),
      sort_order = COALESCE(?, sort_order),
      is_active = COALESCE(?, is_active)
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.title),
    n(data.slug),
    n(data.client),
    n(data.location),
    n(data.industry),
    n(data.status),
    n(data.service),
    n(data.period),
    n(data.scope),
    n(data.outcome),
    n(data.sort_order),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
}

export function deleteProject(id) {
  return db.prepare("DELETE FROM projects WHERE id = ?").run(id);
}

// ================= CLIENTS =================
export function getClients(onlyActive = true) {
  const query = onlyActive 
    ? "SELECT * FROM clients WHERE is_active = 1 ORDER BY sort_order ASC, id ASC" 
    : "SELECT * FROM clients ORDER BY sort_order ASC, id ASC";
  return db.prepare(query).all();
}

export function createClient(data) {
  const stmt = db.prepare(`
    INSERT INTO clients (name, role, description, status, logo_url, image_url, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.name),
    n(data.role),
    n(data.description),
    n(data.status) || "Verified Scope",
    n(data.logo_url) || "",
    n(data.image_url) || "",
    n(data.sort_order) || 0,
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
}

export function updateClient(id, data) {
  const stmt = db.prepare(`
    UPDATE clients SET
      name = COALESCE(?, name),
      role = COALESCE(?, role),
      description = COALESCE(?, description),
      status = COALESCE(?, status),
      logo_url = COALESCE(?, logo_url),
      image_url = COALESCE(?, image_url),
      sort_order = COALESCE(?, sort_order),
      is_active = COALESCE(?, is_active)
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.name),
    n(data.role),
    n(data.description),
    n(data.status),
    n(data.logo_url),
    n(data.image_url),
    n(data.sort_order),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
}

export function deleteClient(id) {
  return db.prepare("DELETE FROM clients WHERE id = ?").run(id);
}

// ================= INFRASTRUCTURE: MANPOWER & EQUIPMENT =================
export function getInfrastructure() {
  const manpower = db.prepare("SELECT * FROM infrastructure_manpower ORDER BY sort_order ASC").all();
  const equipment = db.prepare("SELECT * FROM infrastructure_equipment ORDER BY sort_order ASC").all();
  return { manpower, equipment };
}

export function createManpower(data) {
  const stmt = db.prepare("INSERT INTO infrastructure_manpower (name, count_label, description, sort_order) VALUES (?, ?, ?, ?) RETURNING *");
  return stmt.get(n(data.name), n(data.count_label), n(data.description), n(data.sort_order) || 0);
}

export function createEquipment(data) {
  const stmt = db.prepare(`
    INSERT INTO infrastructure_equipment (name, category, manufacturer, model, qty, calibration_status, last_cal_date, use_case, availability, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    n(data.name),
    n(data.category),
    n(data.manufacturer),
    n(data.model),
    n(data.qty),
    n(data.calibration_status) || "Verified Active",
    n(data.last_cal_date) || "",
    n(data.use_case),
    n(data.availability) || "Available",
    n(data.sort_order) || 0
  );
}

export function updateEquipment(id, data) {
  const stmt = db.prepare(`
    UPDATE infrastructure_equipment SET
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      manufacturer = COALESCE(?, manufacturer),
      model = COALESCE(?, model),
      qty = COALESCE(?, qty),
      calibration_status = COALESCE(?, calibration_status),
      last_cal_date = COALESCE(?, last_cal_date),
      use_case = COALESCE(?, use_case),
      availability = COALESCE(?, availability),
      sort_order = COALESCE(?, sort_order)
    WHERE id = ? RETURNING *
  `);
  return stmt.get(
    n(data.name),
    n(data.category),
    n(data.manufacturer),
    n(data.model),
    n(data.qty),
    n(data.calibration_status),
    n(data.last_cal_date),
    n(data.use_case),
    n(data.availability),
    n(data.sort_order),
    id
  );
}

export function deleteEquipment(id) {
  return db.prepare("DELETE FROM infrastructure_equipment WHERE id = ?").run(id);
}

// ================= CAREERS =================
export function getCareers(onlyActive = true) {
  const query = onlyActive 
    ? "SELECT * FROM careers WHERE is_active = 1 ORDER BY id ASC" 
    : "SELECT * FROM careers ORDER BY id ASC";
  const rows = db.prepare(query).all();
  return rows.map(r => ({
    ...r,
    requirements: JSON.parse(r.requirements_json || "[]")
  }));
}

export function createCareer(data) {
  const stmt = db.prepare(`
    INSERT INTO careers (title, department, experience, location, job_type, description, requirements_json, icon_name, role_value, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  const row = stmt.get(
    n(data.title),
    n(data.department),
    n(data.experience),
    n(data.location),
    n(data.job_type) || "Full-time",
    n(data.description),
    JSON.stringify(data.requirements || []),
    n(data.icon_name) || "Briefcase",
    n(data.role_value) || n(data.roleValue) || n(data.title) || "",
    data.is_active !== undefined ? Number(data.is_active) : 1
  );
  return { ...row, requirements: JSON.parse(row.requirements_json || "[]") };
}

export function updateCareer(id, data) {
  const stmt = db.prepare(`
    UPDATE careers SET
      title = COALESCE(?, title),
      department = COALESCE(?, department),
      experience = COALESCE(?, experience),
      location = COALESCE(?, location),
      job_type = COALESCE(?, job_type),
      description = COALESCE(?, description),
      requirements_json = COALESCE(?, requirements_json),
      icon_name = COALESCE(?, icon_name),
      role_value = COALESCE(?, role_value),
      is_active = COALESCE(?, is_active)
    WHERE id = ? RETURNING *
  `);
  const row = stmt.get(
    n(data.title),
    n(data.department),
    n(data.experience),
    n(data.location),
    n(data.job_type),
    n(data.description),
    data.requirements ? JSON.stringify(data.requirements) : null,
    n(data.icon_name),
    n(data.role_value ?? data.roleValue),
    data.is_active !== undefined ? Number(data.is_active) : null,
    id
  );
  if (!row) return null;
  return { ...row, requirements: JSON.parse(row.requirements_json || "[]") };
}

export function deleteCareer(id) {
  return db.prepare("DELETE FROM careers WHERE id = ?").run(id);
}

// ================= GALLERY =================
export function getGallery() {
  return db.prepare("SELECT * FROM gallery ORDER BY sort_order ASC, id DESC").all();
}

export function createGalleryItem(data) {
  const stmt = db.prepare("INSERT INTO gallery (title, category, image_url, caption, sort_order) VALUES (?, ?, ?, ?, ?) RETURNING *");
  return stmt.get(n(data.title), n(data.category) || "Site Work", n(data.image_url), n(data.caption) || "", n(data.sort_order) || 0);
}

export function deleteGalleryItem(id) {
  return db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
}

// ================= PAGE CONTENTS / ABOUT / CONTACT =================
export function getPageContent(pageKey) {
  const rows = db.prepare("SELECT * FROM page_contents WHERE page_key = ?").all();
  const res = {};
  for (const row of rows) {
    res[row.section_key] = {
      title: row.title,
      subtitle: row.subtitle,
      content: row.content_json
    };
  }
  return res;
}

export function setPageContent(pageKey, sectionKey, title, subtitle, content) {
  const stmt = db.prepare(`
    INSERT INTO page_contents (page_key, section_key, title, subtitle, content_json, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(page_key, section_key) DO UPDATE SET
      title = excluded.title,
      subtitle = excluded.subtitle,
      content_json = excluded.content_json,
      updated_at = datetime('now')
    RETURNING *
  `);
  return stmt.get(n(pageKey), n(sectionKey), n(title) || "", n(subtitle) || "", typeof content === "string" ? content : JSON.stringify(content || {}));
}

// ================= INQUIRIES / RFQS =================
export function getInquiries({ status = null, type = null } = {}) {
  let query = "SELECT * FROM inquiries WHERE 1=1";
  const params = [];
  if (type && type !== "All") {
    query += " AND type = ?";
    params.push(type);
  }
  if (status && status !== "All") {
    query += " AND status = ?";
    params.push(status);
  }
  query += " ORDER BY id DESC";
  return db.prepare(query).all(...params);
}

export function createInquiry(data) {
  let inqType = (data.type || "").toLowerCase().trim();
  if (!inqType || inqType === "all") {
    if (
      (data.product_interest && data.product_interest.toLowerCase().includes("position:")) ||
      (data.company && data.company.toLowerCase().includes("candidate")) ||
      (data.message && data.message.toLowerCase().includes("applied for")) ||
      Boolean(data.experience) ||
      Boolean(data.notice_period)
    ) {
      inqType = "career";
    } else {
      inqType = "contact";
    }
  }

  const prefix = inqType === "career" ? "APP" : "RFQ";
  const code = `${prefix}-${Date.now().toString().slice(-6)}`;
  const stmt = db.prepare(`
    INSERT INTO inquiries (
      type, inquiry_code, client_name, company, designation, email, phone, 
      product_interest, quantity, application, location, experience,
      notice_period, project_status, start_date, message, priority,
      attachment_url, attachment_name, attachment_size
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  return stmt.get(
    inqType,
    code,
    n(data.client_name),
    n(data.company) || (inqType === "career" ? "Candidate" : "Individual Client"),
    n(data.designation) || "",
    n(data.email),
    n(data.phone),
    n(data.product_interest) || "",
    n(data.quantity) || "",
    n(data.application) || "",
    n(data.location) || "",
    n(data.experience) || "",
    n(data.notice_period) || "",
    n(data.project_status) || "",
    n(data.start_date) || "",
    n(data.message) || "",
    n(data.priority) || "Medium",
    n(data.attachment_url) || "",
    n(data.attachment_name) || "",
    n(data.attachment_size) || ""
  );
}

export function getInquiryById(id) {
  return db.prepare("SELECT * FROM inquiries WHERE id = ?").get(id);
}

export function updateInquiryStatus(id, status) {
  return db.prepare("UPDATE inquiries SET status = ? WHERE id = ? RETURNING *").get(status, id);
}

export function deleteInquiry(id) {
  return db.prepare("DELETE FROM inquiries WHERE id = ?").run(id);
}

// ================= SETTINGS =================
export function getSettings() {
  const rows = db.prepare("SELECT key, value FROM settings").all();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function setSetting(key, value) {
  return db.prepare(`
    INSERT INTO settings (key, value, updated_at) 
    VALUES (?, ?, datetime('now')) 
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `).run(key, value);
}
