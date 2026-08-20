export type LeadTracking = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ref?: string;
  landingPage?: string;
  referrer?: string;
};

const TRACKING_KEY = "lead-tracking";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "ref",
] as const;

export function captureTrackingFromUrl() {
  if (typeof window === "undefined") return;

  const existing = getStoredTracking();
  const tracking: LeadTracking = { ...existing };
  const params = new URLSearchParams(window.location.search);

  for (const key of TRACKING_PARAMS) {
    const value = params.get(key);
    if (value && !tracking[key]) {
      tracking[key] = value;
    }
  }

  if (!tracking.landingPage) {
    tracking.landingPage = window.location.href;
  }

  if (!tracking.referrer && document.referrer) {
    tracking.referrer = document.referrer;
  }

  sessionStorage.setItem(TRACKING_KEY, JSON.stringify(tracking));
}

export function getStoredTracking(): LeadTracking {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(TRACKING_KEY);
    return raw ? (JSON.parse(raw) as LeadTracking) : {};
  } catch {
    return {};
  }
}
