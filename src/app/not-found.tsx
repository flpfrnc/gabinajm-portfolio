import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-display font-serif font-bold text-foreground mb-4">
          404
        </div>
        <p className="text-muted uppercase tracking-widest text-sm mb-12">
          Page not found
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/"
            className="text-foreground uppercase tracking-widest text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-muted hover:border-muted transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="text-muted uppercase tracking-widest text-sm font-semibold border-b-2 border-muted pb-1 hover:text-foreground hover:border-foreground transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

NotFoundPage.displayName = "NotFoundPage";
