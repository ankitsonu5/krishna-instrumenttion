import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "All";
    const industry = searchParams.get("industry") || "All";
    const service = searchParams.get("service") || "All";
    const search = searchParams.get("search") || "";

    const projects = (repo as any).getProjects({ status, industry, service, search });
    return NextResponse.json({ ok: true, data: projects });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
