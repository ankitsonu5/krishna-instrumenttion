import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@server/env.mjs";
import * as repo from "@server/repo.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let token = "";
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value || "";
    } catch {}

    const authHeader = request.headers.get("authorization") || "";
    if (!token && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "").trim();
    }

    if (!token) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET || "krishna-instrumentation-secret-key-2026") as any;
    const user = (repo as any).getUserById(decoded.id);
    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: "Invalid session" }, { status: 401 });
  }
}
