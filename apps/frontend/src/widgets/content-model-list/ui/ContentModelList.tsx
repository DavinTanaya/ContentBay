import { Spin, Empty, Alert } from 'antd';
import { ContentModelCard } from '@entities/content-model';
import { useContentModelList } from '../model/useContentModelList';
import type { ContentModelListProps } from '../model/types';

export function ContentModelList({
  workspaceId,
  onNavigateToSettings,
}: ContentModelListProps) {
  const { models, loading, error } = useContentModelList(workspaceId);

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Backend Error"
        description={
          error.message ||
          'Pastikan backend sudah dijalankan dan database sudah dimigrasi.'
        }
        type="error"
        showIcon
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
        <div className="w-full min-h-[400px] flex justify-center items-center">
          <Empty description="No Content Models found. Create your first one!" />
        </div>
      )}
    </div>
  );
}
