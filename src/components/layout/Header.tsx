"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronsRight, Mail, Menu, Phone, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { isServicePage } from "@/lib/services";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export type HeaderProps = {
  email: string;
  phone: string;
  phoneHref: string;
  nav: NavItem[];
  consultationCta: NavLink;
};

export default function Header({
  email,
  phone,
  phoneHref,
  nav,
  consultationCta,
}: HeaderProps) {
  const pathname = usePathname();
  const isHeroOverlayPage =
    pathname === "/" ||
    pathname === "/about-us" ||
    pathname === "/portfolio" ||
    pathname === "/contact-us" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/return-and-refund-policies" ||
    isServicePage(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const isOverlay = isHeroOverlayPage && !scrolled;
  const isSolid = scrolled || !isHeroOverlayPage;

  const topBarClasses = isOverlay
    ? "bg-transparent text-white/70"
    : "bg-primary text-white/70";

  const navBarClasses = isOverlay
    ? "bg-transparent"
    : "border-b border-white/10 bg-primary";

  const headerClasses = `sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
    isSolid ? "bg-primary border-b-[1px] border-white" : ""
  }`;

  return (
    <header className={`${headerClasses} overflow-visible`}>
      <div className={topBarClasses}>
        <Container className="flex h-9 min-w-0 items-center justify-end gap-4 text-nav sm:gap-6">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-white/70 transition-colors hover:text-secondary"
          >
            <Mail className="size-3.5" aria-hidden />
            <span className="hidden truncate sm:inline">{email}</span>
          </a>
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-white/70 transition-colors hover:text-secondary"
          >
            <Phone className="size-3.5" aria-hidden />
            {phone}
          </a>
        </Container>
      </div>

      <div className={`${navBarClasses} overflow-visible`}>
        <Container className="flex h-20 min-w-0 items-center justify-between gap-4 lg:gap-6">
          <Link href="/" aria-label="Amazon Publication home" onClick={closeMenu} className="shrink-0">
            <img src="/logo.webp" alt="Amazon Publication" className="w-36 lg:w-40" />
          </Link>

          <nav className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-7">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              const linkClasses = `flex items-center gap-1 text-nav transition-colors ${
                isActive
                  ? "text-secondary"
                  : "text-white hover:text-secondary"
              }`;

              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href} className={linkClasses}>
                    <span
                      className={
                        isActive
                          ? "border-b-2 border-secondary pb-0.5"
                          : undefined
                      }
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              }

              return (
                <div key={item.label} className="group relative shrink-0">
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                    <ChevronDown
                      className="size-4 transition-transform group-hover:rotate-180"
                      aria-hidden
                    />
                  </Link>

                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 rounded-2xl border border-white/10 bg-primary-deep p-6 shadow-2xl shadow-black/50 sm:p-7">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2 text-nav text-white transition-colors hover:bg-white/5 hover:text-secondary"
                        >
                          <ChevronsRight
                            className="size-4 shrink-0 text-secondary"
                            aria-hidden
                          />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <Button
              href={phoneHref}
              variant="secondary-dark"
              icon={<Phone className="size-4" aria-hidden />}
              className="whitespace-nowrap px-3 py-2 text-xs xl:px-5 xl:py-3 xl:text-btn"
            >
              {phone}
            </Button>
            <Button
              href={consultationCta.href}
              variant="secondary-dark"
              className="whitespace-nowrap px-3 py-2 text-xs xl:px-5 xl:py-3 xl:text-btn"
            >
              <span className="2xl:hidden">Free Consultation</span>
              <span className="hidden 2xl:inline">{consultationCta.label}</span>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-secondary hover:text-secondary lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </Container>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen ? "visible" : "pointer-events-none invisible"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className={`absolute inset-0 bg-primary/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-full w-full max-w-[340px] flex-col bg-primary shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="font-heading text-lg font-semibold text-white">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-secondary hover:text-secondary"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
            {nav.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="border-b border-white/10 py-4 text-nav font-normal text-white transition-colors hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                );
              }

              const expanded = openGroup === item.label;

              return (
                <div key={item.label} className="border-b border-white/10 py-3">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between rounded-full border border-white/35 px-4 py-3 text-nav text-white transition-colors hover:border-secondary hover:text-secondary"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  {expanded ? (
                    <div className="mt-3 flex flex-col gap-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMenu}
                          className="flex items-center gap-2 py-2 text-nav text-white/85 transition-colors hover:text-secondary"
                        >
                          <ChevronsRight
                            className="size-4 shrink-0 text-secondary"
                            aria-hidden
                          />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5">
            <Button
              href={phoneHref}
              variant="secondary-dark"
              icon={<Phone className="size-4" aria-hidden />}
            >
              {phone}
            </Button>
            <Button href={consultationCta.href} variant="secondary-dark">
              {consultationCta.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
