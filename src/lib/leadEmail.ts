const REQUIRED_LEAD_EMAILS = [
  "info@amazonpublication.us",
  "absarmustajab99@gmail.com",
];

export function getLeadRecipients() {
  const extra = (process.env.LEAD_EMAIL_TO ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(
      (email) =>
        Boolean(email) && email.toLowerCase() !== "absarmustaja99@gmail.com",
    );

  return [...new Set([...REQUIRED_LEAD_EMAILS, ...extra])];
}
