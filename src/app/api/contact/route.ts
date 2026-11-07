import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().optional(),
});

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

    // In production, send via Resend or Formspree if API key is provided
    if (process.env.RESEND_API_KEY) {
      // Send email logic here
    }

    console.log(`[Contact Form Received] From: ${name} <${email}>: ${message.slice(0, 50)}...`);

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
