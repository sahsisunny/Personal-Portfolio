import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().optional(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = result.data;

    // Honeypot anti-spam check
    if (honeypot && honeypot.length > 0) {
      // Silently accept bot submission without delivering
      return NextResponse.json({ success: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "sahsisunny@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `New Message from ${name} [Portfolio]`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">New Contact Form Message</h2>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>From:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #4f46e5; text-decoration: none;">${escapeHtml(email)}</a></p>
            </div>
            <h3 style="color: #334155; margin-bottom: 8px; font-size: 15px;">Message:</h3>
            <div style="white-space: pre-wrap; background: #ffffff; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px; color: #1e293b; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</div>
            <p style="margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px;">
              Sent from <a href="https://sunnysahsi.com" style="color: #4f46e5;">sunnysahsi.com</a> contact form. Hit <strong>Reply</strong> to respond directly to ${escapeHtml(name)}.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("[Resend API Error]:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again or email directly." },
          { status: 500 }
        );
      }

      console.log(`[Contact Form Delivered via Resend] To: ${toEmail} From: ${email}`);
    } else {
      console.warn(
        `[Contact Form Warning] RESEND_API_KEY is not set. Submission logged only: From: ${name} <${email}>: ${message.slice(0, 50)}...`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

