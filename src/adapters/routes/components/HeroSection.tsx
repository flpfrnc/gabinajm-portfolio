import Image from "next/image";
import { type IProfile } from "@domain";

export interface HeroSectionProps {
  profile: IProfile;
  greeting?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  ctaPrimaryLabel = "Get in touch",
  ctaPrimaryHref = "#contact",
  ctaSecondaryLabel = "Learn more",
  ctaSecondaryHref = "#about",
}) => {
  const avatarUrl = profile.avatar?.asset?.url;

  return (
    <header
      className="min-h-[70vh] md:min-h-[85vh] flex items-center relative pt-28 pb-16 overflow-hidden"
      aria-label="Portfolio hero"
    >
      <div className="container-max relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        <div className="flex-1 max-w-xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-accent/10 text-accent text-sm font-semibold mb-6">
            <SparkleIcon />
            {profile.title}
          </span>

          <h1 className="text-display font-extrabold text-foreground mb-6 leading-[1]">
            Hi there!{" "}
            <span className="inline-block animate-wave origin-[70%_70%]" aria-hidden="true">
              {"\u{1F44B}"}
            </span>
            <br />
            I&apos;m{" "}
            <span className="text-accent relative">
              Gabi
              <span className="absolute -bottom-1 left-0 right-0 h-[6px] bg-accent/30 rounded-full" aria-hidden="true" />
            </span>
            ,
          </h1>

          <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-md">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={ctaPrimaryHref}
              className="px-7 py-3.5 rounded-pill bg-gradient-to-r from-accent to-accent-purple text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {ctaPrimaryLabel}
            </a>
            <a
              href={ctaSecondaryHref}
              className="px-7 py-3.5 rounded-pill border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              {ctaSecondaryLabel}
            </a>
          </div>
        </div>

        {avatarUrl && (
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
              <Image
                src={avatarUrl}
                alt={profile.avatar?.alt || profile.name}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 320px, 500px"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

HeroSection.displayName = "HeroSection";
