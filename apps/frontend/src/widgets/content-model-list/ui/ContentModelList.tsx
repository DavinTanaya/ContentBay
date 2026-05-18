import type { FC } from 'react';
import { Spin, Empty, Alert } from 'antd';
import { ContentModelGrid } from '@entities/content-model';
import { useContentModelList } from '../model/useContentModelList';

interface ContentModelListProps {
  onNavigateToSettings: (id: string) => void;
}

export const ContentModelList: FC<ContentModelListProps> = ({
  onNavigateToSettings,
}) => {
  const { models, loading, error } = useContentModelList();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
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
        <ContentModelGrid models={models} onCardClick={onNavigateToSettings} />
      ) : (
        <div className="mt-12">
          <Empty description="No Content Models found. Create your first one!" />
        </div>
      )}
    </div>
  );
};
