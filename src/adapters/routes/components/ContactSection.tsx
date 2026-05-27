"use client";

import { useState } from "react";

export interface ContactSectionProps {
  heading?: string;
  subtitle?: string;
  email?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  availabilityText?: string;
}

const PLATFORM_COLORS: Record<string, string> = {
  email: "bg-accent",
  linkedin: "bg-[#0077B5]",
  instagram: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]",
  github: "bg-foreground",
  twitter: "bg-[#1DA1F2]",
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
};

function getPlatformHandle(url: string, platform: string): string {
  if (platform === "email") return url.replace("mailto:", "");
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\//, "").replace(/\/$/, "");
    return path ? `@${path}` : url;
  } catch {
    return url;
  }
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const ContactSection: React.FC<ContactSectionProps> = ({
  heading = "Let's talk",
  subtitle = "I will reply to you as soon as possible.",
  email,
  socialLinks = [],
  availabilityText,
}) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        console.error("Contact form error:", data.error);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="container-max py-16 md:py-24" aria-label="Contact" id="contact">
      <h2 className="text-heading font-extrabold text-foreground mb-2">
        {heading}
      </h2>
      <p className="text-base text-muted mb-10">
        {subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2">
              E-mail
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              placeholder="Tell me about your project..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-pill bg-gradient-to-r from-accent to-accent-purple text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send Message"}
            {status === "idle" && <SendIcon />}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-500 text-center">
              Failed to send. Please try again or email directly.
            </p>
          )}
          {status === "sent" && (
            <p className="text-sm text-green-600 text-center">
              Thank you! I&apos;ll get back to you soon.
            </p>
          )}
        </form>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Connect with me
          </h3>

          {socialLinks.map((link) => {
            const colorClass = PLATFORM_COLORS[link.platform] || "bg-foreground";
            const icon = PLATFORM_ICONS[link.platform];
            const handle = getPlatformHandle(link.url, link.platform);

            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target={link.platform === "email" ? undefined : "_blank"}
                rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-accent/30 transition-colors group"
                aria-label={`${link.platform}: ${handle}`}
              >
                <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {link.platform}
                  </p>
                  <p className="text-sm text-muted truncate">
                    {handle}
                  </p>
                </div>
                <ArrowIcon />
              </a>
            );
          })}

          {email && !socialLinks.some((l) => l.platform === "email") && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-accent/30 transition-colors"
              aria-label={`Email: ${email}`}
            >
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                {PLATFORM_ICONS.email}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted truncate">{email}</p>
              </div>
              <ArrowIcon />
            </a>
          )}

          {availabilityText && (
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#FCE7F3] to-[#F3E8FF] text-[#364153]">
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Availability: </span>
                {availabilityText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";
