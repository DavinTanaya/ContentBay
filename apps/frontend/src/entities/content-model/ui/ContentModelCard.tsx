import type { FC } from 'react';
import { Card, Avatar } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { RenderModelIcon } from './RenderModelIcon';
import type { ContentModelIcon } from '../model/content-model.types';
import { useSession } from '@/entities/session';

interface ContentModelCardProps {
  model: {
    id: string;
    name: string;
    fields: number;
    desc: string;
    icon: ContentModelIcon | string;
    color: string;
    lastUpdate: string;
  };
  onClick?: (id: string) => void;
}

export const ContentModelCard: FC<ContentModelCardProps> = ({
  model,
  onClick,
}) => {
  const { user } = useSession();
  
  const displayName = user
    ? user.firstName
      ? `${user.firstName} ${user.lastName || ''}`.trim()
      : user.email.split('@')[0]
    : 'User';

  const initial = user
    ? user.firstName
      ? user.firstName.charAt(0).toUpperCase()
      : user.email.charAt(0).toUpperCase()
    : 'U';

  return (
    <Card
      hoverable
      className="rounded-[24px] border border-gray-4 overflow-hidden group shadow-sm hover:shadow-md hover:border-blue-4 transition-all cursor-pointer h-full flex flex-col"
      bodyStyle={{
        padding: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onClick?.(model.id)}
    >
      <div className="p-6 grow">
        <div className="w-12 h-12 rounded-lg bg-blue-1 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
          <span className="text-blue-6 flex items-center justify-center">
            <RenderModelIcon icon={model.icon} size={24} />
          </span>
        </div>
        <h3 className="h5-semibold text-gray-9 m-0 mb-1.5">{model.name}</h3>
        <p className="label-sm-regular text-gray-6 mb-4">
          {model.fields} fields
        </p>
        <p className="text-gray-6 text-sm leading-relaxed mb-0 line-clamp-3">
          {model.desc}
        </p>
      </div>
      <div className="px-6 py-4 bg-white border-t border-gray-5 mt-auto">
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
          <span className="label-xs-regular text-gray-7 flex items-center gap-1">
            <CalendarOutlined /> {model.lastUpdate}
          </span>
        </div>
      </div>
    </Card>
  );
};
