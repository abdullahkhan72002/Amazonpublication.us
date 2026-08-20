import { ImageIcon } from "lucide-react";

export type ImagePlaceholderProps = {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function ImagePlaceholder({
  label = "Image",
  tone = "light",
  className = "",
}: ImagePlaceholderProps) {
  const toneClasses =
    tone === "dark"
      ? "border-white/25 bg-white/5 text-white/55"
      : "border-primary/20 bg-primary/5 text-primary/45";

  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed ${toneClasses} ${className}`}
    >
      <ImageIcon className="size-7" aria-hidden />
      <span className="px-3 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
