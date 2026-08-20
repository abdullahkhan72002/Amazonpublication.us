export type SocialPlatform = "facebook" | "x" | "youtube";

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

/** Lucide v1 no longer ships brand marks, so social glyphs are inlined here. */
const PATHS: Record<SocialPlatform, string> = {
  facebook:
    "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.4V14h2.2v8h3.9z",
  x: "M17.2 3h3.3l-7.2 8.2L21.5 21h-6l-4.4-5.5L6 21H2.7l7.5-8.6L2.9 3h6.1l4 5.1L17.2 3zm-1.1 16h1.8L7.9 4.9H6L16.1 19z",
  youtube:
    "M21.3 8.2a2.5 2.5 0 0 0-1.7-1.8C18 6 12 6 12 6s-6 0-7.6.4A2.5 2.5 0 0 0 2.7 8.2C2.3 9.8 2.3 12 2.3 12s0 2.2.4 3.8a2.5 2.5 0 0 0 1.7 1.8C6 18 12 18 12 18s6 0 7.6-.4a2.5 2.5 0 0 0 1.7-1.8c.4-1.6.4-3.8.4-3.8s0-2.2-.4-3.8zM10.2 15V9l5 3-5 3z",
};

export default function SocialIcon({ platform, className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={PATHS[platform]} />
    </svg>
  );
}
