import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { DATA_DIR } from "./env.mjs";

mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(path.join(process.cwd(), "public", "uploads", "banners"), { recursive: true });
mkdirSync(path.join(process.cwd(), "public", "uploads", "documents"), { recursive: true });
mkdirSync(path.join(process.cwd(), "public", "uploads", "media"), { recursive: true });

export const db = new DatabaseSync(path.join(DATA_DIR, "cms.db"));

// SQLite performance optimizations
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");
db.exec("PRAGMA busy_timeout = 5000");

// Initialize All Tables
db.exec(`
-- Admin Users Table
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin',
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Hero Banner Table
CREATE TABLE IF NOT EXISTS hero_banners (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT DEFAULT '',
  subtitle      TEXT DEFAULT '',
  media_type    TEXT NOT NULL DEFAULT 'image', 
  media_url     TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT '',
  cta_text      TEXT DEFAULT 'Explore Instruments',
  cta_link      TEXT DEFAULT '/products',
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon        TEXT DEFAULT 'Gauge',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Products / Instruments Table
CREATE TABLE IF NOT EXISTS products (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  slug          TEXT NOT NULL UNIQUE,
  sku           TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  industry      TEXT DEFAULT '',
  measuring_range TEXT DEFAULT '',
  accuracy      TEXT DEFAULT '',
  output_signal TEXT DEFAULT '',
  description   TEXT DEFAULT '',
  datasheet_url TEXT DEFAULT '',
  image_url     TEXT DEFAULT '',
  stock_status  TEXT NOT NULL DEFAULT 'In Stock',
  status        TEXT NOT NULL DEFAULT 'Active',
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- RFQ Quotation Requests & Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  type            TEXT NOT NULL DEFAULT 'contact', -- 'contact' | 'career'
  inquiry_code    TEXT NOT NULL UNIQUE,
  client_name     TEXT NOT NULL,
  company         TEXT NOT NULL,
  designation     TEXT DEFAULT '',
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  product_interest TEXT DEFAULT '',
  quantity        TEXT DEFAULT '',
  application     TEXT DEFAULT '',
  location        TEXT DEFAULT '',
  experience      TEXT DEFAULT '',
  notice_period   TEXT DEFAULT '',
  project_status  TEXT DEFAULT '',
  start_date      TEXT DEFAULT '',
  message         TEXT DEFAULT '',
  attachment_url  TEXT DEFAULT '',
  attachment_name TEXT DEFAULT '',
  attachment_size TEXT DEFAULT '',
  status          TEXT NOT NULL DEFAULT 'New',
  priority        TEXT NOT NULL DEFAULT 'Medium',
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  icon_name   TEXT DEFAULT 'Wrench',
  short_desc  TEXT NOT NULL,
  bullets_json TEXT NOT NULL DEFAULT '[]',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Industries Table
CREATE TABLE IF NOT EXISTS industries (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  icon_name   TEXT DEFAULT 'Factory',
  short_desc  TEXT NOT NULL,
  challenge   TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  logo_url    TEXT DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  client      TEXT NOT NULL,
  location    TEXT NOT NULL,
  industry    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'Completed', -- Completed / Ongoing
  service     TEXT NOT NULL,
  period      TEXT NOT NULL,
  scope       TEXT NOT NULL,
  outcome     TEXT DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  description TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'Verified Scope',
  logo_url    TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Infrastructure: Manpower Table
CREATE TABLE IF NOT EXISTS infrastructure_manpower (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  count_label TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- Infrastructure: Equipment Table
CREATE TABLE IF NOT EXISTS infrastructure_equipment (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  name                TEXT NOT NULL,
  category            TEXT NOT NULL,
  manufacturer        TEXT NOT NULL,
  model               TEXT NOT NULL,
  qty                 TEXT NOT NULL,
  calibration_status  TEXT NOT NULL DEFAULT 'Verified Active',
  last_cal_date       TEXT DEFAULT '',
  use_case            TEXT NOT NULL,
  availability        TEXT NOT NULL DEFAULT 'Available',
  sort_order          INTEGER NOT NULL DEFAULT 0
);

-- Careers Table
CREATE TABLE IF NOT EXISTS careers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT NOT NULL,
  department    TEXT NOT NULL,
  experience    TEXT NOT NULL,
  location      TEXT NOT NULL,
  job_type      TEXT NOT NULL DEFAULT 'Full-time',
  description   TEXT NOT NULL,
  requirements_json TEXT NOT NULL DEFAULT '[]',
  icon_name     TEXT DEFAULT 'Briefcase',
  role_value    TEXT DEFAULT '',
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT 'Site Work',
  image_url   TEXT NOT NULL,
  caption     TEXT DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Page Contents / General Settings Table
CREATE TABLE IF NOT EXISTS page_contents (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key    TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title       TEXT DEFAULT '',
  subtitle    TEXT DEFAULT '',
  content_json TEXT NOT NULL DEFAULT '{}',
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(page_key, section_key)
);

-- Media / Datasheets Table
CREATE TABLE IF NOT EXISTS media (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  filename    TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  file_type   TEXT NOT NULL,
  file_size   TEXT DEFAULT '',
  product_id  INTEGER REFERENCES products(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Company Settings (Key-Value)
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

// Safe migrations for newly added columns
try {
  db.exec("ALTER TABLE careers ADD COLUMN icon_name TEXT DEFAULT 'Briefcase'");
} catch {}
try {
  db.exec("ALTER TABLE careers ADD COLUMN role_value TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN attachment_url TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN attachment_name TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN attachment_size TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN designation TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN type TEXT DEFAULT 'contact'");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN location TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN experience TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN notice_period TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN project_status TEXT DEFAULT ''");
} catch {}
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN start_date TEXT DEFAULT ''");
} catch {}

// Seed default admin user if not exists
try {
  const row = db.prepare("SELECT count(*) as count FROM users").get();
  if (!row || row.count === 0) {
    // verified bcrypt hash of 'admin123'
    const defaultHash = "$2b$10$bxGiMfAcKY6QZDM3qRoNNecu8u78fAZyCmu9IVZ5eyGyPbtQRJu3.";
    db.prepare(`
      INSERT INTO users (name, email, password_hash, role, is_active)
      VALUES (?, ?, ?, 'admin', 1)
    `).run("Admin", "admin@krishnainstrumentation.com", defaultHash);
  }
} catch (e) {
  console.warn("User table setup notice:", e?.message);
}
