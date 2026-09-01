import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";
import type { LeadTracking } from "@/lib/tracking";
import {
  isAllowedManuscriptFile,
  MANUSCRIPT_MAX_BYTES,
  MANUSCRIPT_MAX_LABEL,
  MANUSCRIPT_REQUIRED_FIELDS,
} from "@/lib/manuscript";

export const maxDuration = 60;

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

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value || "—")}</td></tr>`;
}

function parseTracking(raw: string): LeadTracking {
  try {
    const value = JSON.parse(raw) as LeadTracking;
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeFilename(name: string) {
  const cleaned = name.replace(/[^\w.\- ()]/g, "_").trim();
  return cleaned.slice(0, 120) || "manuscript";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (readString(formData, "website")) {
      return NextResponse.json({ ok: true });
    }

    const fields = {
      fullName: readString(formData, "fullName"),
      penName: readString(formData, "penName"),
      email: readString(formData, "email"),
      phone: readString(formData, "phone"),
      street: readString(formData, "street"),
      city: readString(formData, "city"),
      state: readString(formData, "state"),
      zip: readString(formData, "zip"),
      country: readString(formData, "country"),
      bookTitle: readString(formData, "bookTitle"),
      genre: readString(formData, "genre"),
      wordCount: readString(formData, "wordCount"),
      audience: readString(formData, "audience"),
      synopsis: readString(formData, "synopsis"),
    };

    const missing = MANUSCRIPT_REQUIRED_FIELDS.filter((key) => !fields[key]);
    if (missing.length > 0 || !isValidEmail(fields.email)) {
      return NextResponse.json(
        { error: "Please fill out all required fields with a valid email." },
        { status: 400 },
      );
    }

    const file = formData.get("manuscript");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Please attach your manuscript file." },
        { status: 400 },
      );
    }

    if (file.size > MANUSCRIPT_MAX_BYTES) {
      return NextResponse.json(
        {
          error: `Your manuscript is too large. Please upload a file under ${MANUSCRIPT_MAX_LABEL}.`,
        },
        { status: 400 },
      );
    }

    if (!isAllowedManuscriptFile(file)) {
      return NextResponse.json(
        { error: "Please upload a PDF, Word, RTF, TXT, or ODT manuscript file." },
        { status: 400 },
      );
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
    const pageUrl = readString(formData, "pageUrl");
    const pageTitle = readString(formData, "pageTitle");
    const tracking = parseTracking(readString(formData, "tracking"));
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filename = safeFilename(file.name);
    const address = `${fields.street}, ${fields.city}, ${fields.state} ${fields.zip}, ${fields.country}`;

    await transporter.sendMail({
      from: `"Amazon Publication Manuscripts" <${smtpUser}>`,
      to: leadEmailTo,
      replyTo: fields.email,
      subject: `New Manuscript: ${fields.bookTitle} — ${fields.fullName}`,
      text: [
        "New manuscript submission",
        "",
        `Full name: ${fields.fullName}`,
        `Pen name: ${fields.penName || "—"}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone}`,
        `Address: ${address}`,
        `Book title: ${fields.bookTitle}`,
        `Genre: ${fields.genre}`,
        `Word count: ${fields.wordCount || "—"}`,
        `Target audience: ${fields.audience || "—"}`,
        `Synopsis: ${fields.synopsis}`,
        `Manuscript file: ${filename}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#111827;max-width:720px;">
          <h2 style="margin:0 0 16px;">New Manuscript Submission</h2>
          <h3 style="margin:24px 0 12px;">Author Details</h3>
          <table style="border-collapse:collapse;width:100%;">
            ${row("Full name", fields.fullName)}
            ${row("Pen name", fields.penName)}
            ${row("Email", fields.email)}
            ${row("Phone", fields.phone)}
          </table>
          <h3 style="margin:24px 0 12px;">Address</h3>
          <table style="border-collapse:collapse;width:100%;">
            ${row("Street", fields.street)}
            ${row("City", fields.city)}
            ${row("State / Province", fields.state)}
            ${row("ZIP / Postal code", fields.zip)}
            ${row("Country", fields.country)}
          </table>
          <h3 style="margin:24px 0 12px;">Book Details</h3>
          <table style="border-collapse:collapse;width:100%;">
            ${row("Book title", fields.bookTitle)}
            ${row("Genre", fields.genre)}
            ${row("Word count", fields.wordCount)}
            ${row("Target audience", fields.audience)}
            ${row("Synopsis", fields.synopsis)}
            ${row("Manuscript file", filename)}
          </table>
          <h3 style="margin:24px 0 12px;">Tracking</h3>
          <table style="border-collapse:collapse;width:100%;">
            ${row("Submitted from", pageUrl)}
            ${row("Page title", pageTitle)}
            ${row("UTM Source", tracking.utm_source ?? "")}
            ${row("UTM Medium", tracking.utm_medium ?? "")}
            ${row("UTM Campaign", tracking.utm_campaign ?? "")}
            ${row("IP Address", ip ?? "")}
            ${row("User Agent", userAgent ?? "")}
            ${row("Submitted at", new Date().toISOString())}
          </table>
        </div>
      `,
      attachments: [
        {
          filename,
          content: fileBuffer,
          contentType: file.type || undefined,
        },
      ],
    });

    try {
      await transporter.sendMail({
        from: `"Amazon Publication" <${smtpUser}>`,
        to: fields.email,
        replyTo: site.email,
        subject: `We received your manuscript — ${site.name}`,
        text: [
          `Dear ${fields.fullName},`,
          "",
          `Thank you for submitting "${fields.bookTitle}" to ${site.name}.`,
          "We have received your author details, address, book information, and manuscript file.",
          "Our team will review your submission and get back to you by email.",
          "",
          "Warm regards,",
          site.name,
          site.email,
        ].join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;color:#111827;max-width:640px;">
            <h2 style="margin:0 0 16px;">Thank you for submitting your manuscript</h2>
            <p>Dear ${escapeHtml(fields.fullName)},</p>
            <p>Thank you for submitting <strong>${escapeHtml(fields.bookTitle)}</strong> to ${escapeHtml(site.name)}.</p>
            <p>We have received your author details, address, book information, and manuscript file. Our team will review your submission and get back to you by email.</p>
            <p style="margin:24px 0 0;">Warm regards,<br/>${escapeHtml(site.name)}<br/>${escapeHtml(site.email)}</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Manuscript thank-you email error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Manuscript form error:", error);
    return NextResponse.json(
      { error: "Failed to send manuscript. Please try again later." },
      { status: 500 },
    );
  }
}
