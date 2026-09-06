import dotenv from 'dotenv';
import path from 'node:path';

const ROOT = process.cwd();
try {
  dotenv.config({ path: path.join(ROOT, '.env') });
} catch {}

export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || '0.0.0.0';
export const JWT_SECRET = process.env.JWT_SECRET || 'krishna-instrumentation-secret-key-2026';
export const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'server', 'data');