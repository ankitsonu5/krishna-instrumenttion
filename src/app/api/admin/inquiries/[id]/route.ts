import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams?.id);
    const item = (repo as any).getInquiryById(id);
    if (!item) {
      return NextResponse.json({ ok: false, error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: item });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams?.id);
    const body = await request.json();
    const updated = (repo as any).updateInquiryStatus(id, body.status);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams?.id);
    (repo as any).deleteInquiry(id);
    return NextResponse.json({ ok: true, message: "Inquiry deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
