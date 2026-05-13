import type { FC } from 'react';
import { FolderOpen } from 'lucide-react';
import { ContentModelCard } from './ContentModelCard';

interface ContentModelGridProps {
  models: any[];
  onCardClick?: (id: string) => void;
}

export const ContentModelGrid: FC<ContentModelGridProps> = ({ models, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {models.map((model) => (
        <ContentModelCard
          key={model.id}
          model={{
            id: model.id,
            name: model.name,
            fields: model.fields?.length || 0,
            desc: model.description || 'No description provided',
            icon: <FolderOpen size={24} />,
            color: '#2563EB',
            lastUpdate: new Date(parseInt(model.updatedAt)).toLocaleDateString(),
          }}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};
