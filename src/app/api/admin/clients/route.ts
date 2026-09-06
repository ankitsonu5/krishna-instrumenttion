import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET() {
  try {
    const clients = repo.getClients(false);
    return NextResponse.json({ ok: true, data: clients });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = repo.createClient(body);
    return NextResponse.json({ ok: true, data: client }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
