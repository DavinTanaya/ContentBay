import { DeveloperExperienceSection } from '@/pages/landing-page/home/components/DeveloperExperienceSection';
import { FeaturesGridSection } from '@/pages/landing-page/home/components/FeaturesGridSection';
import { HeroBannerSection } from '@/pages/landing-page/home/components/HeroBannerSection';
import { ProblemStatementSection } from '@/pages/landing-page/home/components/ProblemStatementSection';
import { SolutionOverviewSection } from '@/pages/landing-page/home/components/SolutionOverviewSection';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroBannerSection />
      <ProblemStatementSection />
      <SolutionOverviewSection />
      <FeaturesGridSection />
      <DeveloperExperienceSection />
    </div>
  );
}
