import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ContentListHeaderProps {
  workspaceId: string;
  workspaceModels: any[];
}

export const ContentListHeader: React.FC<ContentListHeaderProps> = ({
  workspaceId,
  workspaceModels,
}) => {
  const navigate = useNavigate();
  const [isSelectModelOpen, setIsSelectModelOpen] = useState(false);

  const selectModelMenuItems = workspaceModels.map((model) => ({
    key: model.id,
    label: model.name,
    onClick: () => {
      setIsSelectModelOpen(false);
      navigate(
        `/workspace/${workspaceId}/content/create?modelId=${model.id}`,
      );
    },
  }));

  const handleAddEntryClick = () => {
    if (workspaceModels.length === 0) {
      navigate(`/workspace/${workspaceId}/content-model`);
      return;
    }
    setIsSelectModelOpen(true);
  };

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Content Entries
        </h1>
        <p className="text-sm text-gray-500">
          Manage and browse content entries for this workspace.
        </p>
      </div>

      <Dropdown
        menu={{ items: selectModelMenuItems }}
        open={isSelectModelOpen}
        onOpenChange={setIsSelectModelOpen}
        trigger={['click']}
        placement="bottomRight"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          className="font-bold bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-500/20"
          onClick={handleAddEntryClick}
        >
          Create Entry
        </Button>
      </Dropdown>
    </div>
  );
};
