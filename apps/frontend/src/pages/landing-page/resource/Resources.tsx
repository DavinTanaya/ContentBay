import { ResourcesHero } from './components/ResourcesHero';
import { CategoryGrid } from './components/CategoryGrid';
import { CommunitySection } from './components/CommunitySection';

export default function Resources() {
  return (
    <div className="overflow-hidden">
      
      <ResourcesHero />
      <CategoryGrid />
      <CommunitySection />
    </div>
  );
}
