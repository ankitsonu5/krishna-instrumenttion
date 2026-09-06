import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "All";
    const type = searchParams.get("type") || "All";
    const inquiries = (repo as any).getInquiries({ status, type });
    return NextResponse.json({ ok: true, data: inquiries });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
