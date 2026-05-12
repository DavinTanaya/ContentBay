import { ContentModelHeader, ContentModelGrid, useContentModels } from '@features/content-model';
import { Spin, Empty, Alert } from 'antd';

export default function ContentModelListPage() {
  const { models, loading, error } = useContentModels();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-72px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 max-w-[1400px] mx-auto">
        <Alert
          message="Backend Error"
          description={error.message || "Pastikan backend sudah dijalankan dan database sudah dimigrasi."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-12 max-w-[1400px] mx-auto">
      <ContentModelHeader />
      {models.length > 0 ? (
        <ContentModelGrid models={models} />
      ) : (
        <div className="mt-12">
          <Empty description="No Content Models found. Create your first one!" />
        </div>
      )}
    </div>
  );
}
