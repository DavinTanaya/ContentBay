import { useNavigate } from 'react-router-dom';
import { ContentModelList } from '@/widgets/content-model-list';
import {
  getContentModelSettings,
  getContentModelCreatePath,
  getSchemaModelerPath,
} from '@/shared/constants/routes';
import { Input, Button } from 'antd';
import { ApartmentOutlined, PlusOutlined } from '@ant-design/icons';
import { useActiveWorkspaceId } from '@/entities/workspace';

export default function ContentModelListPage() {
  const navigate = useNavigate();
  const activeSpaceId = useActiveWorkspaceId();

  return (
    <div className="p-12 max-w-350 mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <h1 className="h3-semibold text-black">Content Model</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input.Search placeholder="Search..." allowClear />
          <Button
            size="middle"
            type="default"
            onClick={() => navigate(getSchemaModelerPath(activeSpaceId))}
            icon={<ApartmentOutlined />}
          >
            Schema Modeler
          </Button>
          <Button
            variant="solid"
            color="geekblue"
            size="middle"
            onClick={() => navigate(getContentModelCreatePath(activeSpaceId))}
            icon={<PlusOutlined />}
          >
            Create Content Model
          </Button>
        </div>
      </div>

      <ContentModelList
        workspaceId={activeSpaceId}
        onNavigateToSettings={(id) =>
          navigate(
            getContentModelSettings({
              workspaceId: activeSpaceId,
              contentModelId: id,
            }),
          )
        }
      />
    </div>
  );
}
