import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentModelCreateForm } from '@/features/content-model-create';
import { getContentModelPath } from '@/shared/constants/routes';
import { useActiveWorkspaceId } from '@/entities/workspace';

export default function ContentModelCreatePage() {
  const navigate = useNavigate();
  const activeSpaceId = useActiveWorkspaceId();

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Back button and Page Title */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="text"
          shape="circle"
          className="text-gray-8 hover:text-black hover:bg-gray-2 -ml-2"
          onClick={() => navigate(getContentModelPath(activeSpaceId))}
          icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-9 m-0">
            Create Content Model
          </h1>
          <p className="text-sm text-gray-500 m-0">
            Define the structure for a new type of content.
          </p>
        </div>
      </div>

      {/* Centered Cards Container */}
      <div className="max-w-[900px] mx-auto flex flex-col gap-6">
        <ContentModelCreateForm
          onBack={() => navigate(getContentModelPath(activeSpaceId))}
          onSuccess={() => navigate(getContentModelPath(activeSpaceId))}
        />
      </div>
    </div>
  );
}
