/** @format */

import "server-only";
import type { ContactFormData } from "./schema";

export async function sendEmail(data: ContactFormData) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

  if (!RESEND_API_KEY) {
    console.error(" RESEND_API_KEY not set");
    throw new Error("Email service not configured");
  }

  if (!CONTACT_EMAIL) {
    console.error(" CONTACT_EMAIL not set");
    throw new Error("Contact email not configured");
  }


  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "hello@query.kindrednodes.com",
      to: CONTACT_EMAIL,
      reply_to: data.email,
      subject: `New Message: ${data.name}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Resend API error:", {
      status: res.status,
      statusText: res.statusText,
      error: errorText,
    });
    throw new Error(`Failed to send email: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  console.log("✅ Email sent successfully:", result);

  return result;
}
