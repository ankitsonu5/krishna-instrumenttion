import { db } from "../db.mjs";

console.log("Cleaning all backend dummy data from SQLite database...");

db.exec(`
  DELETE FROM hero_banners;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM inquiries;
  DELETE FROM media;
  DELETE FROM settings;
  DELETE FROM users;
  DELETE FROM sqlite_sequence;
  VACUUM;
`);

console.log("✅ All backend dummy data deleted successfully. Database is now clean.");
