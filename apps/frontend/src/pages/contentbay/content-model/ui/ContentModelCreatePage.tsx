import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentModelCreateForm } from '@/features/content-model-create';
import { PATH } from '@/shared/constants/routes';

export default function ContentModelCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-[calc(100vh-72px)]">
      <div className="px-12 pt-8 mb-4">
        <div className="flex items-center max-w-3xl mx-auto mb-6">
          <Button
            type="text"
            shape="circle"
            className="text-gray-8 hover:text-black hover:bg-gray-2 mr-4 -ml-2"
            onClick={() => navigate(PATH.contentbay.contentModel)}
            icon={<ArrowLeftOutlined className="text-xl" />}
          />
          <div>
            <h1 className="h3-semibold m-0 text-gray-10">
              Create Content Model
            </h1>
            <p className="label-sm-regular text-gray-6 m-0 mt-1">
              Define the structure for a new type of content.
            </p>
          </div>
        </div>
        <ContentModelCreateForm
          onBack={() => navigate(PATH.contentbay.contentModel)}
          onSuccess={() => navigate(PATH.contentbay.contentModel)}
        />
      </div>
    </div>
  );
}
