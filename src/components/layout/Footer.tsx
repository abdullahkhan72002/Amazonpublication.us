import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import SocialIcon, { type SocialPlatform } from "@/components/ui/SocialIcon";
import type { NavLink } from "@/components/layout/Header";

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type FooterProps = {
  description: string;
  columns: FooterColumn[];
  socialTitle: string;
  socials: { platform: SocialPlatform; label: string; href: string }[];
  copyright: string;
  legal: NavLink[];
};

export default function Footer({
  description,
  columns,
  socialTitle,
  socials,
  copyright,
  legal,
}: FooterProps) {
  return (
    <footer className="bg-primary text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <img src="/logo.webp" alt="Amazon Publication" className="w-40" />
          <p className="text-body max-w-xs text-white/70">{description}</p>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-5">
            <h3 className="font-heading text-lg font-semibold">{column.title}</h3>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-nav flex items-center gap-2 text-white/75 transition-colors hover:text-secondary"
                  >
                    <ChevronsRight
                      className="size-4 shrink-0 text-secondary"
                      aria-hidden
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-5">
          <h3 className="font-heading text-lg font-semibold">{socialTitle}</h3>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep btn-sweep-secondary-dark flex size-9 items-center justify-center rounded-full bg-secondary text-primary"
              >
                <SocialIcon platform={social.platform} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-3 py-6 text-center text-sm text-white/65 md:flex-row md:justify-center">
          <span className="text-nav max-sm:text-xs!">{copyright}</span>
          <span className="hidden text-white/25 md:inline">|</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {legal.map((link, index) => (
              <li key={link.label} className="flex items-center gap-3">
                <Link
                  href={link.href}
                  className="text-nav transition-colors hover:text-secondary max-sm:text-xs!"
                >
                  {link.label}
                </Link>
                {index < legal.length - 1 ? (
                  <span className="text-white/25">|</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
