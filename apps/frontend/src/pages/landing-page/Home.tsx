import { DeveloperExperienceSection } from '@/features/landing-page/components/DeveloperExperienceSection';
import { FeaturesGridSection } from '@/features/landing-page/components/FeaturesGridSection';
import { HeroBannerSection } from '@/features/landing-page/components/HeroBannerSection';
import { PrimaryNavigationSection } from '@/features/landing-page/components/PrimaryNavigationSection';
import { ProblemStatementSection } from '@/features/landing-page/components/ProblemStatementSection';
import { QuickStartCtaSection } from '@/features/landing-page/components/QuickStartCtaSection';
import { SiteFooterSection } from '@/features/landing-page/components/SiteFooterSection';
import { SolutionOverviewSection } from '@/features/landing-page/components/SolutionOverviewSection';

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <PrimaryNavigationSection />
      <HeroBannerSection />
      <ProblemStatementSection />
      <SolutionOverviewSection />
      <FeaturesGridSection />
      <DeveloperExperienceSection />
      <QuickStartCtaSection />
      <SiteFooterSection />
    </main>
  );
}
