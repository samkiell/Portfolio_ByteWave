import { NextResponse } from "next/server";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

const InquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = InquirySchema.parse(body);

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "bytewaveteams@gmail.com";
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || CONTACT_TO_EMAIL;

    if (!SENDGRID_API_KEY) {
      return NextResponse.json({ error: "SendGrid not configured on server" }, { status: 503 });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const plain = `New inquiry from ${data.name} (${data.email})\n\nProject type: ${data.projectType || "N/A"}\nBudget: ${data.budget || "N/A"}\nTimeline: ${data.timeline || "N/A"}\n\nMessage:\n${data.message}`;

    const msg = {
      to: CONTACT_TO_EMAIL,
      from: CONTACT_FROM_EMAIL,
      subject: `New project inquiry from ${data.name}`,
      text: plain,
      html: `<p><strong>Name:</strong> ${data.name} (${data.email})</p><p><strong>Project:</strong> ${data.projectType || "N/A"}</p><p><strong>Budget:</strong> ${data.budget || "N/A"}</p><p><strong>Timeline:</strong> ${data.timeline || "N/A"}</p><p><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 422 });
    }
    console.error("/api/inquiry error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
