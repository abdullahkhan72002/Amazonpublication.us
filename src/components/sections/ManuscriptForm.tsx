"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  MapPin,
  Upload,
  User,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { HighlightedText } from "@/components/ui/SectionHeading";
import {
  manuscriptGenres,
  manuscriptHeroContent,
  manuscriptSteps,
  manuscriptThanksContent,
} from "@/data/manuscript";
import {
  formatFileSize,
  isAllowedManuscriptFile,
  MANUSCRIPT_ACCEPT,
  MANUSCRIPT_MAX_BYTES,
  MANUSCRIPT_MAX_LABEL,
} from "@/lib/manuscript";
import { submitManuscript } from "@/lib/submitManuscript";

const inputClasses =
  "text-nav w-full rounded-lg border border-foreground/12 bg-white px-4 py-3 text-foreground outline-none transition-all placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15";

function Field({
  id,
  label,
  required,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-nav font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-primary"> *</span>
        ) : (
          <span className="ml-1.5 text-sm font-normal text-foreground/40">
            Optional
          </span>
        )}
      </label>
      {children}
      {hint ? (
        <p className="text-sm text-foreground/50">{hint}</p>
      ) : null}
    </div>
  );
}

function assignFile(input: HTMLInputElement, file: File) {
  const transfer = new DataTransfer();
  transfer.items.add(file);
  input.files = transfer.files;
}

