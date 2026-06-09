import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Spin, Result, Typography } from 'antd';
import { RenderModelIcon } from '@entities/content-model';
import { getContentModelPath } from '@/shared/constants/routes';
import { useActiveWorkspaceId } from '@/entities/workspace';

import { useContentModelDetail } from '../model/useContentModelDetail';

const { Paragraph } = Typography;
import { ContentModelUpdateForm } from '@/features/content-model-update';
import { ContentModelField } from '@/widgets/content-model-field';
import { ContentModelJson } from '@/widgets/content-model-json';

export default function ContentModelDetailPage() {
  const navigate = useNavigate();
  const activeSpaceId = useActiveWorkspaceId();
  const { contentModelId } = useParams();

  const { activeTab, setActiveTab, model, loading, error, jsonSchema } =
    useContentModelDetail(contentModelId || '');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-magenta-">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !model) {
    return <Result status="error" title="Failed to load model" />;
  }

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="text"
          shape="circle"
          className="text-gray-8 hover:text-black hover:bg-gray-2 -ml-2"
          onClick={() => navigate(getContentModelPath(activeSpaceId))}
          icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        />
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm">
            <RenderModelIcon icon={model.icon} size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-9 m-0">
                {model.name}
              </h1>
              <div className="flex items-center bg-gray-2 border border-gray-5 rounded-full px-3 py-0.5">
                <span className="text-xs font-medium text-gray-7 mr-2">
                  {model.apiId}
                </span>
                <Paragraph
                  copyable={{ text: model.apiId }}
                  className="m-0 text-gray-7 flex items-center [&>div]:m-0"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 m-0 mt-1">
              Manage fields, settings, and JSON structure for this content
              model.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mb-8">
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

      <div className="w-full">
        {activeTab === 'fields' && <ContentModelField model={model} />}

        {activeTab === 'name' && (
          <div className="max-w-[900px] mx-auto">
            <ContentModelUpdateForm
              initialValues={{
                id: model.id,
                name: model.name,
                apiId: model.apiId,
                desc: model.description || '',
                icon: model.icon,
              }}
            />
          </div>
        )}

        {activeTab === 'json' && jsonSchema && (
          <div className="max-w-[900px] mx-auto">
            <ContentModelJson modelId={model.apiId} schema={jsonSchema} />
          </div>
        )}
      </div>
    </div>
  );
}
