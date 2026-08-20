"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { submitLeadForm } from "@/lib/submitLeadForm";

export type LeadFormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  multiline?: boolean;
  halfWidth?: boolean;
  required?: boolean;
};

export type LeadFormProps = {
  formSource: string;
  title?: string;
  fields: LeadFormField[];
  submitLabel: string;
  variant?: "card" | "onDark" | "flat";
  className?: string;
  onSuccess?: () => void;
};

function groupFields(fields: LeadFormField[]) {
  const groups: (LeadFormField | LeadFormField[])[] = [];
  let halfRow: LeadFormField[] = [];

  for (const field of fields) {
    if (field.halfWidth) {
      halfRow.push(field);
      if (halfRow.length === 2) {
        groups.push([...halfRow]);
        halfRow = [];
      }
    } else {
      if (halfRow.length > 0) {
        groups.push([...halfRow]);
        halfRow = [];
      }
      groups.push(field);
    }
  }

  if (halfRow.length > 0) {
    groups.push([...halfRow]);
  }

  return groups;
}

export default function LeadForm({
  formSource,
  title,
  fields,
  submitLabel,
  variant = "card",
  className = "",
  onSuccess,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isCard = variant === "card";
  const isFlat = variant === "flat";
  const isOnDark = variant === "onDark";

  const wrapperClasses = isCard
    ? "rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8"
    : isFlat
      ? "w-full"
      : "rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8";

  const titleClasses = isOnDark ? "text-white" : "text-primary";
  const labelClasses = isOnDark ? "text-white/80" : "text-primary/80";
  const controlClasses = isOnDark
    ? "border-white/15 bg-white/95 text-primary placeholder:text-primary/35 focus:border-secondary"
    : "border-primary/15 bg-white text-primary placeholder:text-primary/35 focus:border-secondary";
  const messageClasses = isOnDark ? "text-white/80" : "text-primary/80";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const fieldsData = Object.fromEntries(
      fields.map((field) => [field.name, String(formData.get(field.name) ?? "").trim()]),
    ) as Record<string, string>;

    const result = await submitLeadForm({
      formSource,
      fields: fieldsData,
      website: String(formData.get("website") ?? ""),
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
    onSuccess?.();
  };

  const renderField = (field: LeadFormField) => (
    <div key={field.name} className="flex flex-col gap-1.5">
      <label htmlFor={field.name} className={`text-nav ${labelClasses}`}>
        {field.label}
      </label>
      {field.multiline ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={5}
          required={field.required ?? true}
          placeholder={field.placeholder ?? field.label}
          className={`text-nav w-full resize-none rounded-md border px-3 py-2.5 outline-none transition-colors ${controlClasses}`}
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type ?? "text"}
          required={
            field.required ??
            (field.type === "email" || field.name.includes("email"))
          }
          placeholder={field.placeholder ?? field.label}
          className={`text-nav w-full rounded-md border px-3 py-2.5 outline-none transition-colors ${controlClasses}`}
        />
      )}
    </div>
  );

  return (
    <form className={`min-w-0 max-w-full ${wrapperClasses} ${className}`} onSubmit={handleSubmit}>
      {title ? (
        <h3
          className={`mb-6 text-center font-heading text-xs font-semibold uppercase tracking-[0.12em] text-balance sm:text-sm sm:tracking-[0.18em] ${titleClasses}`}
        >
          {title}
        </h3>
      ) : null}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-4">
        {groupFields(fields).map((group) => {
          if (Array.isArray(group)) {
            return (
              <div
                key={group.map((field) => field.name).join("-")}
                className="grid gap-4 sm:grid-cols-2"
              >
                {group.map((field) => renderField(field))}
              </div>
            );
          }

          return renderField(group);
        })}

        {status === "success" ? (
          <p className={`text-nav rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 ${messageClasses}`}>
            Thank you! Your message has been sent. We&apos;ll get back to you soon.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="text-nav rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary-light"
          className="mt-2 w-full rounded-md"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
