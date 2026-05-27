import { type IProfile } from "@domain";

export interface AboutSectionProps {
  profile: IProfile;
  heading?: string;
  body?: string;
  showResume?: boolean;
  showSkills?: boolean;
}

const SKILL_ICONS: Record<string, React.ReactNode> = {
  accessibility: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
    </svg>
  ),
  "ux/ui": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  illustration: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r="2.5" /><path d="M17.5 10.5L21 3" /><path d="M3 21.5h18" /><path d="M12.5 9L3 21.5" /><path d="M12.5 9l5 12.5" />
    </svg>
  ),
  research: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

function getSkillIcon(skill: string): React.ReactNode {
  const key = skill.toLowerCase();
  return SKILL_ICONS[key] || (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  heading = "About Me",
  body,
  showResume = true,
  showSkills = true,
}) => {
  const bioText = body || profile.aboutBio || profile.bio;
  const hasResume = showResume && profile.resumeUrl;
  const hasSkills = showSkills && profile.technologies.length > 0;

  return (
    <section className="container-max py-12 md:py-20" aria-label={heading} id="about">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold text-accent mb-6">
          {heading}
        </h2>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-8">
          {bioText}
        </p>

        {hasResume && (
          <a
            href={profile.resumeUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-pill border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-background transition-colors mb-8"
          >
            <DownloadIcon />
            My resume
          </a>
        )}

        {hasSkills && (
          <div className="flex flex-wrap gap-3">
            {profile.technologies.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-background text-foreground text-sm font-medium"
              >
                {getSkillIcon(skill)}
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

AboutSection.displayName = "AboutSection";
