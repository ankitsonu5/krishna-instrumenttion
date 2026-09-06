import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET() {
  try {
    const services = repo.getServices(false);
    return NextResponse.json({ ok: true, data: services });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = repo.createService(body);
    return NextResponse.json({ ok: true, data: service }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
