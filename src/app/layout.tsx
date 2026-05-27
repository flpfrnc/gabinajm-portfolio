import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/src/adapters/routes/components/Navigation";
import "@/src/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://gabinajm.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Gabinajm | Product Designer",
    template: "%s | Gabinajm",
  },
  description: "Product Designer crafting accessible and human-centered experiences",
  keywords: [
    "Product Designer",
    "UX Design",
    "UI Design",
    "Accessibility",
    "Portfolio",
    "User Experience",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Gabinajm",
    title: "Gabinajm | Product Designer",
    description: "Product Designer crafting accessible and human-centered experiences",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabinajm | Product Designer",
    description: "Product Designer crafting accessible and human-centered experiences",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-pill focus:bg-foreground focus:text-background focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gabi",
              jobTitle: "Product Designer",
              url: BASE_URL,
              sameAs: [
                "https://linkedin.com/in/gabinajm",
                "https://instagram.com/gabinajm",
              ],
            }),
          }}
        />
        <Navigation brandName="Gabinajm" links={navigationLinks} ctaLink={{ href: "#contact", label: "Contact" }} />
        <main id="main-content">{children}</main>
        <footer className="container-max py-10 flex flex-col items-center gap-1 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Gabinajm. All rights reserved.</p>
          <p>Designed &amp; built with passion and accessibility in mind</p>
        </footer>
      </body>
    </html>
  );
}

RootLayout.displayName = "RootLayout";
