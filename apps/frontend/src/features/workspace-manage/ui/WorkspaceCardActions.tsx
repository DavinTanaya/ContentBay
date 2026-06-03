import React from 'react';
import { Dropdown, Button, type MenuProps } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';

interface WorkspaceCardActionsProps {
  workspaceId: string;
  workspaceName: string;
  onDelete: (id: string, name: string) => void;
}

export function WorkspaceCardActions({
  workspaceId,
  workspaceName,
  onDelete,
}: WorkspaceCardActionsProps) {
  const menuItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: 'Delete Space',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onDelete(workspaceId, workspaceName);
      },
    },
  ];

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <Button
          type="text"
          shape="circle"
          icon={
            <EllipsisOutlined className="text-xl text-gray-7 hover:text-gray-10" />
          }
        />
      </Dropdown>
    </div>
  );
}
