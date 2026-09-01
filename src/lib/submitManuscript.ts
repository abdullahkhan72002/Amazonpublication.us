import { getStoredTracking } from "@/lib/tracking";

export type SubmitManuscriptResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitManuscript(
  form: HTMLFormElement,
): Promise<SubmitManuscriptResult> {
  try {
    const payload = new FormData(form);
    payload.set("pageUrl", window.location.href);
    payload.set("pageTitle", document.title);
    payload.set("tracking", JSON.stringify(getStoredTracking()));

    const response = await fetch("/api/manuscript", {
      method: "POST",
      body: payload,
    });

    if (response.status === 413) {
      return {
        ok: false,
        error: "Your manuscript is too large. Please upload a file under 4 MB.",
      };
    }

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? "Unable to send your manuscript.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
