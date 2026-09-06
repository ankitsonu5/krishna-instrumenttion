import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const search = searchParams.get("search") || "";
    const products = (repo as any).getProducts({ category, status: "Active", search });
    return NextResponse.json({ ok: true, data: products });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
