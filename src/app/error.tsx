"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-display font-serif font-bold text-foreground mb-4">
          Oops
        </h1>
        <p className="text-muted uppercase tracking-widest text-sm mb-8">
          Something went wrong
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mb-8 p-6 border border-border text-left">
            <p className="text-sm font-mono text-foreground/70">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-muted mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={reset}
            className="text-foreground uppercase tracking-widest text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-muted hover:border-muted transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="text-muted uppercase tracking-widest text-sm font-semibold border-b-2 border-muted pb-1 hover:text-foreground hover:border-foreground transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

ErrorPage.displayName = "ErrorPage";
