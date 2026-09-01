export const MANUSCRIPT_MAX_BYTES = 4 * 1024 * 1024;
export const MANUSCRIPT_MAX_LABEL = "4 MB";

export const MANUSCRIPT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".rtf",
  ".txt",
  ".odt",
] as const;

export const MANUSCRIPT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
  "text/plain",
  "application/vnd.oasis.opendocument.text",
] as const;

export const MANUSCRIPT_ACCEPT = [
  ...MANUSCRIPT_EXTENSIONS,
  ...MANUSCRIPT_MIME_TYPES,
].join(",");

export const MANUSCRIPT_REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "street",
  "city",
  "state",
  "zip",
  "country",
  "bookTitle",
  "genre",
  "synopsis",
] as const;

export function getFileExtension(filename: string) {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.slice(index).toLowerCase() : "";
}

export function isAllowedManuscriptFile(file: { name: string; type: string }) {
  const extension = getFileExtension(file.name);
  if (
    MANUSCRIPT_EXTENSIONS.includes(
      extension as (typeof MANUSCRIPT_EXTENSIONS)[number],
    )
  ) {
    return true;
  }

  return MANUSCRIPT_MIME_TYPES.includes(
    file.type as (typeof MANUSCRIPT_MIME_TYPES)[number],
  );
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
