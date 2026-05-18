import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Spin, Result, Typography } from 'antd';
import { RenderModelIcon } from '@/entities/content-model/ui/RenderModelIcon';
import { PATH } from '@/shared/constants/routes';

import { useContentModelDetail } from '../model/useContentModelDetail';

const { Paragraph } = Typography;
import { ContentModelUpdateForm } from '@/features/content-model-update';
import { ContentModelField } from '@/widgets/content-model-field';
import { ContentModelJson } from '@/widgets/content-model-json';

export default function ContentModelDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { activeTab, setActiveTab, model, loading, error, jsonSchema } =
    useContentModelDetail(id || '');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !model) {
    return <Result status="error" title="Failed to load model" />;
  }

  return (
    <div className="bg-white min-h-[calc(100vh-72px)]">
      <div className="px-12 pt-8 mb-4 items-center">
        <div className="flex items-center">
          <Button
            type="text"
            shape="circle"
            className="text-gray-8 hover:text-black hover:bg-gray-2 mr-4 -ml-2"
            onClick={() => navigate(PATH.contentbay.contentModel)}
            icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
          />
          <div className="w-10 h-10 rounded-full bg-blue-1 text-blue-6 flex items-center justify-center mr-4">
            <RenderModelIcon icon={model.icon} size={24} />
          </div>
          <h3 className="h3-semibold m-0 mr-6">{model.name}</h3>
          <div className="flex items-center bg-gray-2 border border-gray-5 rounded-full px-4 py-1">
            <span className="label-xs-medium mr-2">{model.apiId}</span>
            <Paragraph
              copyable={{ text: model.apiId }}
              className="m-0 text-gray-8 flex items-center [&>div]:m-0"
            />
          </div>
        </div>
      </div>

      <div className="px-12">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="detail-tabs"
          items={[
            { label: 'Name and Description', key: 'name' },
            { label: 'Fields', key: 'fields' },
            { label: 'JSON Preview', key: 'json' },
          ]}
        />
      </div>

      <div className="p-12 bg-white">
        {activeTab === 'fields' && <ContentModelField model={model} />}

        {activeTab === 'name' && (
          <ContentModelUpdateForm
            initialValues={{
              id: model.id,
              name: model.name,
              apiId: model.apiId,
              desc: model.description || '',
              icon: model.icon,
            }}
          />
        )}

        {activeTab === 'json' && jsonSchema && (
          <ContentModelJson modelId={model.apiId} schema={jsonSchema} />
        )}
      </div>
    </div>
  );
}
