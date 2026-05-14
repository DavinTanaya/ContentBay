import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { Spin, Empty, Alert } from 'antd';
import { Input, Button } from 'antd';
import { PlusOutlined, ApartmentOutlined } from '@ant-design/icons';
import { GET_CONTENT_MODELS } from '@/entities/content-model/api/content-model.queries';
import { ContentModelGrid } from '@entities/content-model';
import type { ContentModel } from '@entities/content-model';
import { getContentModelSettings } from '@/shared/constants/routes';

export default function ContentModelListPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<{
    getContentModels: ContentModel[];
  }>(GET_CONTENT_MODELS);
  const models = data?.getContentModels || [];

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
          description={
            error.message ||
            'Pastikan backend sudah dijalankan dan database sudah dimigrasi.'
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <h1 className="h3-semibold text-black">Content Model</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input.Search placeholder="Search..." allowClear />
          <Button
            className="h-11 px-6 font-bold text-gray-700 rounded-lg border-gray-200 flex items-center gap-2"
            onClick={() => navigate('/content-model/visual')}
          >
            <ApartmentOutlined /> Visual Modeler
          </Button>
          <Button
            type="primary"
            className="h-11 px-6 font-bold bg-[#2563EB] rounded-lg flex items-center gap-2"
            onClick={() => navigate('/content-model/create')}
          >
            <PlusOutlined /> Create Content Type
          </Button>
        </div>
      </div>

      {models.length > 0 ? (
        <ContentModelGrid
          models={models}
          onCardClick={(id) => navigate(getContentModelSettings(id))}
        />
      ) : (
        <div className="mt-12">
          <Empty description="No Content Models found. Create your first one!" />
        </div>
      )}
    </div>
  );
}
