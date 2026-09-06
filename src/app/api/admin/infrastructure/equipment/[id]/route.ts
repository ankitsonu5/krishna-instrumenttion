import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams?.id);
    const body = await request.json();
    const updated = repo.updateEquipment(id, body);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams?.id);
    repo.deleteEquipment(id);
    return NextResponse.json({ ok: true, message: "Equipment deleted" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
