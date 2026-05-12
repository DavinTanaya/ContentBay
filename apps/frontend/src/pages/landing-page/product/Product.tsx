import { ProductHero } from './components/ProductHero';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ModelingSection } from './components/ModelingSection';
import { PerformanceScaleSection } from './components/PerformanceScaleSection';

export default function Product() {
  return (
    <div className="overflow-hidden">
      <ProductHero />
      <ArchitectureSection />
      <ModelingSection />
      <PerformanceScaleSection />
    </div>
  );
}