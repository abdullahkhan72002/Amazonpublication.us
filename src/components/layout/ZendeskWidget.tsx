"use client";

import { useEffect } from "react";
import Script from "next/script";

const ZENDESK_KEY = "58e0ef52-56d9-4636-a621-71e5d4bd0f62";
const COLOR = "#000080";
const CLEAR_WINDOW_MS = 1500;

declare global {
  interface Window {
    zE?: (...args: unknown[]) => unknown;
  }
}

function getZe() {
  return typeof window.zE === "function" ? window.zE : null;
}

function getFrameDoc(selector: string) {
  const frame = document.querySelector<HTMLIFrameElement>(selector);
  if (!frame) return null;
  try {
    return frame.contentDocument || frame.contentWindow?.document || null;
  } catch {
    return null;
  }
}

function getComposer(doc: Document) {
  return doc.querySelector<HTMLTextAreaElement>(
    'textarea[name="chatBox"], textarea[data-testid="message-field"]',
  );
}

function clearComposer() {
  const doc = getFrameDoc("iframe#webWidget");
  if (!doc) return false;

  const box = getComposer(doc);
  if (!box) return false;
  if (box.value === "") return true;
  if (box.dataset.bbUserTyping === "1") return true;

  const view = doc.defaultView;
  const setter = view
    ? Object.getOwnPropertyDescriptor(view.HTMLTextAreaElement.prototype, "value")
        ?.set
    : undefined;
  if (!setter) return false;

  setter.call(box, "");
  box.dispatchEvent(new view.Event("input", { bubbles: true }));
  return true;
}

function markTyping() {
  const doc = getFrameDoc("iframe#webWidget");
  if (!doc) return;

  const box = getComposer(doc);
  if (!box || box.dataset.bbBound === "1") return;

  box.dataset.bbBound = "1";
  box.addEventListener("keydown", (event) => {
    box.dataset.bbUserTyping = "1";
    if (event.key === "Enter" && !event.shiftKey) {
      window.setTimeout(() => {
        box.dataset.bbUserTyping = "0";
      }, 0);
    }
  });
}

function clearRepeatedly() {
  const start = Date.now();
  const timer = window.setInterval(() => {
    clearComposer();
    markTyping();
    if (Date.now() - start > CLEAR_WINDOW_MS) window.clearInterval(timer);
  }, 100);
}

function injectCss(doc: Document | null, cssText: string, styleId: string) {
  if (!doc?.head) return false;

  let style = doc.getElementById(styleId);
  if (!style) {
    style = doc.createElement("style");
    style.id = styleId;
    doc.head.appendChild(style);
  }
  style.textContent = cssText;
  return true;
}

function applyZeSettings() {
  const zE = getZe();
  if (!zE) return false;

  try {
    zE("webWidget", "updateSettings", {
      webWidget: {
        color: {
          theme: COLOR,
          launcher: COLOR,
          launcherText: "#FFFFFF",
          button: COLOR,
          header: COLOR,
          resultLists: COLOR,
          articleLinks: COLOR,
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}

function paintWidget() {
  const css =
    `.u-userLauncherColor:not([disabled]){` +
    `background-color:${COLOR} !important;` +
    `color:#fff !important;` +
    `fill:#fff !important;` +
    `}` +
    `header,` +
    `[data-testid="widget-title"],` +
    `.HeaderView-sc-1gl8kno-0,` +
    `.gJLDHj{` +
    `background:${COLOR} !important;` +
    `background-color:${COLOR} !important;` +
    `color:#fff !important;` +
    `}`;

  injectCss(getFrameDoc("iframe#launcher"), css, "bb-zd-navy");
  injectCss(getFrameDoc("iframe#webWidget"), css, "bb-zd-navy");
}

export default function ZendeskWidget() {
  useEffect(() => {
    const timers: number[] = [];
    let autoOpenBound = false;
    let clearInputBound = false;
    let colorEventsBound = false;
    let colorTries = 0;
    let bindTries = 0;

    function initAutoOpen() {
      const zE = getZe();
      if (!zE) return false;

      zE(() => {
        zE("webWidget", "open");
        zE("webWidget:on", "chat:unreadMessages", (number: unknown) => {
          if (typeof number === "number" && number > 0) {
            zE("webWidget", "show");
            zE("webWidget", "open");
          }
        });
      });
      return true;
    }

    function bindClearInput() {
      const zE = getZe();
      if (!zE) return false;

      try {
        zE("webWidget:on", "open", () => {
          const doc = getFrameDoc("iframe#webWidget");
          const box = doc ? getComposer(doc) : null;
          if (box) box.dataset.bbUserTyping = "0";
          clearRepeatedly();
        });
        zE("webWidget:on", "close", () => {
          clearRepeatedly();
        });
        zE("webWidget:on", "chat:unreadMessages", () => {
          clearRepeatedly();
        });
      } catch {
        return false;
      }

      markTyping();
      return true;
    }

    function bindColorEvents() {
      const zE = getZe();
      if (!zE) return false;

      try {
        zE("webWidget:on", "open", () => {
          applyZeSettings();
          let i = 0;
          const t = window.setInterval(() => {
            paintWidget();
            if (++i > 20) window.clearInterval(t);
          }, 100);
          timers.push(t);
        });
        zE("webWidget:on", "chat:unreadMessages", () => {
          paintWidget();
        });
        return true;
      } catch {
        return false;
      }
    }

    const boot = window.setInterval(() => {
      if (!autoOpenBound) autoOpenBound = initAutoOpen();
      if (!clearInputBound) clearInputBound = bindClearInput();
      applyZeSettings();
      paintWidget();

      if (!colorEventsBound) {
        colorEventsBound = bindColorEvents();
      }

      bindTries += 1;
      colorTries += 1;
      if ((autoOpenBound && clearInputBound && colorEventsBound && colorTries > 60) || bindTries > 100) {
        window.clearInterval(boot);
      }
    }, 200);
    timers.push(boot);

    return () => {
      for (const timer of timers) window.clearInterval(timer);
    };
  }, []);

  return (
    <Script
      id="ze-snippet"
      src={`https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`}
      strategy="afterInteractive"
    />
  );
}
