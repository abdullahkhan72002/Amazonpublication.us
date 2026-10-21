declare global {
  interface Window {
    zE?: (...args: unknown[]) => unknown;
    $zopim?: {
      (cb: () => void): void;
      livechat?: {
        window?: { show: () => void };
        setOnUnreadMsgs?: (cb: (count: number) => void) => void;
      };
    };
  }
}

export function openZendeskChat() {
  if (typeof window === "undefined") return;

  const zE = typeof window.zE === "function" ? window.zE : null;
  if (zE) {
    try {
      zE("webWidget", "show");
      zE("webWidget", "open");
    } catch {
      // Classic widget may still be booting.
    }
    try {
      zE("messenger", "show");
      zE("messenger", "open");
    } catch {
      // Messaging widget is not always enabled.
    }
  }

  try {
    window.$zopim?.livechat?.window?.show();
  } catch {
    // Zopim API is optional.
  }
}

export function isContactChatHref(href: string) {
  const path = href.split("#")[0].split("?")[0];
  return path === "/contact-us";
}
