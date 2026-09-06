import "./env.mjs";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import next from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as repo from "./repo.mjs";
import { attachUser } from "./auth.mjs";
import adminRoutes from "./routes/admin.mjs";
import publicRoutes from "./routes/public.mjs";

// Expose SQLite DB repo to Next.js Server Components
globalThis.__CMS__ = repo;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOST || "0.0.0.0";

const nextApp = next({ dev, dir: ROOT, hostname, port });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

const app = express();
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(attachUser);

// Uploads static directory
app.use(
  "/uploads",
  express.static(path.join(ROOT, "public", "uploads"), {
    maxAge: dev ? 0 : "365d",
  })
);

// Health check endpoint
app.get("/healthz", (_req, res) =>
  res.json({ ok: true, status: "healthy", uptime: process.uptime() })
);

app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);
app.use((req, res) => handle(req, res));

app.listen(port, hostname, () => {
  console.log(`> Krishna Instrumentation server ready on http://${hostname}:${port}`);
});
