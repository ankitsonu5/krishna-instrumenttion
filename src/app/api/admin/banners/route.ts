import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET() {
  try {
    const banners = repo.getAllBanners();
    return NextResponse.json({ ok: true, data: banners });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = repo.createBanner(body);
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
