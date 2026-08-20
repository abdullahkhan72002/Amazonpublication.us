import { getStoredTracking, type LeadTracking } from "@/lib/tracking";

export type LeadFormPayload = {
  formSource: string;
  fields: Record<string, string>;
  pageUrl: string;
  pageTitle: string;
  tracking: LeadTracking;
  website?: string;
};

export type SubmitLeadFormResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitLeadForm(
  payload: Omit<LeadFormPayload, "pageUrl" | "pageTitle" | "tracking"> & {
    pageUrl?: string;
    pageTitle?: string;
    tracking?: LeadTracking;
  },
): Promise<SubmitLeadFormResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formSource: payload.formSource,
        fields: payload.fields,
        pageUrl: payload.pageUrl ?? window.location.href,
        pageTitle: payload.pageTitle ?? document.title,
        tracking: payload.tracking ?? getStoredTracking(),
        website: payload.website ?? "",
      } satisfies LeadFormPayload),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      return { ok: false, error: data.error ?? "Unable to send your message." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
