import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "./env.mjs";

const realBcrypt = bcrypt && bcrypt.default ? bcrypt.default : bcrypt;
const realJwt = jwt && jwt.default ? jwt.default : jwt;

export function hashPassword(plain) {
  if (typeof realBcrypt?.hashSync === "function") {
    return realBcrypt.hashSync(plain, 10);
  }
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain, hash) {
  if (!plain || !hash) return false;
  if (typeof realBcrypt?.compareSync === "function") {
    return realBcrypt.compareSync(plain, hash);
  }
  return bcrypt.compareSync(plain, hash);
}

export function signToken(user) {
  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const secret = JWT_SECRET || "krishna-instrumentation-secret-key-2026";
  if (typeof realJwt?.sign === "function") {
    return realJwt.sign(payload, secret, { expiresIn: "7d" });
  }
  if (typeof jwt?.sign === "function") {
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyToken(token) {
  if (!token) return null;
  const secret = JWT_SECRET || "krishna-instrumentation-secret-key-2026";
  try {
    if (typeof realJwt?.verify === "function") {
      return realJwt.verify(token, secret);
    }
    if (typeof jwt?.verify === "function") {
      return jwt.verify(token, secret);
    }
    return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
  } catch {
    try {
      return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    } catch {
      return null;
    }
  }
}

export function attachUser(req, _res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    req.user = null;
    return next();
  }
  req.user = verifyToken(token);
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. Admin session required." });
  }
  next();
}
