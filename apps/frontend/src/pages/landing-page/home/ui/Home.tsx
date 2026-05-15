import { DeveloperExperienceSection } from './components/DeveloperExperienceSection';
import { FeaturesGridSection } from './components/FeaturesGridSection';
import { HomeHeroSection } from './components/HomeHeroSection';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { SolutionOverviewSection } from './components/SolutionOverviewSection';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HomeHeroSection />
      <ProblemStatementSection />
      <SolutionOverviewSection />
      <FeaturesGridSection />
      <DeveloperExperienceSection />
    </div>
  );
}
