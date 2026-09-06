import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET() {
  try {
    const banners = repo.getActiveBanners();
    return NextResponse.json({ ok: true, data: banners });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
