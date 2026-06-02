import React from 'react';
import { Avatar, Dropdown, Button, type MenuProps } from 'antd';
import {
  FolderOpenOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { WorkspaceViewModel } from '../model/types';

interface WorkspaceCardProps {
  workspace: WorkspaceViewModel;
  onDelete: (id: string, name: string) => void;
  onClick: (id: string) => void;
  initials: { initial: string; color: string; email: string }[];
  updatedAtText: string;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  workspace,
  onDelete,
  onClick,
  initials,
  updatedAtText,
}) => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: 'Delete Space',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onDelete(workspace.id, workspace.name);
      },
    },
  ];

  return (
    <div
      onClick={() => onClick(workspace.id)}
      className="relative bg-white border border-gray-4 rounded-[32px] p-8 flex flex-col justify-between min-h-[250px] shadow-sm hover:shadow-md hover:border-blue-3 transition-all duration-300 group cursor-pointer"
    >
      {/* Top part */}
      <div>
        <div className="flex items-start justify-between mb-4">
          {/* Folder Icon Wrapper */}
          <div className="w-[50px] h-[50px] rounded bg-blue-1 flex items-center justify-center">
            <FolderOpenOutlined className="text-blue-7 text-2xl" />
          </div>

          {/* Actions Dropdown */}
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <Button
                type="text"
                shape="circle"
                icon={<EllipsisOutlined className="text-xl text-gray-7 hover:text-gray-10" />}
              />
            </Dropdown>
          </div>
        </div>

        {/* Workspace Title & Details */}
        <h3 className="font-poppins text-lg font-semibold text-gray-13 mb-3 leading-snug">
          {workspace.name}
        </h3>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-7 mb-4">
          <span>
            <strong className="font-semibold text-gray-10">{workspace.models}</strong> MODELS
          </span>
          <span className="w-1 h-1 bg-gray-4 rounded-full" />
          <span>
            <strong className="font-semibold text-gray-10">{workspace.env}</strong> ENV
          </span>
          <span className="w-1 h-1 bg-gray-4 rounded-full" />
          <span>
            <strong className="font-semibold text-gray-10">{workspace.content}</strong> CONTENT
          </span>
        </div>

        {/* Updated ago */}
        <div className="flex items-center gap-1.5 text-xs text-gray-7 mb-6">
          <ClockCircleOutlined className="text-[11px]" />
          <span>{updatedAtText}</span>
        </div>
      </div>

      {/* Bottom part */}
      <div>
        {/* Horizontal Line Divider */}
        <div className="border-t border-gray-4 my-4" />

        <div className="flex items-center justify-between">
          {/* Members Avatars */}
          <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: '#003a8c',
              backgroundColor: '#e6f7ff',
              fontSize: '11px',
            }}
            size="small"
          >
            {initials.map((member, i) => (
              <Avatar
                key={member.email || i}
                className="text-white text-xs border-white"
                style={{ backgroundColor: member.color }}
              >
                {member.initial}
              </Avatar>
            ))}
          </Avatar.Group>

          {/* Enter Workspace link */}
          <div
            className="font-poppins text-xs font-medium text-blue-9 hover:text-blue-7 flex items-center gap-1 cursor-pointer transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>Enter workspace</span>
            <ArrowRightOutlined className="text-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
