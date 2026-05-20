import { ContentModelCard } from './ContentModelCard';
import type { ContentModelGridProps } from '../model/types';

export function ContentModelGrid({
  models,
  onCardClick,
}: ContentModelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {models.map((model) => (
        <ContentModelCard
          key={model.id}
          model={model}
          authorName={model.authorName}
          authorInitial={model.authorInitial}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
