import { Card, Avatar } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Database } from 'lucide-react';
import { RenderModelIcon } from './RenderModelIcon';
import type { ContentModelCardProps } from '../model/types';
import { useContentModelCard } from '../model/useContentModelCard';

export interface ContentModelCardPropsExtended extends ContentModelCardProps {
  formattedDate?: string;
}

export function ContentModelCard({
  model,
  authorName,
  authorInitial,
  onClick,
  formattedDate = 'N/A',
}: ContentModelCardPropsExtended) {
  const displayName = authorName || 'System';
  console.log('author name: ', authorName);
  const initial = authorInitial || 'S';

  return (
    <Card
      hoverable
      className="rounded-[32px] border border-gray-4 overflow-hidden group shadow-sm hover:shadow-md hover:border-blue-4 transition-all cursor-pointer h-full flex flex-col bg-gray-1"
      bodyStyle={{
        padding: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onClick?.(model.id)}
    >
      <div className="p-8 grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-2 border border-gray-4 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
            <span className="text-gray-9 flex items-center justify-center">
              <RenderModelIcon icon={model.icon} size={24} />
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-2 border border-gray-4 rounded-full text-gray-9">
            <Database size={14} className="text-gray-7" />
            <span className="label-xs-semibold">
              {model.fields?.length || 0} Fields
            </span>
          </div>
        </div>
        <h3 className="h5-semibold text-gray-12 m-0 mb-2 group-hover:text-blue-6 transition-colors">
          {model.name}
        </h3>
        <p className="text-gray-7 body-sm-regular mb-0">
          {model.description || 'No description provided'}
        </p>
      </div>
      <div className="px-6 py-4 bg-white border-t border-gray-5 mt-auto items-center justify-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size={32}
              className="bg-blue-1 text-blue-6 font-semibold font-poppins flex items-center justify-center"
            >
              {initial}
            </Avatar>
            <span className="label-sm-medium text-gray-9 leading-tight">
              {displayName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-1 border border-gray-4 rounded-xl text-gray-8 text-xs">
            <CalendarOutlined className="text-gray-7" />
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
