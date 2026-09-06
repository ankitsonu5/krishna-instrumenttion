import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const contents = repo.getPageContent(page);
    return NextResponse.json({ ok: true, data: contents });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const body = await request.json();
    const { section_key, title, subtitle, content } = body;
    const saved = repo.setPageContent(page, section_key, title, subtitle, content);
    return NextResponse.json({ ok: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
