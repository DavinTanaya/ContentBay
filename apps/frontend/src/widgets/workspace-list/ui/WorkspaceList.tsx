import { useNavigate } from 'react-router-dom';
import { getContentModelPath } from '@/shared/constants/routes';
import { FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { WorkspaceCard } from '@/entities/workspace/ui/WorkspaceCard';
import { WorkspaceCardDropdown } from './WorkspaceCardDropdown';
import type { WorkspaceListProps } from '../model/types';

export function WorkspaceList({
  workspaces,
  onAddClick,
}: WorkspaceListProps) {
  const navigate = useNavigate();

  return (
    <>
      {workspaces.length === 0 ? (
        <div>
          <Empty
            image={<FolderOpenOutlined className="text-4xl text-gray-6" />}
            imageStyle={{ height: 'auto', marginBottom: 16 }}
            description={
              <>
                <h4 className="font-poppins text-lg font-medium text-gray-10 mb-2">
                  No workspaces found
                </h4>
                <p className="text-sm text-gray-7 mb-6">
                  Get started by creating a new workspace space.
                </p>
              </>
            }
          >
            <Button
              type="primary"
              variant="solid"
              color="geekblue"
              icon={<PlusOutlined />}
              onClick={onAddClick}
            >
              Add new space
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onClick={(id) => navigate(getContentModelPath(id))}
              actionSlot={
                <WorkspaceCardDropdown
                  workspaceId={workspace.id}
                  workspaceName={workspace.name}
                />
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
