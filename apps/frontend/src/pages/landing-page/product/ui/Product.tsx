import { ProductHero } from './components/ProductHeroSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ModelingSection } from './components/ModelingSection';
import { PerformanceScaleSection } from './components/PerformanceScaleSection';
import { IntegratesSection } from './components/IntegratesSection';

export default function Product() {
  return (
    <div className="overflow-hidden">
      <ProductHero />
      <ArchitectureSection />
      <ModelingSection />
      <PerformanceScaleSection />
      <IntegratesSection />
    </div>
  );
}
