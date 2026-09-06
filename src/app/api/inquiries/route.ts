import { NextResponse } from "next/server";
import * as repo from "@server/repo.mjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      type, client_name, company, designation, email, phone, 
      product_interest, quantity, application, location, experience,
      notice_period, project_status, start_date, message, 
      attachment_url, attachment_name, attachment_size 
    } = body;

    if (!client_name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Name, email and phone number are required." }, { status: 400 });
    }

    const inquiry = repo.createInquiry({
      type: type || (product_interest?.toLowerCase().includes("position:") ? "career" : "contact"),
      client_name,
      company: company || (type === "career" ? "Candidate" : "Individual Client"),
      designation: designation || "",
      email,
      phone,
      product_interest,
      quantity,
      application,
      location: location || "",
      experience: experience || "",
      notice_period: notice_period || "",
      project_status: project_status || "",
      start_date: start_date || "",
      message,
      attachment_url,
      attachment_name,
      attachment_size,
    });

    return NextResponse.json({ 
      ok: true, 
      message: inquiry.type === "career" ? "Application submitted successfully." : "Quotation request submitted successfully.", 
      data: inquiry 
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
