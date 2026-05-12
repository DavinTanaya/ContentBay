import { DeveloperExperienceSection } from './components/DeveloperExperienceSection';
import { FeaturesGridSection } from './components/FeaturesGridSection';
import { HeroBannerSection } from './components/HeroBannerSection';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { SolutionOverviewSection } from './components/SolutionOverviewSection';

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
