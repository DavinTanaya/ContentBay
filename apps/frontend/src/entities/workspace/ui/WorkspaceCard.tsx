import React from 'react';
import { Avatar, Card, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  ArrowRightOutlined,
  ProductOutlined,
  FileTextOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import type { Workspace } from '../model/workspace.types';
import { useWorkspaceFormatter } from '../hooks/useWorkspace';
import { PanelsTopLeft } from 'lucide-react';

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

  const renderAvatars = () => (
    <Avatar.Group
      max={{
        count: 3,
        style: {
          color: '#003a8c',
          backgroundColor: '#e6f7ff',
          fontSize: '11px',
        },
      }}
      size="small"
    >
      {initials.map(
        (
          member: { initial: string; color: string; email: string },
          i: number,
        ) => (
          <Tooltip key={member.email || i} title={member.email} placement="top">
            <Avatar
              className="text-white text-[11px] font-semibold font-poppins flex items-center justify-center"
              style={{ backgroundColor: member.color }}
            >
              <span className="relative top-[1px]">{member.initial}</span>
            </Avatar>
          </Tooltip>
        ),
      )}
    </Avatar.Group>
  );

  return (
    <Card
      onClick={() => onClick(workspace.id)}
      className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.12)] hover:-translate-y-[2px] transition-all duration-500 group cursor-pointer border-none"
      styles={{
        body: {
          padding: '32px',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <div>
        <div className="flex items-start justify-between mb-5">
          <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <PanelsTopLeft />
          </div>
          {actionSlot && (
            <div onClick={(e) => e.stopPropagation()}>{actionSlot}</div>
          )}
        </div>

        <h3 className="font-poppins text-[22px] font-bold text-gray-12 mb-4 leading-tight tracking-tight">
          {workspace.name}
        </h3>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 text-blue-7 rounded-lg text-[13px] font-semibold tracking-wide ring-1 ring-blue-100/50">
            <ProductOutlined className="text-blue-5 text-[14px]" />
            <span>{modelsCount} Models</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50/50 text-purple-7 rounded-lg text-[13px] font-semibold tracking-wide ring-1 ring-purple-100/50">
            <FileTextOutlined className="text-purple-5 text-[14px]" />
            <span>{contentsCount} Contents</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-gray-6 font-regular tracking-wide">
          <ClockCircleOutlined className="text-[12px]" />
          <span>{updatedAtText}</span>
        </div>
      </div>

      <div>
        <div className="border-t border-gray-2/70 my-5" />
        <div className="flex items-center justify-between">
          {renderAvatars()}

          <div className="font-poppins text-[13px] font-semibold text-gray-6 group-hover:text-blue-6 flex items-center gap-1.5 transition-colors duration-200">
            <span>Enter workspace</span>
            <ArrowRightOutlined className="text-[11px] transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Card>
  );
};
