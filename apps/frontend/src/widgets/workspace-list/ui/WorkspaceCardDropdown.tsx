import { Dropdown, Button, type MenuProps } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { WorkspaceDeleteButton } from '@/features/workspace-delete';
import { WorkspaceInviteButton } from '@/features/workspace-invite';

export interface WorkspaceCardDropdownProps {
  workspaceId: string;
  workspaceName: string;
}

export function WorkspaceCardDropdown({
  workspaceId,
  workspaceName,
}: WorkspaceCardDropdownProps) {
  const menuItems: MenuProps['items'] = [
    {
      key: 'detail',
      label: 'View Details',
      icon: <EyeOutlined />,
    },
    {
      key: 'invite',
      label: <WorkspaceInviteButton workspaceId={workspaceId} asMenuItem />,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: (
        <WorkspaceDeleteButton
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          asMenuItem
        />
      ),
      danger: true,
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
