import multer from "multer";
import path from "node:path";
import { mkdirSync } from "node:fs";

const BANNERS_DIR = path.join(process.cwd(), "public", "uploads", "banners");
mkdirSync(BANNERS_DIR, { recursive: true });

const MEDIA_DIR = path.join(process.cwd(), "public", "uploads", "media");
mkdirSync(MEDIA_DIR, { recursive: true });

const bannerStorage = multer.diskStorage({
  destination: function (_req, __file, cb) {
    cb(null, BANNERS_DIR);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    cb(null, `banner-${uniqueSuffix}-${cleanName}${ext}`);
  },
});

const mediaStorage = multer.diskStorage({
  destination: function (_req, __file, cb) {
    cb(null, MEDIA_DIR);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    cb(null, `media-${uniqueSuffix}-${cleanName}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Image, Video, or PDF files are allowed."), false);
  }
};

export const uploadBannerMedia = multer({
  storage: bannerStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export const uploadMedia = multer({
  storage: mediaStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});