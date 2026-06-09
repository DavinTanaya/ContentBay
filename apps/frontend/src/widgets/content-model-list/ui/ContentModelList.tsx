import { Spin, Empty, Alert } from 'antd';
import { ContentModelCard } from '@entities/content-model';
import { useContentModelList } from '../model/useContentModelList';
import type { ContentModelListProps } from '../model/types';
import { EmptyState } from '@/shared/errors/components/EmptyState';
import { NetworkError } from '@/shared/errors/components/NetworkError';
import { useNavigate } from 'react-router-dom';
import { getContentModelCreatePath } from '@/shared/constants/routes';

export function ContentModelList({
  workspaceId,
  onNavigateToSettings,
}: ContentModelListProps) {
  const { models, loading, error, refetch } = useContentModelList(workspaceId);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    if (error.message?.toLowerCase().includes('failed to fetch') || error.networkError) {
      return <NetworkError onRetry={() => refetch && refetch()} />;
    }
    return (
      <Alert
        message="Failed to load content models"
        description="Something went wrong while fetching your models. Please try again."
        type="error"
        showIcon
        action={<Button onClick={() => refetch && refetch()}>Retry</Button>}
      />
    );
  }

  return (
    <div>
      {models.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <ContentModelCard
              key={model.id}
              model={model}
              authorName={model.authorName}
              authorInitial={model.authorInitial}
              onClick={onNavigateToSettings}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No content models yet"
          description="Create your first content model to start managing content."
          actionText="Create Content Model"
          onAction={() => navigate(getContentModelCreatePath(workspaceId))}
        />
      )}
    </div>
  );
}
