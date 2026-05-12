import { DocumentationHero } from './components/DocumentationHero';
import { GettingStartedAccordion } from './components/GettingStartedAccordion';

export default function Documentation() {
  return (
    <div className="overflow-hidden">
      <DocumentationHero />
      <GettingStartedAccordion />
    </div>
  );
}
