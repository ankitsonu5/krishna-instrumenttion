import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@server/env.mjs";
import * as repo from "@server/repo.mjs";
import { verifyPassword, hashPassword } from "@server/auth.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { current_password, new_password, email } = body;

    if (!current_password || !new_password) {
      return NextResponse.json(
        { ok: false, error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    let token = "";
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value || "";
    } catch {}

    const authHeader = request.headers.get("authorization") || "";
    if (!token && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "").trim();
    }

    let user: any = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET || "krishna-instrumentation-secret-key-2026") as any;
        user = (repo as any).findUserByEmail(decoded.email);
      } catch {}
    }

    if (!user && email) {
      user = (repo as any).findUserByEmail(String(email).trim().toLowerCase());
    }

    if (!user) {
      const allUsers = (repo as any).getAllUsers();
      if (allUsers.length > 0) {
        user = (repo as any).findUserByEmail(allUsers[0].email);
      }
    }

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
    }

    const isCurrentValid = verifyPassword(current_password, user.password_hash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    const newHash = hashPassword(new_password);
    (repo as any).updateUserPassword(user.id, newHash);

    return NextResponse.json({
      ok: true,
      message: "Password changed successfully! Please use your new password for next logins.",
    });
  } catch (err: any) {
    console.error("Change Password API Error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Internal Server Error" }, { status: 500 });
  }
}
