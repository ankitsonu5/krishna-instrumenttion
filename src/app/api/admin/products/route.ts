import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const status = searchParams.get("status") || "All";
    const search = searchParams.get("search") || "";

    const products = (repo as any).getProducts({ category, status, search });
    return NextResponse.json({ ok: true, data: products });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = repo.createProduct(body);
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
