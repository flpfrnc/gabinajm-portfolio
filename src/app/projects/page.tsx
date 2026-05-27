import { Metadata } from "next";
import { ProjectGrid } from "@/src/adapters/routes/components/ProjectGrid";
import { ContactSection } from "@/src/adapters/routes/components/ContactSection";
import { ScrollReveal } from "@/src/adapters/routes/components/ScrollReveal";
import { buildSanityImageUrl, getSanityDataService } from "@/src/services";

const CARD_IMAGE_WIDTH = 1200;
const CARD_IMAGE_HEIGHT = 750;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all creative projects and selected works",
  openGraph: {
    title: "Projects | Portfolio",
    description: "Browse all creative projects and selected works",
    type: "website",
  },
};

export default async function ProjectsPage() {
  try {
    const dataService = await getSanityDataService();

    const [projects, profile] = await Promise.all([
      dataService.getProjects({ sort: "newest" }),
      dataService.getProfile(),
    ]);

    const socialLinks = profile?.getSocialLinks?.() || profile?.socialLinks || [];
    const email = socialLinks.find((l) => l.platform === "email")?.url?.replace("mailto:", "");

    return (
      <>
        <header className="container-max pt-40 pb-12 md:pt-48 md:pb-16">
          <h1 className="text-display font-serif font-bold text-foreground animate-fade-up">
            All Projects
          </h1>
          <p
            className="text-muted uppercase tracking-widest text-sm mt-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {projects.length} project{projects.length !== 1 ? "s" : ""} in portfolio
          </p>
        </header>

        {projects.length > 0 ? (
          <ScrollReveal>
            <ProjectGrid
              projects={projects.map((project) => ({
                title: project.title,
                slug: project.slug,
                description: project.description,
                mainImage: project.mainImage?.asset
                  ? {
                      url: buildSanityImageUrl(
                        {
                          assetRef: project.mainImage.assetRef,
                          assetId: project.mainImage.asset.id,
                          crop: project.mainImage.crop,
                          hotspot: project.mainImage.hotspot,
                        },
                        {
                          width: CARD_IMAGE_WIDTH,
                          height: CARD_IMAGE_HEIGHT,
                          fit: project.mainImageCrop === "full" ? "max" : "crop",
                        }
                      ) || project.mainImage.asset.url,
                      lqip: project.mainImage.asset.lqip || "",
                      alt: project.mainImage.alt || project.title,
                    }
                  : undefined,
                imageFit: project.mainImageCrop === "full" ? "contain" : "cover",
                technologies: project.getTechnologyNames(),
                link: project.getPrimaryUrl() || undefined,
                featured: project.featured,
                isProtected: project.isProtected,
              }))}
              title="All Projects"
            />
          </ScrollReveal>
        ) : (
          <div className="container-max py-24 text-center">
            <p className="text-muted uppercase tracking-widest text-sm">
              No projects available at the moment.
            </p>
          </div>
        )}

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
            Unable to Load Projects
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

ProjectsPage.displayName = "ProjectsPage";
