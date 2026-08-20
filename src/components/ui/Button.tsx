import Link from "next/link";
import type { ReactNode } from "react";

export type SweepVariant =
  | "secondary-dark"
  | "secondary-light"
  | "primary-light"
  | "outline-dark"
  | "white";

const variantClasses: Record<SweepVariant, string> = {
  "secondary-dark": "btn-sweep btn-sweep-secondary-dark",
  "secondary-light": "btn-sweep btn-sweep-secondary-light",
  "primary-light": "btn-sweep btn-sweep-primary-light",
  "outline-dark": "btn-sweep btn-sweep-outline-dark",
  white: "btn-sweep btn-sweep-white",
};

type ButtonBaseProps = {
  variant: SweepVariant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-btn";

export default function Button({
  variant,
  children,
  className = "",
  icon,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const isNativeLink =
      rest.href.startsWith("tel:") || rest.href.startsWith("mailto:");

    if (isNativeLink) {
      return (
        <a href={rest.href} className={classes}>
          {icon}
          {children}
        </a>
      );
    }

    return (
      <Link href={rest.href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={"disabled" in rest ? rest.disabled : undefined}
      className={classes}
    >
      {icon}
      {children}
    </button>
  );
}
