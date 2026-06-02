import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getContentModelPath } from '@/shared/constants/routes';
import { FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { WorkspaceCard } from '@/entities/workspace/ui/WorkspaceCard';
import type { WorkspaceViewModel } from '@/entities/workspace/model/types';
import { 
  getSpaceMembersInitials, 
  getRelativeTimeText 
} from '@/entities/workspace/model/workspace.model';

interface WorkspaceListProps {
  workspaces: WorkspaceViewModel[];
  onDelete: (id: string, name: string) => void;
  onAddClick: () => void;
  currentUser: any;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  onDelete,
  onAddClick,
  currentUser,
}) => {
  const navigate = useNavigate();

  if (workspaces.length === 0) {
    return (
      <div className="col-span-full py-16 text-center bg-white border border-gray-4 border-dashed rounded-[32px]">
        <FolderOpenOutlined className="text-4xl text-gray-6 mb-4" />
        <h4 className="font-poppins text-lg font-medium text-gray-10 mb-2">
          No workspaces found
        </h4>
        <p className="text-sm text-gray-7 mb-6">
          Get started by creating a new workspace space.
        </p>
        <Button
          type="primary"
          variant="solid"
          color="geekblue"
          icon={<PlusOutlined />}
          onClick={onAddClick}
        >
          Add new spaces
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {workspaces.map((space) => (
        <WorkspaceCard
          key={space.id}
          workspace={space}
          onClick={(id) => navigate(getContentModelPath(id))}
          onDelete={onDelete}
          initials={getSpaceMembersInitials(space.members)}
          updatedAtText={getRelativeTimeText(space.updated, space.createdAt)}
        />
      ))}
    </div>
  );
};