export default function ManuscriptForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [dragging, setDragging] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "error") {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status, errorMessage]);

  const applyFile = (file: File | undefined) => {
    const input = fileInputRef.current;
    if (!file || !input) {
      setFileName("");
      setFileSize("");
      return;
    }

    assignFile(input, file);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyFile(event.target.files?.[0]);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    applyFile(event.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setStatus("error");
      setErrorMessage("Please attach your manuscript file.");
      return;
    }

    if (file.size > MANUSCRIPT_MAX_BYTES) {
      setStatus("error");
      setErrorMessage(
        `Your manuscript is too large. Please upload a file under ${MANUSCRIPT_MAX_LABEL}.`,
      );
      return;
    }

    if (!isAllowedManuscriptFile(file)) {
      setStatus("error");
      setErrorMessage(
        "Please upload a PDF, Word, RTF, TXT, or ODT manuscript file.",
      );
      return;
    }

    const result = await submitManuscript(form);

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    form.reset();
    setFileName("");
    setFileSize("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f5f4fb] to-white py-10 max-sm:py-8 lg:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-primary/[0.04]"
        aria-hidden
      />

      <div className="relative mx-auto w-full px-4 md:w-[85%] md:px-0 lg:w-[70%]">
        <Reveal variant="fade-up">
          <div className="mb-8 text-center lg:mb-10">
            <p className="text-nav font-medium uppercase tracking-[0.22em] text-primary">
              {manuscriptHeroContent.eyebrow}
            </p>
            <h1 className="font-heading mt-3 text-4xl font-semibold text-foreground max-sm:text-3xl sm:text-5xl lg:text-[3.25rem]">
              <HighlightedText
                text={manuscriptHeroContent.title}
                highlight={manuscriptHeroContent.highlight}
              />
            </h1>
            <p className="text-body mx-auto mt-4 max-w-2xl text-foreground/70">
              {manuscriptHeroContent.description}
            </p>
          </div>
        </Reveal>

        {status === "success" ? (
          <Reveal variant="scale">
            <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white px-6 py-12 text-center shadow-[0_28px_80px_-32px_rgba(10,0,128,0.28)] sm:px-12 sm:py-16">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-white">
                <Check className="size-8" aria-hidden />
              </span>
              <h2 className="font-heading mt-6 text-2xl font-semibold text-foreground sm:text-3xl">
                {manuscriptThanksContent.title}
              </h2>
              <p className="text-body mx-auto mt-4 max-w-xl text-foreground/70">
                {manuscriptThanksContent.body}
              </p>
              <Button
                type="button"
                variant="primary-light"
                className="mt-8"
                onClick={() => setStatus("idle")}
              >
                Submit another manuscript
              </Button>
            </div>
          </Reveal>
        ) : (
          <Reveal variant="fade-up" delay={80}>
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_28px_80px_-32px_rgba(10,0,128,0.28)]"
            >
              <div className="h-1.5 w-full bg-primary" />

              <ol className="grid gap-4 border-b border-foreground/8 px-5 py-5 sm:grid-cols-3 sm:px-8 lg:px-10">
                {manuscriptSteps.map((step, index) => (
                  <li key={step.number} className="flex items-start gap-3">
                    <span className="font-heading text-sm font-semibold tracking-[0.16em] text-primary">
                      {step.number}
                    </span>
                    <span>
                      <span className="block font-heading text-base font-semibold text-foreground">
                        {step.title}
                      </span>
                      <span className="text-sm text-foreground/55">
                        {step.description}
                      </span>
                    </span>
                    {index < manuscriptSteps.length - 1 ? (
                      <span
                        className="ml-auto hidden h-px flex-1 self-center bg-foreground/10 sm:block"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="flex flex-col gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <fieldset className="flex flex-col gap-5">
                  <legend className="mb-1 flex items-center gap-3 font-heading text-xl font-semibold text-foreground">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                      <User className="size-4" aria-hidden />
                    </span>
                    Author details
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="fullName" label="Full name" required>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="penName" label="Pen name">
                      <input
                        id="penName"
                        name="penName"
                        type="text"
                        placeholder="If different from your legal name"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="email" label="Email" required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="phone" label="Phone" required>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="Phone number"
                        className={inputClasses}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-5">
                  <legend className="mb-1 flex items-center gap-3 font-heading text-xl font-semibold text-foreground">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    Address
                  </legend>
                  <Field id="street" label="Street address" required>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      autoComplete="street-address"
                      placeholder="Street address"
                      className={inputClasses}
                    />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="city" label="City" required>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="City"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="state" label="State / Province" required>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        autoComplete="address-level1"
                        placeholder="State or province"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="zip" label="ZIP / Postal code" required>
                      <input
                        id="zip"
                        name="zip"
                        type="text"
                        required
                        autoComplete="postal-code"
                        placeholder="ZIP or postal code"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="country" label="Country" required>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        autoComplete="country-name"
                        placeholder="Country"
                        className={inputClasses}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-5">
                  <legend className="mb-1 flex items-center gap-3 font-heading text-xl font-semibold text-foreground">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                      <BookOpen className="size-4" aria-hidden />
                    </span>
                    Book details
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="bookTitle" label="Book title" required>
                      <input
                        id="bookTitle"
                        name="bookTitle"
                        type="text"
                        required
                        placeholder="Title of your manuscript"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="genre" label="Genre" required>
                      <div className="relative">
                        <select
                          id="genre"
                          name="genre"
                          required
                          defaultValue=""
                          className={`${inputClasses} appearance-none pr-11`}
                        >
                          <option value="" disabled>
                            Select a genre
                          </option>
                          {manuscriptGenres.map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-primary"
                          aria-hidden
                        />
                      </div>
                    </Field>
                    <Field id="wordCount" label="Word count">
                      <input
                        id="wordCount"
                        name="wordCount"
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 75,000"
                        className={inputClasses}
                      />
                    </Field>
                    <Field id="audience" label="Target audience">
                      <input
                        id="audience"
                        name="audience"
                        type="text"
                        placeholder="e.g. Young adult, general fiction"
                        className={inputClasses}
                      />
                    </Field>
                  </div>
                  <Field id="synopsis" label="Synopsis" required>
                    <textarea
                      id="synopsis"
                      name="synopsis"
                      rows={6}
                      required
                      placeholder="Tell us about your book, characters, and what makes this story yours."
                      className={`${inputClasses} min-h-[9rem] resize-y`}
                    />
                  </Field>
                  <Field
                    id="manuscript"
                    label="Manuscript file"
                    required
                    hint={`PDF, Word, RTF, TXT, or ODT. Maximum ${MANUSCRIPT_MAX_LABEL}.`}
                  >
                    <input
                      ref={fileInputRef}
                      id="manuscript"
                      name="manuscript"
                      type="file"
                      required
                      accept={MANUSCRIPT_ACCEPT}
                      onChange={onFileChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="manuscript"
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                        dragging || fileName
                          ? "border-primary bg-primary/[0.04]"
                          : "border-primary/20 bg-[#f8f7fc] hover:border-primary hover:bg-primary/[0.04]"
                      }`}
                    >
                      {fileName ? (
                        <>
                          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                            <FileText className="size-5" aria-hidden />
                          </span>
                          <span className="font-heading text-base font-semibold text-foreground">
                            {fileName}
                          </span>
                          <span className="text-sm text-foreground/55">
                            {fileSize} · Tap to replace
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Upload className="size-5" aria-hidden />
                          </span>
                          <span className="font-heading text-base font-semibold text-foreground">
                            Drop your manuscript here
                          </span>
                          <span className="text-sm text-foreground/55">
                            or tap to browse your files
                          </span>
                        </>
                      )}
                    </label>
                  </Field>
                </fieldset>

                {status === "error" ? (
                  <p
                    ref={errorRef}
                    role="alert"
                    className="text-nav rounded-xl border border-primary/20 bg-primary/[0.04] px-4 py-3 text-foreground"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 border-t border-foreground/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-foreground/55">
                    Your file is sent privately to our editorial team. A
                    confirmation email goes to you right after submit.
                  </p>
                  <Button
                    type="submit"
                    variant="primary-light"
                    className="w-full shrink-0 sm:w-auto sm:min-w-[220px]"
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? "Submitting..."
                      : "Submit manuscript"}
                  </Button>
                </div>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
