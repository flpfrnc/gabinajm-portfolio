"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavigationProps {
  brandName?: string;
  links?: Array<{ href: string; label: string }>;
  ctaLink?: { href: string; label: string };
}

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = ({
  brandName = "Gabinajm",
  links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ],
  ctaLink = { href: "#contact", label: "Contact" },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-surface backdrop-blur-md"
      style={{ WebkitBackdropFilter: "blur(7.5px)" }}
      aria-label="Main navigation"
    >
      <div className="max-w-[1158px] mx-auto h-[72px] md:h-[80px] px-6 md:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="relative z-[2] flex items-center gap-2 text-accent-pink"
          aria-label={`${brandName} home`}
        >
          <SparkleIcon />
          <span className="text-lg font-bold text-foreground">{brandName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ctaLink.href}
            className="px-5 py-2.5 rounded-pill bg-gradient-to-r from-accent to-accent-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaLink.label}
          </Link>
        </div>

        <button
          className="md:hidden text-foreground hover:text-accent-pink focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="uppercase text-xs tracking-widest font-semibold">
            {isOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-10 md:hidden animate-fade-in"
          role="region"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-3xl font-bold transition-colors ${
                isActive(link.href) ? "text-accent-pink" : "text-foreground hover:text-accent-pink"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ctaLink.href}
            className="px-8 py-3 rounded-pill bg-gradient-to-r from-accent to-accent-purple text-white text-xl font-bold hover:opacity-90 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            {ctaLink.label}
          </Link>
        </div>
      )}
    </nav>
  );
};

Navigation.displayName = "Navigation";
