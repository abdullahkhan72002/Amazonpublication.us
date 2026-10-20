declare global {
  interface Window {
    zE?: (...args: unknown[]) => unknown;
  }
}

export function openZendeskChat() {
  if (typeof window === "undefined") return;

  const zE = typeof window.zE === "function" ? window.zE : null;
  if (!zE) return;

  try {
    zE("webWidget", "show");
    zE("webWidget", "open");
  } catch {
    // Widget may still be booting.
  }
}

export function isContactChatHref(href: string) {
  const path = href.split("#")[0].split("?")[0];
  return path === "/contact-us";
}
