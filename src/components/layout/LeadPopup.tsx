"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { AtSign, Phone, X } from "lucide-react";
import { leadPopupContent } from "@/data/leadPopup";
import { site } from "@/data/site";
import { submitLeadForm } from "@/lib/submitLeadForm";

const POPUP_DELAY_MS = 2000;

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setStatus("idle");
    setErrorMessage("");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await submitLeadForm({
      formSource: "popup",
      fields: {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
      },
      website: String(formData.get("website") ?? ""),
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
    window.setTimeout(close, 1800);
  };

  if (!open) return null;

  const inputClasses =
    "text-nav w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-primary outline-none transition-colors placeholder:text-primary/40 focus:border-secondary";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <button
        type="button"
        aria-label="Close popup"
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[920px] flex-col overflow-y-auto rounded-2xl shadow-2xl lg:flex-row lg:overflow-hidden">
        <div className="bg-primary px-5 py-6 sm:px-8 sm:py-8 lg:max-h-[90vh] lg:w-[50%] lg:overflow-y-auto">
          <h2
            id="lead-popup-title"
            className="font-heading text-2xl font-semibold leading-snug text-white sm:text-3xl"
          >
            {leadPopupContent.titleBefore}{" "}
            <span className="text-secondary">
              {leadPopupContent.titleHighlight}
            </span>
          </h2>

          <p className="text-body mt-4 text-white/80">
            {leadPopupContent.description}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {leadPopupContent.features.map((feature) => (
              <li
                key={feature}
                className="text-nav flex items-start gap-2 text-white"
              >
                <span className="shrink-0" aria-hidden>👉</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-10">
            <a href={site.phoneHref} className="group flex flex-col gap-1">
              <span className="text-nav flex items-center gap-2 text-secondary">
                <Phone className="size-4" aria-hidden />
                {leadPopupContent.callLabel}
              </span>
              <span className="text-nav text-white transition-colors group-hover:text-secondary">
                {site.phone}
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-nav flex items-center gap-2 text-secondary">
                <AtSign className="size-4" aria-hidden />
                {leadPopupContent.discussLabel}
              </span>
              <span className="text-nav text-white transition-colors group-hover:text-secondary">
                {site.email}
              </span>
            </a>
          </div>
        </div>

        <div className="relative bg-white px-5 py-6 sm:px-8 sm:py-8 lg:max-h-[90vh] lg:w-[50%] lg:overflow-y-auto">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-8 items-center justify-center bg-primary text-white transition-colors hover:bg-secondary hover:text-primary sm:right-5 sm:top-5"
          >
            <X className="size-4" aria-hidden />
          </button>

          <form
            className="mt-8 flex flex-col gap-3 sm:gap-4 lg:mt-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-name" className="text-nav text-primary">
                {leadPopupContent.form.name.label}
              </label>
              <input
                id="popup-name"
                name="name"
                type="text"
                required
                placeholder={leadPopupContent.form.name.placeholder}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-email" className="text-nav text-primary">
                {leadPopupContent.form.email.label}
              </label>
              <input
                id="popup-email"
                name="email"
                type="email"
                required
                placeholder={leadPopupContent.form.email.placeholder}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-phone" className="text-nav text-primary">
                {leadPopupContent.form.phone.label}
              </label>
              <input
                id="popup-phone"
                name="phone"
                type="tel"
                required
                placeholder={leadPopupContent.form.phone.placeholder}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-message" className="text-nav text-primary">
                {leadPopupContent.form.message.label}
              </label>
              <textarea
                id="popup-message"
                name="message"
                rows={3}
                required
                placeholder={leadPopupContent.form.message.placeholder}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {status === "success" ? (
              <p className="text-nav rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-primary">
                Thank you! Your message has been sent.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="text-nav rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-sweep btn-sweep-primary-light mt-2 w-full rounded-lg py-3.5 text-btn disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : leadPopupContent.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
