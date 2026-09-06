import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

function formatBytes(bytes: number, decimals = 1) {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file selected" }, { status: 400 });
    }

    // Max 25MB check
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "File exceeds 25MB size limit." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "documents");
    await mkdir(uploadsDir, { recursive: true });

    const rawExt = path.extname(file.name) || ".pdf";
    const ext = rawExt.toLowerCase();
    const cleanName = path.basename(file.name, rawExt).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const filename = `${cleanName}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/documents/${filename}`;
    const formattedSize = formatBytes(file.size);

    return NextResponse.json({
      ok: true,
      fileUrl,
      originalName: file.name,
      size: formattedSize,
      rawBytes: file.size,
    });
  } catch (err: any) {
    console.error("File upload error:", err);
    return NextResponse.json({ ok: false, error: err.message || "File upload failed" }, { status: 500 });
  }
}
