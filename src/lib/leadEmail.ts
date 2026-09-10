const REQUIRED_LEAD_EMAILS = [
  "info@amazonpublication.us",
  "absarmustaja99@gmail.com",
];

export function getLeadRecipients() {
  const extra = (process.env.LEAD_EMAIL_TO ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return [...new Set([...REQUIRED_LEAD_EMAILS, ...extra])];
}
