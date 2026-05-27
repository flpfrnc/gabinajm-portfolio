import { Metadata } from "next";
import { ProfileHeader } from "@/src/adapters/routes/components/ProfileHeader";
import { SectionBlock } from "@/src/adapters/routes/components/SectionBlock";
import { ContactSection } from "@/src/adapters/routes/components/ContactSection";
import { ScrollReveal } from "@/src/adapters/routes/components/ScrollReveal";
import { getSanityDataService } from "@/src/services";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my creative process, background, and vision",
  openGraph: {
    title: "About | Portfolio",
    description: "Learn more about my creative process, background, and vision",
    type: "website",
  },
};

export default async function AboutPage() {
  try {
    const dataService = await getSanityDataService();
    const [profile, sections] = await Promise.all([
      dataService.getProfile(),
      dataService.getSections(),
    ]);

    if (!profile) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center container-max">
            <h1 className="text-heading font-serif font-bold text-foreground mb-6">
              Profile Not Found
            </h1>
            <p className="text-muted text-sm uppercase tracking-widest mb-8">
              Profile information is currently unavailable.
            </p>
            <a
              href="/"
              className="text-foreground uppercase tracking-widest text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-muted hover:border-muted transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    const technologies = profile.technologies || [];
    const socialLinks = profile.getSocialLinks?.() || profile.socialLinks || [];
    const email = socialLinks.find((l) => l.platform === "email")?.url?.replace("mailto:", "");

    return (
      <>
        <ProfileHeader profile={profile} />

        <section className="container-max pb-24 md:pb-32">
          <ScrollReveal variant="clip">
            <div className="max-w-3xl mb-20 md:mb-28">
              <h2 className="text-heading font-serif font-bold text-foreground mb-8 clip-target">
                About
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                <p>
                  I&apos;m a creative designer who believes that great design starts with
                  empathy and ends with impact. My work spans branding, visual identity,
                  and digital experiences — always with a focus on clarity and emotion.
                </p>
                <p>
                  Every project is an opportunity to tell a story. I combine strategic
                  thinking with visual craft to create work that resonates with people
                  and serves the goals of the brands I collaborate with.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {technologies.length > 0 && (
            <>
            <ScrollReveal variant="line" as="hr" className="border-0 h-px bg-border mb-0" />
            <ScrollReveal>
              <div className="py-16 md:py-20 mb-0">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
                  <h2 className="uppercase tracking-widest text-sm text-accent-pink font-extrabold md:sticky md:top-28">
                    Skills & Tools
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-sans text-foreground uppercase tracking-widest border border-border rounded-pill px-4 py-2 hover:bg-foreground hover:text-background transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </>
          )}

          <ScrollReveal variant="line" as="hr" className="border-0 h-px bg-border mb-0" />
          <ScrollReveal>
            <div className="py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
                <h2 className="uppercase tracking-widest text-sm text-accent-pink font-extrabold md:sticky md:top-28">
                  Experience
                </h2>
                <div className="space-y-12">
                  <div className="border-l-2 border-accent/30 pl-8">
                    <p className="text-xs text-muted uppercase tracking-widest mb-2">
                      2023 &mdash; Present
                    </p>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                      Senior Creative Designer
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Leading visual direction for brands across digital and print,
                      crafting cohesive identities that connect with audiences.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent/30 pl-8">
                    <p className="text-xs text-muted uppercase tracking-widest mb-2">
                      2020 &mdash; 2023
                    </p>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                      Visual Designer
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Designed brand systems, marketing materials, and digital interfaces
                      for startups and established companies.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent/30 pl-8">
                    <p className="text-xs text-muted uppercase tracking-widest mb-2">
                      2018 &mdash; 2020
                    </p>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                      Junior Designer
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Began my creative journey exploring typography, layout, and color
                      theory while contributing to collaborative projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {sections.map((section) => (
          <ScrollReveal key={section.id}>
            <SectionBlock section={section} />
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <ContactSection
            email={email}
            socialLinks={socialLinks.filter((l) => l.platform !== "email")}
          />
        </ScrollReveal>
      </>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center container-max">
          <h1 className="text-heading font-serif font-bold text-foreground mb-6">
            Unable to Load Content
          </h1>
          <p className="text-muted text-sm uppercase tracking-widest mb-8">
            Please try again later.
          </p>
          <a
            href="/"
            className="text-foreground uppercase tracking-widest text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-muted hover:border-muted transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
}

AboutPage.displayName = "AboutPage";
