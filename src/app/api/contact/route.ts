import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { LeadTracking } from "@/lib/tracking";

type ContactRequestBody = {
  formSource: string;
  fields: Record<string, string>;
  pageUrl: string;
  pageTitle: string;
  tracking?: LeadTracking;
  website?: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLabel(key: string) {
  return key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildEmailHtml(body: ContactRequestBody, meta: { ip?: string; userAgent?: string }) {
  const fieldRows = Object.entries(body.fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(formatLabel(key))}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value || "—")}</td></tr>`,
    )
    .join("");

  const tracking = body.tracking ?? {};
  const trackingRows = [
    ["UTM Source", tracking.utm_source],
    ["UTM Medium", tracking.utm_medium],
    ["UTM Campaign", tracking.utm_campaign],
    ["UTM Term", tracking.utm_term],
    ["UTM Content", tracking.utm_content],
    ["Google Click ID (gclid)", tracking.gclid],
    ["Facebook Click ID (fbclid)", tracking.fbclid],
    ["Microsoft Click ID (msclkid)", tracking.msclkid],
    ["Ref", tracking.ref],
    ["Landing Page", tracking.landingPage],
    ["Referrer", tracking.referrer],
    ["Submitted From", body.pageUrl],
    ["Page Title", body.pageTitle],
    ["Form Source", body.formSource],
    ["IP Address", meta.ip],
    ["User Agent", meta.userAgent],
    ["Submitted At", new Date().toISOString()],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(String(label))}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;max-width:720px;">
      <h2 style="margin:0 0 16px;">New Lead — ${escapeHtml(body.formSource)}</h2>
      <h3 style="margin:24px 0 12px;">Contact Details</h3>
      <table style="border-collapse:collapse;width:100%;">${fieldRows}</table>
      <h3 style="margin:24px 0 12px;">Marketing &amp; Tracking</h3>
      <table style="border-collapse:collapse;width:100%;">${trackingRows}</table>
    </div>
  `;
}

function buildEmailText(body: ContactRequestBody, meta: { ip?: string; userAgent?: string }) {
  const lines = [
    `New Lead — ${body.formSource}`,
    "",
    "Contact Details",
    ...Object.entries(body.fields).map(
      ([key, value]) => `${formatLabel(key)}: ${value || "—"}`,
    ),
    "",
    "Marketing & Tracking",
    `Submitted From: ${body.pageUrl}`,
    `Page Title: ${body.pageTitle}`,
  ];

  const tracking = body.tracking ?? {};
  if (tracking.utm_source) lines.push(`UTM Source: ${tracking.utm_source}`);
  if (tracking.utm_medium) lines.push(`UTM Medium: ${tracking.utm_medium}`);
  if (tracking.utm_campaign) lines.push(`UTM Campaign: ${tracking.utm_campaign}`);
  if (tracking.utm_term) lines.push(`UTM Term: ${tracking.utm_term}`);
  if (tracking.utm_content) lines.push(`UTM Content: ${tracking.utm_content}`);
  if (tracking.gclid) lines.push(`Google Click ID: ${tracking.gclid}`);
  if (tracking.fbclid) lines.push(`Facebook Click ID: ${tracking.fbclid}`);
  if (tracking.msclkid) lines.push(`Microsoft Click ID: ${tracking.msclkid}`);
  if (tracking.landingPage) lines.push(`Landing Page: ${tracking.landingPage}`);
  if (tracking.referrer) lines.push(`Referrer: ${tracking.referrer}`);
  if (meta.ip) lines.push(`IP Address: ${meta.ip}`);
  if (meta.userAgent) lines.push(`User Agent: ${meta.userAgent}`);
  lines.push(`Submitted At: ${new Date().toISOString()}`);

  return lines.join("\n");
}

function getLeadName(fields: Record<string, string>) {
  return (
    fields.name ??
    fields["contact-name"] ??
    Object.entries(fields).find(([key]) => key.includes("name"))?.[1] ??
    "Website Lead"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    if (!body.formSource || !body.fields || typeof body.fields !== "object") {
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }

    const hasValue = Object.values(body.fields).some(
      (value) => typeof value === "string" && value.trim().length > 0,
    );

    if (!hasValue) {
      return NextResponse.json({ error: "Please fill out the form." }, { status: 400 });
    }

    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");
    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const leadEmailTo = process.env.LEAD_EMAIL_TO ?? smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const leadName = getLeadName(body.fields);

    await transporter.sendMail({
      from: `"Amazon Publication Leads" <${smtpUser}>`,
      to: leadEmailTo,
      replyTo:
        body.fields.email ??
        body.fields["contact-email"] ??
        Object.entries(body.fields).find(([key]) => key.includes("email"))?.[1],
      subject: `New Lead: ${leadName} — ${body.formSource}`,
      text: buildEmailText(body, { ip, userAgent }),
      html: buildEmailHtml(body, { ip, userAgent }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
