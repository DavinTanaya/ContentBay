import React from 'react';
import { Avatar, Card, Tag } from 'antd';
import {
  FolderOpenOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  CodepenOutlined,
  ProductOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { Workspace } from '../model/types';
import { useWorkspaceFormatter } from '../model/useWorkspace';

interface WorkspaceCardProps {
  workspace: Workspace;
  actionSlot?: React.ReactNode;
  onClick: (id: string) => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  workspace,
  actionSlot,
  onClick,
}) => {
  const { initials, updatedAtText, modelsCount, contentsCount } =
    useWorkspaceFormatter(workspace);
  console.log('workspace: ', workspace);
  return (
    <Card
      onClick={() => onClick(workspace.id)}
      className="relative rounded-[32px] border-gray-4 shadow-sm hover:shadow-md hover:border-blue-3 transition-all duration-300 group cursor-pointer"
      styles={{
        body: {
          padding: '32px',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-[50px] h-[50px] rounded-xl bg-blue-1 flex items-center justify-center">
            <FolderOpenOutlined className="text-geekblue-6 text-2xl" />
          </div>
          {actionSlot && <div>{actionSlot}</div>}
        </div>
        <h3 className="font-poppins text-lg font-semibold text-gray-13 mb-3 leading-snug">
          {workspace.name}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4 font-medium">
          <Tag color={'geekblue'} variant="outlined" icon={<ProductOutlined />}>
            <span className="font-bold">{modelsCount}</span> Models
          </Tag>
          <Tag color={'purple'} variant="outlined" icon={<FileTextOutlined />}>
            <span className="font-bold">{contentsCount}</span> Contents
          </Tag>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-7 mb-6">
          <ClockCircleOutlined className="text-sm" />
          <span>{updatedAtText}</span>
        </div>
      </div>

      <div>
        <div className="border-t border-gray-4 my-4" />
        <div className="flex items-center justify-between">
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

          <div className="font-poppins text-xs font-medium text-blue-9 hover:text-blue-7 flex items-center gap-1 cursor-pointer transition-colors group-hover:translate-x-0.5 duration-200">
            <span>Enter workspace</span>
            <ArrowRightOutlined className="text-[10px]" />
          </div>
        </div>
      </div>
    </Card>
  );
};
